import { createContext, useState, useEffect } from "react";

export const CurrentUser = createContext()

function CurrentUserProvider({ children }){

    const [currentUser, setCurrentUser] = useState(null)

    // useEffect(() => {
    //     const getLoggedInUser = async () => {
    //         let response = await fetch(`http://localhost:5000/@me`)
    //         let user = await response.json()
    //         console.log(user)
    //         if (user.status === 200){
    //             setCurrentUser(user)
    //         } else {
    //             console.log('Could not find current user')
    //         }
    //     }
    //     getLoggedInUser()
    // }, [])

    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    )
}

export default CurrentUserProvider