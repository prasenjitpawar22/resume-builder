import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai'
import { ToastContainer } from 'react-toastify';
import { FaUserAlt } from 'react-icons/fa'

import DropDownList from '../DropDownList';
import { ResumeContext } from '../../context/ResumeContext';
import FeatureEduCardPlain from '../Features/FeatureEduCardPlain';
import FeatureExpCardPlain from '../Features/FeatureExpCardPlain';
import FeatureHeaderCardPlain from '../Features/FeatureHeaderCardPlain';
import FeatureSkillCardPlain from '../Features/FeatureSkillCardPlain';
import ModalCreateEduData from '../Models/ModalCreateEduData';
import ModalCreateHeaderData from '../Models/ModalCreateHeaderData';
import ModelCreateExpData from '../Models/ModelCreateExpData';
import { Resume } from '../Resume/Resume';
import { BiHome, BiUser } from 'react-icons/bi';

type Props = {

}
const ResumeBuildSidebar: React.FC<Props> = (props: Props) => {
  const { } = props;
  const [open, setOpen] = useState(false);
  const [headerBlockModalState, setHeaderBlockModalState] = useState<boolean>(false)
  const [eduBlockModalState, setEduBlockModalState] = useState<boolean>(false)
  const [expBlockModalState, setExpBlockModalState] = useState<boolean>(false)
  const [headerBlockState, setHeaderBlockState] = useState(false)
  const [eduBlockState, setEduBlockState] = useState(false)
  const [expBlockState, setExpBlockState] = useState<boolean>(false)
  const [skillBlockState, setSkillBlockState] = useState(false)

  const { resumeBlockHolderWidth, resumeHeaderData, setResumeHeaderData,
    resumeExpData, setResumeExpData, setResumeColor, resumeEduData, setResumeEduData,
    resumeSkillData, setResumeSkillData } = useContext(ResumeContext)

  const [rightBarState, setRightBarState] = useState(false)
  const navigate = useNavigate()

  return (<>
    <div
      className={`fixed top-2 right-0 bg-component-primary h-12 rounded-l-3xl z-10
        flex justify-between px-4 items-center ${rightBarState ? 'w-60' : 'w-12'} 
        transition-all duration-700 shadow-md
        `}>
      {rightBarState ?
        <div className='transition-all duration-100 w-full flex justify-between px-4 items-center'>
          <AiOutlineDoubleRight cursor={'pointer'}
            className='text-white hover:text-slate-600'
            onClick={() => { setRightBarState(!rightBarState) }} />
          <div className='flex gap-2'>
            <BiHome cursor={'pointer'} onClick={() => {
              setRightBarState(false)
              navigate('/')
            }}
              className='bg-component-ternary text-slate-700 hover:bg-component-secondary w-8 h-8 px-2 rounded-full' />
            <BiUser cursor={'pointer'}
              className='bg-component-ternary text-slate-700 hover:bg-component-secondary w-8 h-8 px-2 rounded-full' />
          </div>
        </div> :
        <AiOutlineDoubleLeft cursor={'pointer'} className='text-white hover:text-slate-600'
          onClick={() => { setRightBarState(!rightBarState) }} />
      }
    </div>

    <div className='flex'>
      <div className="tablet:flex phone:hidden flex-col min-h-screen p-3 shadow tablet:w-70">
        <div className="space-y-3">
          <div className="flex p-3 items-center shadow bg-component-secondary rounded-xl">
            <h2 className="font-Lato phone:text-3xl tablet:text-7xl text-primary text-center
               tablet:font-extrabold" style={{ textShadow: 'rgb(0 0 0 / 25%) -2px 4px 5px' }}>
              Resume Builder
            </h2>
          </div>

          <div className="flex-1 ">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm">
                <DropDownList
                  setHeaderBlockModalState={setHeaderBlockModalState}
                  setBlockState={setHeaderBlockState} blockState={headerBlockState} title={'Header Block'} />
                {
                  <FeatureHeaderCardPlain
                    headerBlockState={headerBlockState}
                    resumeHeaderData={resumeHeaderData!}
                    setResumeHeaderData={setResumeHeaderData!}
                  />
                }
              </li>
              <li className="rounded-sm">
                <DropDownList
                  setEduBlockModalState={setEduBlockModalState}
                  setBlockState={setEduBlockState} blockState={eduBlockState} title={'Education Block'} />
                {
                  // eduBlockState &&
                  <FeatureEduCardPlain eduBlockState={eduBlockState} />
                }
              </li>
              <li className="rounded-sm">
                <DropDownList
                  setExpBlockModalState={setExpBlockModalState}
                  setBlockState={setExpBlockState} blockState={expBlockState} title={'Experience Block'} />
                {
                  // expBlockState &&
                  <FeatureExpCardPlain
                    expBlockState={expBlockState}
                  />
                }
              </li>
              {/* <li className="rounded-sm">
                <DropDownList setBlockState={setSkillBlockState} blockState={skillBlockState} title={'Skills Block'} />
                <FeatureSkillCardPlain
                  skillBlockState={skillBlockState}
                  resumeSkillData={resumeSkillData} setResumeSkillData={setResumeSkillData!}
                  data={data.skill} />
                <DropDownList title={'Other Block'} />
              </li>
              <li className="rounded-sm">
                <a
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Logout</span>
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>


      {/* resume's  */}
      <div className="bg-slate-400 min-h-screen w-full mx-auto">
        <Resume />
      </div>

      <ModalCreateHeaderData
        setHeaderBlockModalState={setHeaderBlockModalState}
        headerBlockModalState={headerBlockModalState} />

      <ModalCreateEduData
        setEduBlockModalState={setEduBlockModalState}
        eduBlockModalState={eduBlockModalState} />

      <ModelCreateExpData
        expBlockModalState={expBlockModalState}
        setExpBlockModalState={setExpBlockModalState} />

      <ToastContainer />
    </div>
  </>
  );
}

export default ResumeBuildSidebar;