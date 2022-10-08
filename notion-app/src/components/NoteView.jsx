import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { CurrentUser } from '../contexts/CurrentUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import httpClient from '../httpClient'
import TextEditor from './TextEditor'
import NavBar from './NavBar'


function NoteView() {

    const { currentUser } = useContext(CurrentUser)
    
    const [ editMode, setEditMode ] = useState(false)
    const [ editingContent, setEditingContent ] = useState(false)
    
    const navigate = useNavigate()
    
    const location = useLocation()
    
    let note = location.state.note
    let folder = location.state.folder

    const [editPrefs, setEditPrefs] = useState({
        name: `${note.name}`,
        description: `${note.description}`,
    })

    const back = async() => {
        try { 
            const response = await httpClient.get(`http://localhost:5000/users/${note.creator}`)
            if (response.status === 200) {
                console.log(response.data.message)
                navigate(`/dashboard/folder/${folder._id['$oid']}`, {state: { note: note, folder: folder, user: response.data.user }})
            }
        } catch (error){
            if (error.response.status === 401) {
                console.error(error)
                throw "An error occured whilst trying to get user"
            }
        }
        
    }

    const getProfile = async () => {
        try { 
            const response = await httpClient.get(`http://localhost:5000/users/${note.creator}`)
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

    let editName = (
        <input
            type="text"
            defaultValue={note.name}
            onChange={e => setEditPrefs({...editPrefs, name: e.target.value})}
            id="editUserName"
            name="editUserName"
            placeholder="Username"
        >
        </input>
    )

    let editDescription = (
        <input
            type="text"
            defaultValue={note.description}
            onChange={e => setEditPrefs({...editPrefs, description: e.target.value})}
            id="editUserName"
            name="editUserName"
            placeholder="Username"
        >
        </input>
    )

    const confirmEdit = async() => {
        try {
            const response = await httpClient.put(`http://localhost:5000/note/${note._id['$oid']}`, editPrefs)
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

    const deleteNote = async () => {
        try {
            const response = await httpClient.delete(`http://localhost:5000/note/${note._id['$oid']}`)
            if (response.status === 200) {
              console.log(response.data.message)
              back()
            } 
          } catch (error) {
            if (error.response.status === 401) {
              console.error(error)
              throw "Could not delete this account"
            }  
            
          }
    }


    const htmlObject = document.createElement('div')
    htmlObject.innerHTML = note.content

    const editContent = () => {
        setEditingContent(true)
    }
    
    const cancelEditingContent = () => {
        setEditingContent(false)
    }

    const editNote = () => {
        setEditMode(true)
    }

    const cancelEdit = () => {
        setEditMode(false)
    }

    let confirmButton;
    let editButton;
    let deleteButton;
    let editContentButton;

    if (currentUser?.username === note.creator){
        editButton = <button onClick={editNote}>Edit</button>
        deleteButton = <button onClick={deleteNote}>Delete</button>
        editContentButton = <button onClick={editContent}>Start Editing</button>
        confirmButton = <button onClick={confirmEdit}>Confirm</button>
    }

    return (
        <div className="container">
            <NavBar />
            <div className="backbutton">
                <button onClick={back}><FontAwesomeIcon icon="fa-solid fa-arrow-left" />  Back</button>
            </div>
            <div className="noteviewcontainer">
                {editMode ? editName : <h1>{note.name}</h1>}
                <h4>{folder.name}</h4>
                <h2 onClick={getProfile}>{note.creator}</h2>
                {editMode ? editDescription : <h4>{note.description}</h4>}
                {editMode ? <button onClick={confirmEdit}>Confirm</button> : <p></p>}
                {editMode ? <button onClick={cancelEdit}>Cancel</button> : editButton}
                {deleteButton}
                <hr/>
                {editingContent ? <TextEditor note={note}/> : <br/>}
                <div className="editcontentsectionwarning">
                    {editingContent? <button onClick={cancelEditingContent}>Cancel</button> : editContentButton}
                    {note.content === undefined ? <p>Nothing has been jotted down yet...</p>: <div dangerouslySetInnerHTML={{__html: note.content}}></div>}
                </div>
            </div>
        </div>
    )
}

export default NoteView