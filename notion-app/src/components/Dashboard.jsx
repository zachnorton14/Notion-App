import NavBar from "./NavBar"
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CurrentUser } from '../contexts/CurrentUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import httpClient from "../httpClient"

function Dashboard() {

    const { currentUser } = useContext(CurrentUser)

    const [ personalPublishedFolders, setPersonalPublishedFolders ] = useState([])

    const [ personalDraftFolders, setPersonalDraftFolders ] = useState([])

    const navigate = useNavigate()

    let noDraftFolders = (
        <div>
            <p>You don't have any folders yet. Click the plus to create one.</p>
        </div>
    )

    let noPublishedFolders = (
        <div>
            <p>You haven't published any folders yet. To do so, view the draft folder you would like to publish.</p>
        </div>
    )

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

    const draftFolders = () => {
            personalDraftFolders.map((item, index) => {
                console.log('test')
                return (
                    <div className={`draftfolder${index + 1}`}>
                        {/* <h4 onClick={navigate(`/dashboard/${item.id}`)}>{item.name}</h4> */}
                        <ul>
                            {item.tags.forEach(element => <li>{element}</li>)}
                        </ul>
                    </div>
                )
            })
    }

    const publishedFolders = () => {
        personalPublishedFolders.map((item, index) => {
            return (
                <div className={`publishedfolder${index + 1}`}>
                    {/* <h4 onClick={navigate(`/dashboard/${item.id}`)}>{item.name}</h4> */}
                    <ul>
                        {item.tags.forEach(element => <li>{element}</li>)}
                    </ul>
                </div>
            )
        })
    }

    const createFolder = async () => {
        try {
            const response = await httpClient.post("//localhost:5000/folder", currentUser)
            if (response.status === 200) {
                console.log(response.data.message)
                navigate(`/dashboard/${response.data.id}`)
            }
        } catch (error){
            if (error.response.status === 401) {
                console.error(error)
                throw "An error occured whilst trying to log user out"
            }
        }
    }

    useEffect(() => {
        const getPersonalFolders = async () => {
            try {
                const response = await httpClient.get("//localhost:5000/folder")
                if (response.status === 200) {
                    console.log(response.data.message)
                    console.log(response.data.folders.filter(element => element.is_published === false))
                    setPersonalPublishedFolders(response.data.folders.filter(element => element.is_published))
                    setPersonalDraftFolders(response.data.folders.filter(element => element.is_published === false))
                } 
            } catch (error) {
                if (error.response.status === 401) {
                    console.error(error)
                    throw "Could not get user's personal folder's"
                }  
                
            }
        }
        getPersonalFolders()
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
                        {personalDraftFolders.length === 0 ? noDraftFolders : draftFolders()}
                        <div onClick={createFolder}><FontAwesomeIcon icon="fa-solid fa-plus"/></div>
                    <h3>Published folders</h3>
                        {personalPublishedFolders.length === 0 ? noPublishedFolders : publishedFolders()}
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
                <div>
                    <h2>Public Folders</h2>
                    <p>View published folders and notes created by users on iArchive</p>
                </div>
            </main>
        </div>
    )
}

export default Dashboard