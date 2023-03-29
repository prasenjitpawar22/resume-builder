import React from 'react'
import { motion } from 'framer-motion'
import { BiChevronDown } from 'react-icons/bi'
import ResumeFormDataCard from '../Cards/ResumeFormDataCard'
import { FormsTypes } from '../../types'

const EducationForm = () => {
    const formInputStyle = `border-slate-100 border-2 shadow rounded font-semibold text-primary py-3 mb-3 placeholder:opacity-50`
    const formLableStyle = `font-extrabold text-xs text-primary uppercase`

    return (
        <motion.div className='grid phone:grid-cols-1 gap-6 desktop:grid-cols-3 font-Lato px-8 py-12 bg-slate-50'
            animate={{ opacity: [0, 1], transition: { duration: .8 } }}
        >
            <ResumeFormDataCard
                cardDataType={FormsTypes.education}
                title={'your education'} />

            <form className='col-span-2'>
                <div className='flex flex-col gap-2 w-full'>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle}`}>degree
                            <label className='text-slate-500 font-normal'> or other qualification and </label>
                            <label>Major? *</label>
                        </label>
                        <input type="text" className={`${formInputStyle}`}
                            placeholder={'Bachelor of science in economics'} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle} after:content-['_did_you_earn_your_qualification/degree?']
                             after:text-slate-500 after:font-normal
                            `}>Where</label>
                        <input type="tel" className={`${formInputStyle}`}
                            placeholder={'University of London'} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle}`}>Where
                            <label className='text-slate-500 font-normal'>is the institution located?</label>
                        </label>
                        <input type="text" className={`${formInputStyle}`}
                            placeholder={'London, UK'} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle}`}>When
                            <label className='text-slate-500 font-normal'>when did you earn qualification/degree?</label>
                        </label>
                        {/* react date picker */}
                        <input type="date" className={`${formInputStyle}`}
                            placeholder='2023' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className={`text-slate-500 font-normal ${formLableStyle}`}>did you
                            <label className={`${formLableStyle}`}> minor </label>
                            in anything?
                        </label>
                        <input type="text" className={`${formInputStyle}`}
                            placeholder='History' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle}`}>Gpa
                            <label className={`text-slate-500 font-normal ${formLableStyle}`}> (If applicable)
                            </label>
                        </label>
                        <input type="text" className={`${formInputStyle}`}
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