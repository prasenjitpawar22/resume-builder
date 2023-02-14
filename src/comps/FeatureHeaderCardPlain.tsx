import React from 'react'
import styled from 'styled-components'
import { Header } from '../types'

interface Props {
    data: Header[],
    headerBlockState: boolean,
    resumeHeaderData: Header[] | undefined,
    setResumeHeaderData: React.Dispatch<React.SetStateAction<Header[] | undefined>>
}

interface CardHolderProps {
    headerBlockState: boolean
}

const FeatureHeaderCardPlain: React.FC<Props> = (props: Props) => {

    const { headerBlockState, resumeHeaderData, setResumeHeaderData, data } = props

    const handleAddExp = (id: string | undefined) => {
        console.log(id);
        console.log("asd");
        let d: Header | undefined = data.find(x => x?.id === id)
        //check if already added
        var check = resumeHeaderData?.filter(d => d?.id === id)
        console.log('this check', check);
        if (check?.length !== 0) {
            return
        }
        setResumeHeaderData([...(resumeHeaderData || []), d])
    }

    return (
        <CardHolder headerBlockState={headerBlockState}
            className='overflow-y-scroll max-h'>
            {data?.map(d =>
                <Card key={d?.id} className='m-2 bg-slate-200 shadow-2xl rounded-xl p-2'>
                    <h1>Full Name: {d?.fullName}</h1>
                    <h1>Contact: {d?.contact}</h1>
                    {d?.linkedIn && <h1>LinkedIn: {d?.linkedIn}</h1>}
                    {d?.github && <h1>Github: {d?.github}</h1>}
                    {d?.websit && <h1>Websit: {d?.websit}</h1>}
                    <button className='px-2 bg-blue-400 rounded text-white'
                        onClick={() => handleAddExp(d?.id)}>add</button>
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