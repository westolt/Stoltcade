import './gamebutton.css'

const GameButton = ({ name, image, onClick}) => {
  return (
    <button className="game-button" onClick={onClick}>
      <img src={image} alt={name} />
      <span>{name}</span>
    </button>
  )
}

export default GameButton;