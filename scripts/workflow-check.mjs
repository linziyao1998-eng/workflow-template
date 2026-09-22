import { createHash } from 'node:crypto'
import { existsSync, readFileSync, realpathSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { isAbsolute, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const own = ['workflow-clarify-spec', 'workflow-plan-tickets', 'workflow-implement-tickets']
const methods = ['grilling', 'domain-modeling', 'tdd', 'code-review', 'codebase-design']

export function repositoryIdentity(url) {
  return url
    ?.trim()
    .replace(/^git@github\.com:/, '')
    .replace(/^https:\/\/github\.com\//, '')
    .replace(/\.git\/?$/, '')
    .replace(/\/$/, '')
}

export function validateProject(directory, environment = {}) {
  const root = realpathSync(directory)
  const errors = []
  const json = (path) => JSON.parse(readFileSync(resolve(root, path), 'utf8'))
  const safeFile = (path) => {
    if (typeof path !== 'string' || isAbsolute(path)) return false
    const resolved = resolve(root, path)
    if (relative(root, resolved).startsWith('..') || !existsSync(resolved)) return false
    return !relative(root, realpathSync(resolved)).startsWith('..')
  }
  try {
    const config = json('.workflow/config.json')
    const pkg = json('package.json')
    if (config.schema_version !== 1 || config.host !== 'codex' || config.tracker?.kind !== 'github')
      errors.push('Unsupported workflow host, tracker or schema')
    if (
      !/^[\w.-]+\/[\w.-]+$/.test(config.tracker?.repo ?? '') ||
      /REPLACE|TODO/.test(config.tracker.repo)
    )
      errors.push('Configure a real owner/repo')
    const remote =
      environment.remoteUrl ??
      execFileSync('git', ['remote', 'get-url', config.tracker.remote], {
        cwd: root,
        encoding: 'utf8',
      })
    if (repositoryIdentity(remote) !== config.tracker.repo)
      errors.push('Git remote does not match tracker.repo')
    if (repositoryIdentity(pkg.repository?.url) !== config.tracker.repo)
      errors.push('package.json repository does not match tracker.repo')
    for (const role of ['readiness', 'labels', 'tracker', 'domain']) {
      if (!safeFile(config.rules?.[role])) errors.push('Missing or nonportable rule: ' + role)
    }
    if (!safeFile('docs/agents/issue-tracker.md'))
      errors.push('Missing upstream code-review tracker path')
    for (const name of methods) {
      if (!safeFile(config.skills?.[name]))
        errors.push('Missing or nonportable dependency: ' + name)
    }
    for (const name of own) {
      if (!safeFile('.agents/skills/' + name + '/SKILL.md'))
        errors.push('Missing owned entrypoint: ' + name)
    }
    if (
      typeof config.state_dir !== 'string' ||
      isAbsolute(config.state_dir) ||
      relative(root, resolve(root, config.state_dir)).startsWith('..')
    ) {
      errors.push('State directory must stay inside the main project')
    } else {
      const ignored =
        environment.ignoredState ??
        (() => {
          try {
            execFileSync(
              'git',
              ['check-ignore', '--no-index', '-q', config.state_dir + '/probe.json'],
              { cwd: root },
            )
            return true
          } catch {
            return false
          }
        })()
      if (!ignored) errors.push('State directory is not Git ignored')
    }
    for (const name of ['ticket', 'full']) {
      if (
        typeof config.checks?.[name] !== 'string' ||
        /REPLACE|TODO/.test(config.checks[name]) ||
        !config.checks[name].trim()
      )
        errors.push('Missing actual project checks: ' + name)
    }
    for (const name of [
      'check',
      'check:all',
      'test:e2e',
      'test:unit:run',
      'type-check',
      'lint',
      'format:check',
    ]) {
      if (!pkg.scripts?.[name]) errors.push('Missing npm gate: ' + name)
    }
    const lock = json('.workflow/skills-lock.json')
    const actualNames = readdirSync(resolve(root, '.agents/skills'))
      .filter((name) => existsSync(resolve(root, '.agents/skills', name, 'SKILL.md')))
      .sort()
    const expectedNames = [...lock.upstream.skills.map((s) => s.name), ...lock.owned.skills].sort()
    if (JSON.stringify(actualNames) !== JSON.stringify(expectedNames))
      errors.push('Installed skill inventory differs from locked inventory')
    for (const [path, hash] of Object.entries(lock.files)) {
      if (!safeFile(path)) {
        errors.push('Missing or unsafe locked file: ' + path)
        continue
      }
      if (
        createHash('sha256')
          .update(readFileSync(resolve(root, path)))
          .digest('hex') !== hash
      )
        errors.push('Skill bytes changed: ' + path)
    }
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error))
  }
  return errors
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const errors = validateProject(fileURLToPath(new URL('../', import.meta.url)))
  if (errors.length) {
    for (const error of errors) console.error(error)
    process.exitCode = 1
  } else
    console.log(
      'Workflow configuration, Git identity, project rules and installed skill hashes verified (offline).',
    )
}
