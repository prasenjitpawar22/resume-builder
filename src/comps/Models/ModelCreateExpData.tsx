
import React, { FormEvent, useContext, useState } from 'react'
import { toast } from 'react-toastify'

import { FeatureExpCreateRequest, FeatureExpDataRequest } from '../../api/FeaturesApi'
import { FeatureContext } from '../../context/FeaturesContext'
import { Experience } from '../../types'

interface Props {
  expBlockModalState: boolean,
  setExpBlockModalState: React.Dispatch<React.SetStateAction<boolean>>
}

const ModelCreateExpData: React.FC<Props> = (props: Props) => {
  const { expBlockModalState, setExpBlockModalState } = props

  const { setFeatureExpData } = useContext(FeatureContext)

  const [expData, setExpData] = useState<Experience>({
    id: '',
    company: '',
    description: [],
    end: '',
    position: '',
    start: ''
  })

  const inputStyle = "shadow appearance-none border leading-tight rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:outline-blue-300 focus:shadow-none"

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const createResponse = await FeatureExpCreateRequest(expData!)

    if (createResponse.status === 200) {
      //get update list
      const token = localStorage.getItem('token')
      if (token) {
        const expList = await FeatureExpDataRequest(token)
        if (expList.status === 200) {
          setFeatureExpData!(expList.data)
        }
        else {
          toast.warn('unable to fetch the updated list')
        }
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
        overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-2 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold capitalize">
                Create header
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black 
                opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setExpBlockModalState(false)}>
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
                  <input value={expData?.start}
                    onChange={(e) => setExpData({ ...expData!, start: e.target.value })}
                    className={inputStyle}
                    type={'date'} placeholder={'Start'} />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>
                    End
                  </label>
                  <input value={expData?.end} onChange={(e) => setExpData({ ...expData!, end: e.target.value })}
                    className={inputStyle}
                    type={'date'} placeholder={'End'} />
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
                  onClick={() => setExpBlockModalState(false)}
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