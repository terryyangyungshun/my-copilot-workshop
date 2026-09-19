Q2Nsb3NlcyAjMw0KDQqIOeahCIg5Y2X5Lq6IOWcqOW6kOaIkOacrOeahCBzdHVmZiDlkIjmjqjlkajluKbnvZHnlKjlsI

修改內容：
- 在 `index.html` 的空訊息區塊 `#empty` 加入 `role="status" aria-live="polite"`，讓篩選變動時螢幕閱讀器能播報。
- 更新 `app.js` 的 `render()`：當篩選後清單為空時顯示更清楚的提示文字，明確告知使用者項目只是被過濾（未被刪除）。

驗證步驟：
1. 開啟 `index.html`。
2. 新增一筆待辦並勾選為完成。
3. 點選「已完成」篩選，確認該筆項目可見。
4. 取消該項目的勾選，確認畫面顯示「沒有已完成的事項 — 若剛取消勾選，該項目仍存在，切回「全部」可看到。」
5. 切回「全部」並確認該項目仍存在。
