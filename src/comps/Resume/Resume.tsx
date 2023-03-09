import { Reorder } from 'framer-motion';
import React, { useState, useContext } from 'react'
import styled from 'styled-components';

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
    <div className='flex mt-12 bg-red-200'>
      <div className='grid m-4 w-11/12 grid-cols-1 gap-5 bg-slate-100'>
        <div className=''>Header</div>
        <div>Education</div>
        <div>Experience</div>
        <div>Skills</div>
      </div>
    </div>
  )
}
 