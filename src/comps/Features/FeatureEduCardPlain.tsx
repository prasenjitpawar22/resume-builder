import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify';

import { FeatureEduDataRequest, FeatureEduDeleteRequest } from '../../api/FeaturesApi';
import { ResumeEduAddRequest, ResumeEduDataRequest } from '../../api/ResumeApi';
import { FeatureContext } from '../../context/FeaturesContext';
import { ResumeContext } from '../../context/ResumeContext';
import FeatureEmptyDataCardPlain from './FeatureEmptyDataCardPlain';


interface Props {
    eduBlockState: boolean,

}
export default function FeatureEduCardPlain(props: Props) {
    const { eduBlockState } = props

    const { featureEduData, setFeatureEduData, } = useContext(FeatureContext)
    const { resumeEduData, setResumeEduData } = useContext(ResumeContext)

    const handleAdd = async (id: string) => {
        // check if already in list
        const foundInList = resumeEduData?.find(data => data.id === id)
        if (!foundInList) {
            //get the data by filter list
            const eduAddRequestToResume = featureEduData?.find((data) => data.id === id)
            if (!eduAddRequestToResume) {
                return console.log('eduAddRequest data not found');
            }
            else {
                const createRespons = await ResumeEduAddRequest(eduAddRequestToResume)
                if (createRespons.status === 200) {
                    //call get all resume edu list
                    const requestEduList = await ResumeEduDataRequest()
                    if (requestEduList.status === 200) {
                        setResumeEduData!(requestEduList.data!)
                    }
                }
                //handle error
                else {
                    console.log(createRespons.error);
                }
            }
        }
        else {
            //notify already added to resume
            toast.warn('Already added to resume',)
        }
    }

    const handleDelete = async (id: string) => {
        const token = localStorage.getItem('token')

        if (token) {
            const deleteResponse = await FeatureEduDeleteRequest(id, token)
            // handle deleteResponse
            console.log(deleteResponse);
            if (deleteResponse.status === 200) {
                const allEdu = await FeatureEduDataRequest(token)
                if (allEdu.status === 200 && allEdu.data) {
                    console.log(allEdu.data);
                    setFeatureEduData!(allEdu.data)
                }
            }
            if (deleteResponse.error) {
                console.log('delete request error', deleteResponse.error);
            }
        }
    }

    return (
        <CardHolder eduBlockState={eduBlockState} className='overflow-y-scroll'>
            {featureEduData === undefined || featureEduData.length === 0 ?
                <FeatureEmptyDataCardPlain text={'Empty education data please add'} />
                : featureEduData?.length === 0 ?
                    <Card>
                        <h1>asd</h1>
                    </Card> : featureEduData?.map((d) =>
                        <Card key={d.id} className='m-2 bg-slate-200 shadow-2xl rounded-xl p-2'>
                            {<div>
                                <p>University: {d.university}</p>
                                <p>Location: {d.location}</p>
                                <p>Start: {d.start}</p>
                                <p>End: {d.end}</p>

                                <div className='flex gap-2 align-middle mt-2'>
                                    <button className='px-2 hover:bg-blue-600 bg-blue-400 rounded text-white'
                                        onClick={() => handleAdd(d?.id!)}>Add</button>
                                    <button className='px-2 hover:bg-blue-600 bg-blue-400 rounded text-white'
                                        onClick={() => handleDelete(d?.id!)}>Remove from list</button>
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