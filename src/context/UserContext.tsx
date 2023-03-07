import React, {
  ReactNode, createContext, useState,
  Dispatch, SetStateAction, useEffect
} from "react";
import { SetUserContextRequest } from "../api/UserApi";
interface UserContextInterface {
  user: IUser
  setUser: Dispatch<SetStateAction<IUser>>
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

  useEffect(() => {
    const userRequest = async () => {
      const token = localStorage.getItem("token")
      
      if (token) {
        const response = await SetUserContextRequest(token)
        // console.log(response); 
        if (response.success){
          setUser({...user, 
            name: response.data.name, 
            logedIn: response.success,
            email: response.data.email
          })
        }
      }
    }
    userRequest()
  },[])

  // useEffect(() => { console.log('debug user,', user);
  //  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}