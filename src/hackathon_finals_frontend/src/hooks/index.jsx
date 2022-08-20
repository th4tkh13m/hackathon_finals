import { createContext, useState, useEffect, useLayoutEffect } from 'react'
import { checkRole } from '../Utils/CheckRole'
import { useConnect } from '@connect2ic/react'

export const Context = createContext()

const Provider = props => {
  const { principal, isConnected } = useConnect()
  const [role, setRole] = useState(null)

  useEffect(() => {
<<<<<<< HEAD
    const TEST_ID = 1
=======
    const TEST_ID = 2
>>>>>>> 951b7eebe749d691a2710fedd0cff2d6d01ee171
    let role = checkRole(TEST_ID)
    setRole(role)
  }, [principal])

  const logout = () => {
    console.log('logout')
    setRole(null)
  }

  const value = {
    role,
    logout,
    setRole,
  }

  return <Context.Provider value={value}>{props.children}</Context.Provider>
}

export const withContext = Component => {
  return props => {
    return (
      <Context.Consumer>
        {globalState => {
          return <Component {...globalState} {...props} />
        }}
      </Context.Consumer>
    )
  }
}

export default Provider
