import React, { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { BiChevronDown } from 'react-icons/bi'
import DatePicker, { CalendarContainer, CalendarContainerProps } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import './calender.css'
import ResumeFormDataCard from '../Cards/ResumeFormDataCard'
import { Experience, FormsTypes } from '../../types'

interface Data {
    startDate: undefined | Date
    endDate: undefined | Date
}

const ExperienceForm = () => {

    const [presentWorkDate, setPresentWorkDate] = useState(false)

    const formInputStyle = `border-slate-100 border-2 shadow rounded font-semibold text-primary py-3 mb-3 placeholder:opacity-50`
    const formLableStyle = `font-extrabold text-xs text-primary uppercase`

    const [formData, setFormData] = useState<Experience>({
        yearStart: undefined, achivements: '', company: '', location: '', present: false, role: '',
        yearEnd: undefined,
    })

    const handleSubmitForm = (e: FormEvent) => {
        e.preventDefault();
        console.log(formData);

    }

    return (
        <motion.div className='grid phone:grid-cols-1 gap-6 desktop:grid-cols-3 font-Lato px-8 py-12 bg-slate-50'
            animate={{ opacity: [0, 1], transition: { duration: .8 } }}
        >
            <ResumeFormDataCard
                cardDataType={FormsTypes.experience}
                title={'your experince'} />

            <form className='col-span-2' onSubmit={handleSubmitForm}>
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
                                    <DatePicker selected={formData.yearStart}
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
                                        type={'text'} value='Present' />

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
                        <textarea className={`${formInputStyle} resize-none min-h-[222px]`}
                            placeholder={`• Help bridge the gap between data and the decision-making process. Typical data analyst roles at Amazon include data analysis, dashboard/report building, and metric definitions and reviews. Data analysts at Amazon also design systems for data collection, compiling, analysis, and reporting.`}
                            value={formData.achivements} onChange={(e) => setFormData({ ...formData, achivements: e.target.value })}
                        />
                    </div>
                    <div className=''>
                        <button type='submit'
                            className='bg-component-primary w-full p-4 text-slate-200 hover:text-white rounded uppercase 
                                text-xs font-bold'>
                            save to education list</button>
                    </div>
                </div>
            </form>
        </motion.div >
    )
}

export default ExperienceForm 