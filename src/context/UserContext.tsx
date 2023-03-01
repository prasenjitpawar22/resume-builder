import React, { ReactNode, createContext, useState, Dispatch, SetStateAction, useEffect } from "react";
import {LoginRequest} from '../api/UserApi'
interface UserContextInterface {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}

export const UserContext = createContext<Partial<UserContextInterface>>({})

type UserProviderProps = {
  children: ReactNode
}

type User = {
  username: string | undefined
  _id: string | undefined
  email: string | undefined
}


export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>({ _id: '', email: '', username: '' })

  useEffect(() => {
    const requestUser = async() => {
      // const res = await LoginRequest()
    }

  }, [])


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}