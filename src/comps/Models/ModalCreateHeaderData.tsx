import React, { FormEvent, useContext, useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid';
import { IHeader } from '../../types';
import { featureClient } from '../../api/axiosClient';
import { FeatureHeaderCreateRequest, FeatureHeaderDataRequest } from '../../api/FeaturesApi';
import { FeatureContext } from '../../context/FeaturesContext';
import { toast } from 'react-toastify';

interface Props {
  headerBlockModalState: boolean,
  setHeaderBlockModalState: React.Dispatch<React.SetStateAction<boolean>>
}

type HeaderDataPost = Omit<IHeader, "id">

const ModalCreateHeaderData: React.FC<Props> = (props: Props) => {

  const { headerBlockModalState, setHeaderBlockModalState } = props

  const { setFeatureHeaderData, featureHeaderData } = useContext(FeatureContext)

  const [headerData, setHeaderData] = useState<HeaderDataPost>({
    contact: "", fullname: "", github: "", linkedin: "", website: ""
  })

  const inputStyle = `shadow appearance-none border leading-tight focus:shadow-2xl focus:shadow-blue-600 
  rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:outline-blue-300 focus:shadow-none focus:border-white`

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (headerData) {
      const response = await FeatureHeaderCreateRequest(headerData)
      // console.log(response);

      if (response.error !== undefined) {
        toast.warning(response.error.error)
      }
      if (response.status === 200 && response.data) {
        setFeatureHeaderData!([...featureHeaderData!, response.data])
        setHeaderData({
          contact: '', fullname: '', github: '', linkedin: '', website: ''
        })
        setHeaderBlockModalState(false)
        toast.success('added feature header successfully')
      }
    }
  }

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setHeaderBlockModalState(false)
      }
    }
    window.addEventListener('keydown', keyDown)

    return () => {
      window.removeEventListener('keydown', keyDown)
    }
  }, [])

  return (<div>
    {headerBlockModalState &&
      <div
        className="font-Lato text-primary justify-center items-center flex overflow-x-hidden 
        overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-2 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-bold capitalize">
                Create header
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-primary
                opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setHeaderBlockModalState(false)}>
                <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <form onSubmit={handleSubmit}
              className='bg-white rounded px-8 pt-6 pb-2 mb-4'>
              <div className="relative p-6 flex-auto w-full">
                <div className='mb-4 flex gap-4 justify-between'>
                  <div className=''>
                    <label className='after:content-["_*"] block text-gray-700 text-sm font-bold mb-2'>
                      Full Name
                    </label>
                    <input required
                      value={headerData?.fullname}
                      onChange={(e) => setHeaderData({ ...headerData!, fullname: e.target.value })}
                      className={inputStyle}
                      type={'text'} placeholder={'Full  Name'} />
                  </div>
                  <div>
                    <label className='after:content-["_*"] block text-gray-700 text-sm font-bold mb-2'>
                      Contact Number
                    </label>
                    <input required value={headerData?.contact}
                      onChange={(e) => setHeaderData({ ...headerData!, contact: e.target.value })}
                      className={inputStyle}
                      type={'tel'} placeholder={'Contact Number'} />
                  </div>
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Linkedin Profile
                  </label>
                  <input value={headerData?.linkedin}
                    onChange={(e) => setHeaderData({ ...headerData!, linkedin: e.target.value })}
                    className={inputStyle}
                    type={'text'} placeholder={'Linkedin Profile'} />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Github Profile
                  </label>
                  <input value={headerData?.github}
                    onChange={(e) => setHeaderData({ ...headerData!, github: e.target.value })}
                    className={inputStyle}
                    type={'text'} placeholder={'Github Profile'} />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Website Link
                  </label>
                  <input value={headerData?.website}
                    onChange={(e) => setHeaderData({ ...headerData!, website: e.target.value })}
                    className={inputStyle}
                    type={'text'} placeholder={'Website Link'} />
                </div>

              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-primary background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setHeaderBlockModalState(false)}
                >
                  Close
                </button>
                <button
                  className="bg-component-secondary text-white active:bg-component-primary hover:bg-component-primary
                   font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg 
                  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>}
  </div >)
}

export default ModalCreateHeaderData
