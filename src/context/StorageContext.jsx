import { createContext, useEffect } from "react";
import localData from "../data/data.json"

export const StorageContext = createContext()


export const StorageProvider = ({ children }) => {
    useEffect(() => {
        localStorage.setItem("productRequests", JSON.stringify(localData.productRequests))
        localStorage.setItem("currentUser", JSON.stringify(localData.currentUser))
    }, [])
    return (
        <StorageContext.Provider value={{}}>
            {children}
        </StorageContext.Provider>
    )
}
