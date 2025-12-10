import { useState } from 'react'
import userService from '../services/users'
import Message from './Message'

const Register = ({ setUser }) => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [message, setMessage] = useState(null)

    const showMessage = (info) => {
        setMessage(info)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const handleRegister = async event => {
        event.preventDefault()

        if (!password || password.length < 3) {
            showMessage('Password too short!')
            return
        }

        if (password !== password2) {
            showMessage('Passwords do not match!')
            return
        } else {
            try {
                const user= await userService.createAccount({ username, password })

                window.localStorage.setItem(
                    'loggedUser', JSON.stringify(user)
                )

                setUser(user)
                setUsername('')
                setPassword('')
            } catch (error) {
                console.log('Error during registration: ', error)
                showMessage('Username already taken!')
            }
        }
    }

    return(
        <div>
            <Message message={message}/>
            <form onSubmit={handleRegister}>
                <div>
                <label style={{
                fontSize: '12px',
                color: 'white',
                fontFamily: '"Press Start 2P", cursive'
                }}>
                    Give username
                    <input
                    type='text'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                    />
                </label>
                </div>
                <div>
                <label style={{
                fontSize: '12px',
                color: 'white',
                fontFamily: '"Press Start 2P", cursive'
                }}>
                    Give password
                    <input
                    type='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    />
                </label>
                </div>
                <div>
                <label style={{
                fontSize: '12px',
                color: 'white',
                fontFamily: '"Press Start 2P", cursive'
                }}>
                    Give password again
                    <input
                    type='password'
                    value={password2}
                    onChange={({ target }) => setPassword2(target.value)}
                    />
                </label>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register