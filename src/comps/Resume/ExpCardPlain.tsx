import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Experience } from "../../types";
import { ResumeContext } from "../../context/ResumeContext";
import { ResumeExpDataRequest, ResumeExpDeleteRequest } from "../../api/ResumeApi";
import { toast } from "react-toastify";

interface Props {
  data: Experience
}

const ExpCardPlain: React.FC<Props> = (props: Props) => {
  const { data } = props
  const { setResumeExpData } = useContext(ResumeContext)

  const [hoverCardState, setHoverCardState] = useState('none')
  const handleHover = () => {
    // console.log("Asdasd");
    setHoverCardState(hoverCardState === 'none' ? 'flex' : 'none')
  }

  const handleDelete = async (id: string) => {
    setResumeExpData!(currentData => currentData.filter(data => data?._id !== id))

    if (!id) return
    const deleteResponse = await ResumeExpDeleteRequest(id)

    if (deleteResponse.status === 200) {
      // update the resume edu list
      const eduList = await ResumeExpDataRequest()
      if (eduList.status === 200 && eduList.data) {
        setResumeExpData!(eduList.data)
        console.log('this is edu resume list', eduList);
      }
      if (eduList.error) {
        console.log("error getting edu list", eduList.error);
        toast.warning('unable to delete data')
      }
    }
    if (deleteResponse.error) {
      console.log('error deleting the edu', deleteResponse.error);
      toast.warning('unable to delete data')
    }
  }

  return (
    <div onMouseLeave={handleHover} onMouseEnter={handleHover}
      className='flex flex-col p-4 cursor-default'>
      {/* <div className={hoverCardState + " gap-2 absolute -mt-10"}> */}
      <EditBar className="z-10" display={hoverCardState}>
        <button className="">edit</button>
        <button onClick={() => handleDelete(data._id!)}>delete</button>
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
      {
        data?.description?.length! > 0 &&
        <ul className='list-disc px-4 mt-2'>
          {data?.description?.map(d =>
            <li>
              {d}
            </li>
          )}
        </ul>}
    </div>
  );
}

export default ExpCardPlain;

interface EditBarProps {
  display: string
}
const EditBar = styled.div<EditBarProps>`
	gap: 0.5rem;
	position: absolute;
	right: 0px;
	margin-top: -2.5rem;
	background-color: burlywood;
	padding-left: 12px;
	padding-right: 12px;
	display: ${(props) => props.display};
`
