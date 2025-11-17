import './gamebutton.css'

const GameButton = ({ name, image, onClick, onMouseEnter, onMouseLeave }) => {

  return (
    <button
      className="game-button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img 
      src={image}
      alt={name}
      />
      <span>{name}</span>
    </button>
  )
}

export default GameButton;