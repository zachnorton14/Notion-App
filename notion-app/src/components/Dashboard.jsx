import NavBar from "./NavBar"
import { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CurrentUser } from '../contexts/CurrentUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import httpClient from "../httpClient"

function Dashboard() {

    const { currentUser } = useContext(CurrentUser)

    const [ personalPublishedFolders, setPersonalPublishedFolders ] = useState([])
    const [ personalDraftFolders, setPersonalDraftFolders ] = useState([])
    const [ allPublicFolders, setAllPublicFolders ] = useState([])

    const navigate = useNavigate()

    let noDraftFolders = <p>You don't have any folders yet. Click the plus to create one.</p>
    let noPublishedFolders = <p>You haven't published any folders yet. To do so, view the draft folder you would like to publish.</p>
    let noPublicFolders = <p>Hmmm... it appears there's no folders to display here.</p>

    let dynamicHeader = (
        <div>
            <h1>Your dashboard</h1>
            <section>You are not currently logged in.</section>
            <a href="/login"><button>Log in</button></a>
            <a href="/signup"><button>Sign up</button></a>
            <p>In order to view or create your personal folders and notes you must be logged in. You can still view publicly published folders below.</p>
        </div>
    )

    let dynamicDash = (
        <div>
            <h2>Personal Folders</h2>
            <p>Log in to create your own folders and notes.</p>
        </div>
    )

    const publicFolders = allPublicFolders.map((item, index) => {
        const redirect = async () => {
            try { 
                const response = await httpClient.get(`http://localhost:5000/users/${item.creator}`)
                if (response.status === 200) {
                    console.log(response.data.message)
                    navigate(`/dashboard/folder/${item._id['$oid']}`, {state: { folder: item, user: response.data.user }})
                }
            } catch (error){
                if (error.response.status === 401) {
                    console.error(error)
                    throw "An error occured whilst trying to get user"
                }
            }
            navigate(`/dashboard/folder/${item._id['$oid']}`, {state: { folder: item, user: currentUser }})
        }
            return (
                <div className={`publicfolder${index + 1}`} key={index}>
                    <FontAwesomeIcon icon="fa-solid fa-folder" />
                    <button onClick={redirect}><h4>{item.name}</h4></button>
                </div>
            )
        })

    const draftFolders = personalDraftFolders.map((item, index) => {
            const redirect = () => {
                navigate(`/dashboard/folder/${item._id['$oid']}`, {state: { folder: item, user: currentUser }})
            }
                return (
                    <div className={`draftfolder${index + 1}`} key={index}>
                        <FontAwesomeIcon icon="fa-solid fa-folder" />
                        <button onClick={redirect}><h4>{item.name}</h4></button>
                    </div>
                )
            })


    const publishedFolders = personalPublishedFolders.map((item, index) => {
        const redirect = () => {
            navigate(`/dashboard/folder/${item._id['$oid']}`, {state: { folder: item, user: currentUser }})
        }
            return (
                <div className={`publishedfolder${index + 1}`} key={index}>
                    <FontAwesomeIcon icon="fa-solid fa-folder" />
                    <button onClick={redirect}>{item.name}</button>
                </div>
            )
        })


    const createFolder = async () => {
        try {
            const response = await httpClient.post("//localhost:5000/folder", currentUser)
            if (response.status === 200) {
                console.log(response.data)
                navigate(`/dashboard/folder/${response.data.folder._id['$oid']}`, {state: { folder: response.data.folder, user: currentUser }})
            }
        } catch (error){
            if (error.response.status === 401) {
                console.error(error)
                throw "An error occured whilst trying to create new note"
            }
        }
    }

    useEffect(() => {
        const getPublicFolders = async () => {
            try {
                const response = await httpClient.get("//localhost:5000/folders/public")
                if (response.status === 200) {
                    console.log(response.data.message)
                    setAllPublicFolders(response.data.folders)
                } else {
                    console.log('no folders found')
                }
            } catch (error) {
                if (error.response.status === 401) {
                    console.error(error)
                    throw "Could not get public folders"
                } else { console.log(error) }
                
            }
        }
        getPublicFolders()
    }, [])

    useEffect(() => {
        const getUsersFolders = async () => {
            try {
                const response = await httpClient.get("//localhost:5000/folder")
                if (response.status === 200) {
                    console.log(response.data.message)
                    setPersonalPublishedFolders(response.data.folders.filter(element => element.is_published))
                    setPersonalDraftFolders(response.data.folders.filter(element => element.is_published === false))
                } else {
                    console.log('no folders found')
                }
            } catch (error) {
                if (error.response.status === 401) {
                    console.error(error)
                    throw "Could not get user's folder's"
                } else { console.log(error) }
                
            }
        }
        getUsersFolders()
    }, [])
    if (currentUser !== null){

        dynamicHeader = (
            <h1>{currentUser.username}'s dashboard</h1>
        )
        dynamicDash = (
            <div>
                <h2>Personal Folders</h2>
                <p>These are the folders you have created. Click the plus button to create a new folder.</p>
                    <h3>Draft folders</h3>
                        <p>These are your draft folders. They have not been published yet. View one to publish it.</p>
                        {personalDraftFolders.length === 0 ? noDraftFolders : draftFolders}
                        <div onClick={createFolder}><FontAwesomeIcon icon="fa-solid fa-plus"/>Create a new folder</div>
                    <h3>Published folders</h3>
                        {personalPublishedFolders.length === 0 ? noPublishedFolders : publishedFolders}
            </div>
        )
    }

    return (
        <div>
            <NavBar/>
            <a href="/"><button><FontAwesomeIcon icon="fa-solid fa-arrow-left"/>  Back</button></a>
            <main>
                {dynamicHeader}
                {dynamicDash}
                <div className="publicfolderscontainer">
                    <h2>Public Folders</h2>
                    <p>View published folders and notes created by users on iArchive</p>
                    {publicFolders.length === 0 ? noPublicFolders : publicFolders}
                </div>
            </main>
        </div>
    )
}

export default Dashboard