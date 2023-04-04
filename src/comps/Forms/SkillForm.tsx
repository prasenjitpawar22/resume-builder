import React, { FormEvent, useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { BiChevronDown } from 'react-icons/bi'
import DatePicker, { CalendarContainer, CalendarContainerProps } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { FormsDataContext } from '../../context/FormsDataContext'
import './calender.css'
import ResumeFormDataCard from '../Cards/ResumeFormDataCard'
import { FormsTypes, Skills } from '../../types'
import { formClient } from '../../api/axiosClient';
import { toast } from 'react-toastify';
import { getAllSkills } from '../../api/FormsApi';


const SkillForm = () => {

    const { skills, setSkills } = useContext(FormsDataContext)

    const formInputStyle = `border-slate-100 border-2 shadow rounded font-semibold text-primary py-3 mb-3 placeholder:opacity-50`
    const formLableStyle = `font-extrabold text-xs text-primary uppercase`

    const [updateFormState, setUpdateFormState] = useState(false)

    const [formData, setFormData] = useState<Skills>({
        skill: '', id: '', show: true, userId: ''
    })
    const [buttonLoad, setButtonLoad] = useState(false)

    const [disablebtnCard, setDisablebtnCard] = useState({
        type: { skill: false },
        index: -1
    })


    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        // console.log(formData);
        setButtonLoad(true)
        const token = localStorage.getItem('token');
        if (!token) return;

        const { skill } = formData
        formClient.post('add-skill', { skill }, { headers: { Authorization: 'Bearer ' + token } })
            .then(async (response) => {
                console.log(response.data);

                toast.success('skill added successfully')
                const data: Skills[] = await getAllSkills(token, 'skills')
                setSkills!(data)
            })
            .catch((error) => {
                console.log(error);
            })

        setFormData({ skill: '', id: '', show: true, userId: '' })
        setButtonLoad(false)
    }

    const handleFormUpdate = async (e: FormEvent) => {
        e.preventDefault()
        // console.log(formData)
        setButtonLoad(true)
        const token = localStorage.getItem('token')
        if (!token) return

        await formClient.post('update-skill', {
            id: formData.id, skill: formData.skill,
            userId: formData.userId
        }, { headers: { Authorization: 'Bearer ' + token } })
            .then(async () => {
                const data = await getAllSkills(token, 'skills')
                setSkills!(data)
                toast.success('success')
            })
        setUpdateFormState(false)
        setButtonLoad(false)
        setDisablebtnCard({ type: { skill: false }, index: -1 })

        setFormData({ id: '', show: true, skill: '', userId: '' })
    }

    return (
        <motion.div className='grid phone:grid-cols-1 gap-6 desktop:grid-cols-3 font-Lato px-8 py-12 bg-slate-50'
            animate={{ opacity: [0, 1], transition: { duration: .8 } }}
        >
            <ResumeFormDataCard
                disablebtnCard={disablebtnCard}
                setDisablebtnCard={setDisablebtnCard}
                setUpdateSkillFormState={setUpdateFormState}
                setSkillFormData={setFormData}
                cardDataType={FormsTypes.skill}
                title={'your skills'} />

            <form className='col-span-2' onSubmit={!updateFormState ? handleFormSubmit : handleFormUpdate}>
                <div className='flex flex-col gap-2 w-full'>
                    <div className='flex flex-col gap-2'>
                        <label className={`${formLableStyle} text-slate-500 font-normal`}>
                            enter the
                            <label className={`${formLableStyle}`}> skills </label>
                            you have *
                        </label>
                        <textarea className={`${formInputStyle} resize-none`}
                            placeholder={'Frontend: HTML, CSS'}
                            value={formData.skill}
                            onChange={(e) => setFormData({ ...formData, skill: e.target.value })} />
                    </div>
                    <div className=''>
                        <button type='submit'
                            disabled={buttonLoad}
                            className={`w-full p-4 text-slate-200 hover:text-white rounded uppercase 
                                text-xs font-bold ${buttonLoad ? 'bg-component-secondary cursor-default' : 'bg-component-primary'}`}>
                            save to skills list</button>
                    </div>
                </div>
            </form>
        </motion.div >
    )
}

export default SkillForm 