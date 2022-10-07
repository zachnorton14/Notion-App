import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CurrentUser } from '../contexts/CurrentUser'
import httpClient from '../httpClient'
import EditFolder from './EditFolder'

function FolderView() {

    const { currentUser } = useContext(CurrentUser)

    const [ notes, setNotes ] = useState([])
    const [ editMode, setEditMode ] = useState(false)

    const navigate = useNavigate()

    const location = useLocation()

    const user = location?.state.user
    let username = location.state.user?.username

    const folder = location.state.folder
    let foldercreator = folder.creator
    let folder_id = folder._id['$oid']
    let isPublished = folder.is_published

    const noteSection = notes.map((item, index) => {
        const redirect = () => {
            navigate(`/dashboard/folder/${folder_id}/note/${item._id['$oid']}}`, {state: { note: item, folder: folder }})
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
            const response = await httpClient.post(`//localhost:5000/folder/${folder_id}/note`, user)
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

    const getProfile = async () => {
        try { 
            const response = await httpClient.get(`http://localhost:5000/users/${folder.creator}`)
            console.log(response.data)
            if (response.status === 200) {
                console.log(response.data.message)
                navigate(`/profile/${response.data.user._id['$oid']}`, { state: { user: response.data.user }})
            }
        } catch (error){
            if (error.response.status === 401) {
                console.error(error)
                throw "An error occured whilst trying to get user"
            }
        }
    }

  useEffect(() => {
    const getNotes = async () => {
        try {
            const response = await httpClient.get(`//localhost:5000/folder/${folder_id}/note`)
            console.log(response)
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

    const publishFolder = async () => {
		try {
            const response = await httpClient.post(`//localhost:5000/folder/${folder_id}/publish`)
            if (response.status === 200) {
              	console.log(response.data.message)
				navigate('/dashboard')
            } 
        } catch (error) {
            if (error.response.status === 401) {
                console.error(error)
                throw "Could not publish this folder"
            }  
            
        }
	}

    const cancelEdit = () => {
        setEditMode(false)
    }

	let editButton;
	let deleteButton;
    let noNotesWarning;
    let createNoteButton;

	if (currentUser?.username == foldercreator){
		editButton = <button style={{ float: 'center'}} onClick={editFolder}>Edit</button>
		deleteButton = <button style={{ float: 'center'}} onClick={deleteFolder}>Delete</button>
        noNotesWarning = <p>You haven't created any notes in this folder yet, hit the plus to create one now.</p>
        createNoteButton = <div onClick={createNote}><FontAwesomeIcon icon="fa-solid fa-plus"/>Create a new note</div>
	}
	
    let publishSection;
	
	if (folder.is_published === false){
        publishSection = (
            <div>
                <button onClick={publishFolder}>Publish</button>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" />
                    Publishing your folder makes it public to the world!
                </p>
            </div>
        )
    }

	const folderView = (
			<div>
        		<h1 onClick={getProfile}>{folder.name}</h1>
        		<h2>{folder.creator}</h2>
        		{folder.is_published ? <h3>Published Folder</h3> : <h3>Draft Folder</h3>}
      		</div>
	)

  return (
    <div>
      	<a href="/dashboard"><button><FontAwesomeIcon icon="fa-solid fa-arrow-left" />  Back</button></a>
		{ editMode ? <EditFolder user={user} folder={folder}/> : folderView }
		{ editMode ? <h1></h1> : publishSection }
		{ editMode ? <div style={{ float: 'center'}}></div> : deleteButton }
		{ editMode ? <button onClick={cancelEdit}>Cancel</button> : editButton }
		    <div className='notedisplay' style={{overflowY: "auto"}}>
        		{notes.length === 0 ? noNotesWarning : noteSection}
        		{createNoteButton}
      		</div>
    </div>
  )
}

export default FolderView