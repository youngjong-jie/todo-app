import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })
  const [input, setInput] = useState('')
  const [assigner, setAssigner] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    const text = input.trim()
    if (!text) return
    setTodos([...todos, { id: Date.now(), text, done: false, assigner: assigner.trim() }])
    setInput('')
    setAssigner('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.done
    if (filter === 'done') return t.done
    return true
  })

  const doneCount = todos.filter(t => t.done).length

  return (
    <div className="app">
      <h1>할일 관리</h1>

      <div className="input-row">
        <input
          type="text"
          placeholder="할일을 입력하세요..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
        />
        <input
          type="text"
          className="assigner-input"
          placeholder="지시자"
          value={assigner}
          onChange={e => setAssigner(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>추가</button>
      </div>

      <div className="filter-row">
        {['all', 'active', 'done'].map(f => (
          <button
            key={f}
            className={filter === f ? 'active' : ''}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? '전체' : f === 'active' ? '진행중' : '완료'}
          </button>
        ))}
      </div>

      <ul className="todo-list">
        {filtered.length === 0 && (
          <li className="empty">할일이 없어요!</li>
        )}
        {filtered.map(todo => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            {todo.assigner && <span className="assigner-badge">{todo.assigner}</span>}
            <button className="delete" onClick={() => deleteTodo(todo.id)}>✕</button>
          </li>
        ))}
      </ul>

      <div className="status">
        {doneCount} / {todos.length} 완료
      </div>
    </div>
  )
}

export default App
