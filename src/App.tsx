import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import data from './data';
import DropDownList from './comps/DropDownList';
import FeatureEduCardPlain from './comps/Features/FeatureEduCardPlain';
import FeatureExpCardPlain from './comps/Features/FeatureExpCardPlain';
import FeatureHeaderCardPlain from './comps/Features/FeatureHeaderCardPlain';
import { BiChevronsRight, BiChevronsLeft } from 'react-icons/bi'
import ModalCreateHeaderData from './comps/Models/ModalCreateHeaderData';
import FeatureSkillCardPlain from './comps/Features/FeatureSkillCardPlain';
import { Resume } from './comps/Resume/Resume';
import { ResumeContext } from './context/ResumeContext';
import { resumeClient } from './api/axiosClient';
import ModalCreateEduData from './comps/Models/ModalCreateEduData';
import ModelCreateExpData from './comps/Models/ModelCreateExpData';
import ResumeBuildSidebar from './comps/sidebar/ResumeBuildSidebar';

const App: React.FC = () => {

  const { resumeBlockHolderWidth, resumeHeaderData, setResumeHeaderData,
    resumeExpData, setResumeExpData, setResumeColor, resumeEduData, setResumeEduData,
    resumeSkillData, setResumeSkillData } = useContext(ResumeContext)
  const navigate = useNavigate();

  // const [leftBlockWidth, setLeftBlockWidth] = useState<number>(410)
  const [leftBlockMargin, setLeftBlockMargin] = useState(0)
  const [resumeBlockPosition, setResumeBlockPosition] = useState(0)
  // const [headerBlockState, setHeaderBlockState] = useState(false)
  // const [eduBlockState, setEduBlockState] = useState(false)
  // const [expBlockState, setExpBlockState] = useState<boolean>(false)
  // const [skillBlockState, setSkillBlockState] = useState(false)
  const [headerBlockModalState, setHeaderBlockModalState] = useState<boolean>(true)
  // const [eduBlockModalState, setEduBlockModalState] = useState<boolean>(false)
  // const [expBlockModalState, setExpBlockModalState] = useState<boolean>(false)

  const handleLeftBlock = () => {
    setLeftBlockMargin(leftBlockMargin === 0 ? 30 : 0)
    setResumeBlockPosition(resumeBlockPosition === 0 ? 10 : 0)
    console.log(leftBlockMargin);
  }

  const handleResumeColor = (color: string) => {
    setResumeColor!(color)
  }

  // useEffect(() => {
  //   console.log('teadasda ', leftBlockWidth);
  // }, [leftBlockWidth])

  useEffect(() => {
    console.log(headerBlockModalState);
  }, [headerBlockModalState])

  const handleDownloadImage = async () => {
    // const element = printRef.current;
    // const canvas = await html2canvas(element!);

    // const data = canvas.toDataURL('image/jpg');
    // const link = document.createElement('a');

    // if (typeof link.download === 'string') {
    //   link.href = data;
    //   link.download = 'image.jpg';

    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // } else {
    //   window.open(data);
    // }

    // backedn
    await resumeClient.get("./download-resume")
      .then((res) => console.log(res))
      .catch((e) => console.log(e))
    // navigate('/download-resume')
  };
  return (
    <div className="App">
      {/* <FeatureBlock className='shadow-violet-600 shadow-2xl bg-slate-100'
        width={leftBlockWidth!} marginLeft={leftBlockMargin}>
        <div className='flex items-center px-8 gap-4 mt-2 bg-violet-300
         rounded ml-2 py-2 mr-2'>
          <h1 className='text-[64px] leading-[77px] text-[#434343] 
             font-Lato font-[800] drop-shadow-[rgba(0, 0, 0, 0.25)]'>Resume Builder</h1>
        </div>
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
              setResumeHeaderData={setResumeHeaderData!}
            // data={data.header}
            />
          }
          <DropDownList
            setEduBlockModalState={setEduBlockModalState}
            setBlockState={setEduBlockState} blockState={eduBlockState} title={'Education Block'} />
          {
            // eduBlockState &&
            <FeatureEduCardPlain eduBlockState={eduBlockState} />
          }
          <DropDownList
            setExpBlockModalState={setExpBlockModalState}
            setBlockState={setExpBlockState} blockState={expBlockState} title={'Experience Block'} />
          {
            // expBlockState &&
            <FeatureExpCardPlain
              expBlockState={expBlockState}
            />
          }
          <DropDownList setBlockState={setSkillBlockState} blockState={skillBlockState} title={'Skills Block'} />
          <FeatureSkillCardPlain
            skillBlockState={skillBlockState}
            resumeSkillData={resumeSkillData} setResumeSkillData={setResumeSkillData!}
            data={data.skill} />
          <DropDownList title={'Other Block'} />
        </Feature>
      </FeatureBlock> */}

      {/* <ResumeBlockHolder
        width={resumeBlockHolderWidth!}
        marginLeft={leftBlockWidth!}
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
        <Resume />
      </ResumeBlockHolder> */}


      <ResumeBuildSidebar />

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
  width: ${(props) => props.width}px;
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
  left:${(props) => props.marginLeft - props.resumeBlockPosition + 40}px;
`