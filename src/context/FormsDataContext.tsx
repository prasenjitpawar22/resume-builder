import React, { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formClient } from "../api/axiosClient";
import { Certification, Contact, Education, Experience, Skills, Summary } from "../types";


interface FormDataContext {
    skills: Skills[]
    setSkills: React.Dispatch<React.SetStateAction<Skills[]>>

    experience: Experience[]
    setExperience: React.Dispatch<React.SetStateAction<Experience[]>>

    education: Education[]
    setEducation: React.Dispatch<React.SetStateAction<Education[]>>

    certification: Certification[]
    setCertification: React.Dispatch<React.SetStateAction<Certification[]>>

    contact: Contact[]
    setContact: React.Dispatch<React.SetStateAction<Contact[]>>

    summary: Summary[]
    setSummary: React.Dispatch<React.SetStateAction<Summary[]>>

}

export const FormsDataContext = createContext<Partial<FormDataContext>>({})

type FormsDataProviderProps = {
    children: ReactNode
}

const FormsDataProvider = ({ children }: FormsDataProviderProps) => {
    const [skills, setSkills] = useState<Skills[]>([])
    const [experience, setExperience] = useState<Experience[]>([])
    const [education, setEducation] = useState<Education[]>([])
    const [summary, setSummary] = useState<Summary[]>([])
    const [certification, setCertification] = useState<Certification[]>([])
    const [contact, setContact] = useState<Contact[]>([])


    const getAllSkills = async (token: string) => {
        await formClient.get('get-all-skills', { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {
                console.log(response);
                setSkills(response.data)
                toast.success('got all skills ')
            })
            .catch(() => {
                toast.warn('error getting skills')
            })
    }

    useEffect(() => console.log(skills), [skills])


    useEffect(() => {
        console.log('inn provider');
        (async () => {
            const token = localStorage.getItem('token')
            if (!token) toast.warn('Token not found')
            else {
                await getAllSkills(token)
            }
        })()
    }, [])


    return <FormsDataContext.Provider value={{
        skills, setSkills, experience, setExperience, education, setEducation,
        summary, setSummary, certification, setCertification, contact, setContact
    }}>
        {children}
    </FormsDataContext.Provider>
}

export default FormsDataProvider