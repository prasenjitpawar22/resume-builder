import React, { useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";

import { ISkill } from "../../types";


interface Props {
    data: ISkill
    setData: React.Dispatch<React.SetStateAction<ISkill[]>>
}

const SkillCardPlain: React.FC<Props> = (props: Props) => {
    const { data, setData } = props
    const [hoverCardState, setHoverCardState] = useState<string>('none')
    const handleHover = () => {
        // console.log("Asdasd");
        setHoverCardState(hoverCardState === 'none' ? 'flex' : 'none')
    }

    const handleDelete = (i?: string) => {
        setData(currentData => currentData?.filter(data => data?.id !== i))
    }

    return <Draggable bounds="parent">
        <div onMouseLeave={handleHover} onMouseEnter={handleHover}
            className='flex flex-col p-4 cursor-default'>
            <EditBar className="z-50" display={hoverCardState}>
                <button className="editBarBtn">edit</button>
                <button onClick={() => handleDelete(data?.id)}>delete</button>
            </EditBar>
            <div className='w-full flex flex-col items-center rounded-md justify-center'>
                <h1 className="font-normal font-serif text-2xl underline underline-offset-2">
                    {data?.data}
                </h1>
                <p className="flex gap-2 font-semibold text-sm">:
                    <p className="font-normal">{data?.data}</p>
                </p>
                {/* <div className="flex justify-between gap-2 w-full flex-wrap">
					{data?.contact &&
						<p className="flex gap-2 font-semibold text-sm">Contact:
							<p className="font-normal">{data?.contact}</p>
						</p>
					}
					{data?.linkedIn &&
						<p className="flex gap-2 font-semibold text-sm">LinkedIn:
							<p className="font-normal">{data?.linkedIn}</p>
						</p>
					}
					{data?.github &&
						<p className="flex gap-2 font-semibold text-sm">Github:
							<p className="font-normal">{data?.github}</p>
						</p>
					}
					{data?.websit &&
						<p className="flex gap-2 font-semibold text-sm">Website:
							<p className="font-normal">{data?.websit}</p>
						</p>
					}
				</div> */}
            </div>
        </div>
    </Draggable>
}

export default SkillCardPlain;

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
