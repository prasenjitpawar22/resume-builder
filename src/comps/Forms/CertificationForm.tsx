import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BiChevronDown } from 'react-icons/bi'
import DatePicker, { CalendarContainer, CalendarContainerProps } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import './calender.css'
import ResumeFormDataCard from '../Cards/ResumeFormDataCard'
import { FormsTypes } from '../../types'

interface Data {
    date: undefined | Date
}

const CertificationForm = () => {
    const formInputStyle = `border-slate-100 border-2 shadow rounded font-semibold text-primary py-3 mb-3 placeholder:opacity-50`
    const formLableStyle = `font-extrabold text-xs text-primary uppercase`

    const [formData, setFormData] = useState<Data>({
        date: undefined
    })

    return (
        <motion.div className='grid phone:grid-cols-1 gap-6 desktop:grid-cols-3 font-Lato px-8 py-12 bg-slate-50'
            animate={{ opacity: [0, 1], transition: { duration: .8 } }}
        >
            <ResumeFormDataCard
                cardDataType={FormsTypes.certifications}
                title={'your certification'} />

            <form className='col-span-2'>
                <div className='flex flex-col gap-2 w-full'>
                    <div className='flex flex-col gap-2'>
                        <label className={`text-slate-500 font-normal ${formLableStyle} `}>
                            What is the certification
                            <label className={`${formLableStyle}`}> name? *</label>
                            {/* <label>Major? *</label> */}
                        </label>
                        <input type="text" className={`${formInputStyle}`}
                            placeholder={'Data Science Certified'} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle}`}>
                            Where
                            <label className={`${formLableStyle}`}>
                                <label className={`text-slate-500 font-normal`}> did you get the certificate?
                                </label>
                            </label>
                        </label>
                        <input type="text" className={`${formInputStyle}`}
                            placeholder={'Project Management'} />
                    </div>
                    {/* <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle}`}>Where
                            <label className='text-slate-500 font-normal'>is the institution located?</label>
                        </label>
                        <input type="text" className={`${formInputStyle}`}
                            placeholder={'London, UK'} />
                    </div> */}
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle}`}>When
                            <label className='text-slate-500 font-normal'> did you get the certificate?</label>
                        </label>
                        {/* react date picker */}
                        <DatePicker
                            selected={formData.date}
                            dateFormat={'yyyy'} showYearPicker
                            onChange={(date) => { if (date) setFormData({ ...formData, date: date }) }}
                            placeholderText='2023' className={`${formInputStyle} w-full`}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle}`}>How
                            <label className={`text-slate-500 font-normal ${formLableStyle}`}> is the certificate helpful?
                            </label>
                        </label>
                        <input type="text" className={`${formInputStyle}`}
                            placeholder='certified in data science and analysis' />
                    </div>
                    <div className=''>
                        <button type='submit'
                            className='bg-component-primary w-full p-4 text-slate-200 hover:text-white rounded uppercase 
                                text-xs font-bold'>
                            save to certification list</button>
                    </div>
                </div>
            </form>
        </motion.div >
    )
}

export default CertificationForm 