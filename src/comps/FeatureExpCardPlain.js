import React from 'react'
import styled from 'styled-components'

export default function FeatureExpCardPlain(props) {
    const { data, expBlockState, resumeExpData, setResumeExpData } = props

    const handleAddExp = (id) => {
        console.log(id);
        console.log("asd");
        let d = data.find(x => x.id == id)
        //check if already added
        var check = resumeExpData.filter(d => d.id === id)
        console.log('this check', check);
        if (check.length !== 0) {
            return
        }
        setResumeExpData(resumeExpData => [...resumeExpData, d])
    }

    return (
        <CardHolder expBlockState={expBlockState} className='overflow-y-scroll max-h'>
            {data?.map(d =>
                <Card key={d.id} className='m-2 bg-amber-400 rounded-xl p-2'>
                    <h1>{d.company}</h1>
                    <h1>{d.position}</h1>
                    <p>start: dd/mm/yy</p>
                    <button onClick={() => handleAddExp(d.id)}>add</button>
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
    background-color: aqua;
`
const CardHolder = styled.div`
    transition: all;
    transition-duration: 1s;
    max-height: ${(props) => { return props.expBlockState ? 20 : 0 }}rem;
    ::-webkit-scrollbar{
        width: 12px;
    };
    ::-webkit-scrollbar-track {
        background: orange;
        margin: 12px;
    };
    ::-webkit-scrollbar-thumb {
        background-color: blue;
        border-radius: 20px;
        border: 3px solid orange;
    };
`   