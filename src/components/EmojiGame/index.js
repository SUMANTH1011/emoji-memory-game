import React, {useEffect, useState} from 'react'
import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import WinOrLoseCard from '../WinOrLoseCard'
import Leaderboard from '../Leaderboard'
import './index.css'

const STORAGE_KEY = 'eg_leaderboard'

const EmojiGame = ({emojisList, playerName, theme, setTheme}) => {
  const [clicked, setClicked] = useState([])
  const [score, setScore] = useState(0)
  const [topScore, setTopScore] = useState(0)
  const [isOver, setIsOver] = useState(false)
  const [isWin, setIsWin] = useState(false)
  const [leaderboard, setLeaderboard] = useState([])
  const [showBoard, setShowBoard] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      setLeaderboard(parsed)
      const my = parsed.find(p => p.name === playerName)
      if (my) setTopScore(my.bestScore)
    }
  }, [playerName])

  const shuffleEmojis = () =>
    [...emojisList].sort(() => Math.random() - 0.5)

  const playSound = fileName => {
    const audio = new Audio(`/${fileName}`)
    audio.volume = 0.4
    audio.play().catch(() => {})
  }

  const updateLeaderboard = finalScore => {
    setLeaderboard(prev => {
      const existing = prev.find(p => p.name === playerName)
      let updated
      if (existing) {
        const best = Math.max(existing.bestScore, finalScore)
        updated = prev.map(p =>
          p.name === playerName ? {...p, bestScore: best, lastScore: finalScore} : p,
        )
        setTopScore(best)
      } else {
        updated = [
          ...prev,
          {
            name: playerName,
            bestScore: finalScore,
            lastScore: finalScore,
            createdAt: new Date().toISOString(),
          },
        ]
        setTopScore(finalScore)
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  const handleEmojiClick = id => {
    if (isOver) return
    playSound('click.mp3')

    if (clicked.includes(id)) {
      playSound('fail.mp3')
      setIsOver(true)
      setIsWin(false)
      updateLeaderboard(score)
      return
    }

    const newScore = score + 1
    const nextClicked = [...clicked, id]

    if (newScore === emojisList.length) {
      playSound('win.mp3')
      setScore(newScore)
      setClicked(nextClicked)
      setIsOver(true)
      setIsWin(true)
      updateLeaderboard(newScore)
    } else {
      setScore(newScore)
      setClicked(nextClicked)
    }
  }

  const handlePlayAgain = () => {
    setClicked([])
    setScore(0)
    setIsOver(false)
    setIsWin(false)
  }

  const shuffledList = shuffleEmojis()

  return (
    <div className="game-shell">
      <NavBar
        score={score}
        topScore={topScore}
        isOver={isOver}
        theme={theme}
        setTheme={setTheme}
        playerName={playerName}
        onShowLeaderboard={() => setShowBoard(true)}
      />
      <div className="game-container">
        {isOver ? (
          <WinOrLoseCard
            isWin={isWin}
            score={score}
            total={emojisList.length}
            onPlayAgain={handlePlayAgain}
          />
        ) : (
          <ul className="emoji-grid fade-in">
            {shuffledList.map(emoji => (
              <EmojiCard
                key={emoji.id}
                details={emoji}
                onClickEmoji={handleEmojiClick}
              />
            ))}
          </ul>
        )}
      </div>
      {showBoard && (
        <Leaderboard
          leaderboard={leaderboard}
          onClose={() => setShowBoard(false)}
          theme={theme}
        />
      )}
    </div>
  )
}

export default EmojiGame
