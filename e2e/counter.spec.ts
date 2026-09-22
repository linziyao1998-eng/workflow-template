import { expect, test } from '@playwright/test'

test('counter works with keyboard and resets after reload', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Workflow Template' })).toBeVisible()
  const count = page.getByLabel('当前计数')
  const reset = page.getByRole('button', { name: '重置' })
  await expect(count).toHaveText('0')
  await expect(reset).toBeDisabled()
  await page.getByRole('button', { name: '增加' }).focus()
  await page.keyboard.press('Enter')
  await expect(count).toHaveText('1')
  await reset.click()
  await expect(count).toHaveText('0')
  await page.getByRole('button', { name: '增加' }).click()
  await expect(count).toHaveText('1')
  await page.reload()
  await expect(count).toHaveText('0')
  await expect(reset).toBeDisabled()
})

test('increase stays at 10 across mouse and keyboard activation', async ({ page }) => {
  await page.goto('/')
  const count = page.getByLabel('当前计数')
  const increment = page.getByRole('button', { name: '增加' })
  const reset = page.getByRole('button', { name: '重置' })

  for (let value = 1; value <= 9; value += 1) {
    await increment.click()
    await expect(count).toHaveText(String(value))
  }
  await increment.focus()
  await page.keyboard.press('Enter')
  await expect(count).toHaveText('10')
  await expect(increment).toBeEnabled()
  await page.keyboard.press('Space')
  await increment.click()
  await expect(count).toHaveText('10')

  await reset.click()
  await expect(count).toHaveText('0')
  await increment.click()
  await expect(count).toHaveText('1')
  await page.reload()
  await expect(count).toHaveText('0')
})
