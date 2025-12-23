import { useState, useEffect } from 'react'
import scoreService from '../services/scores'
import './stats.css'

const Stats = () => {
    const [highscores, setHighScores] = useState([])
    const [currentTime, setCurrentTime] =  useState(new Date())

    useEffect(() => {
        scoreService.getAll().then(data => {
            setHighScores(data)
        })
    }, [])

    useEffect(() => {
        setInterval(() => setCurrentTime(new Date()), 1000)
    }, [])


    return(
        <div className="statsbox">
            <h2>Latest High Scores</h2>
            <div className='scores'>
                {highscores.map(highscore =>{
                    const updatedAt = new Date(highscore.updatedAt)
                    const diffMs = currentTime - updatedAt
                    const diffMin = Math.floor(diffMs / 1000 / 60)

                    return(
                        <li key={highscore.id}>
                            {highscore.user.username}: {highscore.game.name} {highscore.score}
                            {' '}- {diffMin} minutes ago
                        </li>
                    )
                })}
            </div>
        </div>
    )
}

export default Stats