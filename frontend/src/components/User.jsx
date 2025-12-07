import { useState } from 'react'
import LoginFrom from './LoginForm'
import './user.css'
import guest from '../assets/guest.png'

const User = () => {
    const [user, setUser] = useState(null)

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
        </div>
    )
}

export default User