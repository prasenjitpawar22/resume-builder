import React, { createContext, Dispatch, MutableRefObject, ReactNode, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { resumeClient } from '../api/axiosClient'
import { ResumeEduDataRequest, ResumeExpDataRequest, ResumeHeaderDataRequest } from '../api/ResumeApi'
import { IEducation, IExperience, IHeader, IResumeHeader, ISkill } from '../types'
import { UserContext } from './UserContext'

export interface ResumeContextInterface {
    printRef: MutableRefObject<HTMLElement | undefined>
    resumeBlockHolderWidth: number
    setResumeBlockHolderWidth: Dispatch<SetStateAction<number>>
    setResumeHeaderData: React.Dispatch<React.SetStateAction<IResumeHeader[]>>
    resumeHeaderData: IResumeHeader[]
    resumeExpData: IExperience[]
    setResumeExpData: React.Dispatch<React.SetStateAction<IExperience[]>>
    resumeColor: string
    setResumeColor: React.Dispatch<React.SetStateAction<string>>
    resumeEduData: IEducation[]
    setResumeEduData: React.Dispatch<React.SetStateAction<IEducation[]>>
    resumeSkillData: ISkill[]
    setResumeSkillData: React.Dispatch<React.SetStateAction<ISkill[]>>

}

export const ResumeContext = createContext<Partial<ResumeContextInterface>>({})

type ResumeProviderProps = {
    children: ReactNode
}

const ResumeProvider = ({ children }: ResumeProviderProps) => {
    const { user } = useContext(UserContext)
    const printRef = useRef<HTMLElement>();
    const [resumeBlockHolderWidth, setResumeBlockHolderWidth] = useState<number>(550)
    const [resumeColor, setResumeColor] = useState<string>('#E7E9EC');
    const [resumeHeaderData, setResumeHeaderData] = useState<IResumeHeader[]>([])
    const [resumeEduData, setResumeEduData] = useState<IEducation[]>(
        [{ current: false, end: '', id: '', location: '', start: '', university: '' }]
    )
    const [resumeSkillData, setResumeSkillData] = useState<ISkill[]>(
        [{ data: [''], id: '' }]
    )
    const [resumeExpData, setResumeExpData] = useState<IExperience[]>(
        [{ company: '', current: false, description: [''], end: '', id: '', position: '', start: '' }]
    )

    useEffect(() => {
        console.log(resumeHeaderData);

    }, [resumeHeaderData])

    useEffect(() => {
        //set header 
        const getResumeHeaderData = async (token: string) => {
            const resumeHeaderDataRequest = await ResumeHeaderDataRequest(token)
            if (resumeHeaderDataRequest.status === 200 && resumeHeaderDataRequest.data) {
                setResumeHeaderData(resumeHeaderDataRequest.data)
                console.log(resumeHeaderDataRequest);
            }
            else {
                toast.warning('failed to load resume header data')
            }
        }

        //set edu 
        const getResumeEduData = async (token: string) => {
            const resumeEduDataRequest = await ResumeEduDataRequest(token)
            if (resumeEduDataRequest.status === 200 && resumeEduDataRequest.data) {
                setResumeEduData(resumeEduDataRequest.data)
            }
            else {
                // toast.warning("failed loading resume education data")
            }
        }

        // set exp
        const getResumeExpData = async (token: string) => {
            const resumeExpDataRequest = await ResumeExpDataRequest(token)
            if (resumeExpDataRequest.status === 200 && resumeExpDataRequest.data) {
                setResumeExpData(resumeExpDataRequest.data)
            }
            else {
                // toast.warning("failed loading resume experience data")
            }
        }

        if (user?.logedIn) {
            const token = localStorage.getItem('token')
            if (token) {
                getResumeExpData(token)
                getResumeEduData(token)
                getResumeHeaderData(token)
            }
            else {
                // toast.warn('unable to get token')

            }
        }
    }, [])

    // debug 
    useEffect(() => {
        // 
        // console.log('this is all resume data', resumeHeaderData, resumeEduData);

        // console.log('this is all resume exp', resumeExpData);
    }, [resumeEduData, resumeHeaderData, resumeExpData])

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