import React, { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { BiChevronDown } from 'react-icons/bi'
import DatePicker, { CalendarContainer, CalendarContainerProps } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import './calender.css'
import ResumeFormDataCard from '../Cards/ResumeFormDataCard'
import { Education, FormsTypes } from '../../types'

const EducationForm = () => {
    const formInputStyle = `border-slate-100 border-2 shadow rounded font-semibold text-primary py-3 mb 
    
    onChange={(e)=> setFormData({...formData, degree: e.target.value})}
    placeholder:opacity-50`
    const formLableStyle = `font-extrabold text-xs text-primary uppercase`

    const [formData, setFormData] = useState<Education>({
        degree: '', gpa: '', location: '', minor: '', university: '', year: undefined,
    })

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(formData);

    }
    return (
        <motion.div className='grid phone:grid-cols-1 gap-6 desktop:grid-cols-3 font-Lato px-8 py-12 bg-slate-50'
            animate={{ opacity: [0, 1], transition: { duration: .8 } }}
        >
            <ResumeFormDataCard
                cardDataType={FormsTypes.education}
                title={'your education'} />

            <form className='col-span-2' onSubmit={handleFormSubmit}>
                <div className='flex flex-col gap-2 w-full'>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle}`}>degree
                            <label className='text-slate-500 font-normal'> or other qualification and </label>
                            <label>Major? *</label>
                        </label>
                        <input type="text" className={`${formInputStyle}`} placeholder={'Bachelor of science in economics'}
                            onChange={(e) => setFormData({ ...formData, degree: e.target.value })} value={formData.degree}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle} after:content-['_did_you_earn_your_qualification/degree?']
                             after:text-slate-500 after:font-normal
                             `}>Where</label>
                        <input type="tel" className={`${formInputStyle}`}
                            placeholder={'University of London'}
                            value={formData.university} onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle}`}>Where
                            <label className='text-slate-500 font-normal'> is the institution located?</label>
                        </label>
                        <input type="text" className={`${formInputStyle}`}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            value={formData.location}
                            placeholder={'London, UK'} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle}`}>When
                            <label className='text-slate-500 font-normal'> did you earn qualification/degree?</label>
                        </label>
                        <DatePicker selected={formData.year}
                            dateFormat={'yyyy'} showYearPicker
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
                            className='bg-component-primary w-full p-4 text-slate-200 hover:text-white rounded uppercase 
                                text-xs font-bold'>
                            save to education list</button>
                    </div>
                </div>
            </form>
        </motion.div >
    )
}

export default EducationForm 