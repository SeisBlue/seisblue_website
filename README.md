# SeisBlue Website

藍震有限公司 (SeisBlue Co., Ltd.) 的官方單頁式公司網站。

**正式網址**：[www.seisblue.com](https://www.seisblue.com)

技術堆疊：Vite + TypeScript + 純 CSS，透過 GitHub Actions 自動部署到 GitHub Pages。

---

## 本地開發

需求：Node.js ≥ 20、pnpm 9。

```bash
pnpm install     # 安裝相依套件
pnpm dev         # 啟動本地 dev server (預設 http://localhost:5173)
pnpm typecheck   # 只跑 TypeScript 型別檢查
pnpm build       # 產出靜態檔到 dist/
pnpm preview     # 預覽 production build
```

## 專案結構

```
.
├── index.html                  # 入口 HTML
├── src/
│   ├── main.ts                 # JS 入口（import CSS、頁腳年份）
│   └── styles.css              # 全站樣式
├── public/                     # 直接複製到 dist/ 的靜態檔
│   ├── CNAME                   # GitHub Pages 自訂網域 (www.seisblue.com)
│   ├── robots.txt              # 搜尋引擎爬蟲規則
│   └── sitemap.xml             # SEO sitemap
├── .github/workflows/deploy.yml  # CI / 自動部署
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 自動部署

推送到 `main` 分支會觸發 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)：

1. 安裝 pnpm 相依（鎖定版本）
2. 跑 `pnpm typecheck`
3. 跑 `pnpm build` 產出 `dist/`
4. 透過官方 `actions/deploy-pages` 部署

第一次使用前，到 GitHub repo 的 **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions**。

---

## 自訂網域 DNS 設定

GitHub Pages 已透過 `public/CNAME` 設定 `www.seisblue.com` 為自訂網域，
你還需要在 DNS 服務商把網域指過來。

### A. Cloudflare（建議）

進到 Cloudflare → 選擇 `seisblue.com` → **DNS → Records**：

| Type  | Name | Target / Value             | Proxy status      |
| ----- | ---- | -------------------------- | ----------------- |
| CNAME | www  | `seisblue.github.io`       | DNS only（灰雲）  |
| A     | @    | `185.199.108.153`          | DNS only          |
| A     | @    | `185.199.109.153`          | DNS only          |
| A     | @    | `185.199.110.153`          | DNS only          |
| A     | @    | `185.199.111.153`          | DNS only          |

> 重點：**Proxy 一開始先設「DNS only」**（灰雲）。等 GitHub Pages 完成 HTTPS 憑證簽發後，
> 再回到 Cloudflare 開橘雲也可以；但這時 SSL/TLS 模式要設成 **Full**（不是 Flexible），避免重定向迴圈。

如果想用 IPv6，可以再加四筆 AAAA：

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

### B. 一般 DNS 服務商（GoDaddy、Gandi、HiNet 等）

同樣的設定，重點是：

- `www` → CNAME → `seisblue.github.io`
- `@`（apex / 根網域）→ A 記錄 → 上面四個 GitHub Pages IP

apex 不支援 CNAME 的 DNS 服務商一律用 A 記錄。

### C. 驗證

DNS 生效後（10 分鐘 ~ 數小時）：

1. 終端機 `dig www.seisblue.com` 應該回 `seisblue.github.io`
2. 終端機 `dig seisblue.com` 應該回四個 `185.199.10x.153`
3. 回到 GitHub → **Settings → Pages**，確認「**Custom domain**」欄位顯示 `www.seisblue.com` 並出現綠色 ✓
4. 勾選 **Enforce HTTPS**（要等 GitHub 簽好憑證才能勾，通常 < 24 小時）

完成後 https://www.seisblue.com 就會走 HTTPS 並指向最新的 main 分支 build。

---

## SEO Notes

- 三個子網域（root + `jimmylab.seisblue.com` + `reserve.seisblue.com`）都應該分別在 [Google Search Console](https://search.google.com/search-console) 加入 property 並驗證
- root domain 的 sitemap 已包含兩個子網域的入口
- `public/logo.png` 同時作為 favicon、nav 品牌標、Open Graph 與 JSON-LD `logo` 欄位使用。若日後想要更大幅、更橫向的社群分享圖，可額外放一張 1200×630 的 `og-image.png` 並更新 `<meta property="og:image">`。
