import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import HomeView from '@/views/HomeView.vue'

describe('HomeView', () => {
  it('presents the frontend positioning and contact action', () => {
    const wrapper = mount(HomeView)

    expect(wrapper.get('h1').text()).toContain('前端工程師')
    expect(wrapper.text()).toContain('約 5 年')
    expect(wrapper.get('a[href="mailto:dabau975@gmail.com"]')).toBeTruthy()
  })

  it('filters commercial projects with Vue reactive state', async () => {
    const wrapper = mount(HomeView)

    await wrapper.get('button[data-filter="react"]').trigger('click')

    const commercialProjectList = wrapper.get('#project-list')

    expect(commercialProjectList.findAll('[data-project-category="vue"]')).toHaveLength(0)
    expect(commercialProjectList.findAll('[data-project-category="react"]').length).toBeGreaterThan(
      0,
    )
  })

  it('connects filter controls to the live project results', async () => {
    const wrapper = mount(HomeView)
    const reactFilter = wrapper.get('button[data-filter="react"]')

    expect(wrapper.get('[role="group"]').attributes('aria-label')).toBe('依技術篩選專案')
    expect(reactFilter.attributes('aria-controls')).toBe('project-list')
    expect(reactFilter.attributes('aria-pressed')).toBe('false')

    await reactFilter.trigger('click')

    expect(reactFilter.attributes('aria-pressed')).toBe('true')
    expect(wrapper.get('#project-list').attributes('aria-live')).toBe('polite')
  })

  it('presents three public frontend demos with live and source links', () => {
    const wrapper = mount(HomeView)

    expect(wrapper.get('#public-projects-title').text()).toBe('做過的一些作品')
    expect(wrapper.text()).toContain('資料由本地 Mock 或前端模擬器提供，尚未串接後端 API')
    expect(wrapper.get('a[href="https://toki-tabi.yk7579854.workers.dev"]')).toBeTruthy()
    expect(wrapper.get('a[href="https://shard-pulse.yk7579854.workers.dev"]')).toBeTruthy()
    expect(wrapper.get('a[href="https://shopping-cart.yk7579854.workers.dev"]')).toBeTruthy()
  })
})
