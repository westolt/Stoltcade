import { useState, useEffect } from 'react'
import scoreService from '../services/scores'
import ShowFilter from './ShowFilter'
import NameFilter from './NameFilter'
import ScoreList from './ScoreList'
import './stats.css'

const Stats = () => {
    const [highscores, setHighScores] = useState([])
    const [sortBy, setSortBy] = useState('latest')
    const [filteredName, setFilteredName] = useState('')

    useEffect(() => {
        scoreService.getAll().then(data => {
            setHighScores(data)
        })
    }, [])

    const sortedScores = [...highscores].sort((a, b) => {
        if (sortBy === 'latest') {
            return new Date(b.updatedAt) - new Date(a.updatedAt)
        }
        if (sortBy === 'oldest') {
            return new Date(a.updatedAt) - new Date(b.updatedAt)
        }
        if (sortBy === 'highest') {
            return b.score - a.score
        }
        if (sortBy === 'lowest') {
            return a.score - b.score
        }
        return 0
    })

    const filteredScores = sortedScores.filter(score =>
    score.user.username.toLowerCase().includes(filteredName.toLowerCase())
    )


    return(
        <div className="statsbox">
            <h2>Statistics</h2>
            <div className='filters'>
                <ShowFilter sortBy={sortBy} setSortBy={setSortBy}/>
                <NameFilter filteredName={filteredName} setFilteredName={setFilteredName}/>
            </div>
            <ScoreList scores={filteredScores}/>
        </div>
    )
}

export default Stats