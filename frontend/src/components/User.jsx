import { useState, useEffect } from 'react'
import LoginFrom from './LoginForm'
import Register from './Register'
import scoreService from '../services/scores'
import './user.css'
import guest from '../assets/guest.png'

const User = () => {
    const [user, setUser] = useState(null)
    const [scores, setScores] = useState([])
    const [userScores, setUserScores] = useState([])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        }
    }, [])

    useEffect(() => {
        if (user) {
            scoreService.getAll().then(data => {
                setScores(data)
            })
    }
    }, [user])

    useEffect(() => {
        if (user && scores.length > 0) {
            setUserScores(scores.filter(score => score.user.username === user.username))
        }
    }, [scores, user])

    const handleLogout = () => {
        setUser(null)
        setScores([])
        window.localStorage.removeItem('loggedUser')
    }
    console.log('Tämä on profiilikuva: ', user ? user.profilePicture : 'Ei käyttäjää')

    return (
    <div className="user_box">
        <>
        <img className="picture" src={user ? (user.profilePicture || guest) : guest} alt="Profile picture" />
        </>
        {user ? (
            <>
            <p style={{
                color: 'white',
                fontFamily: '"Press Start 2P", cursive',
                margin: 0,
            }}>{user.username}</p>
            <p style={{
                color: 'white',
                fontFamily: '"Press Start 2P", cursive'
            }}>High scores:</p>

            {userScores.length > 0 ? (
                <ul>
                    {userScores.map(score =>
                    <li style={{
                        color: 'white',
                        fontSize: '10px',
                        fontFamily: '"Press Start 2P", cursive',
                        marginLeft: '-30px'
                        }}
                    key={score.id}>
                        {score.game.name}: {score.score} 
                    </li>
                    )}
                </ul>
            ) : (
                <p style={{
                fontSize: '12px',
                color: 'white',
                fontFamily: '"Press Start 2P", cursive'
            }}>Play games to save your scores!</p>
            )
            }
            <button onClick={handleLogout}>Logout</button>
            </>
        ) : (
            <>
            <LoginFrom setUser={setUser}/>
            <Register setUser={setUser}/>
            </>
        )}
    </div>
    )
}

export default User