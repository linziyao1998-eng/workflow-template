import { createHash } from 'node:crypto'
import { execFileSync, spawnSync } from 'node:child_process'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cpSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { validateProject } from './workflow-check.mjs'

const source = fileURLToPath(new URL('../', import.meta.url))
const environment = {
  remoteUrl: 'https://github.com/linziyao1998-eng/workflow-template.git',
  ignoredState: true,
}

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'workflow-check-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  for (const name of ['.workflow', '.agents', 'docs'])
    cpSync(join(source, name), join(root, name), { recursive: true })
  cpSync(join(source, 'package.json'), join(root, 'package.json'))
  return root
}
function changeConfig(root, change) {
  const path = join(root, '.workflow/config.json')
  const config = JSON.parse(readFileSync(path, 'utf8'))
  change(config)
  writeFileSync(path, JSON.stringify(config))
}

test('complete installation satisfies the offline contract', (t) => {
  assert.deepEqual(validateProject(fixture(t), environment), [])
})
test('missing upstream dependency fails instead of falling back globally', (t) => {
  const root = fixture(t)
  rmSync(join(root, '.agents/skills/tdd'), { recursive: true })
  assert.ok(validateProject(root, environment).some((e) => e.includes('dependency: tdd')))
})
test('repository mismatch fails before tracker mutations', (t) => {
  const root = fixture(t)
  assert.ok(
    validateProject(root, {
      ...environment,
      remoteUrl: 'git@github.com:another/repository.git',
    }).some((e) => e.includes('Git remote')),
  )
})
test('changed upstream bytes invalidate the integrity baseline', (t) => {
  const root = fixture(t)
  writeFileSync(join(root, '.agents/skills/tdd/SKILL.md'), 'unexpected replacement')
  assert.ok(validateProject(root, environment).some((e) => e.includes('Skill bytes changed')))
})
test('missing checks and unignored recovery state are setup failures', (t) => {
  const root = fixture(t)
  changeConfig(root, (c) => {
    c.checks.full = ''
  })
  const issues = validateProject(root, { ...environment, ignoredState: false })
  assert.ok(issues.some((e) => e.includes('actual project checks: full')))
  assert.ok(issues.some((e) => e.includes('not Git ignored')))
})
test('absolute dependency paths are not portable even when they exist', (t) => {
  const root = fixture(t)
  mkdirSync(join(root, 'external'))
  changeConfig(root, (c) => {
    c.skills.tdd = join(root, '.agents/skills/tdd/SKILL.md')
  })
  assert.ok(
    validateProject(root, environment).some((e) => e.includes('nonportable dependency: tdd')),
  )
})

function changeLock(root, change) {
  const path = join(root, '.workflow/skills-lock.json')
  const lock = JSON.parse(readFileSync(path, 'utf8'))
  change(lock)
  writeFileSync(path, JSON.stringify(lock))
}
test('unlocked installed files and missing lock entries fail inventory checks', (t) => {
  const root = fixture(t)
  const helper = join(root, '.agents/skills/common/unlocked.md')
  writeFileSync(helper, 'new helper')
  assert.ok(validateProject(root, environment).some((e) => e.includes('file inventory')))
  rmSync(helper)
  changeLock(root, (lock) => {
    delete lock.files['.agents/skills/common/runtime.md']
  })
  assert.ok(validateProject(root, environment).some((e) => e.includes('file inventory')))
})
test('a broken relative reference fails even with updated integrity hash', (t) => {
  const root = fixture(t)
  const path = '.agents/skills/common/runtime.md'
  const body = readFileSync(join(root, path), 'utf8') + '\n[missing](missing.md)\n'
  writeFileSync(join(root, path), body)
  changeLock(root, (lock) => {
    lock.files[path] = createHash('sha256').update(body).digest('hex')
  })
  const errors = validateProject(root, environment)
  assert.ok(errors.some((e) => e.includes('Broken or unsafe local reference')))
  assert.ok(!errors.some((e) => e.includes('Skill bytes changed')))
})
test('relocated installation validates real Git identity and ignored runtime state', (t) => {
  const root = fixture(t)
  cpSync(join(source, '.gitignore'), join(root, '.gitignore'))
  execFileSync('git', ['init', '-q', root])
  execFileSync('git', ['remote', 'add', 'origin', 'https://github.com/example/new-project.git'], {
    cwd: root,
  })
  changeConfig(root, (config) => {
    config.tracker.repo = 'example/new-project'
  })
  const pkgPath = join(root, 'package.json')
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
  pkg.repository.url = 'https://github.com/example/new-project.git'
  writeFileSync(pkgPath, JSON.stringify(pkg))
  assert.deepEqual(validateProject(root), [])
})
test('content identity preserves UTF-8 bytes and rejects non-string JSON fields', (t) => {
  const root = fixture(t)
  const script = join(root, '.agents/skills/common/scripts/content_hash.py')
  const path = join(root, 'body.json')
  const hash = (args = []) =>
    execFileSync('python3', [script, path, ...args], { encoding: 'utf8' }).trim()
  const body = '规格\r\n正文\n'
  writeFileSync(path, body)
  const expected = createHash('sha256').update(body).digest('hex')
  assert.equal(hash(), expected)
  writeFileSync(path, body.replaceAll('\r\n', '\n'))
  assert.notEqual(hash(), expected)
  writeFileSync(path, JSON.stringify({ body }))
  assert.equal(hash(['--json-field', 'body']), expected)
  writeFileSync(path, JSON.stringify({ body: 42 }))
  assert.notEqual(spawnSync('python3', [script, path, '--json-field', 'body']).status, 0)
})
