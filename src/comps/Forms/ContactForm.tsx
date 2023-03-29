import React from 'react'
import { motion } from 'framer-motion'

const ContactForm = () => {
    return (
        <motion.div animate={{ opacity: [0, 1], transition: { duration: .8 } }}
            className='grid grid-cols-1 font-Lato px-8 py-12 bg-slate-50'>
            <form className=''>
                <div className='flex gap-6 phone:flex-col desktop:flex-row mb-3'>
                    <div className='flex flex-col gap-2 w-full'>
                        <div className='flex flex-col gap-2'>
                            <label className={`font-extrabold text-xs text-primary uppercase`}>Full Name</label>
                            <input type="text" className={`border-slate-100 border-2 shadow rounded font-semibold text-primary py-3 mb-3`} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className={`font-extrabold text-xs text-primary uppercase`}>Phone number</label>
                            <input type="tel" className={`border-slate-100 border-2 shadow rounded font-semibold text-primary py-3 mb-3`} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className={`font-extrabold text-xs text-primary uppercase 
                                after:content-['_or_revelent_link'] after:text-slate-500 after:font-normal`}>
                                Personal website</label>
                            <input type="text" className={`border-slate-100 border-2 shadow rounded font-semibold text-primary py-3 mb-3`} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className={`font-extrabold text-xs text-primary uppercase `}>
                                state</label>
                            <input type="text" className={`border-slate-100 border-2 shadow rounded font-semibold text-primary py-3 mb-3`} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <div className='flex flex-col gap-2'>
                            <label className={`font-extrabold text-xs text-primary uppercase`}>Email address</label>
                            <input type="text" className={`border-slate-100 border-2 shadow rounded font-semibold text-primary py-3 mb-3`} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className={`font-extrabold text-xs text-primary uppercase
                            after:content-['_url'] after:text-slate-500 after:font-normal
                            `}>Linkedin </label>
                            <input type="tel" className={`border-slate-100 border-2 shadow rounded font-semibold text-primary py-3 mb-3`} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className={`font-extrabold text-xs text-primary uppercase`}>
                                Country</label>
                            <input type="text" className={`border-slate-100 border-2 shadow rounded font-semibold text-primary py-3 mb-3`} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className={`font-extrabold text-xs text-primary uppercase `}>
                                city</label>
                            <input type="text" className={`border-slate-100 border-2 shadow rounded font-semibold text-primary py-3 mb-3`} />
                        </div>
                        <div className=''>
                            <button type='submit' className='bg-component-primary w-full p-4 text-slate-200 hover:text-white rounded uppercase 
                                text-xs font-bold'>
                                save basic info</button>
                        </div>
                    </div>
                </div>
            </form>
        </motion.div>
    )
}

export default ContactForm 