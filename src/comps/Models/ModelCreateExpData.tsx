
import React, { FormEvent, useContext, useState } from 'react'
import { toast } from 'react-toastify'

import { FeatureExpCreateRequest, FeatureExpDataRequest } from '../../api/FeaturesApi'
import { FeatureContext } from '../../context/FeaturesContext'
import { IExperience } from '../../types'

interface Props {
    expBlockModalState: boolean,
    setExpBlockModalState: React.Dispatch<React.SetStateAction<boolean>>
}

const ModelCreateExpData: React.FC<Props> = (props: Props) => {
    const { expBlockModalState, setExpBlockModalState } = props

    const { setFeatureExpData, featureExpData } = useContext(FeatureContext)

    const [expData, setExpData] = useState<Omit<IExperience, "id">>({
        company: '',
        description: [],
        end: '',
        position: '',
        start: '',
        current: false,
    })

    const inputStyle = `shadow appearance-none border leading-tight focus:shadow-2xl focus:shadow-blue-600 
  rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:outline-blue-300 focus:shadow-none focus:border-white`

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        // console.log(expData);
        if(expData.current!== undefined){
            setExpData({...expData, end: ''})
        }
        const token = localStorage.getItem('token')
        if (token) {
            const createResponse = await FeatureExpCreateRequest(expData!, token)
            // console.log(createResponse);
            if (createResponse.error) {
                toast.warn(createResponse.error)
                return
            }
            if (createResponse.status === 200) {
                setFeatureExpData!([...featureExpData!, createResponse.data!])
                setExpData({
                    current: false, end: '', start: '', company: '', description: [], position: ''
                })
                setExpBlockModalState(false)
                toast.success('added feature experience successfully')
            }
            else {
                toast.warn('unable to create feature experience')
            }
        }
        else {
            toast.warning('unable to create')
        }
    }

    return (<div>
        {expBlockModalState &&
            <div
                className="justify-center items-center flex overflow-x-hidden 
        overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none font-Lato">
                <div className="relative w-auto my-2 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold capitalize">
                                Create Experience
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black 
                opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => {
                                    setExpBlockModalState(false)
                                    setExpData({
                                        current: false, end: '', start: '', company: '', description: [], position: ''
                                    })
                                }}>
                                <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-2 mb-4'>
                            <div className="relative p-6 flex-auto w-full">
                                <div className='mb-4 flex gap-4 justify-between'>
                                    <div className=''>
                                        <label className='after:content-["_*"] block text-gray-700 text-sm font-bold mb-2'>
                                            Company
                                        </label>
                                        <input required value={expData?.company}
                                            onChange={(e) => setExpData({ ...(expData!), company: e.target.value })}
                                            className={inputStyle}
                                            type={'text'} placeholder={'Company'} />
                                    </div>
                                    <div>
                                        <label className='after:content-["_*"] block text-gray-700 text-sm font-bold mb-2'>
                                            Position
                                        </label>
                                        <input required value={expData?.position}
                                            onChange={(e) => setExpData({ ...expData!, position: e.target.value })}
                                            className={inputStyle}
                                            type={'text'} placeholder={'Position'} />
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <label className='block text-gray-700 text-sm font-bold mb-2'>
                                        Start
                                    </label>
                                    <input value={expData?.start} required
                                        onChange={(e) => setExpData({ ...expData!, start: e.target.value })}
                                        className={inputStyle}
                                        type={'date'} placeholder={'Start'} />
                                </div>

                                <div className='mb-4'>
                                    <label className='block text-gray-700 text-sm font-bold mb-2'>
                                        End
                                    </label>
                                    <input value={expData?.end} disabled={expData.current}
                                        required={expData.current === false}
                                        onChange={(e) => setExpData({ ...expData!, end: e.target.value })}
                                        className={`${inputStyle} ${expData.current && 'opacity-50 accent-green-500 ml-4'}`}
                                        type={'date'} placeholder={'End'} />
                                </div>
                                <div className='mb-4 flex'>
                                    <label className='text-gray-700 text-sm font-bold'>
                                        Current
                                    </label>
                                    <input checked={expData.current}
                                        onChange={() => setExpData({ ...expData!, current: !expData.current })}
                                        type="checkbox" className="accent-green-500 ml-4" />
                                </div>

                                {/* desc  */}
                                {/* <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Website Link
                  </label>
                  <input value={expData?.} onChange={(e) => setExpData({ ...expData!, websit: e.target.value })}
                    className={inputStyle}
                    type={'text'} placeholder={'Website Link'} />
                </div> */}

                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => {
                                        setExpBlockModalState(false)
                                        setExpData({
                                            current: false, end: '', start: '', company: '', description: [], position: ''
                                        })
                                    }}
                                >
                                    Close
                                </button>
                                <button
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg 
                  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                // onClick={() => setExpBlockModalState(false)}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>}
    </div >)
}


export default ModelCreateExpData;