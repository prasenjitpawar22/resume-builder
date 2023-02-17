import Draggable from "react-draggable";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Header } from "../../types";
import axios from "axios";
import { resumeClient } from "../../api/axiosClient";

interface Props {
	data: Header,
	setData: React.Dispatch<React.SetStateAction<Header[] | undefined>>,
}

const HeaderCardPlain: React.FC<Props> = (props: Props) => {
	const { data, setData } = props
	const nodeRef = useRef(null)
	const [hoverCardState, setHoverCardState] = useState<string>('none')
	const handleHover = () => {
		// console.log("Asdasd");
		setHoverCardState(hoverCardState === 'none' ? 'flex' : 'none')
	}

	const handleDelete = async (i?: string) => {
		setData(currentData => currentData?.filter(data => data?.id !== i))
		resumeClient.delete('delete-resume-header', {
			data: { id: i }
		}).then((res) => {
			alert(res.data)
		}).catch((error) => {
			console.log(error);
		})
	}

	return <Draggable nodeRef={nodeRef} bounds="parent">
		<div onMouseLeave={handleHover} onMouseEnter={handleHover}
			className='flex flex-col p-4 cursor-default'>
			<EditBar className="z-50" display={hoverCardState}>
				<button className="editBarBtn">edit</button>
				<button onClick={() => handleDelete(data?.id)}>delete</button>
			</EditBar>
			<div className='w-full flex flex-col items-center rounded-md justify-center'>
				<h1 className="font-normal font-serif text-2xl underline underline-offset-2">
					{data?.fullname}
				</h1>
				<div className="flex justify-between gap-2 w-full flex-wrap flex-col">
					{data?.contact &&
						<p className="flex gap-2 font-semibold text-sm">Contact:
							<HeaderTextSpan className="font-normal">{data?.contact}</HeaderTextSpan>
						</p>
					}
					{data?.linkedin &&
						<p className="flex gap-2 font-semibold text-sm">Linkedin:
							<HeaderTextSpan className="font-normal">{data?.linkedin}</HeaderTextSpan>
						</p>
					}
					{data?.github &&
						<p className="flex gap-2 font-semibold text-sm">Github:
							<HeaderTextSpan className="font-normal">{data?.github}</HeaderTextSpan>
						</p>
					}
					{data?.websit &&
						<p className="flex gap-2 font-semibold text-sm">Website:
							<HeaderTextSpan className="font-normal">{data?.websit}</HeaderTextSpan>
						</p>
					}
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

const HeaderTextSpan = styled.div`
	position: relative;
` 
