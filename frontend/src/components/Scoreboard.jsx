const Scoreboard = ({ scoreboard }) => {
    return(
        <div>
            <ul className='scoreboard'>
                <h3 style={{
                    color: 'white'
                }}>TOP 10 Highscores:</h3>
                {scoreboard.map(highscore => (
                    <li className='scoretext' key={highscore.id}>
                        {highscore.user.username}: {highscore.score}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Scoreboard