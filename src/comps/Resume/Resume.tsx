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

  const [headerSize, setheaderSize] = useState({ y: 100 });
  const [EduSize, setEduSize] = useState({ x: 550, y: 150 });
  const [expSize, setExpSize] = useState({ x: 550, y: 150 });
  const [skillSize, setSkillSize] = useState({ x: 550, y: 50 });

  const [headerResizeState, setHeaderResizeState] = useState(false)
  const [expResizeState, setExpResizeState] = useState(false)
  const [eduResizeState, setEduResizeState] = useState(false)
  const [skillResizeState, setSkillResizeState] = useState(false)

  const handleHeaderResize = (mouseDownEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(mouseDownEvent);
    const startSize = headerSize;
    const startPosition = { y: mouseDownEvent.pageY };

    function onMouseMove(mouseMoveEvent: MouseEvent) {
      // let newX = startSize.x - startPosition.x + mouseMoveEvent.pageX
      let newY = startSize.y - startPosition.y + mouseMoveEvent.pageY
      // if (newX >= resumeBlockHolderWidth!) {
      //   console.log('innnnnn');
      //   return
      // }
      if (newY >= 200) {
        console.log('innnnnn');
        return
      }
      setheaderSize(({
        y: newY
      }));
    }
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
      // uncomment the following line if not using `{ once: true }`
      // document.body.removeEventListener("mouseup", onMouseUp);
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };

  const handleEduResize = (mouseDownEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    const startSize = EduSize;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

    function onMouseMove(mouseMoveEvent: MouseEvent) {
      let newX = startSize.x - startPosition.x + mouseMoveEvent.pageX
      let newY = startSize.y - startPosition.y + mouseMoveEvent.pageY

      if (newX >= resumeBlockHolderWidth!) {
        console.log('innnnnn');
        return
      }
      if (newY >= 200) {
        console.log('innnnnn');
        return
      }

      setEduSize(({
        x: newX,
        y: newY
      }));
    }
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
      // uncomment the following line if not using `{ once: true }`
      // document.body.removeEventListener("mouseup", onMouseUp);
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };

  const handleExpResize = (mouseDownEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const startSize = expSize;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

    function onMouseMove(mouseMoveEvent: MouseEvent) {
      let newX = startSize.x - startPosition.x + mouseMoveEvent.pageX
      let newY = startSize.y - startPosition.y + mouseMoveEvent.pageY

      if (newX >= resumeBlockHolderWidth!) {
        console.log('innnnnn');
        return
      }
      if (newY >= 500) {
        console.log('innnnnn');
        return
      }

      setExpSize(({
        x: newX,
        y: newY
      }));
    }
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
      // uncomment the following line if not using `{ once: true }`
      // document.body.removeEventListener("mouseup", onMouseUp);
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  }

  const handleSkillResize = (mouseDownEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const startSize = skillSize;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

    function onMouseMove(mouseMoveEvent: MouseEvent) {
      let newX = startSize.x - startPosition.x + mouseMoveEvent.pageX
      let newY = startSize.y - startPosition.y + mouseMoveEvent.pageY

      if (newX >= resumeBlockHolderWidth!) {
        console.log('innnnnn');
        return
      }
      if (newY >= 500) {
        console.log('innnnnn');
        return
      }

      setSkillSize(({
        x: newX,
        y: newY
      }));
    }
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
      // uncomment the following line if not using `{ once: true }`
      // document.body.removeEventListener("mouseup", onMouseUp);
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  }

  return (
    <>
      <ResumeDiv ref={printRef} className='shadow-2xl'
        resumeColor={resumeColor!}>
        {/* header  */}
        <HeaderDiv
          onMouseLeave={() => setHeaderResizeState(false)}
          onMouseEnter={() => setHeaderResizeState(true)}
          maxWidth={resumeBlockHolderWidth!}
          height={headerSize.y}
          // width={headerSize.x}
          bgColor={resumeColor!}
          className='border-b-2 font-serif border-slate-300 hover:border-dashed hover:border'>
          <span className='shadow-md p-2'>Header</span>
          <Reorder.Group axis='y' values={resumeHeaderData!} onReorder={setResumeHeaderData!}>
            {resumeHeaderData?.length! > 0 && resumeHeaderData?.map(data =>
              <Reorder.Item key={data?._id} value={data}>
                <HeaderCardPlain data={data}   />
              </Reorder.Item>
            )}
          </Reorder.Group>
          {headerResizeState &&
            <button className='reSizeBtn'
              onMouseDown={(e) => handleHeaderResize(e)}>
              <IoIosResize />
            </button>}
        </HeaderDiv>
        {/* edu  */}
        <EducationDiv
          onMouseLeave={() => setEduResizeState(false)}
          onMouseEnter={() => setEduResizeState(true)}
          height={EduSize.y} width={EduSize.x} bgColor={resumeColor!}
          className='font-serif border-b-2 hover:border-dashed hover:border border-slate-300'>
          <span className='uppercase font-medium p-2'>Education</span>
          <Reorder.Group axis="y" values={resumeEduData!} onReorder={setResumeEduData!}>
            {resumeEduData!.length > 0 && resumeEduData?.map(data =>
              <Reorder.Item key={data._id} value={data}>
                <EduCardPlain data={data} />
              </Reorder.Item>
            )}
          </Reorder.Group>
          {eduResizeState &&
            <button className='reSizeBtn' onMouseDown={handleEduResize}><IoIosResize /></button>
          }
        </EducationDiv>
        {/* exp  */}
        <ExperienceDiv
          onMouseLeave={() => setExpResizeState(false)}
          onMouseEnter={() => setExpResizeState(true)}
          height={expSize.y} width={expSize.x} bgColor={resumeColor!}
          className='font-serif border-b-2 hover:border-dashed hover:border border-slate-300'>
          <span className='uppercase p-2 font-normal'>Experience</span>
          <Reorder.Group axis='y' values={resumeExpData!} onReorder={setResumeExpData!}>
            {resumeExpData!.length > 0 && resumeExpData?.map(data =>
              <Reorder.Item key={data._id} value={data}>
                <ExpCardPlain data={data} />
              </Reorder.Item>
            )}
          </Reorder.Group>
          {expResizeState &&
            <button className='reSizeBtn' onMouseDown={handleExpResize}><IoIosResize /></button>
          }
        </ExperienceDiv>
        <SkillDiv
          onMouseLeave={() => setSkillResizeState(false)}
          onMouseEnter={() => setSkillResizeState(true)}
          height={skillSize.y} width={skillSize.x} bgColor={resumeColor!}
          className='font-serif hover:border-dashed hover:border border-slate-300'>
          <span className='uppercase p-2 font-normal'>Skill</span>
          {resumeSkillData?.length! > 0 && resumeSkillData?.map(data =>
            <SkillCardPlain data={data} setData={setResumeSkillData!} />
          )}
          {skillResizeState &&
            <button className='reSizeBtn' onMouseDown={handleSkillResize}><IoIosResize /></button>
          }
        </SkillDiv>
      </ResumeDiv>
    </>
  )
}

interface ResumeDivProps {
  resumeColor: string
  ref: any
}
interface HeaderProps {
  // width: number
  height: number
  bgColor: string
  maxWidth: number
}
interface EducationProps {
  height: number
  width: number
  bgColor: string
}
interface ExperienceProps {
  height: number
  bgColor: string
  width: number
}
interface SkillProps {
  bgColor: string
  height: number
  width: number
}


const ResumeDiv = styled.div<ResumeDivProps>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.resumeColor};
  transition: all;
  transition-duration: 1s;
`
const HeaderDiv = styled.div<HeaderProps>`
  width: auto;
  height: auto;
  min-height: ${(props) => props.height}px;
  margin-bottom: 12px;
  position: relative;
  & span{
     position: absolute;
     right: -5rem;
     background-color: ${(props) => props.bgColor};
  }
  .reSizeBtn{
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translate(50%, 50%);
  }
`

const EducationDiv = styled.div<EducationProps>`
    width: auto;
    height: auto;
    min-height: ${(props) => props.height}px;
    margin-bottom: 12px;
    position: relative;
    /* & span{
      position: absolute;
      right: -6.5rem;
      background-color: ${(props) => props.bgColor};
    } */
    .reSizeBtn{
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(50%, 50%);
    }
`

const ExperienceDiv = styled.div<ExperienceProps>`
    width: auto;
    height: auto;
    min-height: ${(props) => props.height}px;
    margin-bottom: 12px;
    position: relative;
    /* & span{
      position: absolute;
      right: -6.5rem;
      background-color: ${(props) => props.bgColor};
    } */
    .reSizeBtn{
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(50%, 50%);
    }
`

const SkillDiv = styled.div<SkillProps>`
    width: auto;
    height: auto;
    min-height: ${(props) => props.height}px;
    margin-bottom: 12px;
    position: relative;
    /* & span{
      position: absolute;
      right: -6.5rem;
      background-color: ${(props) => props.bgColor};
    } */
    .reSizeBtn{
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(50%, 50%);
    }
`