import axios from 'axios'
import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { FeatureHeaderDataRequest, FeatureHeaderDeleteRequest } from '../../api/FeaturesApi'
import { ResumeHeaderAddRequest, ResumeHeaderDataRequest } from '../../api/ResumeApi'
import { FeatureContext } from '../../context/FeaturesContext'

import { IHeader, IResumeHeader } from '../../types'
import FeatureEmptyDataCardPlain from './FeatureEmptyDataCardPlain'

const client = axios.create({
  baseURL: "http://localhost:8000/resume/"
})

interface Props {
  // data: Header[],
  headerBlockState: boolean,
  resumeHeaderData: IResumeHeader[],
  setResumeHeaderData: React.Dispatch<React.SetStateAction<IResumeHeader[]>>
}

interface CardHolderProps {
  headerBlockState: boolean
}

const FeatureHeaderCardPlain: React.FC<Props> = (props: Props) => {

  const { headerBlockState, resumeHeaderData, setResumeHeaderData,
    // data
  } = props

  const { featureHeaderData, setFeatureHeaderData } = useContext(FeatureContext)

  // add to resume button handle function
  const handleAdd = async (id: string | undefined) => {

    //get feature header from id
    let header = featureHeaderData?.find(x => x?.id === id)

    //check if already added
    var check = resumeHeaderData?.filter(d => d?.featureHeaderId === id)
    if (check?.length !== 0) {
      toast.warn('already added to resume', { autoClose: 1000, hideProgressBar: true })
      return
    }

    //backend add resume header req
    const token = localStorage.getItem('token')
    if (token && header && id) {
      const resumeHeaderRequest: IResumeHeader = { ...header, featureHeaderId: id }
      const addResumeHeaderResponse = await ResumeHeaderAddRequest(resumeHeaderRequest, token)
      console.log(addResumeHeaderResponse);

      if (addResumeHeaderResponse.data) {
        setResumeHeaderData([...resumeHeaderData, addResumeHeaderResponse.data])
      }
      if (addResumeHeaderResponse.error) {
        toast.warn('unable to add to resume', { autoClose: 1000, hideProgressBar: true })
      }
    }
    else {
      toast.warn("error adding", { autoClose: 1000, hideProgressBar: true })
    }
  }


  const handleRemove = async (id: string) => {
    const token = localStorage.getItem('token');
    if (token) {
      const deleteResponse = await FeatureHeaderDeleteRequest(id, token)

      if (deleteResponse.status === 200) {
        //call for all feature headers
        const allHeaders = await FeatureHeaderDataRequest(token)

        if (allHeaders.status === 200 && allHeaders.data) {
          setFeatureHeaderData!(allHeaders.data)
        }
        //call for all resume headers as cascade is applied
        const allResumeHeader = await ResumeHeaderDataRequest(token)

        if (allResumeHeader.status === 200 && allResumeHeader.data) {
          setResumeHeaderData(allResumeHeader.data)
        }
      }
      if (deleteResponse.error) {
        // console.log('delete request error', deleteResponse.error);
        toast.warning(deleteResponse.error, { autoClose: 1000, hideProgressBar: true })
      }
    }
  }

  return (
    <CardHolder headerBlockState={headerBlockState}
      className='overflow-y-scroll max-h tracking-wider'>
      {featureHeaderData === undefined || featureHeaderData.length === 0 ?
        <FeatureEmptyDataCardPlain text={'Empty header data please add'} />
        : featureHeaderData?.length === 0 ?
          <Card>
            <h1>asd</h1>
          </Card> : featureHeaderData?.map(d =>
            <Card key={d?.id} className='m-2 bg-slate-200 shadow-2xl rounded-xl p-2'>
              {d?.fullname && <h1>Full Name: {d?.fullname}</h1>}
              {d?.contact && <h1>Contact: {d?.contact}</h1>}
              {d?.linkedin && <h1>Linkedin: {d?.linkedin}</h1>}
              {d?.github && <h1>Github: {d?.github}</h1>}
              {d?.website && <h1>Websit: {d?.website}</h1>}
              <div className='flex gap-2 align-middle mt-2'>
                <button className='px-2 hover:bg-blue-600 bg-blue-400 rounded text-white'
                  onClick={() => handleAdd(d?.id)}>Add</button>
                <button className='px-2 hover:bg-blue-600 bg-blue-400 rounded text-white'
                  onClick={() => handleRemove(d?.id!)}>Remove from list</button>
              </div>
            </Card>
          )}
    </CardHolder>
  )
}

export default FeatureHeaderCardPlain;

const Card = styled.div`
    transition: all;
    transition-duration: 2s;
    height: auto;
    margin-bottom: 2px;
    padding: 12px;
    margin: 12px;
`
const CardHolder = styled.div<CardHolderProps>`
    transition: all;
    font-family: 'Lato', sans;
    transition-duration: 1s;
    max-height: ${(props) => { return props.headerBlockState ? 20 : 0 }}rem;
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