import Draggable from "react-draggable";
import { useState, useEffect } from "react";
import styled from "styled-components";

const ExpCardPlain = (props) => {
	const { data, setData } = props
	const [hoverCardState, setHoverCardState] = useState('none')
	const handleHover = () => {
		// console.log("Asdasd");
		setHoverCardState(hoverCardState == 'none' ? 'flex' : 'none')
	}

	const handleDelete = (i) => {
		setData(currentData => currentData.filter(data => data.id !== i))
	}

	return (
		<Draggable key={data.id} bounds="parent">
			<div onMouseLeave={handleHover} onMouseEnter={handleHover}
				className='flex flex-col p-4 cursor-default'>
				{/* <div className={hoverCardState + " gap-2 absolute -mt-10"}> */}
				<EditBar className="z-10" display={hoverCardState}>
					<button className="">edit</button>
					<button onClick={() => handleDelete(data.id)}>delete</button>
				</EditBar>
				{/* </div> */}
				<div className='w-full flex rounded-md  justify-between'>
					<p>{data?.position} </p>
					<p>{data?.company} </p>
					<div className='flex gap-2'>
						<p>{data?.start}</p>-
						<p>{data?.end}</p>
					</div>
				</div>
				<ul className='list-disc px-4 mt-2'>
					{data?.desc?.map(d =>
						<li>
							{d}
						</li>
					)}
				</ul>
			</div>
		</Draggable>
	);
}

export default ExpCardPlain;

const EditBar = styled.div`
	gap: 0.5rem;
	position: absolute;
	right: 0px;
	margin-top: -2.5rem;
	background-color: burlywood;
	padding-left: 12px;
	padding-right: 12px;
	display: ${(props) => props.display};
`
