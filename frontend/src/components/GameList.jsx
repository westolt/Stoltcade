import { useNavigate } from 'react-router-dom'
import GameButton from './GameButton'
import './gamelist.css'

const GameList = ({ games, hoverChange }) => {
    const navigate = useNavigate()

    const handleClick = (id) => {
        navigate(`/games/${id}`)
    }

    return (
        <div>
            <div className="game-list">

            {games.map(game => 
                <GameButton
                    key={game.id}
                    name={game.name}
                    image={game.thumbnail}
                    onClick={() => handleClick(game.id)}
                    onMouseEnter={()=>hoverChange(game.id)}
                    onMouseLeave={()=>hoverChange(null)}
                        />
            )}
            </div>
        </div>
    )
}

export default GameList