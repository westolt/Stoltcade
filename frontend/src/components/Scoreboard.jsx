const Scoreboard = ({ scoreboard }) => {
    return(
        <div>
            <div className='scoreboard'>
                <h3 style={{
                    color: 'white'
                }}>TOP 10 Highscores:</h3>
                {scoreboard.map((highscore, index) => (
                    <div className='scoretext' key={highscore.id}>
                        <div className="rank">{index + 1}</div>
                        <div className="top_name">{highscore.user.username}</div>
                        <div className="top_score">{highscore.score}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Scoreboard