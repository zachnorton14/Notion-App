import NavBar from "./NavBar"
import { Link } from 'react-router-dom'

function Dashboard() {

    return (
        <div>
            <NavBar/>
            <h1>dashboard</h1>
            <Link to="/login"><button>Login</button></Link>
        </div>
    )
}

export default Dashboard