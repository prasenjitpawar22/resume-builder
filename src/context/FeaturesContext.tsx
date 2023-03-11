import React, {
  createContext, ReactNode, useEffect, useState,
  useContext
} from 'react'
import { toast } from 'react-toastify'

import { featureClient } from '../api/axiosClient'
import {
  FeatureEduDataRequest, FeatureExpDataRequest,
  FeatureHeaderDataRequest
} from '../api/FeaturesApi'
import { IEducation, IExperience, IHeader, ISkill } from '../types'
import { UserContext } from './UserContext'

interface FeatureContext {
  featureHeaderData: IHeader[]
  setFeatureHeaderData: React.Dispatch<React.SetStateAction<IHeader[]>>
  featureEduData: IEducation[]
  setFeatureSkillData: React.Dispatch<React.SetStateAction<ISkill[]>>
  featureExpData: IExperience[]
  setFeatureExpData: React.Dispatch<React.SetStateAction<IExperience[]>>
  featureSkillData: ISkill[]
  setFeatureEduData: React.Dispatch<React.SetStateAction<IEducation[]>>
}

export const FeatureContext = createContext<Partial<FeatureContext>>({})

type FeatureProviderProps = {
  children: ReactNode
}

const FeatureProvider = ({ children }: FeatureProviderProps) => {
  const { user, userLoader } = useContext(UserContext)
  const [featureHeaderData, setFeatureHeaderData] = useState<IHeader[]>([])
  const [featureEduData, setFeatureEduData] = useState<IEducation[]>([])
  const [featureSkillData, setFeatureSkillData] = useState<ISkill[]>(
    [{ data: undefined, id: undefined }]
  )
  const [featureExpData, setFeatureExpData] = useState<IExperience[]>(
    [{ company: undefined, current: undefined, description: undefined, end: undefined, id: undefined, position: undefined, start: undefined }]
  )

  useEffect(() => {
    // header 
    const getFeatureHeaderData = async (token: string) => {
      const response = await FeatureHeaderDataRequest(token)
      
      if (response.data) {
        setFeatureHeaderData(response.data)
      }
      //handle error 
      else {
        toast.warning('unable to get features header data')
      }
    }

    // education
    const getFeatureEducationData = async (token: string) => {
      const response = await FeatureEduDataRequest(token)
      
      if (response.status === 200 && response.data) {
        console.log(response.data);
        setFeatureEduData(response.data)
      }
      //handle error
      else {
        toast.warning('unable to get features education data')
      }
    }

    //experience
    const getFeatureExpData = async (token: string) => {

      const response = await FeatureExpDataRequest(token)

      if (response.status === 200 && response.data) {
        setFeatureExpData(response.data)
      }
      else {
        // toast.warning(response?.error?.toString())
      }
    }

    //
    if (user?.logedIn) {
      const token = localStorage.getItem('token')
      if (token) {
        getFeatureExpData(token)
        getFeatureEducationData(token)
        getFeatureHeaderData(token)
      }
      else {
        toast.warning('not logged in')
      }
    }
  }, [])

  // useEffect(() => {
  //   // console.log("this is feature header data", featureHeaderData);
  //   // console.log("this is featureExpData data", featureExpData);
  // }, [featureHeaderData, featureExpData])


  return (
    <FeatureContext.Provider value={{
      featureEduData, featureExpData, featureHeaderData, featureSkillData,
      setFeatureEduData, setFeatureExpData, setFeatureHeaderData, setFeatureSkillData
    }}>
      {children}
    </FeatureContext.Provider>
  )
}

export default FeatureProvider