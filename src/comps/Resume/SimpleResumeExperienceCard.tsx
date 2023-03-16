import React, { useState, useContext, useEffect } from "react";
import { MdOutlineDelete } from 'react-icons/md'
import styled from "styled-components";
import moment from "moment";
import { ClipLoader } from "react-spinners";

import { ResumeContext } from "../../context/ResumeContext";
import { ResumeExpDataRequest, ResumeExpDeleteRequest } from "../../api/ResumeApi";
import { toast } from "react-toastify";

interface Props {
}

const SimpleResumeExperienceCard: React.FC<Props> = () => {
  // const { data } = props
  const { resumeExpData, setResumeExpData } = useContext(ResumeContext)
  const [deleteLoader, setDeleteLoader] =
    useState<{ state: boolean, index: number }>({ state: false, index: -1 })


  // handle remove 
  const handleRemove = async (id: string, index: number) => {
    setDeleteLoader({ state: true, index })
    const token = localStorage.getItem('token')
    if (token) {
      const deleteResponse = await ResumeExpDeleteRequest(id, token)
      if (deleteResponse.status === 200) {
        // update the resume experience list
        const experienceList = await ResumeExpDataRequest(token)
        if (experienceList.status === 200 && experienceList.data) {
          setResumeExpData!(experienceList.data)
          toast.success("removed", { autoClose: 1000, hideProgressBar: true })
        }
        if (experienceList.error) {
          console.log("error getting experience list", experienceList.error);
          toast.warning('error deleting')
        }
      }
      if (deleteResponse.error) {
        console.log('error deleting the experience', deleteResponse.error);
        toast.warning('error deleting')
      }
    }
    setDeleteLoader({ state: false, index: -1 })
  }

  return (<>
    {
      resumeExpData && resumeExpData.length > 0 ?
        resumeExpData.map((experience, index) =>
          <Block key={index} className="relative">
            <h3 className='simple-resume-h3'>{experience.position}</h3>
            <h4 className='simple-resume-h4'>{experience.company}</h4>
            <h6 className='simple-resume-h6'>
              {moment(experience.start).format('MMMM YY')}
              {experience.current ? ' to Present' : ' to ' + moment(experience.end).format('MMMM YY')}
            </h6>
            <p className='simple-resume-p'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It
            </p>

            {deleteLoader.state && deleteLoader.index === index ?
              <ClipLoader id={experience.id} size={20} className={`absolute right-3 top-0`} /> :
              <RemoveDiv className='absolute right-0 top-0 px-3 rounded-md hidden'>
                <MdOutlineDelete className={experience.id} size={20} cursor="pointer"
                  onClick={() => handleRemove(experience.id!, index)} />
              </RemoveDiv>}
          </Block>
        ) :
        <div className="opacity-40">
          <h3 className='simple-resume-h3'>New Position</h3>
          <h4 className='simple-resume-h4'>New Company</h4>
          <h6 className='simple-resume-h6'>January 2018 to Present</h6>
          <p className='simple-resume-p'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It
          </p>
        </div>
    }
  </>)
}

export default SimpleResumeExperienceCard;

type BlockProps = {
  key: number
}
const RemoveDiv = styled.div`
`

const Block = styled.div<BlockProps>`
	&:hover ${RemoveDiv} {
		display: block;
	}
`