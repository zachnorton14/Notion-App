import React, { useContext, useState, useEffect } from 'react'
import { CurrentUser } from '../contexts/CurrentUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import httpClient from '../httpClient'

function Profile() {

  const { currentUser } = useContext(CurrentUser)

  const [user, setUser] = useState({})

  const [userProfile, setUserProfile] = useState({
    profile_picture_url: `${user.profile_picture}`,
    username: `${user.profile_picture}`,
    bio: `${user.profile_picture}`
  })

  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await httpClient.get("//localhost:5000/users/profile")
        if (response.status === 200) {
            console.log(response.data.message)
            setUser(response.data.user)
        } 
      } catch (error) {
          if (error.response.status === 401) {
              console.error(error)
              throw "Could not get user's profile values"
          }  
      }
    }
    getUser()
  }, [])
  
  let profilePicture = <img src="https://riverlegacy.org/wp-content/uploads/2021/07/blank-profile-photo.jpeg" alt={`${user.username}'s profile picture`}></img>

  let username = <h1>{user.username}</h1>
    
  let bio = <h3>{user.bio}</h3>

  let editProfilePicture = (
    <input
      type="url"
      value={userProfile.profile_picture_url}
      onChange={e => setUserProfile({...userProfile, profile_picture_url: e.target.value})}
      id="editProfilePicture"
      name="editProfilePicture"
      placeholder={user.username}
    >
    </input>
  )

  let editUsername = (
    <input
      type="text"
      value={userProfile.username}
      onChange={e => setUserProfile({...userProfile, username: e.target.value})}
      id="editUserName"
      name="editUserName"
      placeholder={user.username}
    >
    </input>
  )

  let editBio = (
    <input
      type="textarea"
      value={userProfile.bio}
      onChange={e => setUserProfile({...userProfile, bio: e.target.value})}
      id="editBio"
      name="editBio"
      placeholder={user.bio}
    >
    </input>
  )

  const editProfile = () => {
    setEditMode(true)
  }

  return (
    <div>
      <a href="/dashboard"><button><FontAwesomeIcon icon="fa-solid fa-arrow-left" />  Back</button></a>
      {editMode ? editProfilePicture : profilePicture}
      {editMode ? editUsername : username}
      <button onClick={editProfile}>Edit profile</button>
      {editMode ? editBio : bio}
    </div>
  )
}

export default Profile