import React from 'react'
import styled from 'styled-components'

export default function FeatureHeaderCardPlain(props) {

    const {headerBlockState, resumeHeaderData, setResumeHeaderData, data} = props

    const handleAddExp = (id) => {
        console.log(id);
        console.log("asd");
        let d = data.find(x => x.id === id)
        //check if already added
        var check = resumeHeaderData.filter(d => d.id === id)
        console.log('this check', check);
        if (check.length !== 0) {
            return
        }
        setResumeHeaderData(resumeHeaderData => [...resumeHeaderData, d])
    }

 return (
        <CardHolder expBlockState={headerBlockState} className='overflow-y-scroll max-h'>
            {data?.map(d =>
                <Card key={d.id} className='m-2 bg-slate-200 shadow-2xl rounded-xl p-2'>
                    <h1>{d.name}</h1>
                    <h1>{d.position}</h1>
                    <p>start: dd/mm/yy</p>
                    <button className='px-2 bg-blue-400 rounded text-white' onClick={() => handleAddExp(d.id)}>add</button>
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
    max-height: ${(props) => { return props.expBlockState ? 20 : 0 }}rem;
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