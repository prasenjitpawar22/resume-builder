import Draggable from "react-draggable";
import { useState, useEffect } from "react";
import styled from "styled-components";

const HeaderCardPlain = (props) => {
	const { data, setData } = props
	const [hoverCardState, setHoverCardState] = useState('none')
	const handleHover = () => {
		// console.log("Asdasd");
		setHoverCardState(hoverCardState === 'none' ? 'flex' : 'none')
	}

	const handleDelete = (i) => {
		setData(currentData => currentData.filter(data => data.id !== i))
	}

	return (
		<Draggable bounds="parent">
			<div onMouseLeave={handleHover} onMouseEnter={handleHover}
				className='flex flex-col p-4 cursor-default'>
				<EditBar className="z-50" display={hoverCardState}>
					<button className="editBarBtn">edit</button>
					<button onClick={() => handleDelete(data.id)}>delete</button>
				</EditBar>
				<div className='w-full flex rounded-md justify-center'>
					<p>{data?.fullName} </p>
				</div>
			</div>
		</Draggable>
	);
}

export default HeaderCardPlain;

const EditBar = styled.div`
    display: flex;
	gap: 0.5rem;
	position: absolute;
	right: -6rem;
	background-color: burlywood;
	padding-left: 12px;
	padding-right: 12px;
	display: ${(props) => props.display};
    > .editBarBtn{
        position: relative;
        display: flex;
    }
`
