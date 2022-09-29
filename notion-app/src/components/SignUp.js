import React, { useState } from 'react'

function Signup(){

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
        bio: '',
        profilePicture: '../../public/blank-profile-picture.png'
    })

    const [message, setMessage] = useState('')
    
    async function handleSubmit(e){
        e.preventDefault()

        const response = await fetch(`http://127.0.0.1:5000/users`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const data = await response.json()
        
        if (response.status === 200) {
            setMessage('Successfully registered')
            console.log('success')
        } else {
            setMessage(data.message)
            console.log(message)
        }
    }

    return(
        <main>
            <form onSubmit={handleSubmit} className="signupform">
                <label htmlFor="firstName">First Name</label>
                <input 
                    type="text"
                    required
                    value={user.firstName}
                    onChange={e => setUser({...user, firstName: e.target.value})}
                    id="firstName"
                    name="firstName"
                    autoFocus
                />
                <label htmlFor="lastName">Last Name</label>
                <input 
                    type="text"
                    required
                    value={user.lastName}
                    onChange={e => setUser({...user, lastName: e.target.value})}
                    id="lastName"
                    name="lastName"
                />
                <label htmlFor="userName">Username</label>
                <input 
                    type="text"
                    required
                    value={user.name}
                    onChange={e => setUser({...user, name: e.target.value})}
                    id="userName"
                    name="userName"
                />
                <label htmlFor="userName">Password</label>
                <input 
                    type="text"
                    required
                    value={user.name}
                    onChange={e => setUser({...user, name: e.target.value})}
                    id="userName"
                    name="userName"
                />
                <label htmlFor="password">Email</label>
                <input 
                    type="password"
                    required
                    value={user.rating}
                    onChange={e => setUser({...user, rating: e.target.value})}
                    id="password"
                    name="password"
                />
                <input type="submit" value="Login"/>
            </form>
        </main>
    )
}

export default Signup