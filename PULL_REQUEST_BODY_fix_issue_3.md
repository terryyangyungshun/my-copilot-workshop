Closes #3

修改內容：
- 在 `index.html` 的空訊息區塊 `#empty` 加入 `role="status" aria-live="polite"`。
- 更新 `app.js` 的 `render()`：新增更明確的篩選空訊息，說明項目被過濾而非刪除。

驗證步驟：
1. 開啟 `index.html`。
2. 新增並勾選一筆待辦。
3. 在「已完成」下取消勾選，確認顯示提示。
4. 切回「全部」並確認該項目仍存在。
