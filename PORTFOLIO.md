# 待辦清單 Web App — GitHub Copilot 實戰工作坊作品

這是在 GitHub Copilot 實戰工作坊中完成的一個小型專案：一個以純前端技術實作的離線待辦清單（Todo）Web 應用程式，用於練習可及性、主題切換、篩選與 GitHub-based 工作流程。

## 線上展示

預覽網址（佔位）：

https://<你的帳號>.github.io/<你的repo名稱>/

（請將佔位網址替換為你的 GitHub Pages 網址）

## 功能

- 新增待辦項目（支援按 Enter 或按鈕新增）
- 勾選 / 取消勾選待辦以標示完成狀態
- 刪除單一待辦項目
- 篩選檢視：全部 / 未完成 / 已完成
- 顯示未完成項目數量（計數不受篩選影響）
- 深色 / 淺色主題切換；支援 `prefers-color-scheme` 並將偏好儲存在 `localStorage`
- 將資料儲存在瀏覽器的 `localStorage`（鍵名：`todos-v1`）以實現離線使用
- 清除所有「已完成」項目的功能（含確認提示）
- 無障礙改進：使用 `aria-live` 與狀態提示以改善篩選導致的內容改變時的可理解性

## 技術

此專案採用純前端技術：

- 標記與結構：HTML
- 樣式：CSS（使用 CSS 變數與主題切換）
- 行為：原生 JavaScript（不使用任何框架或第三方套件）
- 資料持久化：`localStorage`

設計原則為簡潔、可離線運作、並維持良好的可及性基礎。

## 開發方式

本專案採用以 Agent 為中心的開發流程，結合 GitHub Copilot Agent Mode 與 Model Context Protocol (MCP) 工具鏈：

- 使用 `.github/prompts` 與專案內的提示檔來驅動 agent 化工作流程，例如建立 issue 修復提示與 PR 模板。
- 透過 Copilot Agent 在本地環境自動產生、修改程式檔案（`index.html`、`styles.css`、`app.js`），並以小步驟提交到 Git 分支。
- 使用 `gh` CLI 與自動化指令來建立分支、提交、推送以及建立 Pull Request，並在必要時執行 rebase 與衝突解決流程。

此流程強調可重現的小型提交、清晰的 PR 描述，以及在 PR 中包含驗證步驟與變更摘要，方便審查與合併。

## 我學到什麼

- 使用 Copilot Agent 與 prompt-driven 工作流程能大幅加速小型功能的迭代與 PR 流程。
- 在純原生前端專案中妥善使用 `localStorage` 與狀態同步可以實現簡單且可靠的離線體驗。
- 可及性細節（例如 `aria-live`、明確的空狀態提示）對於篩選/動態內容的使用者體驗非常重要。
- 在多人或分支密集的工作流中，學會使用 `rebase`、手動解決衝突並以 `--force-with-lease` 推送是維持整潔歷史的關鍵。
- 撰寫清晰的驗證步驟與 PR 說明可加速審查並降低誤解風險。

---

若要我幫你把佔位的 GitHub Pages 網址換成實際網址、或是補上更詳細的技術圖示與 GIF 展示，我可以繼續協助。
