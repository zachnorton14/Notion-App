import { createContext, useState, useEffect} from "react";
import httpClient from "../httpClient";

export const CurrentUser = createContext()

function CurrentUserProvider({ children }){

    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const getLoggedInUser = async () => {
            try {
                const response = await httpClient.get(`//localhost:5000/@me`)
                if (response.status === 200){
                    setCurrentUser(response.data.user[0])
                } else {
                    throw "error"
                }
            } catch(error){
                
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