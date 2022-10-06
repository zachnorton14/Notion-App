import React, { useState } from 'react'
import httpClient from '../httpClient'

export default function EditFolder(props) {

    const currentUser = props.currentUser

    const folder = props.folder

    const [folderPrefs, setFolderPrefs] = useState({
        name: `${folder.name}`,
        profile_picture: folder.tags,
      })

    let editName = (
        <div>
          <input
            type="text"
            defaultValue={folder.name}
            onChange={e => setFolderPrefs({...folderPrefs, name: e.target.value})}
            id="editFolderName"
            name="editFolderName"
            placeholder="New Folder Name"
          >
          </input>
        </div>
      )
    
      let editTags = (
        <input
          type="text"
          defaultValue={currentUser.username}
          onChange={e => setFolderPrefs({...folderPrefs, username: e.target.value})}
          id="editUserName"
          name="editUserName"
          placeholder=""
        >
        </input>
      )

    const confirmEdit = async (e) => {
        e.preventDefault()
    
        console.log(folderPrefs.profile_picture)
    
        try {
          const response = await httpClient.put(`http://localhost:5000/users`, folderPrefs)
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
        {editName}
        {editTags}
        <button onClick={confirmEdit}>Confirm</button>
    </div>
  )
}