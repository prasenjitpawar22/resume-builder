import React, { useEffect, useContext } from 'react'
import styled from 'styled-components';
import { ResumeContext } from '../../context/ResumeContext';
import { ISkill } from '../../types';

interface Props {
    skillBlockState: boolean,
}

const FeatureSkillCardPlain: React.FC<Props> = (props: Props) => {
    const { skillBlockState,
        //  resumeSkillData, setResumeSkillData, data
    }
        = props

    const { resumeSkillData, setResumeSkillData } = useContext(ResumeContext)

    const handleAddSkill = (id: string) => {
        // console.log(id);
        let foundSkillInFeature = resumeSkillData?.find(x => x.id === id)

        if (foundSkillInFeature) {
            //check if already added
            var check = resumeSkillData?.filter(d => d?.id === id)
            // console.log('this check', check);
            if (check?.length !== 0) {
                return
            }
            setResumeSkillData!([...resumeSkillData!, foundSkillInFeature])
        }
    }

    useEffect(() => {
        // console.log(resumeSkillData);

    }, [resumeSkillData])

    return (
        <CardHolder skillBlockState={skillBlockState}
            className='overflow-y-scroll max-h'>
            {resumeSkillData?.map(skill =>
                <Card key={skill?.id} className='m-2 bg-slate-200 shadow-2xl rounded-xl p-2'>
                    {skill.data &&
                        <h1 key={skill.id} className='flex gap-1 flex-wrap font-medium'>Skills:
                            {skill.data.map(s => <p key={s} className='font-normal'>{s} |</p>)}
                        </h1>
                    }
                    <button className='px-2 bg-blue-400 rounded text-white'
                        onClick={() => handleAddSkill(skill.id!)}>add</button>
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