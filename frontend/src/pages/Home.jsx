import { useState } from 'react'
import User from '../components/User'
import GameList from '../components/GameList'
import TextBox from '../components/TextBox'

const Home = ({ games }) => {
    const [ hoverId, setHoverId] = useState(null)
    const hoveredGame = games.find(g => g.id === hoverId)

    return (
    <div className='container'>
        <div className='userbox'><User /></div>
        <div className='main-area'>
            <div className='list'><GameList games={games} hoverChange={setHoverId}/></div>
            <div className='textbox'><TextBox message={hoveredGame ? hoveredGame.description : 'Welcome to Stoltcade!'}/></div>
        </div>
    </div>
    )
}

export default Home