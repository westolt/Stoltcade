const GameScreen = ({ game }) => {
    return(
        <div>
                <iframe
                src={`${game.url}?id=${game.id}`}
                title={game.name}
                width='1000'
                height='680'
                style={{ border: 0}}
                />
        </div>
    )
}

export default GameScreen