import React, { Link, useState } from 'react'

function Login(){

    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const [message, setMessage] = useState('')
    
    async function handleSubmit(e){
        e.preventDefault()

        const response = await fetch(`http://127.0.0.1:5000/users/`,{
            method: 'POST',
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
            <form onSubmit={handleSubmit} className="loginform">
                <input 
                    type="text"
                    required
                    value={user.name}
                    onChange={e => setUser({...user, username: e.target.value})}
                    id="userName"
                    name="userName"
                    placeholder='Username'
                    autoFocus
                />
                <input 
                    type="password"
                    required
                    value={user.rating}
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