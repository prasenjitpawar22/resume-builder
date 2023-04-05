import React, { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formClient } from "../api/axiosClient";
import { getAllCertifications, getAllContacts, getAllEducations, getAllExperiences, getAllSkills } from "../api/FormsApi";
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

    contact: Contact
    setContact: React.Dispatch<React.SetStateAction<Contact>>

    summary: Summary
    setSummary: React.Dispatch<React.SetStateAction<Summary>>

}

export const FormsDataContext = createContext<Partial<FormDataContext>>({})

type FormsDataProviderProps = {
    children: ReactNode
}

const FormsDataProvider = ({ children }: FormsDataProviderProps) => {
    const [skills, setSkills] = useState<Skills[]>([])
    const [experience, setExperience] = useState<Experience[]>([])
    const [education, setEducation] = useState<Education[]>([])
    const [summary, setSummary] = useState<Summary>({ id: '', summary: '', show: true, userId: '' })
    const [certification, setCertification] = useState<Certification[]>([])
    const [contact, setContact] = useState<Contact>({
        city: '', state: '', country: '', email: '', fullname: '',
        id: '', linkedin: '', phone: '', show: true, userId: '', website: ''
    })


    const getSummary = async (token: string) => {
        await formClient.get('get-summary', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            if (response.data) {
                setSummary({ ...summary, summary: response.data.summary, id: response.data.id })
            }
        }).catch((e) => console.log(e))
    }

    const getContact = async (token: string) => {
        await formClient.get('get-all-contacts', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            if (response.data) {
                // console.log(response.data);
                let data: Contact = response.data[0]

                setContact({
                    ...contact,
                    city: data.city, country: data.country, email: data.email,
                    fullname: data.fullname, phone: data.phone,
                    id: data.id, linkedin: data.linkedin, show: data.show, state: data.state,
                    userId: data.userId, website: data.website
                })
            }
        }).catch((e) => console.log(e))
    }

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token')
            if (!token) toast.warn('Token not found')
            else {
                await getAllSkills(token, 'skills')
                    .then((skills) => setSkills(skills))
                    .catch((error) => toast.error(error))

                await getAllEducations(token, 'educations')
                    .then((educations) => setEducation(educations))
                    .catch((error) => toast.error(error))

                await getAllCertifications(token, 'certifications')
                    .then((certification) => setCertification(certification))
                    .catch((error) => toast.error(error))
                await getAllExperiences(token, 'experiences')
                    .then((experiences) => setExperience(experiences))
                    .catch((error) => toast.error(error))
                await getSummary(token)
                await getContact(token)
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