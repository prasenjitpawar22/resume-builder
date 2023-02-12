import React from 'react'
import styled from 'styled-components'

export default function FeatureEduCardPlain(props) {
    const { data, resumeEduData, setResumeEduData, eduBlockState } = props

    const handleAddExp = (id) => {
        console.log(id);
        console.log("asd");
        let d = data.find(x => x.id === id)
        //check if already added
        var check = resumeEduData.filter(d => d.id === id)
        console.log('this check', check);
        if (check.length !== 0) {
            return
        }
        setResumeEduData(resumeEduData => [...resumeEduData, d])
    }

    return (
        <CardHolder eduBlockState={eduBlockState} className='overflow-y-scroll'>
            {data?.map((d) =>
                <Card key={d.id} className='m-2 bg-slate-200 shadow-2xl rounded-xl p-2'>
                    {<div>
                        <p>University: {d.university}</p>
                        <p>Start: {d.start}</p>
                        <p>End: {d.end}</p>
                        <button className='px-2 bg-blue-400 rounded text-white' onClick={() => handleAddExp(d.id)}>add</button>
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
const CardHolder = styled.div`
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