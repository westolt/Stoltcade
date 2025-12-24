import { useState, useEffect } from 'react'

const ScoreList = ({ scores }) => {
    const [currentTime, setCurrentTime] =  useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const handleTime = (updatedAt, currentTime) => {
        const diffSec = Math.floor((currentTime - updatedAt) / 1000)

        if (diffSec < 60) return 'now'
        if (diffSec < 3600) {
            const result = Math.floor(diffSec / 60)
            const unit = result === 1 ? 'minute' : 'minutes'
            return `${result} ${unit} ago`
        }
        if (diffSec < 86400) {
            const result = Math.floor(diffSec / 3600)
            const unit = result === 1 ? 'hour' : 'hours'
            return `${result} ${unit} ago`
        } 
        const result = Math.floor(diffSec / 86400)
        const unit = result === 1 ? 'day' : 'days'
        return `${result} ${unit} ago`
    }

    return(
        <div className='score_table'>
            <div className='score_row'>
                <div className='score_cell'>User</div>
                <div className='score_cell'>Game</div>
                <div className='score_cell'>Score</div>
                <div className='score_cell'>Time</div>
            </div>

            <div className='scores'>
                {scores.map(highscore => {
                const updatedAt = new Date(highscore.updatedAt)
                return (
                    <div className='score_row' key={highscore.id}>
                    <div className='score_cell'>{highscore.user.username}</div>
                    <div className='score_cell'>{highscore.game.name}</div>
                    <div className='score_cell'>{highscore.score}</div>
                    <div className='score_cell'>{handleTime(updatedAt, currentTime)}</div>
                    </div>
                )
                })}
            </div>
        </div>
    )
}

export default ScoreList