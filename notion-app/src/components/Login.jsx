import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CurrentUser } from '../contexts/CurrentUser'
import httpClient from "../httpClient"

function Login(){

    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const { setCurrentUser } = useContext(CurrentUser)

    const [message, setMessage] = useState('')

    const [anError, setAnError] = useState(false)
    
    async function handleSubmit(e){
        e.preventDefault()

        try {
            const response = await httpClient.post("//localhost:5000/authentication", credentials)
            if (response.status === 200) {
                setMessage(response.data.message)
                setCurrentUser(response.data.user)
                navigate('/dashboard')
            }
        } catch (error){
            if (error.response.status === 401) {
                console.error(error)
                setMessage(error)
                setAnError(true)
                throw "Invalid credentials"
            }
        }
    }
        

    return(
        <main>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email"></label>
                <input 
                    type="email"
                    required
                    value={credentials.email}
                    onChange={e => setCredentials({...credentials, email: e.target.value})}
                    id="email"
                    name="email"
                    placeholder='Email'
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

export default Login;