import React, { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { BiChevronDown } from 'react-icons/bi'
import DatePicker, { CalendarContainer, CalendarContainerProps } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import './calender.css'
import ResumeFormDataCard from '../Cards/ResumeFormDataCard'
import { FormsTypes, Skills } from '../../types'


const SkillForm = () => {
    const formInputStyle = `border-slate-100 border-2 shadow rounded font-semibold text-primary py-3 mb-3 placeholder:opacity-50`
    const formLableStyle = `font-extrabold text-xs text-primary uppercase`

    const [formData, setFormData] = useState<Skills>({
        skill: ''
    })

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(formData);

    }

    return (
        <motion.div className='flex gap-4 flex-wrap phone:flex-col desktop:flex-row font-Lato px-8 py-12 bg-slate-50'
            animate={{ opacity: [0, 1], transition: { duration: .8 } }}
        >
            <ResumeFormDataCard
                cardDataType={FormsTypes.skill}
                title={'your skills'} />

            <form className='w-full' onSubmit={handleFormSubmit}>
                <div className='flex flex-col gap-2 w-full'>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle} text-slate-500 font-normal`}>
                            enter the
                            <label className={`${formLableStyle}`}> skills </label>
                            you have *
                        </label>
                        <textarea className={`${formInputStyle} resize-none`}
                            placeholder={'Frontend: HTML, CSS'}
                            onChange={(e) => setFormData({ ...formData, skill: e.target.value })} />
                    </div>
                    <div className=''>
                        <button type='submit'
                            className='bg-component-primary w-full p-4 text-slate-200 hover:text-white rounded uppercase 
                                text-xs font-bold'>
                            save to skills list</button>
                    </div>
                </div>
            </form>
        </motion.div >
    )
}

export default SkillForm 