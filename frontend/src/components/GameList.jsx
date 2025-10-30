import GameButton from './GameButton';
import game1 from '../assets/game1.png';
import game2 from '../assets/game2.png';

const GameList = () => {
    const handleClick = (gameName) => {
        alert(`Starting game: ${gameName}`);
    }

    return (
        <div className="game-list">
            <GameButton name="Game 1" image={game1} onClick={() => handleClick("Game 1")} />
            <GameButton name="Game 2" image={game2} onClick={() => handleClick("Game 2")} />
        </div>
    )
}

export default GameList;