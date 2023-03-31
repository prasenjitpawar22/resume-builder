import React, { useContext } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { ResumeContext } from '../../context/ResumeContext'
import { FormsTypes } from '../../types'

interface Props {
    title: string
    cardDataType: string
}

const ResumeFormDataCard = (props: Props) => {
    const { title, cardDataType } = props

    const { resumeEduData } = useContext(ResumeContext)

    return (
        <div className='flex flex-col gap-2 w-full bg-white rounded shadow px-6 py-4 h-fit'>
            <div className='py-6 border-b flex items-center gap-1'>
                <h1 className='text-primary capitalize font-extrabold'>{title}</h1>
                <BiChevronDown />
            </div>
            {cardDataType === FormsTypes.education ? <h1> edu </h1>
                : cardDataType === FormsTypes.education ? <h1>skills</h1>
                    : cardDataType === FormsTypes.certifications ? <h1>certication</h1>
                        : cardDataType === FormsTypes.experience ? <h1>experince</h1>
                            : ''}
        </div>
    )
}

export default ResumeFormDataCard