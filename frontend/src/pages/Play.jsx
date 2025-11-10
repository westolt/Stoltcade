import { useParams } from 'react-router-dom'
import './play.css'

const Play = ({ games }) => {
    const id = useParams().id
    const game = games.find(g => g.id === Number(id))

    if (!game) {
        return <h2>Game not found</h2>
    }
    console.log('This is game url: ', game.url)
    return (
        <div className='playbox'>
            <h2>Now playing {game.name}</h2>
            <iframe
            src={game.url}
            title={game.name}
            width='800'
            height='600'
            style={{ border: 0}}
            />
            <b>{game.description}</b>
        </div>
    )
}

export default Play