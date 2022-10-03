import { Link } from 'react-router-dom'
 
function Home() {

    return (
        <div>
            <h1>home</h1>
            <Link to="/dashboard"><button>Dashboard</button></Link>
            <Link to="/login"><button>Log in</button></Link>
            <Link to="/signup"><button>Sign up</button></Link>
        </div>
    )
}

export default Home