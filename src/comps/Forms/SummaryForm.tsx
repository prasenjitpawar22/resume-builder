import React, { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { Summary } from '../../types'

const SummaryForm = () => {
    const formInputStyle = `border-slate-100 border-2 shadow rounded font-semibold text-primary py-3 mb-3 placeholder:opacity-50`
    const formLableStyle = `font-extrabold text-xs text-primary uppercase`

    const [formData, setFormData] = useState<Summary>({
        summary: ''
    })

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log(formData);
    }

    return (
        <motion.div className='grid phone:grid-cols-1 gap-6 desktop:grid-cols-3 font-Lato px-8 py-12 bg-slate-50'
            animate={{ opacity: [0, 1], transition: { duration: .8 } }}
        >
            <div>AI summary generate</div>
            <form className='col-span-2' onSubmit={handleFormSubmit}>
                <div className='flex flex-col gap-2 w-full'>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle} text-slate-500 font-normal`}>write your
                            <label className={`${formLableStyle}`} > summary </label>
                        </label>
                        <textarea className={`${formInputStyle} resize-none min-h-[222px]`}
                            placeholder={`Data Analyst with five years’ experience organizing,understanding, and interpreting data for 10+ for retailers based on aggression analysis, resulting in a 20% in overall sales lift. Expert in employing both qualitative and quantitative research principles to optimize data acquisition and enhance data analytics processes, acquiring a 15% decrease in timeframe.`}
                            value={formData.summary} onChange={(e) => setFormData({ ...formData, summary: e.target.value })} />
                    </div>
                    <div className=''>
                        <button type='submit'
                            className='bg-component-primary w-full p-4 text-slate-200 hover:text-white rounded uppercase 
                                text-xs font-bold'>
                            save to summary info</button>
                    </div>
                </div>
            </form>
        </motion.div >
    )
}

export default SummaryForm