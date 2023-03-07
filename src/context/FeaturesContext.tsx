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
import { Education, Experience, Header, Skill } from '../types'
import { UserContext } from './UserContext'

interface FeatureContext {
  featureHeaderData: Header[] | undefined
  setFeatureHeaderData: React.Dispatch<React.SetStateAction<Header[] | undefined>>
  featureEduData: Education[] | undefined
  setFeatureSkillData: React.Dispatch<React.SetStateAction<Skill[] | undefined>>
  featureExpData: Experience[] | undefined
  setFeatureExpData: React.Dispatch<React.SetStateAction<Experience[] | undefined>>
  featureSkillData: Skill[] | undefined
  setFeatureEduData: React.Dispatch<React.SetStateAction<Education[] | undefined>>
}

export const FeatureContext = createContext<Partial<FeatureContext>>({})

type FeatureProviderProps = {
  children: ReactNode
}

const FeatureProvider = ({ children }: FeatureProviderProps) => {
  const { user, userLoader} = useContext(UserContext)
  const [featureHeaderData, setFeatureHeaderData] = useState<Header[]>()
  const [featureEduData, setFeatureEduData] = useState<Education[]>()
  const [featureSkillData, setFeatureSkillData] = useState<Skill[]>()
  const [featureExpData, setFeatureExpData] = useState<Experience[]>()

  useEffect(() => {
    // header 
    const getFeatureHeaderData = async (token:string) => {
      const response = await FeatureHeaderDataRequest(token)
      console.log(response);
      if (response.data) {
        
        setFeatureHeaderData(response.data)
      }
      //handle error 
      else {
        toast.warning('unable to get features header data')
      }
    }

    // education
    const getFeatureEducationData = async (token:string) => {
      const response = await FeatureEduDataRequest(token)

      if (response.status === 200) {
        setFeatureEduData(response?.data)
      }
      //handle error
      else {
        toast.warning('unable to get features education data')
      }
    }

    //experience
    const getFeatureExpData = async (token:string) => {
      
      const response = await FeatureExpDataRequest(token)
      console.log("this ", response);
      
      if (response.status === 200) {
        setFeatureExpData(response.data)
      }
      else {
        toast.warning(response?.error?.toString())
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