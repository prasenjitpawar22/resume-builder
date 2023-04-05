import React, { FormEvent, HtmlHTMLAttributes, KeyboardEvent, useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BiChevronDown } from 'react-icons/bi'
import DatePicker, { CalendarContainer, CalendarContainerProps } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import './calender.css'
import ResumeFormDataCard from '../Cards/ResumeFormDataCard'
import { Experience, FormsTypes } from '../../types'
import { formClient } from '../../api/axiosClient';
import { toast } from 'react-toastify';
import { FormsDataContext } from '../../context/FormsDataContext';
import { getAllExperiences } from '../../api/FormsApi';

interface Data {
    startDate: undefined | Date
    endDate: undefined | Date
}

const ExperienceForm = () => {

    const { experience, setExperience } = useContext(FormsDataContext)

    const formInputStyle = `border-slate-100 border-2 shadow rounded font-semibold text-primary py-3 mb-3 placeholder:opacity-50`
    const formLableStyle = `font-extrabold text-xs text-primary uppercase`

    const [presentWorkDate, setPresentWorkDate] = useState(false)
    const [formData, setFormData] = useState<Experience>({
        yearStart: undefined, achivements: '', company: '', location: '', present: false, role: '',
        yearEnd: undefined, id: '', show: true, userId: ''
    })

    const [disablebtnCard, setDisablebtnCard] = useState({
        type: { experience: false },
        index: -1
    })

    const [updateFormState, setUpdateFormState] = useState(false)
    const [submitbtnState, setSubmitbtnState] = useState(false)

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitbtnState(true)

        const token = localStorage.getItem('token');
        if (!token) return;

        const { achivements, company, id, location, role, show,
            userId, yearEnd, yearStart } = formData

        // if present then set end date to current
        if (presentWorkDate) setFormData({ ...formData, yearEnd: new Date() })

        // console.log(formData);

        await formClient.post('add-experience', {
            achivements, company, id, location, present: presentWorkDate, role, show,
            userId, endYear: yearEnd, startYear: yearStart
        },
            { headers: { Authorization: 'Bearer ' + token } })
            .then(async () => {
                // console.log(response.data);
                // console.log(response);

                toast.success('experience added successfully')
                const data = await getAllExperiences(token, 'experiences')
                setExperience!(data)
            })
            .catch((error) => {
                console.log(error);
            })

        // setFormData({
        //     yearStart: undefined, achivements: '', company: '', location: '', present: false, role: '',
        //     yearEnd: undefined, id: '', show: true, userId: ''
        // })
        setPresentWorkDate(false)
        setSubmitbtnState(false)
    }

    const handleFormUpdate = async (e: FormEvent) => {
        e.preventDefault()
        // console.log(formData)
        setSubmitbtnState(true)
        const token = localStorage.getItem('token')
        if (!token) return

        const { achivements, company, id, location, role, show, userId, yearEnd, yearStart } = formData

        if (presentWorkDate) setFormData({ ...formData, yearEnd: new Date() })
        await formClient.post('update-experience',
            {
                achivements, company, id, location, present: presentWorkDate, role, show, userId,
                endYear: yearEnd, startYear: yearStart
            },
            { headers: { Authorization: 'Bearer ' + token } })
            .then(async () => {
                const data = await getAllExperiences(token, 'experiences')
                setExperience!(data)
                toast.success('success')
            })
        setUpdateFormState(false)
        setSubmitbtnState(false)
        setDisablebtnCard({ type: { experience: false }, index: -1 })

        setPresentWorkDate(false)
        setFormData({
            yearStart: undefined, achivements: '', company: '', location: '', present: false, role: '',
            yearEnd: undefined, id: '', show: true, userId: ''
        })
    }

    const handleTextAreaKeyUp = (e: KeyboardEvent) => {
        let { key, target } = e

        let { value, selectionStart } = (target as HTMLInputElement)

        const bulletWithSpace = `• `
        console.log(selectionStart);

        if (key === 'Enter') {
            (target as HTMLInputElement).value = [...value].map((c, i) =>
                i === selectionStart! - 1
                    ? `\n• ` : c)
                .join('');

            console.log(formData.achivements);

            (target as HTMLInputElement).selectionStart = selectionStart! + bulletWithSpace.length;
            (target as HTMLInputElement).selectionEnd = selectionStart! + bulletWithSpace.length;
        }

        if (selectionStart !== 0 && value[0] !== '•') {
            (target as HTMLInputElement).value = `• ${value}`;
        }

    }
    return (
        <motion.div className='grid phone:grid-cols-1 gap-6 desktop:grid-cols-3 font-Lato px-8 py-12 bg-slate-50'
            animate={{ opacity: [0, 1], transition: { duration: .8 } }}
        >
            <ResumeFormDataCard
                setExperienceEndDatePresentState={setPresentWorkDate}
                disableExperiencebtnCard={disablebtnCard}
                setDisableExperiencebtnCard={setDisablebtnCard}
                setUpdateExperienceFormState={setUpdateFormState}
                setExperienceFormData={setFormData}
                cardDataType={FormsTypes.experience}
                title={'your experince'} />

            <form className='col-span-2' onSubmit={!updateFormState ? handleFormSubmit : handleFormUpdate}>
                <div className='flex flex-col gap-2 w-full'>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle} text-slate-500 font-normal`}>
                            what was your
                            <label className={`${formLableStyle}`}> Role </label>
                            at the company? *
                        </label>
                        <input type="text" className={`${formInputStyle}`}
                            placeholder={'Data Analyist'}
                            value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle} text-slate-500 font-normal`}>
                            for which
                            <label className={`${formLableStyle}`}> company </label>
                            did you work? *
                        </label>
                        <input type="tel" className={`${formInputStyle}`}
                            placeholder={'Amazon'}
                            value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                    </div>


                    <div className='flex desktop:flex-row phone:flex-col gap-2 w-full flex-wrap'>
                        <div className='flex flex-col gap-2 justify-start phone:flex-grow desktop:flex-grow-0 '>
                            <label className={`${formLableStyle}`}>Where
                                <label className='text-slate-500 font-normal'> was the company located?</label>
                            </label>
                            <div className='flex flex-row items-center'>
                                <div className='relative w-full'>
                                    <DatePicker
                                        selected={formData.yearStart}
                                        onChange={(date) => { if (date) setFormData({ ...formData, yearStart: date }) }}
                                        dateFormat={'MM-yyyy'} showMonthYearPicker
                                        placeholderText={'March 2023'}
                                        className={`${formInputStyle} relative phone:w-[100%]`}
                                    />
                                </div>
                                <span className='mb-3 border-2 border-slate-100 bg-slate-100 py-3 px-1 font-extrabold'>
                                    -
                                </span>

                                <div className='relative w-full'>
                                    <input className={`absolute ${formInputStyle} w-full`}
                                        type={'text'} onChange={() => null} value='Present' />

                                    <DatePicker
                                        selected={formData.yearEnd}
                                        onChange={(date) => {
                                            if (date) setFormData({ ...formData, yearEnd: date })
                                            if (presentWorkDate) setPresentWorkDate(false)
                                        }}
                                        dateFormat={'MM-yyyy'} showMonthYearPicker
                                        placeholderText={'March 2023'}
                                        className={`${formInputStyle} phone:w-[100%] ${presentWorkDate && 'opacity-0'} `}
                                    >
                                        <div className='h-8 w-full flex justify-start gap-2 items-center'>
                                            <div className={`h-4 w-10 flex items-center transition duration-300 ${presentWorkDate ? 'justify-end !bg-component-primary' : 'justify-start'} rounded-xl bg-slate-200 overflow-hidden cursor-pointer`}
                                                onClick={() => {
                                                    setPresentWorkDate(!presentWorkDate)
                                                    setFormData({ ...formData, yearEnd: undefined })
                                                    if (presentWorkDate) setFormData({ ...formData, yearEnd: new Date() })
                                                }}
                                            >
                                                <motion.div layout className='w-3 h-3 bg-white shadow rounded-full mx-[0.1rem]'></motion.div>
                                            </div>
                                            <span className='capitalize font-semibold text-primary'>
                                                currently working here</span>
                                        </div>
                                    </DatePicker>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 flex-grow'>
                            <label className={`${formLableStyle}`}>Where
                                <label className='text-slate-500 font-normal'> was the company located?</label>
                            </label>
                            <input type="text" className={`${formInputStyle}`}
                                placeholder='LA'
                                value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle}`}>What did you do
                            <label className={`text-slate-500 font-normal ${formLableStyle}`}> at the company?
                            </label>
                        </label>
                        <textarea className={`${formInputStyle} resize-none min-h-[222px] list-disc`}
                            placeholder={`• Help bridge the gap between data and the decision-making process. Typical data analyst roles at Amazon include data analysis, dashboard/report building, and metric definitions and reviews. Data analysts at Amazon also design systems for data collection, compiling, analysis, and reporting.`}
                            onKeyUp={handleTextAreaKeyUp}
                            value={formData.achivements}
                            onChange={(e) => {
                                // if (e.target.value[0] !== '•') {
                                //     console.log('innnnnnnnnnnnnn');
                                //     e.target.value = `• ${e.target.value}`
                                // }
                                setFormData({ ...formData, achivements: e.target.value })
                            }}
                        />
                    </div>
                    <div className=''>
                        <button type='submit'
                            className={`w-full p-4 text-slate-200 hover:text-white rounded uppercase 
                                text-xs font-bold ${submitbtnState ? 'bg-component-secondary cursor-default' : 'bg-component-primary'} `}>
                            save to experience list</button>
                    </div>
                </div>
            </form>
        </motion.div >
    )
}

export default ExperienceForm 