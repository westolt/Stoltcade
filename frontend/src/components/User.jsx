import { useState, useEffect } from 'react'
import userService from '../services/users'
import scoreService from '../services/scores'
import LoginFrom from './LoginForm'
import Register from './Register'
import guest from '../assets/guest.png'
import ImageButton from './ImageButton'
import './user.css'

const User = () => {
    const [user, setUser] = useState(null)
    const [scores, setScores] = useState([])
    const [userScores, setUserScores] = useState([])
    const [profilePictureFile, setProfilePictureFile] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            userService.setToken(user.token)
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
        setUserScores([])
        setProfilePictureFile(null)
        window.localStorage.removeItem('loggedUser')
    }

    const handleClick = async () => {
        if (!profilePictureFile) return

        const formData = new FormData()
        formData.append('image', profilePictureFile)

        const updated = await userService.updateImage(formData)
        const updatedUser = { ...user, image: updated.image }

        setUser(updatedUser)
        window.localStorage.setItem(
            'loggedUser',
            JSON.stringify(updatedUser)
        )
    }

    return (
    <div className="user_box">
        <>
        {user ? ( 
        <>
            <ImageButton
                image={user?.image || guest}
                onClick={handleClick}
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePictureFile(e.target.files[0])}
            />
        </>
        ):( 
        <img className="picture" src={guest} alt="Profile picture" />
        )}
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
                        marginLeft: '-30px',
                        marginBottom: '10px'
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