import { useState, useEffect } from 'react'
import LoginFrom from './LoginForm'
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

    const handleLougout = () => {
        setUser(null)
        window.localStorage.removeItem('loggedUser')
    }

    if (!user) {
        return (
        <div className="user_box">
            <img className="picture" src={guest} alt="Guest image"></img>
            <p className='name'>Guest</p>
            <LoginFrom setUser={setUser}/>
        </div>
    )
    }
    return (
        <div className="user_box">
            <img className="picture" src={guest} alt="Guest image"></img>
            <p className='name'>{ user.username }</p>
            <button onClick={handleLougout}>Logout</button>
        </div>
    )
}

export default User