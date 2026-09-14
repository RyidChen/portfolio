<script setup lang="ts">
export interface Project {
  id: string
  category: 'vue' | 'react'
  eyebrow: string
  title: string
  summary: string
  contributions: string[]
  stack: string[]
  // 公開作品才需要以下欄位；商業專案沒有公開網址，因此使用選填屬性。
  demoUrl?: string
  githubUrl?: string
  dataNotice?: string
  preview?: string
}

// defineProps
defineProps<{ project: Project }>()
</script>

<template>
  <article
    class="project-card"
    :data-project-category="project.category"
    :aria-labelledby="`project-title-${project.id}`"
  >
    <img
      v-if="project.preview"
      class="project-card__preview"
      :src="project.preview"
      :alt="`${project.title} 實際操作畫面`"
      width="1265"
      height="712"
      loading="lazy"
    />
    <div class="project-card__body">
      <div class="project-card__topline">
        <span class="project-card__eyebrow">{{ project.eyebrow }}</span>
        <span class="project-card__index" aria-hidden="true">{{ project.id }}</span>
      </div>

      <h3 :id="`project-title-${project.id}`">{{ project.title }}</h3>
      <p class="project-card__summary">{{ project.summary }}</p>

      <ul class="project-card__contributions">
        <!-- v-for 適合把陣列轉成重複 UI；key 要使用穩定且可辨識的值。 -->
        <li v-for="contribution in project.contributions" :key="contribution">
          {{ contribution }}
        </li>
      </ul>

      <p v-if="project.dataNotice" class="project-card__notice" data-project-data-notice>
        <strong>資料說明：</strong>{{ project.dataNotice }}
      </p>

      <ul class="tag-list" aria-label="使用技術">
        <li v-for="technology in project.stack" :key="technology" class="tag">
          {{ technology }}
        </li>
      </ul>

      <div v-if="project.demoUrl || project.githubUrl" class="project-card__actions">
        <a
          v-if="project.demoUrl"
          :href="project.demoUrl"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`${project.title} 線上 Demo（另開新分頁）`"
        >
          線上 Demo
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 5h8v8M15 5l-9 9" /></svg>
        </a>
        <a
          v-if="project.githubUrl"
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`${project.title} GitHub（另開新分頁）`"
        >
          GitHub
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 5h8v8M15 5l-9 9" /></svg>
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  height: 100%;
}
</style>
