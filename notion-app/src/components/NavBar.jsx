
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CurrentUser } from '../contexts/CurrentUser'
import httpClient from '../httpClient'

function NavBar() {

    const { currentUser } = useContext(CurrentUser)

    const navigate = useNavigate()
    
    const logout = async () => {
        sessionStorage.removeItem("user");
        window.location.reload()
    }

    let loginActions;

    if (currentUser) {
        const redirect = () => {
            navigate(`/profile/${currentUser._id['$oid']}`, {state: { user: currentUser }})
        }
        loginActions = (
            <div className="navbarbuttonscontainer">
                <div className="navprofilebuttons" onClick={redirect}>
                    <img className="pnavrofilepicture" src={currentUser?.profile_picture} style={{width: '30px', height: '30px'}}></img>
                    <p style={{ margin: 0 }}>{currentUser.username}</p>
                </div>
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