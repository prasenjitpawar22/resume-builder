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

  const dropdownNavLiStyle = `px-2 py-1 cursor-pointer hover:bg-slate-100 text-primary uppercase text-sm font-bold`
  const simpleNavLiStyle = `font-extrabold text-primary cursor-pointer uppercase text-sm px-2 py-1`

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
            <span className={`${simpleNavLiStyle} flex items-center gap-1 bg-component-primary text-white rounded`}
              onClick={() => setNavbar(!navbar)}
            >{currentForm}
              {navbar ?
                <BsChevronUp size={10} /> : <BsChevronDown size={10} />
              }
            </span>
          </div>
          <div className={`desktop:flex phone:hidden tablet:hidden `}>
            <ul className='flex gap-8 items-center'>
              <li onClick={() => {
                setCurrentForm(FormsTypes.contact)
                setNavbar(false)
              }}
                className={`${simpleNavLiStyle} 
                ${currentForm === FormsTypes.contact && 'bg-component-primary text-white rounded'}`}>Contact</li>
              <li onClick={() => {
                setCurrentForm(FormsTypes.education)
                setNavbar(false)
              }}
                className={`${simpleNavLiStyle} 
                ${currentForm === FormsTypes.education && 'bg-component-primary text-white rounded'}`}>Education</li>
              <li onClick={() => {
                setCurrentForm(FormsTypes.skill)
                setNavbar(false)
              }}
                className={`${simpleNavLiStyle} 
                ${currentForm === FormsTypes.skill && 'bg-component-primary text-white rounded'}`}>Skills</li>
              <li onClick={() => {
                setCurrentForm(FormsTypes.certifications)
                setNavbar(false)
              }}
                className={`${simpleNavLiStyle} 
                ${currentForm === FormsTypes.certifications && 'bg-component-primary text-white rounded'}`}>Certification</li>
              <li onClick={() => {
                setCurrentForm(FormsTypes.experience)
                setNavbar(false)
              }}
                className={`${simpleNavLiStyle} 
                ${currentForm === FormsTypes.experience && 'bg-component-primary text-white rounded'}`}>Experience</li>
              <li onClick={() => {
                setCurrentForm(FormsTypes.buildup)
                setNavbar(false)
              }}
                className={`${simpleNavLiStyle} 
                ${currentForm === FormsTypes.buildup && 'bg-component-primary text-white rounded'}`}>Build up</li>
            </ul>
          </div>
        </div>
      </nav>
      <motion.ul
        initial={variants.close}
        animate={navbar ? 'open' : 'close'} variants={variants}
        className={`w-full bg-white shadow desktop:!hidden overflow-hidden z-10`}>
        <li onClick={() => {
          setCurrentForm(FormsTypes.contact)
          setNavbar(false)
        }}
          className={`${dropdownNavLiStyle} ${currentForm === FormsTypes.contact && 'bg-slate-100'}`}>Contact</li>
        <li onClick={() => {
          setCurrentForm(FormsTypes.education)
          setNavbar(false)
        }}
          className={`${dropdownNavLiStyle} ${currentForm === FormsTypes.education && 'bg-slate-100'}`}>Education</li>
        <li onClick={() => {
          setCurrentForm(FormsTypes.skill)
          setNavbar(false)
        }}
          className={`${dropdownNavLiStyle} ${currentForm === FormsTypes.skill && 'bg-slate-100'}`}>Skills</li>
        <li onClick={() => {
          setCurrentForm(FormsTypes.certifications)
          setNavbar(false)
        }}
          className={`${dropdownNavLiStyle} ${currentForm === FormsTypes.certifications && 'bg-slate-100'}`}>Certification</li>
        <li onClick={() => {
          setCurrentForm(FormsTypes.experience)
          setNavbar(false)
        }}
          className={`${dropdownNavLiStyle} ${currentForm === FormsTypes.experience && 'bg-slate-100'}`}>Experience</li>
        <li onClick={() => {
          setCurrentForm(FormsTypes.buildup)
          setNavbar(false)
        }}
          className={`${dropdownNavLiStyle} ${currentForm === FormsTypes.buildup && 'bg-slate-100'}`}>Build up</li>
      </motion.ul>
      {/* <QuickNavbar
        rightBarState={rightBarState}
        setRightBarState={setRightBarState}
      /> */}
    </>
  );
}

export default BuildNavbar