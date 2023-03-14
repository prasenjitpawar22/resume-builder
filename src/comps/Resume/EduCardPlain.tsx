import { useContext, useState, } from "react";
import styled from "styled-components";
import { IEducation } from "../../types";
import React from "react";
import { ResumeEduDataRequest, ResumeEduDeleteRequest } from "../../api/ResumeApi";
import { toast } from "react-toastify";
import { ResumeContext } from "../../context/ResumeContext";

interface Props {
    data: IEducation
}

const EduCardPlain: React.FC<Props> = (props: Props) => {
    const { data } = props
    const { setResumeEduData } = useContext(ResumeContext)

    const [hoverCardState, setHoverCardState] = useState('none')

    const handleHover = () => {
        setHoverCardState(hoverCardState === 'none' ? 'flex' : 'none')
    }

    const handleDelete = async (id: string) => {
        setResumeEduData!(currentData => currentData.filter(data => data?.id !== id))

        if (!id) return

        const token = localStorage.getItem('token')
        if (token) {
            const deleteResponse = await ResumeEduDeleteRequest(id)

            if (deleteResponse.status === 200) {
                // update the resume edu list
                const eduList = await ResumeEduDataRequest(token)
                if (eduList.status === 200 && eduList.data) {
                    setResumeEduData!(eduList.data)
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
    }

    return (
        <div onMouseLeave={handleHover} onMouseEnter={handleHover}
            className='flex flex-col p-4 cursor-default '>
            <EditBar className="z-50" display={hoverCardState}>
                <button className="editBarBtn">edit</button>
                <button onClick={() => handleDelete(data.id!)}>delete</button>
            </EditBar>
            <div className='w-full flex rounded-md justify-between'>
                <p>{data?.university} </p>
                <div className='flex gap-2'>
                    <p>{data?.start}</p>-
                    <p>{data?.end}</p>
                </div>
            </div>
            {/* <ul className='list-disc px-4 mt-2'>
                {data?.?.map(d =>
                    <li>
                        {d}
                    </li>
                )}
            </ul> */}
        </div>
    );
}

export default EduCardPlain;

interface EditBarProps {
    display: string
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
