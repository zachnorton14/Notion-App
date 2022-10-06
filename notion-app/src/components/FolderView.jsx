import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import httpClient from '../httpClient'
import EditFolder from './EditFolder'

function FolderView() {

  const [ notes, setNotes ] = useState([])

  const [ editMode, setEditMode ] = useState(false)

  const navigate = useNavigate()

  const location = useLocation()

  const currentUser = location.state.user
  let username = location.state.user.username

  const folder = location.state.folder
  let foldercreator = folder.creator
  let folder_id = folder._id['$oid']

  console.log(folder.date_created)

  const noteSection = notes.map((item, index) => {
    const redirect = () => {
        navigate(`/dashboard/${folder_id}/note/${item._id['$oid']}}`, {state: { note: item }})
    }
        return (
            <div className={`note${index + 1}`} key={index}>
                <FontAwesomeIcon icon="fa-solid fa-file" />
                <button onClick={redirect}>{item.name}</button>
            </div>
        )
    })


const createNote = async () => {
    try {
        const response = await httpClient.post(`//localhost:5000/folder/${folder_id}/note`, currentUser)
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

  useEffect(() => {
    const getNotes = async () => {
        try {
            const response = await httpClient.get(`//localhost:5000/folder/${folder_id}/note`)
            if (response.status === 200) {
              	console.log(response.data.message)
				setNotes(response.data.notes)
            } 
        } catch (error) {
            if (error.response.status === 401) {
                console.error(error)
                throw "Could not get this folder's notes"
            }  
            
        }
    }

    getNotes()
  	}, [])

	const editFolder = () => {
		setEditMode(true)
	}

	const deleteFolder = async () => {
		try {
            const response = await httpClient.delete(`//localhost:5000/folder/${folder_id}`)
            if (response.status === 200) {
              	console.log(response.data.message)
				navigate('/dashboard')
            } 
        } catch (error) {
            if (error.response.status === 401) {
                console.error(error)
                throw "Could not delete this folder"
            }  
            
        }
	}

	const submitEdit = async () => {
		console.log('test')
	}

	let editButton = <div style={{ float: 'center'}} ></div>;

	let deleteButton = <div style={{ float: 'center'}} ></div>;

	if (username == foldercreator){
		editButton = <button style={{ float: 'center'}} onClick={editFolder}>Edit</button>
		deleteButton = <button style={{ float: 'center'}} onClick={deleteFolder}>Delete</button>
	}
	
	const publishFolder = () => {
		
	}

	let publishSection = (
		<div>
			<button onClick={publishFolder}>Publish</button>
			<p>Publishing your folder makes it public to the world.</p>
		</div>
	)

	const folderView = (
			<div>
        		<h1>{folder.name}</h1>
        		<h2>{folder.creator}</h2>
        		<ul>
          			{folder.tags.forEach(element => <li>{element}</li>)}
        		</ul>
        		{folder.is_published ? <h3>Published</h3> : <h3>Draft</h3>}
      		</div>
	)

  return (
    <div>
      	<a href="/dashboard"><button><FontAwesomeIcon icon="fa-solid fa-arrow-left" />  Back</button></a>
		{ editMode ? <EditFolder user={currentUser} folder={folder}/> : folderView }
		{editButton}
		{deleteButton}
		<div className='notedisplay' style={{overflowY: "auto"}}>
        		{notes.length === 0 ? <p>You haven't created any notes in this folder yet, hit the plus to create one now.</p> : noteSection}
        		<div onClick={createNote}><FontAwesomeIcon icon="fa-solid fa-plus"/>Create a new note</div>
      		</div>
		{ editMode ? <h1></h1> : publishSection }
    </div>
  )
}

export default FolderView