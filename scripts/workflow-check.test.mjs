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
