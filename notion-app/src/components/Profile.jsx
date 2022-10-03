import React, { useContext } from 'react'
import { CurrentUser } from '../contexts/CurrentUser'

function Profile() {

    const { currentUser } = useContext(CurrentUser)

  return (
    <div>
        <h1>Profile picture</h1>
        <h2>username</h2>
        <button onClick={editProfile}>Edit profile</button>
        <h5>bio</h5>
    </div>
  )
}

export default Profile