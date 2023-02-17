import React, { createContext, Dispatch, MutableRefObject, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react'
import { resumeClient } from '../api/axiosClient'
import { Education, Experience, Header, Skill } from '../types'

export interface ResumeContextInterface {
    printRef: MutableRefObject<HTMLElement | undefined>
    resumeBlockHolderWidth: number
    setResumeBlockHolderWidth: Dispatch<SetStateAction<number>>
    setResumeHeaderData: React.Dispatch<React.SetStateAction<Header[] | undefined>>
    resumeHeaderData: Header[] | undefined
    resumeExpData: Experience[]
    setResumeExpData: React.Dispatch<React.SetStateAction<Experience[]>>
    resumeColor: string
    setResumeColor: React.Dispatch<React.SetStateAction<string>>
    resumeEduData: Education[]
    setResumeEduData: React.Dispatch<React.SetStateAction<Education[]>>
    resumeSkillData: Skill[] | undefined
    setResumeSkillData: React.Dispatch<React.SetStateAction<Skill[] | undefined>>

}

export const ResumeContext = createContext<Partial<ResumeContextInterface>>({})

type ResumeProviderProps = {
    children: ReactNode
}

const ResumeProvider = ({ children }: ResumeProviderProps) => {
    const printRef = useRef<HTMLElement>();
    const [resumeBlockHolderWidth, setResumeBlockHolderWidth] = useState<number>(550)
    const [resumeHeaderData, setResumeHeaderData] = useState<Header[] | undefined>([])
    const [resumeExpData, setResumeExpData] = useState<Experience[]>([])
    const [resumeColor, setResumeColor] = useState<string>('#E7E9EC');
    const [resumeEduData, setResumeEduData] = useState<Education[]>([])
    const [resumeSkillData, setResumeSkillData] = useState<Skill[] | undefined>([])


    useEffect(() => {
        const getResumeData = async () => {
            resumeClient.get("get-resume-header")
                .then((res) => {
                    console.log(res?.data)
                    setResumeHeaderData(res?.data)
                })
                .catch((e) => console.log(e))
        }
        getResumeData()
    }, [])

    return (
        <ResumeContext.Provider value={{
            printRef, resumeBlockHolderWidth,
            setResumeBlockHolderWidth,
            resumeHeaderData, setResumeHeaderData,
            resumeExpData, setResumeExpData,
            resumeColor, setResumeColor,
            resumeSkillData, setResumeSkillData,
            resumeEduData, setResumeEduData
        }}>
            {children}
        </ResumeContext.Provider>
    )
}

export default ResumeProvider