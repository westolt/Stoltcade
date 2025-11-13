import User from '../components/User'
import GameList from '../components/GameList'
import TextBox from '../components/TextBox'

const Home = ({ games }) => {
    return (
    <div className='container'>
        <div className='userbox'><User /></div>
        <div className='main-area'>
            <div className='list'><GameList games={games} /></div>
            <div className='textbox'><TextBox /></div>
        </div>
    </div>
    )
}

export default Home