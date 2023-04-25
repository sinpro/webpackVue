// Import the mount() method from the test utils
// and the component you want to test
import { mount } from '@vue/test-utils'
import Counter from './counter'

describe('计数器', () => {
  // Now mount the component and you have the wrapper
  const wrapper = mount(Counter)

  it('渲染正确的标记', () => {
    expect(wrapper.html()).toContain('<span class="count">0</span>')
  })

  // it's also easy to check for the existence of elements
  it('是一个按钮', () => {
    expect(wrapper.contains('button')).toBe(true)
  })

  it('点击按钮应该使得计数递增', () => {
    expect(wrapper.vm.count).toBe(0)
    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.vm.count).toBe(1)
  })
})
