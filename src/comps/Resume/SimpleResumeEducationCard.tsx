import { useContext, useState, } from "react";
import styled from "styled-components";
import moment from "moment";
import { MdOutlineDelete } from "react-icons/md";

import React from "react";
import { toast } from "react-toastify";
import { ResumeContext } from "../../context/ResumeContext";
import { ResumeEduDataRequest, ResumeEduDeleteRequest } from "../../api/ResumeApi";

interface Props {
    // data: IEducation
}

const SimpleResumeEducationCard: React.FC<Props> = () => {
    const { setResumeEduData, resumeEduData } = useContext(ResumeContext)


    // handle remove 
    const handleRemove = async (id: string) => {
        const token = localStorage.getItem('token')
        if (token) {
            const deleteResponse = await ResumeEduDeleteRequest(id, token)
            if (deleteResponse.status === 200) {
                // update the resume experience list
                const educationResponse = await ResumeEduDataRequest(token)
                if (educationResponse.status === 200 && educationResponse.data) {
                    setResumeEduData!(educationResponse.data)
                    toast.success("removed", { autoClose: 1000, hideProgressBar: true })
                }
                if (educationResponse.error) {
                    console.log("error getting experience list", educationResponse.error);
                    toast.warning('error deleting')
                }
            }
            if (deleteResponse.error) {
                console.log('error deleting the experience', deleteResponse.error);
                toast.warning('error deleting')
            }
        }
    }

    return (<>
        {
            resumeEduData && resumeEduData.length > 0 ?
                resumeEduData.map((education) =>
                    <Block key={education.id!} className="relative" >
                        <h3 className='simple-resume-h3'>Degree</h3>
                        <div className="flex items-baseline gap-2">
                            <h4 className='simple-resume-h4'>{education.university},</h4>
                            <h6 className="simple-resume-h4">{education.location}</h6>
                        </div>
                        <h6 className='simple-resume-h6'>
                            {moment(education.start).format('MMMM YY')}
                            {education.current ? ' to Present' : ' to ' + moment(education.end).format('MMMM YY')}
                        </h6>
                        <RemoveDiv
                            className='absolute right-0 top-0 px-3 rounded-md hidden'>
                            <MdOutlineDelete className={education.id} size={20} cursor="pointer"
                                onClick={() => handleRemove(education.id!)} />
                        </RemoveDiv>
                    </Block>
                ) :
                <div className="opacity-40">
                    <h3 className='simple-resume-h3'>Software Engineer</h3>
                    <h4 className='simple-resume-h4'>New Company</h4>
                    <h6 className='simple-resume-h6'>January 2018 to Present </h6>
                </div>
        }
    </>)
}

export default SimpleResumeEducationCard;

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