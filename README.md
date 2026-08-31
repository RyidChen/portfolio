# 陳泓孝｜前端工程師作品集

以 Vue 3 與 TypeScript 開發的個人作品集網站，用來整理約 5 年前端開發經驗、可公開操作的個人作品，以及 Vue／React 商業專案經歷。

## 網站內容

- 個人簡介與前端工程師定位
- Vue／React 商業專案經驗
- 可依技術棧篩選的專案卡片
- 三個可公開操作的前端作品
- 技術能力與目前學習方向
- Email 聯絡入口
- 響應式版面與基本無障礙操作

## 技術棧

- Vue 3 Composition API
- TypeScript
- Vue Router
- Vite
- Vitest
- Vue Test Utils
- ESLint、Oxlint、Prettier
- 原生 CSS 與響應式版面

## 專案結構

```text
src/
├─ assets/             # 全域樣式與設計 Token
├─ components/         # 專案卡片、技能卡片等共用元件
│  └─ __tests__/       # 元件與頁面單元測試
├─ router/             # Vue Router 設定
├─ views/              # 作品集首頁與頁面資料
├─ App.vue             # 導覽列、頁面容器與 Footer
└─ main.ts             # Vue 應用程式入口
```

## 本機開發

需要 Node.js `22.18+` 或 `24.12+`。

安裝套件：

```bash
npm install
```

啟動開發環境：

```bash
npm run dev
```

執行單元測試：

```bash
npm run test:unit -- --run
```

執行程式碼檢查：

```bash
npm run lint
```
