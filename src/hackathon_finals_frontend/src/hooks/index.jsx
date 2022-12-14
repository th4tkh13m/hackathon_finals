import { createContext, useState, useEffect, useLayoutEffect } from 'react'
import { checkRole } from '../Utils/CheckRole'
import { useConnect } from '@connect2ic/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { final_be } from '../../.././declarations/final_be'
import { Principal } from '@dfinity/principal'
import { final_be } from '../../../declarations/final_be'
import { Principal } from '@dfinity/principal'
import axios from 'axios'

export const Context = createContext()

const Provider = ({ children }) => {
  let location = useLocation()
  const { principal, isConnected, connect, isConnecting } = useConnect()
  const [principalStorage, setPrincipalStorage] = useState(
    localStorage.getItem('prinp')
  )
  const [role, setRole] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [balanceDIP20, setBalanceDIP20] = useState('0 DBZ')
  const navigate = useNavigate()

  useEffect(() => {
    if (principal) {
      getRoleUser()
      getBalanceDIP20(principal)
    }
    console.log('principal: ' + principal)
    console.log('role: ' + role)
    if (role && principal) {
      setIsLoaded(true)
    }
  }, [principal, role])

  const getBalanceDIP20 = async principal => {
    const res = await final_be.balanceOfDIP20(Principal.fromText(principal))
    setBalanceDIP20(`${Number(res).toString()} DBZ`)
  }
  const connectWallet = () => {
    // window.ic.plug.requestConnect()
    connect('plug')
  }

  const getRoleUser = async () => {
    const res = await final_be.getRole(Principal.fromText(principal))
    setRole(Object.keys(res)[0].toLowerCase())
  }

  const login = () => {
    try {
      localStorage.setItem('prinp', principal)
      setPrincipalStorage(principal)
      console.log('Connected to Plug')
      navigate(`${location.pathname}`, {
        replace: true,
      })
    } catch (e) {
      console.log(e)
    }
  }
  const logout = () => {
    localStorage.clear()
    setPrincipalStorage(null)
    setRole('user')
    navigate('/', {
      replace: true,
    })
    console.log('logout')
  }

  const value = {
    role,
    logout,
    setRole,
    isLoaded,
    login,
    balanceDIP20,
    setIsLoaded,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
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
