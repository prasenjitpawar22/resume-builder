import React, { FormEvent, useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { BiChevronDown } from 'react-icons/bi'
import DatePicker, { CalendarContainer, CalendarContainerProps } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import './calender.css'
import ResumeFormDataCard from '../Cards/ResumeFormDataCard'
import { Education, FormsTypes } from '../../types'
import { formClient } from '../../api/axiosClient';
import { toast } from 'react-toastify';
import { getAllEducations, getAllSkills } from '../../api/FormsApi';
import { FormsDataContext } from '../../context/FormsDataContext';

const EducationForm = () => {

    const { education, setEducation } = useContext(FormsDataContext)
    const [formData, setFormData] = useState<Education>({
        degree: '', gpa: '', location: '', minor: '', university: '', year: undefined,
        id: '', show: true, userId: '',
    })
    const [disablebtnCard, setDisablebtnCard] = useState({
        type: { education: false },
        index: -1
    })

    const [updateFormState, setUpdateFormState] = useState(false)
    const [submitbtnState, setSubmitbtnState] = useState(false)

    const formInputStyle = `border-slate-100 border-2 shadow rounded font-semibold text-primary py-3 mb placeholder:opacity-50`
    const formLableStyle = `font-extrabold text-xs text-primary uppercase`

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log(formData);

        // console.log(formData);
        setSubmitbtnState(true)
        const token = localStorage.getItem('token');
        if (!token) return;

        const { degree, gpa, location, minor, university, year } = formData

        await formClient.post('add-education', { degree, gpa, location, minor, university, year },
            { headers: { Authorization: 'Bearer ' + token } })
            .then(async (response) => {
                console.log(response.data);

                toast.success('education added successfully')
                const data = await getAllEducations(token, 'educations')
                setEducation!(data)
            })
            .catch((error) => {
                console.log(error);
            })

        setFormData({
            id: '', show: true, userId: '', degree: '',
            gpa: '', location: '', minor: '', university: '', year: undefined
        })
        setSubmitbtnState(false)
    }

    const handleFormUpdate = async (e: FormEvent) => {
        e.preventDefault()
        // console.log(formData)
        setSubmitbtnState(true)
        const token = localStorage.getItem('token')
        if (!token) return

        const { degree, gpa, id, location, minor, show, university, userId, year } = formData

        await formClient.post('update-education',
            { degree, gpa, id, location, minor, show, university, userId, year },
            { headers: { Authorization: 'Bearer ' + token } })
            .then(async () => {
                const data = await getAllEducations(token, 'educations')
                setEducation!(data)
                toast.success('success')
            })
        setUpdateFormState(false)
        setSubmitbtnState(false)
        setDisablebtnCard({ type: { education: false }, index: -1 })

        setFormData({ id: '', show: true, userId: '', degree: '', gpa: '', location: '', minor: '', university: '', year: undefined })
    }


    return (
        <motion.div className='grid phone:grid-cols-1 gap-6 desktop:grid-cols-3 font-Lato px-8 py-12 bg-slate-50'
            animate={{ opacity: [0, 1], transition: { duration: .8 } }}
        >
            <ResumeFormDataCard
                disableEducationbtnCard={disablebtnCard}
                setDisableEducationbtnCard={setDisablebtnCard}
                setUpdateEducationFormState={setUpdateFormState}
                setEducationFormData={setFormData}
                cardDataType={FormsTypes.education}
                title={'your education'} />

            <form className='col-span-2' onSubmit={!updateFormState ? handleFormSubmit : handleFormUpdate}>
                <div className='flex flex-col gap-2 w-full'>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle}`}>degree
                            <label className='text-slate-500 font-normal'> or other qualification and </label>
                            <label>Major? *</label>
                        </label>
                        <input required type="text" className={`${formInputStyle}`} placeholder={'Bachelor of science in economics'}
                            onChange={(e) => setFormData({ ...formData, degree: e.target.value })} value={formData.degree}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle} after:content-['_did_you_earn_your_qualification/degree?']
                             after:text-slate-500 after:font-normal
                             `}>Where</label>
                        <input type="tel" className={`${formInputStyle}`}
                            placeholder={'University of London'} required
                            value={formData.university} onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle}`}>Where
                            <label className='text-slate-500 font-normal'> is the institution located?</label>
                        </label>
                        <input type="text" className={`${formInputStyle}`}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            value={formData.location} required
                            placeholder={'London, UK'} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle}`}>When
                            <label className='text-slate-500 font-normal'> did you earn qualification/degree?</label>
                        </label>
                        <DatePicker selected={formData.year}
                            dateFormat={'yyyy'} showYearPicker required
                            onChange={(date) => { if (date) setFormData({ ...formData, year: date }) }}
                            placeholderText='2023' className={`${formInputStyle} w-full`}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className={`text-slate-500 font-normal ${formLableStyle}`}>did you
                            <label className={`${formLableStyle}`}> minor </label>
                            in anything?
                        </label>
                        <input type="text" className={`${formInputStyle}`}
                            value={formData.minor}
                            onChange={(e) => setFormData({ ...formData, minor: e.target.value })}
                            placeholder='History' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle}`}>Gpa
                            <label className={`text-slate-500 font-normal ${formLableStyle}`}> (If applicable)
                            </label>
                        </label>
                        <input type="text" className={`${formInputStyle}`}
                            value={formData.gpa}
                            onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                            placeholder='3.21 GPA' />
                    </div>
                    <div className=''>
                        <button type='submit'
                            className={`w-full p-4 text-slate-200 hover:text-white rounded uppercase 
                                text-xs font-bold ${submitbtnState ? 'bg-component-secondary cursor-default' : 'bg-component-primary'} `}>
                            save to education list</button>
                    </div>
                </div>
            </form>
        </motion.div >
    )
}

export default EducationForm 