import { Reorder } from 'framer-motion';
import React, { useState, useContext } from 'react'
import styled from 'styled-components';

import './simpleResume.css'
import ExpCardPlain from './SimpleResumeExperienceCard'
import EduCardPlain from './SimpleResumeEducationCard';
import { IoIosResize } from 'react-icons/io'
import HeaderCardPlain from './SimpleResumeHeaderCard';
import SkillCardPlain from './SkillCardPlain';
import { ResumeContext } from '../../context/ResumeContext'
import SimpleResumeHeaderCard from './SimpleResumeHeaderCard';
import SimpleResumeExperienceCard from './SimpleResumeExperienceCard';
import SimpleResumeEducationCard from './SimpleResumeEducationCard';

export const Resume: React.FC = () => {

    const {
        printRef,
        resumeBlockHolderWidth, resumeColor,
        resumeEduData, resumeExpData,
        resumeHeaderData, resumeSkillData,
        setResumeEduData, setResumeExpData,
        setResumeHeaderData, setResumeSkillData,
    } = useContext(ResumeContext)

    return (
        <div className='flex mx-4 mt-2 mb-4'>
            <div className='grid p-4 w-11/12 grid-cols-1 gap-5 bg-slate-100'>
                <div className='flex phone:gap-2 tablet:gap-6'>
                    <div className='w-2/4'>

                    </div>
                    <div className='phone:w-2/6  tablet:w-9/12'>
                        <SimpleResumeHeaderCard />
                    </div>
                </div>
                <div className='flex phone:gap-2 tablet:gap-6'>
                    <div className='w-2/4  '>
                        <h1 className={`simple-resume-h2 ${resumeExpData && resumeExpData.length === 0 ? 'opacity-40' : ''} `}>
                            Work Experience
                        </h1>
                    </div>
                    <div className='flex flex-col gap-3 phone:w-2/6 tablet:w-9/12'>
                        <SimpleResumeExperienceCard />
                    </div>
                </div>
                <div className='flex phone:gap-2 tablet:gap-6'>
                    <div className='w-2/4  '>
                        <h1 className={`simple-resume-h2 ${resumeEduData && resumeEduData.length === 0 ? 'opacity-40' : ''} `}>
                            Education
                        </h1>
                    </div>
                    <div className='phone:w-2/6  tablet:w-9/12'>
                        <SimpleResumeEducationCard />
                    </div>
                </div>
                <div className='flex phone:gap-2 tablet:gap-6'>
                    <div className='w-2/4 '>
                        <h1 className='simple-resume-h2'>
                            Skills
                        </h1>
                    </div>
                    <div className='phone:w-2/6  tablet:w-9/12'>
                        <div>
                            <h5 className='simple-resume-h5'>New Company</h5>
                            <h5 className='simple-resume-h5'>New Company</h5>
                            <h5 className='simple-resume-h5'>New Company</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
