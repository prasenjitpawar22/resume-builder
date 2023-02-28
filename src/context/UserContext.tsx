import React, { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react";

interface UserContextInterface {
    user: User | undefined
    setUser: Dispatch<SetStateAction<User | undefined>>
}

export const UserContext = createContext<Partial<UserContextInterface>>({})

type UserProviderProps = {
    children: ReactNode
}

type User = {
    username: string
    password: string
}


export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User>()

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}