import React from 'react'
import { createContext,useState } from 'react'
export const responseContext = createContext()


function ContextProvid({children}) {
    const [response, setResponse] = useState("")

  return (
    <>
    <responseContext.Provider value={{response,setResponse}}>
             {children}
          </responseContext.Provider>
    </>
  )
}

export default ContextProvid




