import React, { FormEvent, useContext, useState } from 'react'

import data from '../../data'
import { v4 as uuidv4 } from 'uuid';
import { Header } from '../../types';
import { featureClient } from '../../api/axiosClient';
import { FeatureHeaderDataRequest } from '../../api/FeaturesApi';
import { FeatureContext } from '../../context/FeaturesContext';

interface Props {
  headerBlockModalState: boolean,
  setHeaderBlockModalState: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalCreateHeaderData: React.FC<Props> = (props: Props) => {

  const { headerBlockModalState, setHeaderBlockModalState } = props

  const { setFeatureHeaderData } = useContext(FeatureContext)

  const [headerData, setHeaderData] = useState<Header | undefined>()

  const inputStyle = "shadow appearance-none border leading-tight rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:outline-blue-300 focus:shadow-none"

  const handleSubmit = (e: FormEvent) => {
    const id = uuidv4()
    console.log({ headerData });

    featureClient.post("set-feature-header", {
      fullname: headerData?.fullname,
      _id: uuidv4(),
      contact: headerData?.contact,
      linkedin: headerData?.linkedin,
      github: headerData?.github,
      websit: headerData?.websit,
    })
      .then(async (res) => {
        console.log('create submit response', res);
        // call api 
        if (res?.data) {
          const token = localStorage.getItem('token');
          if (token) {
            const allHeaders = await FeatureHeaderDataRequest(token)
            if (allHeaders.data) {
              setFeatureHeaderData!(allHeaders.data)
            }
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })

    // data.header.push({
    //   id: uuidv4(),
    //   contact: headerData?.contact,
    //   fullname: headerData?.fullname,
    //   github: headerData?.github,
    //   websit: headerData?.websit,
    //   linkedin: headerData?.linkedin
    // })
    // console.log(data);
    e.preventDefault()
  }

  return (<div>
    {headerBlockModalState &&
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
                onClick={() => setHeaderBlockModalState(false)}>
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
                      Full Name
                    </label>
                    <input required value={headerData?.fullname}
                      onChange={(e) => setHeaderData({ ...(headerData!), fullname: e.target.value })}
                      className={inputStyle}
                      type={'text'} placeholder={'Full Name'} />
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
                  <input value={headerData?.github} onChange={(e) => setHeaderData({ ...headerData!, github: e.target.value })}
                    className={inputStyle}
                    type={'text'} placeholder={'Github Profile'} />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Website Link
                  </label>
                  <input value={headerData?.websit} onChange={(e) => setHeaderData({ ...headerData!, websit: e.target.value })}
                    className={inputStyle}
                    type={'text'} placeholder={'Website Link'} />
                </div>

              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setHeaderBlockModalState(false)}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg 
                  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                // onClick={() => setHeaderBlockModalState(false)}
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

export default ModalCreateHeaderData
