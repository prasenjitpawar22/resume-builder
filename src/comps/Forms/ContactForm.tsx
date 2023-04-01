import React, { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { Contact } from '../../types'

const ContactForm = () => {
    const formLabelStyle = `font-extrabold text-xs text-primary uppercase`
    const formInputStyle = `border-slate-100 border-2 shadow rounded font-semibold text-primary py-3 mb-3 placeholder:opacity-50`

    const [formData, setFormData] = useState<Contact>({
        city: '', country: '', emailaddress: '', fullname: '', linkedinurl: '', personalwebsite: '',
        phone: '', state: ''
    })

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log(formData);
    }

    return (
        <motion.div
            animate={{ opacity: [0, 1], transition: { duration: .8 } }}
            className='grid grid-cols-1 font-Lato px-8 py-12 bg-slate-50'>
            <form className='' onSubmit={handleFormSubmit} >
                <div className='flex gap-6 phone:flex-col desktop:flex-row mb-3'>
                    <div className='flex flex-col gap-2 w-full'>
                        <div className='flex flex-col gap-2'>
                            <label className={`${formLabelStyle}`}>Full Name</label>
                            <input type="text" className={`${formInputStyle}`}
                                placeholder={'Jhon Smith'} value={formData.fullname}
                                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className={`${formLabelStyle}`}>Phone number</label>
                            <input type="tel" className={`${formInputStyle}`}
                                placeholder={'8177543689'} value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className={` ${formLabelStyle}
                                after:content-['_or_revelent_link'] after:text-slate-500 after:font-normal`}>
                                Personal website</label>
                            <input type="text" className={`${formInputStyle}`}
                                placeholder={'www.example.com'} value={formData.personalwebsite}
                                onChange={(e) => setFormData({ ...formData, personalwebsite: e.target.value })}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className={`${formLabelStyle}`}>
                                state</label>
                            <input type="text" className={`${formInputStyle}`}
                                placeholder={'Maharashtra'} value={formData.state}
                                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <div className='flex flex-col gap-2'>
                            <label className={`${formLabelStyle}`}>Email address</label>
                            <input type="text" className={`${formInputStyle}`}
                                placeholder={'jhon.smith@gmail.com'} value={formData.emailaddress}
                                onChange={(e) => setFormData({ ...formData, emailaddress: e.target.value })}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className={` ${formLabelStyle}
                            after:content-['_url'] after:text-slate-500 after:font-normal
                            `}>Linkedin </label>
                            <input type="tel" className={`${formInputStyle}`}
                                placeholder={'linkedin.com/jhonsmit'} value={formData.linkedinurl}
                                onChange={(e) => setFormData({ ...formData, linkedinurl: e.target.value })}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className={`${formLabelStyle}`}>
                                Country</label>
                            <input type="text" className={`${formInputStyle}`}
                                placeholder={'India'} value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className={`${formLabelStyle} `}>
                                city</label>
                            <input type="text" className={`${formInputStyle}`}
                                placeholder={'Mumbai'} value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            />
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