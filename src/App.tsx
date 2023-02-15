import './App.css';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import data from './data';
import DropDownList from './comps/DropDownList';
import FeatureEduCardPlain from './comps/FeatureEduCardPlain';
import FeatureExpCardPlain from './comps/FeatureExpCardPlain';
import FeatureHeaderCardPlain from './comps/FeatureHeaderCardPlain';
import { BiChevronsRight, BiChevronsLeft } from 'react-icons/bi'
import ModalCreateHeaderData from './comps/Models/ModalCreateHeaderData';
import { Education, Experience, Header, Skill } from './types'
import React from 'react';
import html2canvas from 'html2canvas';
import FeatureSkillCardPlain from './comps/FeatureSkillCardPlain';
import { Resume } from './comps/Resume/Resume';

const App: React.FC = () => {

  const [leftBlockWidth, setLeftBlockWidth] = useState(30)
  const [leftBlockMargin, setLeftBlockMargin] = useState(0)
  const [resumeBlockPosition, setResumeBlockPosition] = useState(0)
  const [resumeExpData, setResumeExpData] = useState<Experience[]>([])
  const [resumeEduData, setResumeEduData] = useState<Education[]>([])
  const [resumeHeaderData, setResumeHeaderData] = useState<Header[] | undefined>([])
  const [resumeSkillData, setResumeSkillData] = useState<Skill[] | undefined>([])

  const [resumeBlockHolderWidth, setResumeBlockHolderWidth] = useState<number>(550)

  const [headerBlockState, setHeaderBlockState] = useState(false)
  const [eduBlockState, setEduBlockState] = useState(false)
  const [expBlockState, setExpBlockState] = useState<boolean>(false)
  const [skillBlockState, setSkillBlockState] = useState(false)

  const [resumeColor, setResumeColor] = useState<string>('#E7E9EC');

  const [headerBlockModalState, setHeaderBlockModalState] = useState<boolean>(false)

  const printRef = React.useRef<HTMLElement>();

  const handleLeftBlock = () => {
    setLeftBlockMargin(leftBlockMargin === leftBlockWidth ? 0 : leftBlockWidth)
    setResumeBlockPosition(resumeBlockPosition === 0 ? 10 : 0)
    console.log(leftBlockMargin);
  }

  const handleResumeColor = (color: string) => {
    setResumeColor(color)
  }

  useEffect(() => {
    console.log(resumeExpData);
  }, [resumeExpData])

  useEffect(() => {
    console.log(resumeExpData);
  }, [resumeExpData])

  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element!);

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'image.jpg';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };
  return (
    <div className="App">
      {/* <NavBar className='bg-slate-100'>

      </NavBar> */}

      <FeatureBlock className='shadow-violet-600 shadow-2xl bg-slate-100'
        width={leftBlockWidth} marginLeft={leftBlockMargin}>
        <h1 className='text-3xl font-semibold text-center'>Features</h1>
        <span onClick={handleLeftBlock}>
          {leftBlockMargin === 0 ? <BiChevronsLeft size={40} /> : <BiChevronsRight size={40} />}
        </span>
        <Feature>
          <DropDownList
            setHeaderBlockModalState={setHeaderBlockModalState}
            setBlockState={setHeaderBlockState} blockState={headerBlockState} title={'Header Block'} />
          {
            <FeatureHeaderCardPlain
              headerBlockState={headerBlockState}
              resumeHeaderData={resumeHeaderData}
              setResumeHeaderData={setResumeHeaderData}
              data={data.header}
            />
          }
          <DropDownList setBlockState={setEduBlockState} blockState={eduBlockState} title={'Education Block'} />
          {
            // eduBlockState &&
            <FeatureEduCardPlain
              eduBlockState={eduBlockState}
              resumeEduData={resumeEduData} setResumeEduData={setResumeEduData}
              data={data.education} />
          }
          <DropDownList setBlockState={setExpBlockState} blockState={expBlockState} title={'Experience Block'} />
          {
            // expBlockState &&
            <FeatureExpCardPlain
              expBlockState={expBlockState}
              resumeExpData={resumeExpData} setResumeExpData={setResumeExpData}
              data={data.experience} />
          }
          <DropDownList setBlockState={setSkillBlockState} blockState={skillBlockState} title={'Skills Block'} />
          <FeatureSkillCardPlain
            skillBlockState={skillBlockState}
            resumeSkillData={resumeSkillData} setResumeSkillData={setResumeSkillData}
            data={data.skill} />
          <DropDownList title={'Other Block'} />
        </Feature>
      </FeatureBlock>

      <ResumeBlockHolder
        width={resumeBlockHolderWidth}
        marginLeft={leftBlockWidth}
        resumeBlockPosition={resumeBlockPosition}>
        <ColorBlock>
          <Colors>
            <p className='font-semibold'>Colors:</p>
            <span onClick={() => handleResumeColor('#E7E9EC')} className='bg-slate-200'> </span>
            <span onClick={() => handleResumeColor('#ECEDF0')} className='bg-slate-100'> </span>
            <span onClick={() => handleResumeColor('white')} className='bg-white'> </span>
          </Colors>
          <button type="button"
            className='bg-blue-400 text-white px-2 rounded hover:bg-blue-600 transition-all duration-200'
            onClick={() => handleDownloadImage()}>
            Download as Image
          </button>
        </ColorBlock>
        <Resume
          printRef={printRef}
          resumeBlockHolderWidth={resumeBlockHolderWidth}
          resumeHeaderData={resumeHeaderData} resumeEduData={resumeEduData}
          resumeExpData={resumeExpData} resumeColor={resumeColor}
          setResumeExpData={setResumeExpData}
          setResumeEduData={setResumeEduData}
          setResumeHeaderData={setResumeHeaderData}
          resumeSkillData={resumeSkillData}
          setResumeSkillData={setResumeSkillData} />
      </ResumeBlockHolder>

      {/* modals  */}
      <ModalCreateHeaderData
        setHeaderBlockModalState={setHeaderBlockModalState}
        headerBlockModalState={headerBlockModalState} />
    </div >
  );
}

export default App;

export interface FeatureBlockProps {
  width: number,
  marginLeft: number,
}

export interface ResumeBlockHolder {
  width: number,
  marginLeft: number,
  resumeBlockPosition: number
}

const NavBar = styled.div`
  width: 100%;
  height: 4rem;
`


const FeatureBlock = styled.div<FeatureBlockProps>`
  position: absolute;
  width: ${(props) => props.width}%;
  height: fit-content;
  min-height: 100%;
  z-index: 1;
  /* background-color: gainsboro; */
  margin-left: ${(props) => -props.marginLeft}%;
  transition: all;
  transition-duration: 1s;
  & span{
    width: 20px;
    height: 25px;
    right:-5px;
    top: 10px;
    position: absolute;
    cursor: pointer;
    border-radius: 50%;
    text-align: center;
  }`

const Feature = styled.div`
  /* height: auto; */
`
const ColorBlock = styled.div`
  display: flex;
  background-color: white;
  width: 100%;
  height: fit-content;
  justify-content: space-between;
  padding: .3rem;
`
const Colors = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  & span{
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    border-width: .1rem;
    border-color: black;
    cursor: pointer;
  }
`
const ResumeBlockHolder = styled.div<ResumeBlockHolder>`
  /* border-width: 5px; */
  position: absolute;
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width}px;
  height: auto;
  padding-bottom: 2rem;
  transition: all;
  transition-duration: 1s;
  /* background-color: greenyellow; */
  left:${(props) => props.marginLeft - props.resumeBlockPosition + 2}%;
`