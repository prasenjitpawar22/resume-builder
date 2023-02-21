import React, { createContext, Dispatch, MutableRefObject, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { resumeClient } from '../api/axiosClient'
import { ResumeEduDataRequest, ResumeExpDataRequest } from '../api/ResumeApi'
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
        //set header 
        const getResumeHeaderData = async () => {
            resumeClient.get("get-resume-header")
                .then((res) => {
                    console.log(res?.data)
                    setResumeHeaderData(res?.data)
                })
                .catch((e) => console.log(e))
        }

        //set edu 
        const getResumeEduData =async () => {
            const resumeEduDataRequest = await ResumeEduDataRequest()
            if(resumeEduDataRequest.status === 200 && resumeEduDataRequest.data){
                setResumeEduData(resumeEduDataRequest.data)
            }
            else{
                toast.warning("failed loading resume education data")
            }
        }

        // set exp
        const getResumeExpData =async () => {
            const resumeExpDataRequest = await ResumeExpDataRequest()
            if(resumeExpDataRequest.status === 200 && resumeExpDataRequest.data){
                setResumeExpData(resumeExpDataRequest.data)
            }
            else{
                toast.warning("failed loading resume experience data")
            }
        }
        
        getResumeExpData()
        getResumeEduData()
        getResumeHeaderData()
    }, [])

    // debug 
    useEffect(()=> {
        // console.log('this is all resume data', resumeHeaderData, resumeEduData);
        console.log('this is all resume exp', resumeExpData);
    },[resumeEduData, resumeHeaderData, resumeExpData])

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