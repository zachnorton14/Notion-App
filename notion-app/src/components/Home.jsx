import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CurrentUser } from '../contexts/CurrentUser'
import NavBar from './NavBar'

function Home() {

    const { currentUser } = useContext(CurrentUser)

    return (
        <main>
            <NavBar />
            <h1>iArchive</h1>
            
            <Link to="/dashboard"><button>Enter</button></Link>
            <section>
                <h2>About</h2>

            </section>
            
        </main>
    )
}

export default Home