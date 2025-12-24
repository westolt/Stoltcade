import { useState, useEffect } from 'react'
import userService from '../services/users'
import scoreService from '../services/scores'
import UserStatistics from './UserStatistics'
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
        {user ? (
            <>
            <p className='name'>{user.username}</p>
            <button onClick={handleLogout}>Logout</button>
            <ImageButton
                image={user?.image || guest}
                onClick={handleClick}
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePictureFile(e.target.files[0])}
            />
            <UserStatistics userScores={userScores}/>
            </>
        ) : (
            <>
            <p className='name'>Guest</p>
            <img className="picture" src={guest} alt="Profile picture" />
            <LoginFrom setUser={setUser}/>
            <Register setUser={setUser}/>
            </>
        )}
    </div>
    )
}

export default User