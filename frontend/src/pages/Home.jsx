import { useState } from 'react'
import User from '../components/User'
import GameList from '../components/GameList'
import TextBox from '../components/TextBox'
import Statistics from '../components/Statistics'
import './home.css'

const Home = ({ games }) => {
    const [ hoverId, setHoverId] = useState(null)
    const hoveredGame = games.find(g => g.id === hoverId)

    return (
    <div className='container'>
        <div className='userbox'><User /></div>
        <div className='middle-area'>
            <div className='list'><GameList games={games} hoverChange={setHoverId}/></div>
            <div className='textbox'><TextBox message={hoveredGame ? hoveredGame.description : 'Welcome to Statcade!'}/></div>
        </div>
        <Statistics />
    </div>
    )
}

export default Home