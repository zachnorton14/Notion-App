import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup(){

    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        email: ''
    })

    const [message, setMessage] = useState('')

    const [anError, setAnError] = useState(false)
    
    async function handleSubmit(e){
        e.preventDefault()

        const response = await fetch(`http://localhost:5000/users`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        const data = await response.json()
        
        if (response.ok === true) {        
            navigate('/dashboard')
        } else {
            setMessage(data.error)
            setAnError(true)
        }
    }

    return(
        <main>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit} className="signupform">
                <label htmlFor="userName"></label>
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
                    placeholder='New password'
                />
                <label htmlFor="email"></label>
                <input 
                    type="email"
                    required
                    value={credentials.email}
                    onChange={e => setCredentials({...credentials, email: e.target.value})}
                    id="email"
                    name="email"
                    placeholder='Email'
                />
                <input type="submit" value="Sign up"/>
            </form>
            {anError === true
                ? (
                    <div style={{ float: 'center' }}>
                        {message}
                    </div>
                )
                : null
            }
            <p>Already have an account? Log in <a href="/login">here</a></p>
        </main>
    )
}

export default Signup