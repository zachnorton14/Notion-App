import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CurrentUser } from '../contexts/CurrentUser'
import httpClient from '../httpClient'
import EditFolder from './EditFolder'
import NavBar from './NavBar'

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
                <div className={`note${index + 1}`} key={index} id="note">
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

    let publishSection;

    if (folder.is_published === false){
        publishSection = (
            <div className="publishsection">
                <button className="loginbutton" onClick={publishFolder}>Publish</button>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" />
                    Publishing your folder makes it public to the world!
                </p>
            </div>
        )
    }

	if (currentUser?.username == foldercreator){
		editButton = <button className="signupbutton" style={{ float: 'center'}} onClick={editFolder}>Edit</button>
		deleteButton = <button className="logoutbutton" style={{ float: 'center'}} onClick={deleteFolder}>Delete</button>
        noNotesWarning = <p>You haven't created any notes in this folder yet, hit the plus to create one now.</p>
        createNoteButton = (
            <div className="createfoldercontainer">
                { notes.length === 0 ? <div></div> : <div className="createbuttonspacer"></div> }
                <div className="createfolderbutton" onClick={createNote}><FontAwesomeIcon icon="fa-solid fa-plus"/>Create a new note</div>
            </div>
        )
        publishSection = <div></div>
    }

  return (
    <div className="container">
        <NavBar />
        <div className="backbutton">
            <a href="/dashboard"><button><FontAwesomeIcon icon="fa-solid fa-arrow-left" />  Back</button></a>
        </div>
        <div className="folderviewcontainer">
            <div className="foldertitle">
                { editMode ? <EditFolder user={user} folder={folder}/> : <h1>{folder.name}</h1> }
                <div className="folderprefbuttons">
                    { editMode ? <button className="signupbutton" onClick={cancelEdit}>Cancel</button> : editButton }
                    { editMode ? <div style={{ float: 'center'}}></div> : deleteButton }
                </div>
            </div>
            <h2 onClick={getProfile}>{folder.creator}</h2>
        	{folder.is_published ? <h3>Published Folder</h3> : <h3>Draft Folder</h3>}
                <div className='notedisplay' style={{overflowY: "auto"}}>
                    {notes.length === 0 ? noNotesWarning : noteSection}
                    {createNoteButton}
                </div>
            { editMode ? <h1></h1> : publishSection }
        </div>
    </div>
  )
}

export default FolderView