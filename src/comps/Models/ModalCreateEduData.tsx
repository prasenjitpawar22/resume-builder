import React, { FormEvent, useContext, useState } from 'react'
import { toast } from 'react-toastify'

import { featureClient } from '../../api/axiosClient'
import { FeatureEduCreateRequest, FeatureEduDataRequest } from '../../api/FeaturesApi'
import { FeatureContext } from '../../context/FeaturesContext'
import { IEducation } from '../../types'

interface Props {
  eduBlockModalState: boolean
  setEduBlockModalState: React.Dispatch<React.SetStateAction<boolean>>
}

type EducationDataPost = Omit<IEducation, "id">

const ModalCreateEduData: React.FC<Props> = (props: Props) => {
  const { eduBlockModalState, setEduBlockModalState } = props
  const { setFeatureEduData, featureEduData} = useContext(FeatureContext)
  const [eduData, seteEduData] = useState<EducationDataPost>({
    current: false, end: '', location: '', start: '', university: ''
  })


  const inputStyle = `shadow appearance-none border leading-tight focus:shadow-2xl focus:shadow-blue-600 
  rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:outline-blue-300 focus:shadow-none focus:border-white`


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (token) {

      const createResponse = await FeatureEduCreateRequest(eduData!, token)
      //handle error 
      // console.log(createResponse);

      if (createResponse.error) {
        toast.warn(createResponse.error.message)
      }
      if (createResponse.status === 200 && createResponse.data) {
        setFeatureEduData!([...featureEduData!, createResponse.data])
        seteEduData({
          current: false, end: '', location: '', start: '', university: ''
        })
        setEduBlockModalState(false)
        toast.success('added feature header successfully')
      }
    }
  }

  return (<div>
    {eduBlockModalState &&
      <div
        className="justify-center items-center flex overflow-x-hidden 
            overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-2 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold capitalize">
                Create Education
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black 
                    opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setEduBlockModalState(false)}>
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
                      University Name
                    </label>
                    <input required value={eduData?.university}
                      onChange={(e) => seteEduData({ ...(eduData!), university: e.target.value })}
                      className={inputStyle}
                      type={'text'} placeholder={'University Name'} />
                  </div>
                  <div>
                    <label className='after:content-["_*"] block text-gray-700 text-sm font-bold mb-2'>
                      Location
                    </label>
                    <input required value={eduData?.location}
                      onChange={(e) => seteEduData({ ...eduData!, location: e.target.value })}
                      className={inputStyle}
                      type={'tel'} placeholder={'Location'} />
                  </div>
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Start
                  </label>
                  <input required value={eduData?.start}
                    onChange={(e) => seteEduData({ ...eduData!, start: e.target.value })}
                    className={inputStyle}
                    type={'date'} placeholder={'Start'} />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>
                    End
                  </label>
                  <input required value={eduData?.end}
                    onChange={(e) => seteEduData({ ...eduData!, end: e.target.value })}
                    className={inputStyle}
                    type={'date'} placeholder={'End'} />
                </div>
                {/*
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Website Link
                  </label>
                  <input value={eduData?.websit} onChange={(e) => seteEduData({ ...eduData!, websit: e.target.value })}
                    className={inputStyle}
                    type={'text'} placeholder={'Full Name'} />
                </div> */}

              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setEduBlockModalState(false)}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg 
                      outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                // onClick={() => setEduBlockModalState(false)}
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

export default ModalCreateEduData;


