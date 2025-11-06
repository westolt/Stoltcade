import { useNavigate } from 'react-router-dom'
import GameButton from './GameButton'

const GameList = ({ games }) => {
    const navigate = useNavigate()

    const handleClick = (id) => {
        console.log('Clicked!!!!')
        navigate(`/games/${id}`)
    }

    return (
        <div className="game-list">
            {games.map(game => 
                <GameButton
                    key={game.id}
                    name={game.name}
                    image={game.thumbnail}
                    onClick={() => handleClick(game.id)} />
            )}
        </div>
    )
}

export default GameList