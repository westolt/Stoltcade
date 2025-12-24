import { useState } from 'react'
import loginService from '../services/login'
import userService from '../services/users'
import Message from './Message'

const LoginFrom = ({ setUser }) => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)

    const handleLogin = async event => {
            event.preventDefault()
            
            try {
                const user = await loginService.login({ username, password })

                window.localStorage.setItem(
                    'loggedUser', JSON.stringify(user)
                )

                userService.setToken(user.token)
                console.log('TOKEN: ', user.token)
                setUser(user)
                setUsername('')
                setPassword('')
            } catch {
                setMessage('Wrong credentials')
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            }
        }

    return(
        <div>
            <Message message={message}/>
            <form onSubmit={handleLogin}>
                <div>
                <label style={{
                color: 'white',
                fontFamily: 'Garamond'
                }}>
                    Username
                    <input
                    type="text"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                    />
                </label>
                </div>
                <div>
                <label style={{
                color: 'white',
                fontFamily: 'Garamond'
                }}>
                    Password
                    <input
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    />
                </label>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}


export default LoginFrom