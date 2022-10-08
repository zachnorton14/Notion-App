import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CurrentUser } from '../contexts/CurrentUser'
import NavBar from './NavBar'

function Home() {

    const { currentUser } = useContext(CurrentUser)

    return (
        <main className="homecontainer">
            <NavBar />
            <div className="homesplash">
                <div className="hometitlecontainer">
                    <h1>iArchive</h1>
                    <h3>The world's filing cabinet. Store, share, save.</h3>
                </div>
                <div className="enterbuttoncontainer">
                    <Link to="/dashboard"><button>Enter</button></Link>
                    <p>Go to you dashboard and explore the endless possibilities of public note-taking</p>
                </div>
            </div>
            <section className="aboutsection">
                <h2>About</h2>
                <p>This project started as a place where I could share all of my school notes over the span of this last year. But, because that's boring, I thought it would be better as a notetaking app. I would just have my notes as a showcase of what's possible on this platform instead. And, as this app is basically one big globally accessible filing cabinet, I named it iArchive.</p>
                <p>You can find the link to the github repository of this app <a href="https://github.com/zachnorton14/Notion-App/tree/master">here</a></p>
            </section>
            
        </main>
    )
}

export default Home