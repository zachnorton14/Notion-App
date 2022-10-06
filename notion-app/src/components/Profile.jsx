import React, { useContext, useState } from 'react'
import { CurrentUser } from '../contexts/CurrentUser'
import EditProfile from './EditProfile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Profile() {

  const { currentUser } = useContext(CurrentUser)

  const [editMode, setEditMode] = useState(false)


  const editProfile = () => {
    setEditMode(!editMode)
  }

  const cancelEdit = () => {
    setEditMode(false)
  }

  const profileView = (
    <div>
      <img src={currentUser?.profile_picture} alt={`${currentUser?.username}`}></img>
      <h1>{currentUser?.username}</h1>
      <h3>{currentUser?.bio}</h3>
    </div>
  )

  return (
    <div>
      <a href="/dashboard"><button><FontAwesomeIcon icon="fa-solid fa-arrow-left" />  Back</button></a>
      {editMode ? <EditProfile currentUser={currentUser}/> : profileView}
      {editMode ? <button onClick={cancelEdit}>Cancel</button> : <button onClick={editProfile}> Edit profile </button>}
  </div>
  )
}

export default Profile