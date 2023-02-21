import axios from 'axios'
import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { FeatureHeaderDataRequest, FeatureHeaderDeleteRequest } from '../../api/FeaturesApi'
import { ResumeHeaderDataRequest } from '../../api/ResumeApi'
import { FeatureContext } from '../../context/FeaturesContext'

import { Header } from '../../types'

const client = axios.create({
  baseURL: "http://localhost:8000/resume/"
})

interface Props {
  // data: Header[],
  headerBlockState: boolean,
  resumeHeaderData: Header[] | undefined,
  setResumeHeaderData: React.Dispatch<React.SetStateAction<Header[] | undefined>>
}

interface CardHolderProps {
  headerBlockState: boolean
}

const FeatureHeaderCardPlain: React.FC<Props> = (props: Props) => {

  const { headerBlockState, resumeHeaderData, setResumeHeaderData,
    // data
  } = props

  const { featureHeaderData, setFeatureHeaderData } = useContext(FeatureContext)

  const handleAdd = async (_id: string | undefined) => {
    let d: Header | undefined = featureHeaderData?.find(x => x?._id === _id)
    //check if already added
    var check = resumeHeaderData?.filter(d => d?._id === _id)
    console.log('this check', check);
    if (check?.length !== 0) {
      toast.warn('already added to resume')
      return
    }
    // setResumeHeaderData([...(resumeHeaderData || []), d])

    //backend add resume header req
    await client.post("set-resume-header",
      {
        _id: d?._id,
        fullname: d?.fullname,
        contact: d?.contact,
        github: d?.github,
        linkedin: d?.linkedin,
        website: d?.websit
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e))

    //update the header list for resume
    const allHeader = await ResumeHeaderDataRequest()
    setResumeHeaderData!(allHeader.data)
  }


  const handleDelete = async (id: string) => {
    console.log('btn clicked', id);

    const deleteResponse = await FeatureHeaderDeleteRequest(id)
    // handle deleteResponse
    console.log(deleteResponse);
    if (deleteResponse.status === 200) {
      const allHeaders = await FeatureHeaderDataRequest()
      setFeatureHeaderData!(allHeaders.data)
    }
    if (deleteResponse.error) {
      console.log('delete request error', deleteResponse.error);
    }
  }

  return (
    <CardHolder headerBlockState={headerBlockState}
      className='overflow-y-scroll max-h'>
      {featureHeaderData?.length === 0 ?
        <Card>
          <h1>asd</h1>
        </Card> : featureHeaderData?.map(d =>
          <Card key={d?._id} className='m-2 bg-slate-200 shadow-2xl rounded-xl p-2'>
            {d?.fullname && <h1>Full Name: {d?.fullname}</h1>}
            {d?.contact && <h1>Contact: {d?.contact}</h1>}
            {d?.linkedin && <h1>Linkedin: {d?.linkedin}</h1>}
            {d?.github && <h1>Github: {d?.github}</h1>}
            {d?.websit && <h1>Websit: {d?.websit}</h1>}
            <div className='flex gap-2 align-middle mt-2'>
              <button className='px-2 hover:bg-blue-600 bg-blue-400 rounded text-white'
                onClick={() => handleAdd(d?._id)}>Add</button>
              <button className='px-2 hover:bg-blue-600 bg-blue-400 rounded text-white'
                onClick={() => handleDelete(d?._id!)}>Remove from list</button>
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