import { useParams } from 'react-router-dom'
import './play.css'
import Textbox from '../components/TextBox'

const Play = ({ games }) => {
    const id = useParams().id
    const game = games.find(g => g.id === Number(id))

    if (!game) {
        return <h2>Game not found</h2>
    }

    return (
        <div className='playbox'>
            <h2>Now playing {game.name}</h2>
            <iframe
            src={game.url}
            title={game.name}
            width='1000'
            height='680'
            style={{ border: 0}}
            />
            <Textbox message={game.how_to_play}/>
        </div>
    )
}

export default Play