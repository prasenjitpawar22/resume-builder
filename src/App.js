import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import data from './data';
import ExpCardPlain from './comps/Resume/ExpCardPlain';
import EduCardPlain from './comps/Resume/EduCardPlain';
import DropDownList from './comps/DropDownList';
import FeatureEduCardPlain from './comps/FeatureEduCardPlain';
import FeatureExpCardPlain from './comps/FeatureExpCardPlain';
import FeatureHeaderCardPlain from './comps/FeatureHeaderCardPlain';
import { IoIosResize } from 'react-icons/io'
import {BiChevronsRight, BiChevronsLeft} from 'react-icons/bi'
import HeaderCardPlain from './comps/Resume/HeaderCardPlain';

function App() {

  const [leftBlockWidth, setLeftBlockWidth] = useState(30)
  const [leftBlockMargin, setLeftBlockMargin] = useState(0)
  const [resumeBlockPosition, setResumeBlockPosition] = useState(0)
  const [resumeExpData, setResumeExpData] = useState([])
  const [resumeEduData, setResumeEduData] = useState([])
  const [resumeHeaderData, setResumeHeaderData] = useState([])

  const [resumeBlockHolderWidth, setResumeBlockHolderWidth] = useState(550)

  const [headerBlockState, setHeaderBlockState] = useState(false)
  const [eduBlockState, setEduBlockState] = useState(false)
  const [expBlockState, setExpBlockState] = useState(false)

  const [resumeColor, setResumeColor] = useState('#E7E9EC');
  const [headerSize, setheaderSize] = useState({ x: 550, y: 100 });
  const [EduSize, setEduSize] = useState({ x: 550, y: 200 });

  const handleLeftBlock = () => {
    setLeftBlockMargin(leftBlockMargin === leftBlockWidth ? 0 : leftBlockWidth)
    setResumeBlockPosition(resumeBlockPosition === 0 ? 10 : 0)
    console.log(leftBlockMargin);
  }

  useEffect(() => {
    console.log(headerSize)
  }, [headerSize])


  const handleResumeColor = (color) => {
    setResumeColor(color)
  }
  const handleHeaderResize = (mouseDownEvent) => {
    console.log(mouseDownEvent);
    const startSize = headerSize;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

    function onMouseMove(mouseMoveEvent) {
      let newX = startSize.x - startPosition.x + mouseMoveEvent.pageX
      let newY = startSize.y - startPosition.y + mouseMoveEvent.pageY
      if(newX >= resumeBlockHolderWidth){
        console.log('innnnnn');
        return
      }
      if(newY>= 200){
        console.log('innnnnn');
        return
      }
      setheaderSize(currentSize => ({
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
  const handleEduResize = (mouseDownEvent) => {
    
    const startSize = EduSize;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

    function onMouseMove(mouseMoveEvent) {
      let newX = startSize.x - startPosition.x + mouseMoveEvent.pageX
      let newY = startSize.y - startPosition.y + mouseMoveEvent.pageY

      if(newX >= resumeBlockHolderWidth){
        console.log('innnnnn');
        return
      }
      if(newY>= 200){
        console.log('innnnnn');
        return
      }

      setEduSize(currentSize => ({
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

  useEffect(() => {
    console.log(resumeExpData);
  }, [resumeExpData])

  useEffect(() => {
    console.log(resumeExpData);
  }, [resumeExpData])

  return (
    <div className="App">
      <FeatureBlock className='shadow-violet-600 shadow-2xl bg-slate-100 ' width={leftBlockWidth} marginLeft={leftBlockMargin}>
        <h1 className='text-3xl font-semibold text-center'>Features</h1>
        <span onClick={handleLeftBlock}>
          {leftBlockMargin === 0? <BiChevronsLeft size={40} />: <BiChevronsRight size={40}/>}
        </span>
        <Feature>
          <DropDownList setBlockState={setHeaderBlockState} blockState={headerBlockState} title={'Header Block'} />
          {
            <FeatureHeaderCardPlain 
              headerBlockState={headerBlockState}
              resumeHeaderData={resumeHeaderData} setResumeHeaderData={setResumeHeaderData}
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
          <DropDownList title={'Skills Block'} />
          <DropDownList title={'Other Block'} />
        </Feature>
      </FeatureBlock>

      <ResumeBlockHolder
        width={resumeBlockHolderWidth}
        marginLeft={leftBlockWidth}
        resumeBlockPosition={resumeBlockPosition}>
        <ColorBlock>
          <Colors>
            <span onClick={() => handleResumeColor('#E7E9EC')} className='bg-slate-200'> </span>
            <span onClick={() => handleResumeColor('#ECEDF0')} className='bg-slate-100'> </span>
            <span onClick={() => handleResumeColor('white')} className='bg-white'> </span>
          </Colors>
        </ColorBlock>
        <Resume className='shadow-2xl' resumeColor={resumeColor}>
          {/* header  */}
          <Header maxWidth={resumeBlockHolderWidth} height={headerSize.y} width={headerSize.x} bgColor={resumeColor} className='border-dashed hover:border border-slate-500'>
            <span className='shadow-md p-2'>Header</span>
            {resumeHeaderData.length > 0 && resumeHeaderData?.map(data =>
              <HeaderCardPlain data={data} setData={setResumeHeaderData} />
            )}
            <button className='reSizeBtn' onMouseDown={handleHeaderResize}><IoIosResize /></button>
          </Header>
          {/* edu  */}
          <Education height={EduSize.y} width={EduSize.x} bgColor={resumeColor} className='border-dashed hover:border border-slate-500'>
            <span className='shadow-md p-2'>Education</span>
            {resumeEduData.length > 0 && resumeEduData?.map(data =>
              <EduCardPlain data={data} setData={setResumeEduData} />
            )}
            <button className='reSizeBtn' onMouseDown={handleEduResize}><IoIosResize /></button>
          </Education>
          {/* exp  */}
          {resumeExpData.length > 0 && resumeExpData?.map(data =>
            <ExpCardPlain data={data} setData={setResumeExpData} />
          )}

        </Resume>
      </ResumeBlockHolder>
    </div>
  );
}

export default App;

const FeatureBlock = styled.div`
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
  justify-content: center;
  padding: .3rem;
`
const Colors = styled.div`
  display: flex;
  gap: 2rem;
  & span{
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    border-width: .1rem;
    border-color: black;
    cursor: pointer;
  }
`

const ResumeBlockHolder = styled.div`
  /* border-width: 5px; */
  position: absolute;
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width}px;
  height: 99vh;
  transition: all;
  transition-duration: 1s;
  background-color: greenyellow;
  left:${(props) => props.marginLeft - props.resumeBlockPosition + 2}%;
`

const Resume = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.resumeColor};
  transition: all;
  transition-duration: 1s;
`
const Header = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  margin-bottom: 12px;
  /* max-width: ${(props) => props.maxWidth}px;
  max-height: 200px; */
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

const Education = styled.div`
  width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    /* max-width: 100%; calulate resume h-w
    max-height: 100px; */
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