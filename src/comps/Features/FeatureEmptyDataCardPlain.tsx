import React from 'react';
import styled from 'styled-components';

type Props = {
    text: string
}

const FeatureEmptyDataCardPlain = (props: Props) => {
    return (
        <Card className='m-2 bg-slate-200 shadow-2xl rounded-xl p-2' >
            <h1>{props.text}</h1>
        </Card>
    );
}

export default FeatureEmptyDataCardPlain;


const Card = styled.div`
    transition: all;
    transition-duration: 2s;
    height: auto;
    margin-bottom: 2px;
    padding: 12px;
    margin: 12px;
`