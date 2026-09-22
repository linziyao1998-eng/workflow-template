import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import App from './App.vue'
describe('starter counter', () => {
  it('increments through the visible button and resets to zero', async () => {
    const wrapper = mount(App)
    const [increment, reset] = wrapper.findAll('button')
    if (!increment || !reset) throw new Error('Counter controls are missing')
    expect(wrapper.get('output').text()).toBe('0')
    expect(reset.attributes('disabled')).toBeDefined()
    await increment.trigger('click')
    await increment.trigger('click')
    expect(wrapper.get('output').text()).toBe('2')
    expect(reset.attributes('disabled')).toBeUndefined()
    await reset.trigger('click')
    expect(wrapper.get('output').text()).toBe('0')
    expect(reset.attributes('disabled')).toBeDefined()
    wrapper.unmount()
  })

  it('stops increasing at 10 while the increase button stays available', async () => {
    const wrapper = mount(App)
    const increment = wrapper.findAll('button').find((button) => button.text() === '增加')
    if (!increment) throw new Error('Increase button is missing')

    for (let value = 1; value <= 9; value += 1) {
      await increment.trigger('click')
      expect(wrapper.get('output').text()).toBe(String(value))
    }
    await increment.trigger('click')
    expect(wrapper.get('output').text()).toBe('10')
    expect(increment.attributes('disabled')).toBeUndefined()
    await increment.trigger('click')
    await increment.trigger('click')
    expect(wrapper.get('output').text()).toBe('10')
    wrapper.unmount()
  })
})
