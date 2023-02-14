import Draggable from "react-draggable";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Header } from "../../types";

interface Props {
	data: Header,
	setData: React.Dispatch<React.SetStateAction<Header[]>>,
}

const HeaderCardPlain: React.FC<Props> = (props: Props) => {
	const { data, setData } = props
	const [hoverCardState, setHoverCardState] = useState<string>('none')
	const handleHover = () => {
		// console.log("Asdasd");
		setHoverCardState(hoverCardState === 'none' ? 'flex' : 'none')
	}

	const handleDelete = (i?: string) => {
		setData(currentData => currentData.filter(data => data?.id !== i))
	}

	return <Draggable bounds="parent">
		<div onMouseLeave={handleHover} onMouseEnter={handleHover}
			className='flex flex-col p-4 cursor-default'>
			<EditBar className="z-50" display={hoverCardState}>
				<button className="editBarBtn">edit</button>
				<button onClick={() => handleDelete(data?.id)}>delete</button>
			</EditBar>
			<div className='w-full flex flex-col items-center rounded-md justify-center'>
				<p>{data?.fullName} </p>
				<div className="flex justify-between gap-2 w-full">
					<p>Contact: {data?.contact} </p>
					<p>LinkedIn: {data?.linkedIn} </p>
					<p>Github: {data?.github} </p>
					<p>Website: {data?.websit} </p>
				</div>
			</div>
		</div>
	</Draggable>
}

export default HeaderCardPlain;

interface EditBarProps {
	display: string,
}

const EditBar = styled.div<EditBarProps>`
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
