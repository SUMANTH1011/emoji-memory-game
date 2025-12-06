import React from 'react'
import Confetti from 'react-confetti'
import './index.css'

const WinOrLoseCard = ({isWin, score, total, onPlayAgain}) => {
  const title = isWin ? 'You Won!' : 'You Lost'
  const subtitle = isWin ? 'Best Score' : 'Score'
  const imgUrl = isWin
    ? 'https://assets.ccbp.in/frontend/react-js/won-game-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/lose-game-img.png'

  return (
    <div className="result-wrapper">
      {isWin && <Confetti numberOfPieces={180} recycle={false} />}
      <div className="result-card">
        <div className="result-text">
          <h1 className="result-title">{title}</h1>
          <p className="result-sub">{subtitle}</p>
          <p className="result-score">
            {score}/{total}
          </p>
          <button type="button" className="result-btn" onClick={onPlayAgain}>
            Play Again
          </button>
        </div>
        <img src={imgUrl} alt="win or lose" className="result-img" />
      </div>
    </div>
  )
}

export default WinOrLoseCard
