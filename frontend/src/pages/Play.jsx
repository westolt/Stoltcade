import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './play.css'
import GameScreen from '../components/GameScreen'
import Textbox from '../components/TextBox'
import Scoreboard from '../components/Scoreboard'
import scoreService from '../services/scores'

const Play = ({ games }) => {
    const id = useParams().id
    const game = games.find(g => g.id === Number(id))
    const [scoreboard, setScoreboard] = useState([])

    useEffect(() => {
        if (game) {
            scoreService.getGame(game.id).then(data => {
                setScoreboard(data)
            })
    }
    }, [game])

    if (!game) {
        return <h2>Game not found</h2>
    }

    return (
        <div>
            <div className='playbox'>
                <h2>Now playing {game.name}</h2>
                <div className='game-layout'>
                    <div className='scoreboard-position'>
                        <Scoreboard scoreboard={scoreboard}/>
                    </div>
                    <div className='gamescreen-position'>
                        <GameScreen game={game}/>
                    </div>
                </div>
                <Textbox message={game.how_to_play}/>
            </div>
        </div>
    )
}

export default Play