import React, { useContext } from 'react'
import { CurrentUser } from '../contexts/CurrentUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Profile() {

    const { currentUser } = useContext(CurrentUser)

    const editProfile = () => {
        console.log('test')
    }

  return (
    <div>
        <a href="/dashboard"><button><FontAwesomeIcon icon="fa-solid fa-arrow-left"/>  Back</button></a>
        <h1>Profile picture</h1>
        <h2>username</h2>
        <button onClick={editProfile}>Edit profile</button>
        <h5>bio</h5>
    </div>
  )
}

export default Profile