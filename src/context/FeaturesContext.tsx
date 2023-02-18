import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { featureClient } from '../api/axiosClient'
import { FeatureHeaderDataRequest } from '../api/FeaturesApi'
import { Education, Experience, Header, Skill } from '../types'

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
  const [featureHeaderData, setFeatureHeaderData] = useState<Header[]>()
  const [featureEduData, setFeatureEduData] = useState<Education[]>()
  const [featureSkillData, setFeatureSkillData] = useState<Skill[]>()
  const [featureExpData, setFeatureExpData] = useState<Experience[]>()

  useEffect(() => {
    const getFeatureHeaderData = async () => {
      const response = await FeatureHeaderDataRequest()
      if (response.data) {
        setFeatureHeaderData(response.data)
      }
      //handle error 
    }
    getFeatureHeaderData()
  }, [])

  useEffect(() => {
    console.log("this is feature header data", featureHeaderData);
  }, [featureHeaderData])


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