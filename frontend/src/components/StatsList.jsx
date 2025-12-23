import { useState, useEffect } from 'react'

const StatsList = ({ scores }) => {
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
        if (diffSec < 3600) return `${Math.floor(diffSec / 60)} minutes ago`
        if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} hours ago`
        return `${Math.floor(diffSec / 86400)} days ago`
    }

    return(
        <div>
            <p>User  Game   Score  Time</p>
            <div className='scores'>
                {scores
                .map(highscore =>{
                    const updatedAt = new Date(highscore.updatedAt)

                    return(
                        <div key={highscore.id}>
                            {highscore.user.username}: {highscore.game.name} {highscore.score}
                            {' '}- {handleTime(updatedAt, currentTime)}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default StatsList