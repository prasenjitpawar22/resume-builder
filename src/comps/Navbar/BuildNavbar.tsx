import React, { Dispatch, SetStateAction, useState } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { motion } from 'framer-motion'
import QuickNavbar from '../sidebar/QuickNavbar';
import { useNavigate } from 'react-router-dom';
import { FormsTypes } from '../../types';


interface Props {
  setCurrentForm: Dispatch<SetStateAction<FormsTypes>>
  currentForm: FormsTypes
}

const BuildNavbar = (props: Props) => {
  const { currentForm, setCurrentForm } = props

  const [navbar, setNavbar] = useState(false);

  const navigate = useNavigate()

  const variants = {
    open: { opacity: 1, transition: { duration: .8 }, height: 'auto' },
    close: { opacity: 0, transition: { duration: .8 }, height: 0 },
  }

  return (
    <>
      <nav className="w-full bg-white font-Lato shadow flex phone:gap-6 tablet:gap-8 px-2 py-3
        transition-all duration-500
      ">
        <div className='flex items-center gap-8'>
          <h2 className="font-Lato phone:text-3xl tablet:text-4xl text-primary text-center cursor-pointer
                font-extrabold " style={{ textShadow: 'rgb(0 0 0 / 25%) -2px 4px 5px' }}
            onClick={() => navigate('/')}
          >
            Resume Builder
          </h2>
          <div className={`phone:flex desktop:hidden tablet:flex`}>
            <span className='cursor-pointer flex items-center gap-1 font-bold'
              onClick={() => setNavbar(!navbar)}
            >Contact
              {navbar ?
                <BsChevronUp size={10} /> : <BsChevronDown size={10} />
              }
            </span>
          </div>
          <div className={`desktop:flex phone:hidden tablet:hidden `}>
            <ul className='flex gap-8'>
              <li onClick={() => setCurrentForm(FormsTypes.contact)}
                className='font-bold text-primary cursor-pointer'>Contact</li>
              <li onClick={() => setCurrentForm(FormsTypes.education)}
                className='font-bold text-primary cursor-pointer'>Education</li>
              <li onClick={() => setCurrentForm(FormsTypes.skill)}
                className='font-bold text-primary cursor-pointer'>Skills</li>
              <li onClick={() => setCurrentForm(FormsTypes.certifications)}
                className='font-bold text-primary cursor-pointer'>Certification</li>
              <li onClick={() => setCurrentForm(FormsTypes.experience)}
                className='font-bold text-primary cursor-pointer'>Experience</li>
              <li onClick={() => setCurrentForm(FormsTypes.buildup)}
                className='font-bold text-primary cursor-pointer'>Build up</li>
            </ul>
          </div>
        </div>
      </nav>
      <motion.ul
        animate={navbar ? 'open' : 'close'} variants={variants}
        className={`w-full bg-white shadow desktop:!hidden overflow-hidden z-10`}>
        <li onClick={() => setCurrentForm(FormsTypes.contact)}
          className='px-2 py-1 cursor-pointer hover:bg-slate-100 text-primary font-medium'>Contact</li>
        <li onClick={() => setCurrentForm(FormsTypes.education)}
          className='px-2 py-1 cursor-pointer hover:bg-slate-100 text-primary font-medium'>Education</li>
        <li onClick={() => setCurrentForm(FormsTypes.skill)}
          className='px-2 py-1 cursor-pointer hover:bg-slate-100 text-primary font-medium'>Skills</li>
        <li onClick={() => setCurrentForm(FormsTypes.certifications)}
          className='px-2 py-1 cursor-pointer hover:bg-slate-100 text-primary font-medium'>Certification</li>
        <li onClick={() => setCurrentForm(FormsTypes.experience)}
          className='px-2 py-1 cursor-pointer hover:bg-slate-100 text-primary font-medium'>Experience</li>
        <li onClick={() => setCurrentForm(FormsTypes.buildup)}
          className='px-2 py-1 cursor-pointer hover:bg-slate-100 text-primary font-medium'>Build up</li>
      </motion.ul>
      {/* <QuickNavbar
        rightBarState={rightBarState}
        setRightBarState={setRightBarState}
      /> */}
    </>
  );
}

export default BuildNavbar