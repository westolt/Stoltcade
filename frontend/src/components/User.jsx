import { useState, useEffect } from 'react'
import LoginFrom from './LoginForm'
import Register from './Register'
import './user.css'
import guest from '../assets/guest.png'

const User = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        }
    }, [])

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('loggedUser')
    }

    return (
    <div className="user_box">
        <img className="picture" src={guest} alt="Guest image"></img>
        <p className='name'>{user ? user.username : 'Guest'}</p>
        {user ? (
            <button onClick={handleLogout}>Logout</button>
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