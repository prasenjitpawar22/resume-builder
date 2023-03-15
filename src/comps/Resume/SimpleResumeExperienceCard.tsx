import React, { useState, useContext } from "react";
import { MdOutlineDelete } from 'react-icons/md'
import styled from "styled-components";
import moment from "moment";

import { ResumeContext } from "../../context/ResumeContext";
import { ResumeExpDataRequest, ResumeExpDeleteRequest } from "../../api/ResumeApi";
import { toast } from "react-toastify";

interface Props {
}

const SimpleResumeExperienceCard: React.FC<Props> = () => {
  // const { data } = props
  const { resumeExpData, setResumeExpData } = useContext(ResumeContext)

  const [hoverCardState, setHoverCardState] = useState('none')
  const handleHover = () => {
    // console.log("Asdasd");
    setHoverCardState(hoverCardState === 'none' ? 'flex' : 'none')
  }

  // handle remove 
  const handleRemove = async (id: string) => {
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
  }

  return (<>
    {
      resumeExpData && resumeExpData.length > 0 ?
        resumeExpData.map((experience) =>
          <Block key={experience.id!}
            className="relative"
          // className="relative hover:after:content-['x'] after:absolute after:top-0 after:right-0
          //     after:
          // "
          >
            <h3 className='simple-resume-h3'>{experience.position}</h3>
            <h4 className='simple-resume-h4'>{experience.start}</h4>
            <h6 className='simple-resume-h6'>
              {moment(experience.start).format('MMMM YY')}
              {experience.current ? ' to Present' : ' to ' + moment(experience.end).format('MMMM YY')}
            </h6>
            <p className='simple-resume-p'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It
            </p>
            <RemoveDiv
              className='absolute right-0 top-0 px-3 rounded-md hidden'>
              <MdOutlineDelete className={experience.id} size={20} cursor="pointer"
                onClick={() => handleRemove(experience.id!)} />
            </RemoveDiv>
          </Block>
        ) :
        <div className="opacity-50">
          <h3 className='simple-resume-h3'>New Position</h3>
          <h4 className='simple-resume-h4'>New Company</h4>
          <h6 className='simple-resume-h6'>January 2018 to Present </h6>
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
  key: string
}
const RemoveDiv = styled.div`
`

const Block = styled.div<BlockProps>`
	&:hover ${RemoveDiv} {
		display: block;
	}
`