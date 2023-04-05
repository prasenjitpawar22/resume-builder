import React, { useContext, useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { formClient } from '../../api/axiosClient'
import { getAllCertifications, getAllEducations, getAllSkills } from '../../api/FormsApi'
import { FormsDataContext } from '../../context/FormsDataContext'
import { ResumeContext } from '../../context/ResumeContext'
import { Certification, Education, FormsTypes, Skills } from '../../types'
import { motion } from 'framer-motion'

interface Props {
    title: string
    cardDataType: string

    setUpdateSkillFormState?: React.Dispatch<React.SetStateAction<boolean>>
    setUpdateEducationFormState?: React.Dispatch<React.SetStateAction<boolean>>
    setUpdateCertificationFormState?: React.Dispatch<React.SetStateAction<boolean>>

    setSkillFormData?: React.Dispatch<React.SetStateAction<Skills>>
    setEducationFormData?: React.Dispatch<React.SetStateAction<Education>>
    setCertificationFormData?: React.Dispatch<React.SetStateAction<Certification>>

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
    disableCertificationbtnCard?: {
        type: {
            certification: boolean;
        };
        index: number;
    }
    setDisableCertificationbtnCard?: React.Dispatch<React.SetStateAction<{
        type: {
            certification: boolean;
        };
        index: number;
    }>>
}

const ResumeFormDataCard = (props: Props) => {
    const { title, cardDataType, setSkillFormData, setUpdateSkillFormState,
        disablebtnCard, setDisablebtnCard, setEducationFormData, setUpdateEducationFormState,
        disableEducationbtnCard, setDisableEducationbtnCard, setDisableCertificationbtnCard,
        disableCertificationbtnCard, setCertificationFormData, setUpdateCertificationFormState,
    } = props

    const { skills, education, certification, setSkills, setEducation, setCertification }
        = useContext(FormsDataContext)

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
                if (type === 'certification') {
                    const data = await getAllCertifications(token, 'certifications')
                    setCertification!(data)
                }
            })
            .catch(() => toast.error(`Could not remove`))
        setRemovebtnState(false)
    }

    const handleEdit = async (data: any, type: String, index: number) => {
        if (type === 'skill') {
            setDisablebtnCard!({ type: { skill: true }, index: index })
        }
        if (type === 'education') {
            setDisableEducationbtnCard!({ type: { education: true }, index: index })
        }

        if (type === 'certification') {
            setDisableCertificationbtnCard!({ type: { certification: true }, index: index })
        }

        const token = localStorage.getItem('token')
        if (!token) return toast.error(`Could not retrieve token`)

        if (type === 'skill') {
            setSkillFormData!(data)
            setUpdateSkillFormState!(true)
        }

        if (type === 'education') {
            data.year = new Date(data.year)

            setEducationFormData!(data)
            setUpdateEducationFormState!(true)
        }

        if (type === 'certification') {
            data.year = new Date(data.year)
            setCertificationFormData!(data)
            setUpdateCertificationFormState!(true)
        }
    }

    const variants = {
        visible: { height: 'auto' },
        hidden: { height: 0 },
    }

    return (
        <div className='flex flex-col gap-2 w-full bg-white rounded shadow px-6 py-4 h-fit text-primary font-Lato'>
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
                    className={` w-full flex flex-col gap-2`}>
                    {education && education.length > 0 && education.map((education, index) =>
                        <div className='flex gap-2 flex-col shadow  overflow-hidden' key={index}>
                            <p className='p-2 font-bold' style={{ textOverflow: 'ellipsis' }}>
                                {education.degree}
                            </p>
                            <div className='flex gap-2 p-2'>
                                <button
                                    disabled={disableEducationbtnCard && disableEducationbtnCard.type.education && disableEducationbtnCard.index === index}
                                    className={`uppercase text-xs px-2 py-1 text-white rounded font-bold
                                     ${disableEducationbtnCard && disableEducationbtnCard.type.education && disableEducationbtnCard.index === index ? 'bg-slate-200 cursor-default' : 'bg-yellow-400 hover:bg-yellow-500'}`}
                                    onClick={() => handleEdit(education, 'education', index)}>
                                    edit</button>
                                <button
                                    disabled={disableEducationbtnCard && disableEducationbtnCard.type.education && disableEducationbtnCard.index === index || removebtnState}
                                    className={`uppercase text-xs px-2 py-1 text-white rounded font-bold
                                ${removebtnState ? 'bg-red-100 cursor-default' : 'bg-red-400'}
                                ${disableEducationbtnCard && disableEducationbtnCard.type.education && disableEducationbtnCard.index === index ? 'bg-slate-200 cursor-default' : ' bg-red-400 hover:bg-red-500'}`}
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
                                <p className='p-2 font-bold' style={{ textOverflow: 'ellipsis' }}>
                                    {skill.skill}
                                </p>
                                <div className='flex gap-2 p-2'>
                                    <button disabled={disablebtnCard!.type.skill && disablebtnCard!.index === index}
                                        className={`uppercase text-xs px-2 py-1 text-white rounded font-bold ${disablebtnCard!.type.skill && disablebtnCard!.index === index ? 'bg-slate-200 cursor-default' : 'bg-yellow-400 hover:bg-yellow-500'}`}
                                        onClick={() => handleEdit(skill, 'skill', index)}>
                                        edit</button>
                                    <button
                                        disabled={disablebtnCard!.type.skill && disablebtnCard!.index === index || removebtnState}
                                        className={`uppercase text-xs px-2 py-1 text-white rounded font-bold
                                        ${removebtnState ? 'bg-red-100 cursor-default' : 'bg-red-400'}
                                        ${disablebtnCard!.type.skill && disablebtnCard!.index === index ? 'bg-slate-200 cursor-default' : ' bg-red-400 hover:bg-red-500'}`}
                                        onClick={() => handleRemove(skill.id, 'skill')}>
                                        remove</button>
                                </div>
                            </div>
                        )}
                    </motion.div>


                    : cardDataType === FormsTypes.certifications ?
                        <motion.div
                            variants={variants}
                            animate={toggle ? 'visible' : 'hidden'}
                            className={` transition duration-700 w-full flex flex-col gap-2`}>
                            {certification!?.length > 0 && certification?.map((certificate, index) =>
                                <div className='flex gap-2 flex-col shadow  overflow-hidden' key={index}>
                                    <p className='p-2 font-bold' style={{ textOverflow: 'ellipsis' }}>
                                        {certificate.name}
                                    </p>
                                    <div className='flex gap-2 p-2'>
                                        <button disabled={disableCertificationbtnCard!.type.certification && disableCertificationbtnCard!.index === index}
                                            className={`uppercase text-xs px-2 py-1 text-white rounded font-bold ${disableCertificationbtnCard!.type.certification && disableCertificationbtnCard!.index === index ? 'bg-slate-200 cursor-default' : 'bg-yellow-400 hover:bg-yellow-500'}`}
                                            onClick={() => handleEdit(certificate, 'certification', index)}>
                                            edit</button>
                                        <button
                                            disabled={disableCertificationbtnCard!.type.certification && disableCertificationbtnCard!.index === index || removebtnState}
                                            className={`uppercase text-xs px-2 py-1 text-white rounded font-bold
                                        ${removebtnState ? 'bg-red-100 cursor-default' : 'bg-red-400'}
                                        ${disableCertificationbtnCard!.type.certification && disableCertificationbtnCard!.index === index ? 'bg-slate-200 cursor-default' : ' bg-red-400 hover:bg-red-500'}`}
                                            onClick={() => handleRemove(certificate.id, 'certification')}>
                                            remove</button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                        : cardDataType === FormsTypes.experience ? <h1>experince</h1>
                            : ''}
        </div >
    )
}

export default ResumeFormDataCard