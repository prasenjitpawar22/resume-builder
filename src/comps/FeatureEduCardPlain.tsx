import React, { useContext } from 'react'
import styled from 'styled-components'
import { FeatureEduDataRequest, FeatureEduDeleteRequest } from '../api/FeaturesApi';
import { FeatureContext } from '../context/FeaturesContext';
import { ResumeContext } from '../context/ResumeContext';
import { Education } from '../types';


interface Props {
    eduBlockState: boolean,

}
export default function FeatureEduCardPlain(props: Props) {
    const { eduBlockState } = props

    const { featureEduData, setFeatureEduData, } = useContext(FeatureContext)
    const { resumeEduData } = useContext(ResumeContext)

    const handleAdd = (id: string) => {
        console.log('added id', id);
    }

    const handleDelete = async (id: string) => {
        console.log('btn clicked', id);
    
        const deleteResponse = await FeatureEduDeleteRequest(id)
        // handle deleteResponse
        console.log(deleteResponse);
        if (deleteResponse.status === 200) {
          const allEdu = await FeatureEduDataRequest()
          setFeatureEduData!(allEdu.data)
        }
        if (deleteResponse.error) {
          console.log('delete request error', deleteResponse.error);
        }
      }

    return (
        <CardHolder eduBlockState={eduBlockState} className='overflow-y-scroll'>
            {featureEduData?.length === 0 ?
                <Card>
                    <h1>asd</h1>
                </Card> : featureEduData?.map((d) =>
                    <Card key={d._id} className='m-2 bg-slate-200 shadow-2xl rounded-xl p-2'>
                        {<div>
                            <p>University: {d.university}</p>
                            <p>Start: {d.start}</p>
                            <p>End: {d.end}</p>
                            <div className='flex gap-2 align-middle mt-2'>
                                <button className='px-2 hover:bg-blue-600 bg-blue-400 rounded text-white'
                                    onClick={() => handleAdd(d?._id!)}>Add</button>
                                <button className='px-2 hover:bg-blue-600 bg-blue-400 rounded text-white'
                                    onClick={() => handleDelete(d?._id!)}>Remove from list</button>
                            </div>
                        </div>}
                    </Card>
                )}
        </CardHolder>
    )
}

const Card = styled.div`
    transition: all;
    transition-duration: 2s;
    height: auto;
    margin-bottom: 2px;
    padding: 12px;
    margin: 12px;
`

type CardHolderType = {
    eduBlockState: boolean
}
const CardHolder = styled.div<CardHolderType>`
    transition: all;
    transition-duration: 1s;
    max-height: ${(props) => { return props.eduBlockState ? 20 : 0 }}rem;
    ::-webkit-scrollbar{
        width: 12px;
    };
    ::-webkit-scrollbar-track {
        background: #4a8dd8;
        margin: 12px;
    };
    ::-webkit-scrollbar-thumb {
        background-color: blue;
        border-radius: 20px;
        border: 3px solid #4a8dd8;
    };
`