import React from 'react'
import './index.css'

const EmojiCard = ({details, onClickEmoji}) => {
  const {id, emojiUrl, emojiName} = details

  return (
    <li className="emoji-item">
      <button
        type="button"
        className="emoji-btn"
        onClick={() => onClickEmoji(id)}
      >
        <img src={emojiUrl} alt={emojiName} className="emoji-img" />
      </button>
    </li>
  )
}

export default EmojiCard
