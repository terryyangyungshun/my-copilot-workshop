// localStorage 的鍵名
const STORAGE_KEY = 'todos-v1'
const THEME_KEY = 'todos-theme'

// DOM 元件
const inputEl = document.getElementById('todo-input')
const addBtn = document.getElementById('add-btn')
const listEl = document.getElementById('todo-list')
const emptyEl = document.getElementById('empty')
const remainingEl = document.getElementById('remaining')
const themeToggle = document.getElementById('theme-toggle')
const filtersEl = document.querySelector('.filters')
const cardEl = document.querySelector('.card')

// 目前篩選狀態: all | active | completed
let currentFilter = 'all'

// 取得儲存的資料，若沒有回傳空陣列
function loadTodos(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  }catch(e){
    return []
  }
}

// 儲存資料到 localStorage
function saveTodos(todos){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

// 儲存主題偏好到 localStorage
function saveTheme(theme){
  try{ localStorage.setItem(THEME_KEY, theme) }catch(e){}
}

// 套用主題到 DOM
function applyTheme(theme){
  // 在 root 與 card 上設定 data-theme，CSS 以此切換變數/樣式
  document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light')
  if(cardEl) cardEl.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light')

  // 更新切換按鈕顯示文字與 dataset 方便 CSS 樣式
  if(theme === 'dark'){
    themeToggle.dataset.theme = 'dark'
    themeToggle.textContent = '☀️ 淺色模式'
  }else{
    themeToggle.dataset.theme = 'light'
    themeToggle.textContent = '🌙 深色模式'
  }
}

// 取得使用者主題偏好；若沒有則跟隨系統設定
function initTheme(){
  const stored = localStorage.getItem(THEME_KEY)
  if(stored === 'dark' || stored === 'light'){
    applyTheme(stored)
    return
  }

  // 未設定時依作業系統偏好
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(prefersDark ? 'dark' : 'light')
}

// 建立 DOM 節點
function createTodoNode(todo){
  const li = document.createElement('li')
  li.className = 'todo-item'
  li.dataset.id = todo.id

  const left = document.createElement('div')
  left.className = 'todo-left'

  const label = document.createElement('label')

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = !!todo.done

  const span = document.createElement('span')
  span.className = 'todo-text' + (todo.done ? ' done' : '')
  span.textContent = todo.text

  label.appendChild(checkbox)
  label.appendChild(span)

  left.appendChild(label)

  const del = document.createElement('button')
  del.className = 'delete-btn'
  del.type = 'button'
  del.textContent = '刪除'

  li.appendChild(left)
  li.appendChild(del)

  return li
}

// 渲染整個清單
// 渲染整個清單，支援篩選
function render(){
  const todos = loadTodos()
  listEl.innerHTML = ''

  // 根據 currentFilter 選擇要顯示的項目
  const visible = todos.filter(t => {
    if(currentFilter === 'active') return !t.done
    if(currentFilter === 'completed') return t.done
    return true
  })

  if(visible.length === 0){
    // 篩選後清單為空，顯示對應提示
    emptyEl.style.display = 'block'
    if(todos.length === 0){
      emptyEl.textContent = '還沒有任何待辦事項,新增一個吧!'
    }else if(currentFilter === 'active'){
      // 當使用者在「未完成」篩選下看不到項目，提示並說明資料仍存在
      emptyEl.textContent = '沒有未完成的事項 — 項目可能被標記為已完成，切回「全部」查看。'
    }else if(currentFilter === 'completed'){
      // 已完成篩選空時明確說明項目仍在資料中，只是被過濾
      emptyEl.textContent = '沒有已完成的事項 — 若剛取消勾選，該項目仍存在，切回「全部」可看到。'
    }else{
      emptyEl.textContent = '沒有任何待辦'
    }
  }else{
    emptyEl.style.display = 'none'
  }

  visible.forEach(t => listEl.appendChild(createTodoNode(t)))

  // 未完成數字永遠顯示全部數量中未完成的項目
  const remaining = todos.filter(t => !t.done).length
  remainingEl.textContent = remaining
}

// 新增待辦 (忽略空白內容)
function addTodo(){
  const raw = inputEl.value
  const text = raw.trim()
  if(!text) return

  const todos = loadTodos()
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2,6)
  todos.push({id, text, done:false})
  saveTodos(todos)
  inputEl.value = ''
  render()
  inputEl.focus()
}

// 切換完成狀態
function toggleDone(id, done){
  const todos = loadTodos()
  const idx = todos.findIndex(t => t.id === id)
  if(idx === -1) return
  todos[idx].done = done
  saveTodos(todos)
  render()
}

// 刪除
function deleteTodo(id){
  let todos = loadTodos()
  todos = todos.filter(t => t.id !== id)
  saveTodos(todos)
  render()
}

// 事件代理: 為清單處理勾選與刪除
listEl.addEventListener('click', (e) => {
  const li = e.target.closest('li')
  if(!li) return
  const id = li.dataset.id

  // 刪除按鈕
  if(e.target.matches('.delete-btn')){
    deleteTodo(id)
    return
  }

  // 勾選 (點到 checkbox)
  if(e.target.type === 'checkbox'){
    const done = e.target.checked
    toggleDone(id, done)
    return
  }
})

// 篩選按鈕事件
filtersEl.addEventListener('click', (e) => {
  if(!e.target.classList.contains('filter-btn')) return
  const btn = e.target
  const filter = btn.dataset.filter
  currentFilter = filter

  // 更新按鈕樣式
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'))
  btn.classList.add('active')

  render()
})

// 也監聽鍵盤 Enter 可以新增
inputEl.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') addTodo()
})

addBtn.addEventListener('click', addTodo)

// 主題相關初始化
initTheme()

// 切換主題按鈕
themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  const next = current === 'dark' ? 'light' : 'dark'
  applyTheme(next)
  saveTheme(next)
})

// 初始渲染
render()
