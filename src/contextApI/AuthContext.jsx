import React, { createContext, useEffect, useState } from 'react'

export const logContext = createContext()

function AuthContext({ children }) {
    const [logStatus, setLogStatus] = useState(false)
    useEffect(() => {
        changeAuthStatus()
    })

    const changeAuthStatus = () => {
        if (sessionStorage.getItem('token')) {
            setLogStatus(true)
        } else {
            setLogStatus(false)
        }
    }
    return (
        <>
            <logContext.Provider value={{ logStatus, setLogStatus }}>
                {children}
            </logContext.Provider>
        </>
    )
}

export default AuthContext
