import React, { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'

import { FeatureExpDataRequest, FeatureExpDeleteRequest } from '../../api/FeaturesApi'
import { ResumeExpAddRequest, ResumeExpDataRequest } from '../../api/ResumeApi'
import { FeatureContext } from '../../context/FeaturesContext'
import { ResumeContext } from '../../context/ResumeContext'
import FeatureEmptyDataCardPlain from './FeatureEmptyDataCardPlain'

interface Props {
  expBlockState: boolean
}

const FeatureExpCardPlain: React.FC<Props> = (props: Props) => {
  const { expBlockState, } = props

  const { featureExpData, setFeatureExpData } = useContext(FeatureContext)
  const { setResumeExpData, resumeExpData } = useContext(ResumeContext)

  // add to resume
  const handleAddExp = async (id: string) => {
    // check if already in list
    const foundInList = resumeExpData?.find(data => data.id === id)
    if (!foundInList) {
      //get the data by filter list
      const expAddRequestToResume = featureExpData?.find((data) => data.id === id)
      if (!expAddRequestToResume) {
        return console.log('expAddRequest data not found');
      }
      else {
        const token = localStorage.getItem('token');
        if (token) {
          const createRespons = await ResumeExpAddRequest(expAddRequestToResume)
          if (createRespons.status === 200) {
            //call get all resume edu list
            const requestEduList = await ResumeExpDataRequest(token)
            if (requestEduList.status === 200) {
              setResumeExpData!(requestEduList.data!)
            }
            else {
              toast.warn("error updating resume exp list")
            }
          }
          //handle error
          else {
            console.log(createRespons.error);
            toast.warning("error add to resume")
          }
        }
      }
    }
    else {
      //notify already added to resume
      toast.warn('Already added to resume',)
    }
  }

  const handleDelete = async (id: string) => {

    const token = localStorage.getItem('token');
    if (token) {
      const deleteResponse = await FeatureExpDeleteRequest(id, token)

      if (deleteResponse.status === 200) {
        const allExp = await FeatureExpDataRequest(token)
        if (allExp.status === 200 && allExp.data) {
          setFeatureExpData!(allExp.data)
        }
      }
      if (deleteResponse.error) {
        console.log('delete request error', deleteResponse.error);
        toast.warning("error removing item")
      }
    }
  }

  return (
    <CardHolder expBlockState={expBlockState} className='overflow-y-scroll max-h' >
      {
        featureExpData === undefined || featureExpData.length === 0 ?
          <FeatureEmptyDataCardPlain text={'Empty experience data please add'} /> :
          featureExpData?.map(d =>
            <Card key={d.id} className='m-2 bg-slate-200 shadow-2xl rounded-xl p-2' >
              <h1>Company: {d.company} </h1>
              <h1>Position: {d.position} </h1>
              <p>Start: {d.start} </p>
              {
                d.end ?
                  <p>End: {d.end} </p> : <p>Current</p>
              }
              <ul className='list-disc px-4 mt-2'>
                {d?.description?.map(l => {
                  return (<li> {l} </li>)
                })}
              </ul>
              <div className='flex gap-2 align-middle mt-2'>
                <button className='px-2 bg-blue-400 rounded text-white'
                  onClick={() => handleAddExp(d.id!)}>
                  add
                </button>
                <button className='px-2 hover:bg-blue-600 bg-blue-400 rounded text-white'
                  onClick={() => handleDelete(d?.id!)}>
                  Remove from list
                </button>
              </div>
            </Card>
          )}
    </CardHolder>
  )


}


export default FeatureExpCardPlain;

const Card = styled.div`
    transition: all;
    transition-duration: 2s;
    height: auto;
    margin-bottom: 2px;
    padding: 12px;
    margin: 12px;
`
type CardHolderProps = {
  expBlockState: boolean
}

const CardHolder = styled.div<CardHolderProps>`
    transition: all;
    transition-duration: 1s;
    max-height: ${(props) => { return props.expBlockState ? 20 : 0 }}rem;
	::-webkit-scrollbar{
        width: .4em;
    };
    ::-webkit-scrollbar-track {
        /* background: #4a8dd8; */
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        /* margin: 1em; */
    };
    ::-webkit-scrollbar-thumb {
        background-color: blue;
        border-radius: 20px;
        border: 3px solid #4a8dd8;
    };
`