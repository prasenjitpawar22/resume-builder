import React, { FormEvent, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Contact } from '../../types'
import { formClient } from '../../api/axiosClient'
import { toast } from 'react-toastify'

const ContactForm = () => {

    const [formData, setFormData] = useState<Contact>({
        city: '', country: '', email: '', fullname: '', linkedin: '', website: '',
        phone: '', state: '', id: '', show: true, userId: ''
    })

    const [foundContact, setFoundContact] = useState(false)
    const [submitbtnState, setSubmitbtnState] = useState(false)

    const formLabelStyle = `font-extrabold text-xs text-primary uppercase`
    const formInputStyle = `border-slate-100 border-2 shadow rounded font-semibold text-primary py-3 mb-3 placeholder:opacity-50`


    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault()
        // console.log(formData);
        setSubmitbtnState(true);
        const { city, country, email,
            fullname, id, linkedin, website,
            phone, show, state, userId } = formData;
        const token = localStorage.getItem('token');
        if (!token) return
        await formClient.post('add-contact', {
            city, country, email,
            fullname, id, linkedin, website,
            phone, show, state, userId
        }, {
            headers: { Authorization: `bearer ${token}` }
        })
            .then((res) => {
                console.log(res)
                setFormData(res.data)
                setFoundContact(true);
                toast.success('saved successfully')
            })
            .catch((e) => { console.log(e) })
        setSubmitbtnState(false);
    }

    const handleFormUpdate = async (e: FormEvent) => {
        e.preventDefault()
        setSubmitbtnState(true);

        const { city, country, email,
            fullname, id, linkedin, website,
            phone, show, state, userId } = formData;

        const token = localStorage.getItem('token');
        if (!token) return
        await formClient.post('update-contact', {
            city, country, email,
            fullname, id, linkedin, website,
            phone, show, state, userId
        }, {
            headers: { Authorization: `bearer ${token}` }
        })
            .then((res) => {
                setFormData(res.data)
                toast.success('saved successfully')
            })
            .catch((e) => console.log(e))
        setSubmitbtnState(false);
    }

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token');
            if (!token) return

            await formClient.get('get-all-contacts', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
                .then((res) => {

                    if (res.data.length <= 0) {
                        return
                    }
                    setFormData(res.data[0])
                    setFoundContact(true)
                })
                .catch((e) => console.log(e))
        })()
    }, [])

    return (
        <motion.div
            animate={{ opacity: [0, 1], transition: { duration: .8 } }}
            className='grid grid-cols-1 font-Lato px-8 py-12 bg-slate-50'>
            <form className='' onSubmit={!foundContact ? handleFormSubmit : handleFormUpdate} >
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
                                placeholder={'www.example.com'} value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
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
                                placeholder={'jhon.smith@gmail.com'} value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className={` ${formLabelStyle}
                            after:content-['_url'] after:text-slate-500 after:font-normal
                            `}>Linkedin </label>
                            <input type="tel" className={`${formInputStyle}`}
                                placeholder={'linkedin.com/jhonsmit'} value={formData.linkedin}
                                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
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
                            <button type='submit' className={`w-full p-4 text-slate-200 hover:text-white rounded uppercase 
                                text-xs font-bold  ${submitbtnState ? 'bg-component-secondary cursor-default' : 'bg-component-primary'}`}>
                                save basic info</button>
                        </div>
                    </div>
                </div>
            </form>
        </motion.div>
    )
}

export default ContactForm 