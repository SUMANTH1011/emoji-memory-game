import React from 'react'
import './index.css'

const Leaderboard = ({leaderboard, onClose, theme}) => {
  const sorted = [...leaderboard].sort((a, b) => b.bestScore - a.bestScore)

  return (
    <div className="lb-overlay">
      <div className={`lb-card lb-${theme}`}>
        <div className="lb-header">
          <h2>Leaderboard</h2>
          <button type="button" className="lb-close" onClick={onClose}>
            ✕
          </button>
        </div>
        {sorted.length === 0 ? (
          <p className="lb-empty">Play a game to appear on the board!</p>
        ) : (
          <table className="lb-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th>Best Score</th>
                <th>Last Score</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p, index) => (
                <tr key={p.name}>
                  <td>{index + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.bestScore}</td>
                  <td>{p.lastScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Leaderboard
