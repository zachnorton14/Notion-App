import React, { Link, useState } from 'react'

function Login(){

    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const [message, setMessage] = useState('')
    
    async function handleSubmit(e){
        e.preventDefault()

        // console.log(JSON.stringify(user))

        const response = await fetch(`http://localhost:5000/users/`,{
            method: 'POST',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const data = await response.json()
        
        if (response.status === 200) {
            setMessage('Login successful')
            console.log('success')
        } else {
            setMessage(data.message)
            console.log(message)
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
                    value={user.username}
                    onChange={e => setUser({...user, username: e.target.value})}
                    id="userName"
                    name="userName"
                    placeholder='Username'
                    autoFocus
                />
                <label htmlFor="password"></label>
                <input 
                    type="password"
                    required
                    value={user.password}
                    onChange={e => setUser({...user, password: e.target.value})}
                    id="password"
                    name="password"
                    placeholder="Password"
                />
                <input type="submit" value="Log in"/>
            </form>
            <p>Don't have an account? Sign up <a href="/signup">here</a></p>
        </main>
    )
}

export default Login