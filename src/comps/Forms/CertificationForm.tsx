import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BiChevronDown } from 'react-icons/bi'
import DatePicker, { CalendarContainer, CalendarContainerProps } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Cookies from 'js-cookie';

import './calender.css'
import ResumeFormDataCard from '../Cards/ResumeFormDataCard'
import { Certification, FormsTypes } from '../../types'
import { formClient } from '../../api/axiosClient';
import { toast } from 'react-toastify';
import { getAllCertifications } from '../../api/FormsApi';
import { FormsDataContext } from '../../context/FormsDataContext';


const CertificationForm = () => {

    const { certification, setCertification } = useContext(FormsDataContext)

    const [formData, setFormData] = useState<Certification>({
        helpful: '', location: '', name: '', year: undefined, id: '',
        show: true, userId: ''
    })


    const [disablebtnCard, setDisablebtnCard] = useState({
        type: { certification: false },
        index: -1
    })

    const [updateFormState, setUpdateFormState] = useState(false)
    const [submitbtnState, setSubmitbtnState] = useState(false)

    const formInputStyle = `border-slate-100 border-2 shadow rounded font-semibold text-primary py-3 mb-3 placeholder:opacity-50`
    const formLableStyle = `font-extrabold text-xs text-primary uppercase`

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // console.log(formData);

        // console.log(formData);
        setSubmitbtnState(true)
        // const token = localStorage.getItem('token');
        const token = Cookies.get('__session')

        if (!token) return;

        const { helpful, id, location, name, show, userId, year } = formData

        await formClient.post('add-certification', { helpful, id, location, name, show, userId, year },
            { headers: { Authorization: 'Bearer ' + token } })
            .then(async () => {
                // console.log(response.data);

                toast.success('education added successfully')
                const data = await getAllCertifications(token, 'certifications')
                setCertification!(data)
            })
            .catch((error) => {
                console.log(error);
            })

        setFormData({
            helpful: '', location: '', name: '', year: undefined, id: '',
            show: true, userId: ''
        })
        setSubmitbtnState(false)
    }

    const handleFormUpdate = async (e: FormEvent) => {
        e.preventDefault()
        // console.log(formData)
        setSubmitbtnState(true)
        // const token = localStorage.getItem('token') 
        const token = Cookies.get('__session')
        if (!token) return

        const { helpful, id, location, name, show, userId, year } = formData

        await formClient.post('update-certification',
            { helpful, id, location, name, show, userId, year },
            { headers: { Authorization: 'Bearer ' + token } })
            .then(async () => {
                const data = await getAllCertifications(token, 'certifications')
                setCertification!(data)
                toast.success('success')
            })
        setUpdateFormState(false)
        setSubmitbtnState(false)
        setDisablebtnCard({ type: { certification: false }, index: -1 })

        setFormData({
            helpful: '', location: '', name: '', year: undefined, id: '',
            show: true, userId: ''
        })
    }

    return (
        <motion.div className='grid phone:grid-cols-1 gap-6 desktop:grid-cols-3 font-Lato px-8 py-12 bg-slate-50'
            animate={{ opacity: [0, 1], transition: { duration: .8 } }}
        >
            <ResumeFormDataCard
                disableCertificationbtnCard={disablebtnCard}
                setDisableCertificationbtnCard={setDisablebtnCard}
                setUpdateCertificationFormState={setUpdateFormState}
                setCertificationFormData={setFormData}
                cardDataType={FormsTypes.certifications}
                title={'your certification'} />

            <form className='col-span-2' onSubmit={!updateFormState ? handleFormSubmit : handleFormUpdate}>
                <div className='flex flex-col gap-2 w-full'>
                    <div className='flex flex-col gap-2'>
                        <label className={`text-slate-500 font-normal ${formLableStyle} `}>
                            What is the certification
                            <label className={`${formLableStyle}`}> name? *</label>
                        </label>
                        <input type="text" className={`${formInputStyle}`}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder={'Project Management'} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle}`}>When
                            <label className='text-slate-500 font-normal'> did you get the certificate?</label>
                        </label>
                        <DatePicker
                            selected={formData.year}
                            dateFormat={'yyyy'} showYearPicker
                            onChange={(date) => { if (date) setFormData({ ...formData, year: date }) }}
                            placeholderText='2023' className={`${formInputStyle} w-full`}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle}`}>How
                            <label className={`text-slate-500 font-normal ${formLableStyle}`}> is the certificate helpful?
                            </label>
                        </label>
                        <input type="text" className={`${formInputStyle}`}
                            value={formData.helpful}
                            onChange={(e) => setFormData({ ...formData, helpful: e.target.value })}
                            placeholder='certified in data science and analysis' />
                    </div>
                    <div className=''>
                        <button type='submit'
                            className={`w-full p-4 text-slate-200 hover:text-white rounded uppercase 
                                text-xs font-bold ${submitbtnState ? 'bg-component-secondary cursor-default' : 'bg-component-primary'} `}>
                            save to certification list</button>
                    </div>
                </div>
            </form>
        </motion.div >
    )
}

export default CertificationForm 