import React, {useState} from 'react'
import './index.css'

const PlayerSetup = ({onStart, theme, setTheme}) => {
  const [name, setName] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onStart(trimmed)
  }

  const toggleTheme = () =>
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <div className="ps-shell">
      <div className="ps-card">
        <h1 className="ps-title">Emoji Memory Game</h1>
        <p className="ps-sub">
          Click each emoji only once. Repeat an emoji and you lose!
        </p>
        <form onSubmit={handleSubmit} className="ps-form">
          <label className="ps-label">
            Enter your player name
            <input
              type="text"
              className="ps-input"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Sumanth, Legend, etc..."
            />
          </label>
          <button type="submit" className="ps-btn">
            Start Playing
          </button>
        </form>
        <button type="button" className="ps-theme-btn" onClick={toggleTheme}>
          Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </button>
      </div>
    </div>
  )
}

export default PlayerSetup
