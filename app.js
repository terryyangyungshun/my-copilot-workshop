// localStorage 的鍵名
const STORAGE_KEY = 'todos-v1'

// DOM 元件
const inputEl = document.getElementById('todo-input')
const addBtn = document.getElementById('add-btn')
const listEl = document.getElementById('todo-list')
const emptyEl = document.getElementById('empty')
const remainingEl = document.getElementById('remaining')

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
function render(){
  const todos = loadTodos()
  listEl.innerHTML = ''

  if(todos.length === 0){
    emptyEl.style.display = 'block'
  }else{
    emptyEl.style.display = 'none'
  }

  todos.forEach(t => listEl.appendChild(createTodoNode(t)))

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

// 也監聽鍵盤 Enter 可以新增
inputEl.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') addTodo()
})

addBtn.addEventListener('click', addTodo)

// 初始渲染
render()
