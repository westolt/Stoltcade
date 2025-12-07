import { useState } from 'react'
import loginService from '../services/login'
import Message from './Message'

const LoginFrom = ({ setUser }) => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)

    const handleLogin = async event => {
            event.preventDefault()
            
            try {
                const user= await loginService.login({ username, password })
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
                <label>
                    username
                    <input
                    type="text"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                    />
                </label>
                </div>
                <div>
                <label>
                    password
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