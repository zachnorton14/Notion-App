import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CurrentUser } from '../contexts/CurrentUser'

function Login(){

    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    const { setCurrentUser } = useContext(CurrentUser)

    const [message, setMessage] = useState('')

    const [anError, setAnError] = useState(false)
    
    async function handleSubmit(e){
        e.preventDefault()

        const response = await fetch(`http://localhost:5000/authentication`,{
            method: 'POST',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        const data = await response.json()
        
        if (response.status === 200) {
            setMessage(data.message)
            setCurrentUser(JSON.parse(data.user))
            navigate('/dashboard')
        } else {
            setMessage(data.message)
            setAnError(true)
        }
    }

    return(
        <main>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username"></label>
                <input 
                    type="text"
                    required
                    value={credentials.username}
                    onChange={e => setCredentials({...credentials, username: e.target.value})}
                    id="userName"
                    name="userName"
                    placeholder='Username'
                    autoFocus
                />
                <label htmlFor="password"></label>
                <input 
                    type="password"
                    required
                    value={credentials.password}
                    onChange={e => setCredentials({...credentials, password: e.target.value})}
                    id="password"
                    name="password"
                    placeholder="Password"
                />
                <input type="submit" value="Log in"/>
            </form>
            {anError === true
                ? (
                    <div style={{ float: 'center' }}>
                        {message}
                    </div>
                )
                : null
            }
            <p>Don't have an account? Sign up <a href="/signup">here</a></p>
        </main>
    )
}

export default Login