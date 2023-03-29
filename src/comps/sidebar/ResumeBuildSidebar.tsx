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
import QuickNavbar from './QuickNavbar';

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

  const ModalOpenBackground = headerBlockModalState || eduBlockModalState ||
    expBlockModalState || skillBlockState ? 'opacity-50' : ''

  return (<>
    <QuickNavbar
      rightBarState={rightBarState}
      setRightBarState={setRightBarState}
    />

    <div className='flex'>
      <div className={`tablet:flex phone:hidden flex-col min-h-screen p-3 
        shadow tablet:w-70 ${ModalOpenBackground}`}>
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
              <li className="rounded-sm">
                <DropDownList
                  // setS={setExpBlockModalState}
                  setBlockState={setSkillBlockState} blockState={skillBlockState} title={'Skill Block'} />
                {
                  // expBlockState &&
                  <FeatureSkillCardPlain
                    skillBlockState={skillBlockState}
                  />
                }
              </li>
            </ul>
          </div>
        </div>
      </div>


      {/* resume's  */}
      <div className={`bg-slate-400 min-h-screen w-full mx-auto ${ModalOpenBackground}`}>
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