
import { useContext } from 'react'
import { CurrentUser } from '../contexts/CurrentUser'
import httpClient from '../httpClient'

function NavBar() {

    const { currentUser } = useContext(CurrentUser)
    
    const logout = async () => {
        try {
            let response = await httpClient.post('//localhost:5000/users/logout', currentUser)
            if (response.status === 200) {
                console.log(response.data.message)
                location.reload()
            }
        } catch (error){
            if (error.response.status === 401) {
                console.error(error)
                throw "An error occured whilst trying to log user out"
            }
        }
    }

    let loginActions;

    if (currentUser) {
        loginActions = (
            <div style={{ float: 'right', display: 'flex' }}>
                <h4 style={{ margin: 0 }}>Logged in as {currentUser.username}</h4>
                <a href="/profile"><button>Profile</button></a>
                <button onClick={logout}>Logout</button>
            </div>
        )
    }

    return (
        <nav>
            {loginActions}
        </nav>
    )
}

export default NavBar