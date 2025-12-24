const UserStatistics = ({ userScores }) => {


    return(
        <div className='user_stats_table'>
            {userScores.length > 0 ? (
            <div>
                {userScores.map(score => (
                    <div className='game_stats' key={score.id}>
                        <div className='game_name'>
                            {score.game.name}
                        </div>
                        <div className='user_score_row'>
                            <div className='score_label'>Score</div>
                            <div className='user_score'>{score.score}</div>
                        </div>
                        <div className='other_stats'>You are better than ??? % of players</div>
                    </div>
                )
                )}
            </div>
        ) : (
            <div className="other_stats">Play games to save your scores!</div>
        )
        }
        </div>
    )
}

export default UserStatistics