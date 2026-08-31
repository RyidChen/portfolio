<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <a class="skip-link" href="#main-content">跳到主要內容</a>

  <header class="site-header">
    <div class="site-header__inner section-shell">
      <a class="brand" href="#about" aria-label="陳泓孝作品集首頁">
        <span class="brand__mark" aria-hidden="true">CH</span>
        <span class="brand__name">陳泓孝</span>
      </a>

      <nav class="site-nav" aria-label="主要導覽">
        <a href="#experience">經歷</a>
        <a href="#public-projects">作品</a>
        <a href="#skills">技能</a>
      </nav>

      <a class="header-contact" href="mailto:dabau975@gmail.com">
        <span>聯絡我</span>
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12m-5-5 5 5-5 5" /></svg>
      </a>
    </div>
  </header>

  <div id="main-content">
    <!-- RouterView 會依目前網址渲染 router/index.ts 對應的頁面元件。 -->
    <RouterView />
  </div>

  <footer class="site-footer">
    <div class="section-shell">
      <p>© 2026 陳泓孝 · Built with Vue 3 & TypeScript</p>
      <a href="#about">回到頁首 <span aria-hidden="true">↑</span></a>
    </div>
  </footer>
</template>
