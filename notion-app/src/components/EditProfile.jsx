import React, { useState } from 'react'
import httpClient from '../httpClient'

export default function EditProfile(props) {

    const currentUser = props.user

    const [userProfile, setUserProfile] = useState({
        profile_picture: `${currentUser.profile_picture}`,
        username: `${currentUser.username}`,
        bio: `${currentUser.bio}`
      })

    let editProfilePicture = (
        <div>
          <img src={currentUser.profile_picture} alt={`${currentUser.username}`}></img>
          <input
            type="url"
            defaultValue={currentUser.profile_picture}
            onChange={e => setUserProfile({...userProfile, profile_picture: e.target.value})}
            id="editProfilePicture"
            name="editProfilePicture"
            placeholder="Image URL"
          >
          </input>
        </div>
      )
    
      let editUsername = (
        <input
          type="text"
          defaultValue={currentUser.username}
          onChange={e => setUserProfile({...userProfile, username: e.target.value})}
          id="editUserName"
          name="editUserName"
          placeholder="Username"
        >
        </input>
      )
    
      let editBio = (
        <input
          type="text"
          defaultValue={currentUser.bio}
          onChange={e => setUserProfile({...userProfile, bio: e.target.value})}
          id="editBio"
          name="editBio"
          placeholder="Bio"
        >
        </input>
      )

    const confirmEdit = async (e) => {
        e.preventDefault()
    
        try {
          const response = await httpClient.put(`http://localhost:5000/users/${currentUser._id['$oid']}`, userProfile)
            if (response.status === 200) {
                console.log(response.data.message)
                window.location.reload()
            }
        } catch (error){
            if (error.response.status === 401) {
                console.error(error)
                throw "An error occured whilst trying to create new note"
            }
        }
      }

  return (
    <div>
        {editProfilePicture}
        {editUsername}
        {editBio}
        <button onClick={confirmEdit}>Confirm</button>
    </div>
  )
}
