import React, { useState, useContext } from "react";
import styled from "styled-components";
import { MdOutlineDelete } from 'react-icons/md'

import { IHeader } from "../../types";
import { ResumeHeaderDataRequest, ResumeHeaderDeleteRequest } from "../../api/ResumeApi";
import { ResumeContext } from "../../context/ResumeContext";
import { toast } from "react-toastify";

interface Props {
	// data: IHeader,
}

const SimpleResumeHeaderCard: React.FC<Props> = () => {

	const { resumeHeaderData, setResumeHeaderData } = useContext(ResumeContext)

	// handle remove 
	const handleRemove = async (id?: string) => {
		if (!id) return
		const token = localStorage.getItem('token')
		if (token) {
			const deleteResponse = await ResumeHeaderDeleteRequest(id, token)
			if (deleteResponse.status === 200) {
				// update the resume header list
				const headerList = await ResumeHeaderDataRequest(token)
				if (headerList.status === 200 && headerList.data) {
					setResumeHeaderData!(headerList.data)
					toast.success("removed", { autoClose: 1000, hideProgressBar: true })
				}
				if (headerList.error) {
					console.log("error getting header list", headerList.error);
					toast.warning('error deleting')
				}
			}
			if (deleteResponse.error) {
				console.log('error deleting the header', deleteResponse.error);
				toast.warning('error deleting')
			}
		}
	}

	return (<>
		{
			resumeHeaderData && resumeHeaderData.length > 0 ?
				resumeHeaderData.map((header) =>
					<Block key={header.id!}
						className="relative"
					// className="relative hover:after:content-['x'] after:absolute after:top-0 after:right-0
					//     after:
					// "
					>
						<h1 className='simple-resume-h1'>
							{header.fullname}
						</h1>
						<h3 className='simple-resume-h3'>Title</h3>
						<h6 className='simple-resume-h6'>
							{`Atlanta, USA +91-${header.contact} firstemail@email.com`}
						</h6>
						<p className='simple-resume-p'>
							is simply dummy text of the printing and typesetting industry.
							Lorem Ipsum has been the industry's standard dummy text ever since the
							1500s, when an unknown printer took a galley of type and scrambled it to
							make a type specimen book. It has survived not only five centuries, but
							also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
							like Aldus PageMaker including versions of Lorem Ipsum
						</p>
						<RemoveDiv
							className='absolute right-0 top-0 px-3 rounded-md hidden'>
							<MdOutlineDelete className={header.id} size={20} cursor="pointer"
								onClick={() => handleRemove(header?.id)} />
						</RemoveDiv>
					</Block>
				) :
				<div className='opacity-40'>
					<h1 className='simple-resume-h1'>
						First Name
					</h1>
					<h3 className='simple-resume-h3'>Title</h3>
					<h6 className='simple-resume-h6'>
						Atlanta, USA 5555-222-12121 firstemail@email.com
					</h6>
					<p className='simple-resume-p'>
						is simply dummy text of the printing and typesetting industry.
						Lorem Ipsum has been the industry's standard dummy text ever since the
						1500s, when an unknown printer took a galley of type and scrambled it to
						make a type specimen book. It has survived not only five centuries, but
						also the leap into electronic typesetting, remaining essentially unchanged.
						It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
						like Aldus PageMaker including versions of Lorem Ipsum
					</p>
				</div>
		}
	</>)


}

export default SimpleResumeHeaderCard;

type BlockProps = {
	key: string
}
const RemoveDiv = styled.div`
`

const Block = styled.div<BlockProps>`
	&:hover ${RemoveDiv} {
		display: block;
	}
`