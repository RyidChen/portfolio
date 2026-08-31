import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ProjectCard from '../ProjectCard.vue'

describe('ProjectCard', () => {
  it('renders typed project details with an accessible article name', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: {
          id: 'membership',
          category: 'vue',
          eyebrow: '商業專案經驗',
          title: '會員成長與積分平台',
          summary: '建立會員營運流程。',
          contributions: ['串接會員 API'],
          stack: ['Vue 3', 'Pinia'],
        },
      },
    })

    const article = wrapper.get('article')
    const heading = wrapper.get('h3')

    expect(article.text()).toContain('會員成長與積分平台')
    expect(article.text()).toContain('建立會員營運流程。')
    expect(wrapper.findAll('.tag').map((tag) => tag.text())).toEqual(['Vue 3', 'Pinia'])
    expect(heading.attributes('id')).toBe('project-title-membership')
    expect(article.attributes('aria-labelledby')).toBe('project-title-membership')
  })

  it('shows public demo links and clearly identifies mock data', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: {
          id: 'demo-project',
          category: 'react',
          eyebrow: '公開前端作品',
          title: 'Demo Project',
          summary: '展示前端互動。',
          contributions: ['模擬即時資料'],
          stack: ['React', 'TypeScript'],
          demoUrl: 'https://demo.example.com',
          githubUrl: 'https://github.com/example/demo',
          dataNotice: '目前使用前端模擬資料，尚未串接 API。',
        },
      },
    })

    expect(wrapper.get('[data-project-data-notice]').text()).toContain('尚未串接 API')
    expect(wrapper.get('a[href="https://demo.example.com"]').text()).toBe('線上 Demo')
    expect(wrapper.get('a[href="https://github.com/example/demo"]').text()).toBe('GitHub')
    expect(wrapper.findAll('a[target="_blank"]')).toHaveLength(2)
  })
})
