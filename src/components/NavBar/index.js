import React from 'react'
import './index.css'

const NavBar = ({
  score,
  topScore,
  isOver,
  theme,
  setTheme,
  playerName,
  onShowLeaderboard,
}) => {
  const toggleTheme = () =>
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <nav className="nav">
      <div className="nav-left">
        <img
          src="https://assets.ccbp.in/frontend/react-js/game-logo-img.png"
          alt="emoji logo"
          className="nav-logo"
        />
        <div>
          <h1 className="nav-title">Emoji Game</h1>
          <p className="nav-player">Player: {playerName}</p>
        </div>
      </div>

      <div className="nav-right">
        {!isOver && (
          <>
            <p className="nav-score">Score: {score}</p>
            <p className="nav-score">Top Score: {topScore}</p>
          </>
        )}
        <button type="button" className="nav-btn" onClick={onShowLeaderboard}>
          Leaderboard
        </button>
        <button type="button" className="nav-btn" onClick={toggleTheme}>
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  )
}

export default NavBar
