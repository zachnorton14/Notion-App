import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CurrentUser } from '../contexts/CurrentUser'

function NavBar() {

    const { currentUser } = useContext(CurrentUser)
    
    let loginActions = (
        <>
            <li style={{ float: 'right' }}>
                <Link to="/login"><button>Log in</button></Link>
            </li>
            <li style={{ float: 'right' }}>
                <Link to="/signup"><button>Sign up</button></Link>
            </li>
        </>
    )

    if (currentUser) {
        loginActions = (
            <li style={{ float: 'right' }}>
                Logged in as {currentUser.firstName} {currentUser.lastName}
            </li>
        )
    }

    return (
        <nav>
            <h1>NavBar</h1>
            <ul>
                {loginActions}
            </ul>
        </nav>
    )
}

export default NavBar