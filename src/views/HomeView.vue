<script setup lang="ts">
// ref 儲存會改變的狀態；computed 依賴狀態產生衍生資料，依賴不變時會快取結果。
import { computed, ref } from 'vue'

import ProjectCard, { type Project } from '@/components/ProjectCard.vue'
import SkillGroup, { type SkillCategory } from '@/components/SkillGroup.vue'

type ProjectCategory = 'all' | Project['category']

const filters: { label: string; value: ProjectCategory }[] = [
  { label: '全部', value: 'all' },
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
]

const projects: Project[] = [
  {
    id: '01',
    category: 'vue',
    eyebrow: '商業專案經驗 · Vue',
    title: '多品牌會員營運平台',
    summary: '在 Vue 3 Monorepo 中維護多品牌共用架構，串起會員、權益、積分與內容營運流程。',
    contributions: [
      '開發會員俱樂部、每日簽到、積分商城與多幣別優惠模組',
      '以 Pinia 管理 API 狀態流，重構預載與 TTL 快取改善列表體驗',
      '修正 computed 副作用、餘額時序與空值安全等線上問題',
    ],
    stack: ['Vue 3', 'TypeScript', 'Pinia', 'Vue Router', 'Monorepo'],
  },
  {
    id: '02',
    category: 'react',
    eyebrow: '商業專案經驗 · React',
    title: '會員等級與回饋體系',
    summary: '端到端打造會員等級頁面，讓權益、進度、里程碑獎勵與領取狀態保持一致。',
    contributions: [
      '建立等級卡片、權益表、進度條與里程碑獎勵介面',
      '整合未領取獎勵、倒數與領取流程的狀態管理',
      '完成多語系與跨 iOS 機型的樣式相容處理',
    ],
    stack: ['React 19', 'TypeScript', 'Zustand', 'i18next', 'H5'],
  },
  {
    id: '03',
    category: 'react',
    eyebrow: '商業專案經驗 · React',
    title: '即時資訊與直播互動',
    summary: '整合即時資訊、影音串流與聊天室互動，同時處理交易驗證、風控通知與前端資源防護。',
    contributions: [
      '開發即時彈幕、訂單記錄、直播聊天室與串流播放體驗',
      '實作圖片加密與記憶體釋放，降低 DevTools 直接預覽風險',
      '協作高頻異常拉單預警、支付管理與手機綁定驗證',
    ],
    stack: ['React', 'hls.js', 'DPlayer', 'Canvas', 'FingerprintJS'],
  },
  {
    id: '04',
    category: 'vue',
    eyebrow: '商業專案經驗 · Vue',
    title: '營運與風控管理後台',
    summary: '建置讓營運團隊管理內容、權限、風控策略與回饋資料的 Vue 3 後台。',
    contributions: [
      '建立權限節點、內容列表、導入／導出與欄位驗證流程',
      '將導出邏輯抽成可重用 composable，降低各列表重複程式碼',
      '維護 Model／Schema 定義層並統一多語欄位規則',
    ],
    stack: ['Vue 3', 'Quasar', 'TypeScript', 'Composable', 'Schema'],
  },
]

// 把公開作品集中在一份陣列，template 再用 v-for 轉成卡片，之後新增作品只需補資料。
const publicProjects: Project[] = [
  {
    id: 'P01',
    category: 'vue',
    eyebrow: '個人作品 · Vue 3',
    title: 'Curio 策展型購物車',
    summary: '涵蓋商品探索、規格與庫存選擇、購物車、模擬結帳及訂單摘要的完整電商前台。',
    contributions: [
      '實作搜尋、分類、價格篩選、排序與分頁',
      '以 Pinia 管理購物車，處理規格、庫存限制與跨頁狀態',
      '補齊 Loading、錯誤重試、空狀態、404 與響應式體驗',
    ],
    stack: ['Vue 3', 'TypeScript', 'Pinia', 'Vue Router', 'Vite'],
    demoUrl: 'https://shopping-cart.yk7579854.workers.dev',
    githubUrl: 'https://github.com/RyidChen/shopping-cart',
    dataNotice:
      '目前使用本地 Mock 商品資料，購物車與訂單保存於瀏覽器，尚未串接 API、資料庫與真實付款。',
  },
  {
    id: 'P02',
    category: 'react',
    eyebrow: '個人作品 · React',
    title: 'ShardPulse 即時遊戲伺服器監控',
    summary: '以即時更新的指標、事件紀錄與異常模擬，呈現遊戲伺服器維運監控流程。',
    contributions: [
      '以 Reducer 與 Custom Hook 管理監控狀態及 Timer 生命週期',
      '由 Metrics 推導健康狀態，使用原生 SVG 呈現 Ping 趨勢',
      '實作搜尋、狀態篩選、暫停更新與可存取的詳細資料 Drawer',
    ],
    stack: ['React 19', 'TypeScript', 'Tailwind CSS', 'SVG', 'Vite'],
    demoUrl: 'https://shard-pulse.yk7579854.workers.dev',
    githubUrl: 'https://github.com/RyidChen/shard-pulse',
    dataNotice: '監控指標由前端 Timer 與模擬器產生，尚未串接真實遊戲伺服器 API 或 WebSocket。',
  },
  {
    id: 'P03',
    category: 'vue',
    eyebrow: '個人作品 · Vue 3',
    title: 'Toki Tabi 台日航班探索',
    summary: '提供台灣與日本雙向航班搜尋、行程驗證、條件排序及行動裝置操作體驗。',
    contributions: [
      '支援單程／來回、一鍵交換機場與跨國航線驗證',
      '依價格、飛行時間與出發時間排序並標示推薦結果',
      '設計搜尋中、無結果、錯誤狀態與響應式介面',
    ],
    stack: ['Vue 3', 'TypeScript', 'Pinia', 'Vant', 'Vite'],
    demoUrl: 'https://toki-tabi.yk7579854.workers.dev',
    githubUrl: 'https://github.com/RyidChen/toki-tabi',
    dataNotice: '目前使用本地模擬航班與票價，尚未串接即時航班 API，也不提供真實訂票功能。',
  },
]

const skillGroups: SkillCategory[] = [
  {
    title: 'Frontend Core',
    description: '從元件設計到狀態與路由，能在 Vue／React 間切換並維持一致的工程品質。',
    skills: [
      'Vue 3 / Composition API',
      'React / React Native',
      'TypeScript',
      'Vue Router / React Router',
    ],
  },
  {
    title: 'State & Product',
    description: '熟悉高互動 C 端產品的資料流、會員生命週期與跨頁狀態。',
    skills: ['Pinia', 'Zustand', '會員／積分系統', '金流與狀態時序'],
  },
  {
    title: 'UI & Interaction',
    description: '能將複雜業務轉成清楚介面，並處理行動裝置、影音與即時互動。',
    skills: ['Vant / Quasar', 'Tailwind CSS', 'RWD / Accessibility', 'ECharts / Recharts'],
  },
  {
    title: 'Performance & Safety',
    description: '關注載入速度、資源生命週期與前端信任邊界，而不只完成畫面。',
    skills: ['批次預載與 TTL 快取', '圖片加密', '資源生命週期管理', 'iOS 相容與多語系'],
  },
]

const activeFilter = ref<ProjectCategory>('all')

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects
  return projects.filter((project) => project.category === activeFilter.value)
})
</script>

<template>
  <main>
    <section id="about" class="hero section-shell" aria-labelledby="hero-title">
      <div class="hero__copy">
        <p class="eyebrow">Frontend Engineer · Kaohsiung, Taiwan</p>
        <h1 id="hero-title">前端工程師，<br />讓複雜產品變清楚。</h1>
        <p class="hero__lead">
          我是陳泓孝，擁有<span class="text-accent">約 5 年開發經驗</span>，主要使用 Vue 與 React。
          專注高互動 C 端產品、會員系統與跨平台體驗，也在持續學習 Java 與 Spring Boot。
        </p>
        <div class="hero__actions">
          <a class="button button--primary" href="#public-projects">
            查看公開作品
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M4 10h12m-5-5 5 5-5 5" />
            </svg>
          </a>
          <a class="button button--ghost" href="mailto:dabau975@gmail.com">與我聯絡</a>
        </div>
      </div>

      <aside class="profile-panel" aria-label="個人技術摘要">
        <div class="profile-panel__status"><span aria-hidden="true"></span> Open to work</div>
        <div class="code-card" aria-hidden="true">
          <p><span>const</span> developer = {</p>
          <p>&nbsp;&nbsp;focus: <strong>'Frontend'</strong>,</p>
          <p>&nbsp;&nbsp;stack: [<strong>'Vue'</strong>, <strong>'React'</strong>],</p>
          <p>&nbsp;&nbsp;next: <strong>'Java / Spring Boot'</strong></p>
          <p>}</p>
        </div>
        <dl class="quick-facts">
          <div>
            <dt>5 年</dt>
            <dd>開發歷練</dd>
          </div>
          <div>
            <dt>6+</dt>
            <dd>並行產品</dd>
          </div>
          <div>
            <dt>1,400+</dt>
            <dd>近兩年提交</dd>
          </div>
        </dl>
      </aside>
    </section>

    <section id="experience" class="section-shell section-block" aria-labelledby="experience-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Experience</p>
          <h2 id="experience-title">從 Vue 基礎，到雙技術棧交付</h2>
        </div>
        <p>五年的實務累積，不只是一串工具名稱，而是持續把需求轉成穩定產品的過程。</p>
      </div>

      <ol class="timeline">
        <li>
          <p class="timeline__period">2021 — 2023</p>
          <div>
            <h3>Vue 前端實務累積</h3>
            <p>以 Vue 為主要技術，建立元件開發、頁面維護、API 串接與團隊協作的完整基礎。</p>
          </div>
        </li>
        <li>
          <p class="timeline__period">2023 — 2026</p>
          <div>
            <h3>Vue／React 商業產品開發</h3>
            <p>同時維運多個品牌與技術棧，深入會員、交易、即時互動、管理後台與跨平台 App。</p>
          </div>
        </li>
      </ol>
    </section>

    <section
      id="public-projects"
      class="public-projects-section section-shell section-block"
      aria-labelledby="public-projects-title"
    >
      <div class="section-heading">
        <div>
          <p class="eyebrow">Live Portfolio</p>
          <h2 id="public-projects-title">可公開操作的前端作品</h2>
        </div>
        <p>從電商流程、即時監控到航班搜尋，展示 Vue／React 的元件設計、狀態管理與互動細節。</p>
      </div>

      <p class="project-disclosure">
        <strong>Demo 資料說明：</strong>目前作品皆為純前端展示，資料由本地 Mock
        或前端模擬器提供，尚未串接後端 API。
      </p>

      <div class="project-grid public-project-grid">
        <ProjectCard v-for="project in publicProjects" :key="project.id" :project="project" />
      </div>
    </section>

    <section id="projects" class="projects-section section-block" aria-labelledby="projects-title">
      <div class="section-shell">
        <div class="section-heading section-heading--projects">
          <div>
            <p class="eyebrow">Selected Work</p>
            <h2 id="projects-title">近兩年代表性商業專案</h2>
          </div>
          <p>受保密限制無法公開原始畫面與程式碼，以下以問題範圍、負責內容與技術選擇呈現。</p>
        </div>

        <div class="project-toolbar" role="group" aria-label="依技術篩選專案">
          <button
            v-for="filter in filters"
            :key="filter.value"
            type="button"
            :data-filter="filter.value"
            :class="{ 'is-active': activeFilter === filter.value }"
            :aria-pressed="activeFilter === filter.value"
            aria-controls="project-list"
            @click="activeFilter = filter.value"
          >
            {{ filter.label }}
          </button>
        </div>

        <div id="project-list" class="project-grid" aria-live="polite">
          <!-- 父層保存資料與狀態，子元件只負責顯示：這是單向資料流。 -->
          <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project" />
        </div>
      </div>
    </section>

    <section id="skills" class="section-shell section-block" aria-labelledby="skills-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Capabilities</p>
          <h2 id="skills-title">能落地的技術能力</h2>
        </div>
        <p>以產品問題為起點，選擇足夠、可維護的工具完成工作。</p>
      </div>
      <div class="skill-grid">
        <SkillGroup v-for="group in skillGroups" :key="group.title" :group="group" />
      </div>
    </section>

    <section class="learning-section section-shell section-block" aria-labelledby="learning-title">
      <div>
        <p class="eyebrow">Now Building</p>
        <h2 id="learning-title">下一段成長，從這個作品集開始。</h2>
      </div>
      <div class="learning-grid">
        <article>
          <span>01</span>
          <h3>個人前端作品</h3>
          <p>以 Vue 3 重建作品集，持續加入可公開的完整案例與開發紀錄。</p>
        </article>
        <article>
          <span>02</span>
          <h3>Java / Spring Boot</h3>
          <p>正在建立後端基礎；能力成熟後，再將定位延伸為全端工程師。</p>
        </article>
      </div>
    </section>

    <section id="contact" class="contact-section section-shell" aria-labelledby="contact-title">
      <p class="eyebrow">Let's Work Together</p>
      <h2 id="contact-title">正在尋找重視產品品質與協作的前端機會。</h2>
      <p>如果我的經驗符合您的團隊需求，歡迎來信聊聊職位、產品，以及我能參與解決的問題。</p>
      <a class="button button--light" href="mailto:dabau975@gmail.com">
        dabau975@gmail.com
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12m-5-5 5 5-5 5" /></svg>
      </a>
    </section>
  </main>
</template>
