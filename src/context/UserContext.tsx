import React, {
  ReactNode, createContext, useState,
  Dispatch, SetStateAction, useEffect
} from "react";
import { SetUserContextRequest } from "../api/UserApi";

interface UserContextInterface {
  user: IUser
  setUser: Dispatch<SetStateAction<IUser>>
  userLoader: boolean
  setUserLoader: Dispatch<SetStateAction<boolean>>
}

export const UserContext = createContext<Partial<UserContextInterface>>({})

type UserProviderProps = {
  children: ReactNode
}

type IUser = {
  name: string | undefined
  email: string | undefined
  logedIn: boolean
}


export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IUser>({
    email: undefined, name: undefined, logedIn: false
  })
  // loader for user data
  const [userLoader, setUserLoader] = useState<boolean>(true)


  useEffect(() => {
    const userRequest = async () => {
      const token = localStorage.getItem("token")

      // token found
      if (token) {
        const response = await SetUserContextRequest(token)
        // console.log(response); 
        if (response.success) {
          setUser({
            ...user,
            name: response.data.name,
            logedIn: response.success,
            email: response.data.email
          })
          setUserLoader(false)
          return
        }
      }
      // else no token found
      setUserLoader(false)
    }
    userRequest()
  }, [])


  return (
    <UserContext.Provider value={{ user, setUser, userLoader, setUserLoader }}>
      {children}
    </UserContext.Provider>
  )
}