import { createContext, useState, useEffect} from "react";
import httpClient from "../httpClient";

export const CurrentUser = createContext()

function CurrentUserProvider({ children }){

    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const getLoggedInUser = async () => {
            const response = await httpClient.get(`//localhost:5000/@me`)
            try {
                if (response.status === 200){
                    setCurrentUser(response.data.user[0])
                }
            } catch (error) {
                if (error.response.status === 401) {
                    console.error(error)
                    throw "Couldn't find a current user"
                } else {
                    console.error(error)
                    throw "An unknown error occured"
                }
                
            }
        }
        getLoggedInUser()
    }, [])

    return (
            <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
                    {children}
            </CurrentUser.Provider>
        
    )
}

export default CurrentUserProvider