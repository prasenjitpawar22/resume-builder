import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Summary } from '../../types'
import { formClient } from '../../api/axiosClient'
import { FormsDataContext } from '../../context/FormsDataContext'
import { toast } from 'react-toastify'

const SummaryForm = () => {
    const { setSummary } = useContext(FormsDataContext)

    const [foundSummary, setFoundSummary] = useState(false)
    const [loadbtn, setLoadbtn] = useState(false)
    const [formData, setFormData] = useState<Summary>({
        summary: '', id: '', show: true, userId: ''
    })

    const formInputStyle = `border-slate-100 border-2 shadow rounded font-semibold text-primary py-3 mb-3 placeholder:opacity-50`
    const formLableStyle = `font-extrabold text-xs text-primary uppercase`

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault()
        // console.log(formData);
        setLoadbtn(true);
        const { summary } = formData;
        const token = localStorage.getItem('token');
        if (!token) return
        await formClient.post('add-summary', { summary }, {
            headers: { Authorization: `bearer ${token}` }
        })
            .then((res) => {
                console.log(res)
                setSummary!(res.data)
                toast.success('Summary saved successfully')
            })
            .catch((e) => { console.log(e) })
        setLoadbtn(false);
    }

    const handleFormUpdate = async (e: FormEvent) => {
        e.preventDefault()
        // console.log(formData);
        setLoadbtn(true);
        const { summary, id } = formData;
        const token = localStorage.getItem('token');
        if (!token) return
        await formClient.post('update-summary', { summary, id }, {
            headers: { Authorization: `bearer ${token}` }
        })
            .then((res) => {
                if (res.data.summary === null) {
                    return
                }
                setFormData({ ...formData, summary: res.data.summary })
                setSummary!(res.data)
                toast.success('Summary saved successfully')
            })
            .catch((e) => console.log(e))
        setLoadbtn(false);
    }

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token');
            if (!token) return

            await formClient.get('get-summary', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then((response) => {
                if (response.data.summary === null) {
                    return
                }
                setFormData({ ...formData, summary: response.data.summary, id: response.data.id })
                setFoundSummary(true)
            }).catch((e) => console.log(e))
        })()
    }, [])

    return (
        <motion.div className='grid phone:grid-cols-1 gap-6 desktop:grid-cols-3 font-Lato px-8 py-12 bg-slate-50'
            animate={{ opacity: [0, 1], transition: { duration: .8 } }}
        >
            <div>AI summary generate</div>
            <form className='col-span-2' onSubmit={!foundSummary ? handleFormSubmit : handleFormUpdate}>
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
                        <button type='submit' disabled={loadbtn}
                            className={`${loadbtn ? 'bg-component-secondary' : 'bg-component-primary'} w-full p-4 text-slate-200 hover:text-white rounded uppercase 
                                text-xs font-bold`}>
                            save to summary info</button>
                    </div>
                </div>
            </form>
        </motion.div >
    )
}

export default SummaryForm