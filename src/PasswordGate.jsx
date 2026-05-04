import { useState, useEffect } from 'react'

const CORRECT_PASSWORD = '1234'
const SESSION_KEY = 'todo-app-authed'

export default function PasswordGate({ children }) {
  const [authed, setAuthed] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setAuthed(true)
    }
    setReady(true)
  }, [])

  const handleLogin = () => {
    if (input === CORRECT_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setAuthed(true)
    } else {
      setError('비밀번호가 틀렸습니다.')
      setInput('')
    }
  }

  if (!ready) return null
  if (authed) return children

  return (
    <div className="password-gate">
      <div className="password-box">
        <h1>할일 관리</h1>
        <p className="password-desc">비밀번호를 입력해주세요.</p>
        <input
          type="password"
          placeholder="비밀번호"
          value={input}
          onChange={e => { setInput(e.target.value); setError('') }}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          autoFocus
        />
        {error && <p className="password-error">{error}</p>}
        <button onClick={handleLogin}>입장하기</button>
      </div>
    </div>
  )
}
