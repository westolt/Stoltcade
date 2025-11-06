import User from '../components/User'
import GameList from '../components/GameList'

const Home = ({ games }) => {
    return (
    <div className='middle'>
        <User />
        <div className='list'>
            <GameList games={games} />
        </div>
    </div>
    )
}

export default Home