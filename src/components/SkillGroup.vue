<script setup lang="ts">
export interface SkillCategory {
  title: string
  description: string
  skills: string[]
}

defineProps<{ group: SkillCategory }>()
</script>

<template>
  <article class="skill-card">
    <h3>{{ group.title }}</h3>
    <p>{{ group.description }}</p>
    <ul class="skill-list">
      <li v-for="skill in group.skills" :key="skill">{{ skill }}</li>
    </ul>
  </article>
</template>
