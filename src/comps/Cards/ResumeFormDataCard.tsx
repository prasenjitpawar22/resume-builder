import React, { useContext, useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { formClient } from '../../api/axiosClient'
import { getAllEducations, getAllSkills } from '../../api/FormsApi'
import { FormsDataContext } from '../../context/FormsDataContext'
import { ResumeContext } from '../../context/ResumeContext'
import { Education, FormsTypes, Skills } from '../../types'
import { motion } from 'framer-motion'

interface Props {
    title: string
    cardDataType: string

    setUpdateSkillFormState?: React.Dispatch<React.SetStateAction<boolean>>
    setUpdateEducationFormState?: React.Dispatch<React.SetStateAction<boolean>>

    setSkillFormData?: React.Dispatch<React.SetStateAction<Skills>>
    setEducationFormData?: React.Dispatch<React.SetStateAction<Education>>


    disableEducationbtnCard?: {
        type: {
            education: boolean;
        };
        index: number;
    }
    setDisableEducationbtnCard?: React.Dispatch<React.SetStateAction<{
        type: {
            education: boolean;
        };
        index: number;
    }>>
    disablebtnCard?: {
        type: {
            skill: boolean;
        };
        index: number;
    }
    setDisablebtnCard?: React.Dispatch<React.SetStateAction<{
        type: {
            skill: boolean;
        };
        index: number;
    }>>
}

const ResumeFormDataCard = (props: Props) => {
    const { title, cardDataType, setSkillFormData, setUpdateSkillFormState,
        disablebtnCard, setDisablebtnCard, setEducationFormData, setUpdateEducationFormState
    } = props

    const { skills, education, setSkills, setEducation } = useContext(FormsDataContext)

    const [toggle, setToggle] = useState(false)
    const [removebtnState, setRemovebtnState] = useState(false)

    const handleRemove = async (id: String, type: String) => {
        setRemovebtnState(true)
        const token = localStorage.getItem('token')
        if (!token) return toast.warn(`Invalid token`)

        await formClient.post(`remove-${type}`, { id }, { headers: { Authorization: 'Bearer ' + token } })
            .then(async () => {
                toast.success('removed successfully')
                if (type === 'skill') {
                    const data = await getAllSkills(token, 'skills')
                    setSkills!(data)
                }
                if (type === 'education') {
                    const data = await getAllEducations(token, 'educations')
                    setEducation!(data)
                }
            })
            .catch(() => toast.error(`Could not remove`))
        setRemovebtnState(false)
    }

    const handleEdit = async (data: any, type: String, index: number) => {
        setDisablebtnCard!({ type: { skill: true }, index: index })
        const token = localStorage.getItem('token')
        if (!token) return toast.error(`Could not retrieve token`)

        if (type === 'skill') {
            setSkillFormData!(data)
            setUpdateSkillFormState!(true)
        }

        if (type === 'education') {
            setEducationFormData!(data)
            setUpdateEducationFormState!(true)
        }
    }

    const variants = {
        visible: { height: 'auto' },
        hidden: { height: 0 },
    }

    return (
        <div className='flex flex-col gap-2 w-full bg-white rounded shadow px-6 py-4 h-fit'>
            <div className='py-6 border-b flex items-center gap-1'>
                <h1 className='text-primary capitalize font-extrabold px-2'>{title}</h1>
                {toggle ?
                    <BiChevronUp className='cursor-pointer hover:opacity-50' onClick={() => setToggle(!toggle)} />
                    :
                    <BiChevronDown className='cursor-pointer hover:opacity-50' onClick={() => setToggle(!toggle)} />
                }
            </div>

            {cardDataType === FormsTypes.education ?
                <motion.div
                    variants={variants}
                    animate={toggle ? 'visible' : 'hidden'}
                    className={` transition duration-700 w-full flex flex-col gap-2`}>
                    {education!?.length > 0 && education?.map((education, index) =>
                        <div className='flex gap-2 flex-col shadow  overflow-hidden' key={index}>
                            <p className='p-2' style={{ textOverflow: 'ellipsis' }}>
                                {education.degree}
                            </p>
                            <div className='flex gap-2 p-2'>
                                <button disabled={disablebtnCard!.type.skill && disablebtnCard!.index === index}
                                    className={`uppercase text-xs px-2 py-1 text-white rounded font-bold ${disablebtnCard!.type.skill && disablebtnCard!.index === index ? 'bg-slate-200 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500'}`}
                                    onClick={() => handleEdit(education, 'education', index)}>
                                    edit</button>
                                <button
                                    disabled={disablebtnCard!.type.skill && disablebtnCard!.index === index || removebtnState}
                                    className={`uppercase text-xs px-2 py-1 text-white rounded font-bold
                                ${removebtnState ? 'bg-red-300 cursor-default' : 'bg-red-400'}
                                ${disablebtnCard!.type.skill && disablebtnCard!.index === index ? 'bg-slate-200 cursor-not-allowed' : ' bg-red-400 hover:bg-red-500'}`}
                                    onClick={() => handleRemove(education.id, 'education')}>
                                    remove</button>
                            </div>
                        </div>
                    )}
                </motion.div>

                : cardDataType === FormsTypes.skill ?
                    <motion.div
                        variants={variants}
                        animate={toggle ? 'visible' : 'hidden'}
                        className={` transition duration-700 w-full flex flex-col gap-2`}>
                        {skills!?.length > 0 && skills?.map((skill, index) =>
                            <div className='flex gap-2 flex-col shadow  overflow-hidden' key={index}>
                                <p className='p-2' style={{ textOverflow: 'ellipsis' }}>
                                    {skill.skill}
                                </p>
                                <div className='flex gap-2 p-2'>
                                    <button disabled={disablebtnCard!.type.skill && disablebtnCard!.index === index}
                                        className={`uppercase text-xs px-2 py-1 text-white rounded font-bold ${disablebtnCard!.type.skill && disablebtnCard!.index === index ? 'bg-slate-200 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500'}`}
                                        onClick={() => handleEdit(skill, 'skill', index)}>
                                        edit</button>
                                    <button
                                        disabled={disablebtnCard!.type.skill && disablebtnCard!.index === index || removebtnState}
                                        className={`uppercase text-xs px-2 py-1 text-white rounded font-bold
                                        ${removebtnState ? 'bg-red-300 cursor-default' : 'bg-red-400'}
                                        ${disablebtnCard!.type.skill && disablebtnCard!.index === index ? 'bg-slate-200 cursor-not-allowed' : ' bg-red-400 hover:bg-red-500'}`}
                                        onClick={() => handleRemove(skill.id, 'skill')}>
                                        remove</button>
                                </div>
                            </div>
                        )}
                    </motion.div>


                    : cardDataType === FormsTypes.certifications ? <h1>certication</h1>
                        : cardDataType === FormsTypes.experience ? <h1>experince</h1>
                            : ''}
        </div >
    )
}

export default ResumeFormDataCard