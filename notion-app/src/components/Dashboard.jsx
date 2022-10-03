import NavBar from "./NavBar"
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CurrentUser } from '../contexts/CurrentUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import httpClient from "../httpClient"

function Dashboard() {

    const { currentUser } = useContext(CurrentUser)

    const navigate = useNavigate()

    // console.log(currentUser)

    const createFolder = async () => {
        try {
            const response = await httpClient.post("//localhost:5000/folder", currentUser)
            if (response.status === 200) {
                console.log(response)
                // console.log(response.data.message)
                // navigate(`dashboard/folderID`)
            }
        } catch (error){
            if (error.response.status === 401) {
                console.error(error)
                throw "An error occured whilst trying to log user out"
            }
        }
    }

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

    if (currentUser !== null){
        dynamicHeader = (
            <h1>{currentUser.username}'s dashboard</h1>
        )
        dynamicDash = (
            <div>
                <h2>Personal Folders</h2>
                <p>These are the folders you have created. Click the plus button to create a new folder.</p>
                    <h3>draft folders</h3>
                        <p>These are your draft folders. They have not been published yet. View one to publish it.</p>
                        <h4>new folder</h4>
                        <h4>new folder</h4>
                        <h4>new folder</h4>
                    <h3>published folders</h3>
                        <h4>my published folder</h4>
                        <h4>my published folder</h4>
                        <div onClick={createFolder}><FontAwesomeIcon icon="fa-solid fa-plus"/></div>
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