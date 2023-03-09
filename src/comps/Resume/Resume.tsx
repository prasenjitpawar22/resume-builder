import { Reorder } from 'framer-motion';
import React, { useState, useContext } from 'react'
import styled from 'styled-components';

import './simpleResume.css'
import ExpCardPlain from './ExpCardPlain'
import EduCardPlain from './EduCardPlain';
import { IoIosResize } from 'react-icons/io'
import HeaderCardPlain from './HeaderCardPlain';
import SkillCardPlain from './SkillCardPlain';
import { ResumeContext } from '../../context/ResumeContext'

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
        <div className='flex mx-4 mt-12 mb-4'>
            <div className='grid p-4 w-11/12 grid-cols-1 gap-5 bg-slate-100'>
                <div className='flex phone:gap-2 tablet:gap-6'>
                    <div className='w-2/4'>

                    </div>
                    <div className='phone:w-2/6  tablet:w-9/12'>
                        <div>
                            <h1 className='simple-resume-h1'>
                                First Name
                            </h1>
                            <h3 className='simple-resume-h3'>Title</h3>
                            <h6 className='simple-resume-h6'>
                                Atlanta, USA 5555-222-12121 firstemail@email.com
                            </h6>
                            <p className='simple-resume-p'>
                                is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the
                                1500s, when an unknown printer took a galley of type and scrambled it to
                                make a type specimen book. It has survived not only five centuries, but
                                also the leap into electronic typesetting, remaining essentially unchanged.
                                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                                like Aldus PageMaker including versions of Lorem Ipsum
                            </p>
                        </div>
                    </div>
                </div>
                <div className='flex phone:gap-2 tablet:gap-6'>
                    <div className='w-2/4  '>
                        <h1 className='simple-resume-h2'>
                            Work Experience
                        </h1>
                    </div>
                    <div className='flex flex-col gap-3 phone:w-2/6 tablet:w-9/12'>
                        <div>
                            <h3 className='simple-resume-h3'>Software Engineer</h3>
                            <h4 className='simple-resume-h4'>New Company</h4>
                            <h6 className='simple-resume-h6'>January 2018 to Present </h6>
                            <p className='simple-resume-p'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy text ever since the 1500s, when an unknown
                                printer took a galley of type and scrambled it to make a type specimen book. It
                            </p>
                        </div>
                        <div>
                            <h3 className='simple-resume-h3'>Software Engineer</h3>
                            <h4 className='simple-resume-h4'>New Company</h4>
                            <h6 className='simple-resume-h6'>January 2018 to Present </h6>
                            <p className='simple-resume-p'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy text ever since the 1500s, when an unknown
                                printer took a galley of type and scrambled it to make a type specimen book. It
                            </p>
                        </div>
                    </div>
                </div>
                <div className='flex phone:gap-2 tablet:gap-6'>
                    <div className='w-2/4  '>
                        <h1 className='simple-resume-h2'>
                            Education
                        </h1>
                    </div>
                    <div className='phone:w-2/6  tablet:w-9/12'>
                        <div>
                            <h3 className='simple-resume-h3'>Software Engineer</h3>
                            <h4 className='simple-resume-h4'>New Company</h4>
                            <h6 className='simple-resume-h6'>January 2018 to Present </h6>
                        </div>
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
