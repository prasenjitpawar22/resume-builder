import React, { useState } from 'react'
import styled from 'styled-components';
import { Page, Text, View, Document, StyleSheet, MyDocument, PDFViewer } from '@react-pdf/renderer';
import ExpCardPlain from './ExpCardPlain'
import EduCardPlain from './EduCardPlain';
import Draggable from 'react-draggable';
import { IoIosResize } from 'react-icons/io'
import HeaderCardPlain from './HeaderCardPlain';
import html2canvas from 'html2canvas';

export default function Resume(props) {
	const {
		resumeColor, resumeBlockHolderWidth,
		resumeHeaderData, setResumeHeaderData, resumeEduData, setResumeEduData,
		resumeExpData, setResumeExpData } = props

	const printRef = React.useRef();

	const [headerSize, setheaderSize] = useState({ x: 550, y: 100 });
	const [EduSize, setEduSize] = useState({ x: 550, y: 200 });
	const [expSize, setExpSize] = useState({ x: 550, y: 200 });

	const [headerResizeState, setHeaderResizeState] = useState(false)
	const [expResizeState, setExpResizeState] = useState(false)
	const [eduResizeState, setEduResizeState] = useState(false)

	const handleHeaderResize = (mouseDownEvent) => {
		console.log(mouseDownEvent);
		const startSize = headerSize;
		const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

		function onMouseMove(mouseMoveEvent) {
			let newX = startSize.x - startPosition.x + mouseMoveEvent.pageX
			let newY = startSize.y - startPosition.y + mouseMoveEvent.pageY
			if (newX >= resumeBlockHolderWidth) {
				console.log('innnnnn');
				return
			}
			if (newY >= 200) {
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

			if (newX >= resumeBlockHolderWidth) {
				console.log('innnnnn');
				return
			}
			if (newY >= 200) {
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

	const handleExpResize = (mouseDownEvent) => {
		const startSize = expSize;
		const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

		function onMouseMove(mouseMoveEvent) {
			let newX = startSize.x - startPosition.x + mouseMoveEvent.pageX
			let newY = startSize.y - startPosition.y + mouseMoveEvent.pageY

			if (newX >= resumeBlockHolderWidth) {
				console.log('innnnnn');
				return
			}
			if (newY >= 500) {
				console.log('innnnnn');
				return
			}

			setExpSize(currentSize => ({
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

	const handleDownloadImage = async () => {
		const element = printRef.current;
		const canvas = await html2canvas(element);

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
		<>
			<ResumeDiv ref={printRef} className='shadow-2xl' resumeColor={resumeColor}>
				{/* header  */}
				<Header
					onMouseLeave={() => setHeaderResizeState(false)}
					onMouseEnter={() => setHeaderResizeState(true)}
					maxWidth={resumeBlockHolderWidth} height={headerSize.y} width={headerSize.x} bgColor={resumeColor} className='border-dashed hover:border border-slate-500'>
					<span className='shadow-md p-2'>Header</span>
					{resumeHeaderData.length > 0 && resumeHeaderData?.map(data =>
						<HeaderCardPlain data={data} setData={setResumeHeaderData} />
					)}
					{headerResizeState &&
						<button className='reSizeBtn' onMouseDown={handleHeaderResize}>
							<IoIosResize />
						</button>}
				</Header>
				{/* edu  */}
				<Education
					onMouseLeave={() => setEduResizeState(false)}
					onMouseEnter={() => setEduResizeState(true)}
					height={EduSize.y} width={EduSize.x} bgColor={resumeColor} className='border-dashed hover:border border-slate-500'>
					<span className='shadow-md p-2'>Education</span>
					{resumeEduData.length > 0 && resumeEduData?.map(data =>
						<EduCardPlain data={data} setData={setResumeEduData} />
					)}
					{eduResizeState &&
						<button className='reSizeBtn' onMouseDown={handleEduResize}><IoIosResize /></button>
					}
				</Education>
				{/* exp  */}
				<Experience
					onMouseLeave={() => setExpResizeState(false)}
					onMouseEnter={() => setExpResizeState(true)}
					height={expSize.y} width={expSize.x} bgColor={resumeColor} className='border-dashed hover:border border-slate-500'>
					<span className='shadow-md p-2'>Experience</span>
					{resumeExpData.length > 0 && resumeExpData?.map(data =>
						<ExpCardPlain data={data} setData={setResumeExpData} />
					)}
					{expResizeState &&
						<button className='reSizeBtn' onMouseDown={handleExpResize}><IoIosResize /></button>
					}
				</Experience>
			</ResumeDiv>
			<button type="button" onClick={handleDownloadImage}>
				Download as Image
			</button>
		</>
	)
}


const ResumeDiv = styled.div`
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
    margin-bottom: 12px;
    position: relative;
    & span{
      position: absolute;
      right: -6.5rem;
      background-color: ${(props) => props.bgColor};
    }
    .reSizeBtn{
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(50%, 50%);
    }
`

const Experience = styled.div`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    margin-bottom: 12px;
    position: relative;
    & span{
      position: absolute;
      right: -6.5rem;
      background-color: ${(props) => props.bgColor};
    }
    .reSizeBtn{
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(50%, 50%);
    }
`