import React, { useEffect } from 'react'
import styled from 'styled-components';
import { Skill } from '../types';

interface Props {
    skillBlockState: boolean,
    resumeSkillData: Skill[] | undefined,
    setResumeSkillData: React.Dispatch<React.SetStateAction<Skill[] | undefined>>,
    data: Skill[] | undefined
}

const FeatureSkillCardPlain: React.FC<Props> = (props: Props) => {
    const { skillBlockState, resumeSkillData, setResumeSkillData, data } = props

    const handleAddSkill = (_id: string | undefined) => {
        console.log(_id);
        console.log("asd");
        let d: Skill | undefined = data?.find(x => x?._id === _id)
        //check if already added
        var check = resumeSkillData?.filter(d => d?._id === _id)
        console.log('this check', check);
        if (check?.length !== 0) {
            return
        }
        setResumeSkillData([...(resumeSkillData || []), d])
    }

    useEffect(() => {
        console.log(resumeSkillData);

    }, [resumeSkillData])

    return (
        <CardHolder skillBlockState={skillBlockState}
            className='overflow-y-scroll max-h'>
            {data?.map(d =>
                <Card key={d?._id} className='m-2 bg-slate-200 shadow-2xl rounded-xl p-2'>
                    {d?.data &&
                        <h1 key={d._id} className='flex gap-1 flex-wrap font-medium'>Skills:
                            {d?.data.map(s => <p key={s} className='font-normal'>{s} |</p>)}
                        </h1>
                    }
                    <button className='px-2 bg-blue-400 rounded text-white'
                        onClick={() => handleAddSkill(d?._id)}>add</button>
                </Card>
            )}
        </CardHolder>)
}

export default FeatureSkillCardPlain;

interface CardHolderProps {
    skillBlockState: boolean
}

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
    max-height: ${(props) => { return props.skillBlockState ? 20 : 0 }}rem;
    ::-webkit-scrollbar{
        w_idth: 12px;
    };
    ::-webkit-scrollbar-track {
        background: #4a8dd8;
        margin: 12px;
    };
    ::-webkit-scrollbar-thumb {
        background-color: blue;
        border-radius: 20px;
        border: 3px sol_id #4a8dd8;
    };
`   