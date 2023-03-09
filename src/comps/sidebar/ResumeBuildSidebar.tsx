import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ResumeContext } from '../../context/ResumeContext';
import DropDownList from '../DropDownList';
import FeatureEduCardPlain from '../Features/FeatureEduCardPlain';
import FeatureExpCardPlain from '../Features/FeatureExpCardPlain';
import FeatureHeaderCardPlain from '../Features/FeatureHeaderCardPlain';
import FeatureSkillCardPlain from '../Features/FeatureSkillCardPlain';
import { Resume } from '../Resume/Resume';

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

  return (
    <div className='flex'>
      <div className="tablet:flex phone:hidden flex-col h-screen p-3 shadow tablet:w-70 bg-slate-100 ">
        <div className="space-y-3">
          <div className="flex p-3 items-center shadow bg-component-secondary rounded-xl">
            <h2 className="font-Lato phone:text-3xl tablet:text-7xl text-primary text-center
               tablet:font-extrabold" style={{ textShadow: 'rgb(0 0 0 / 25%) -2px 4px 5px' }}>
              Resume Builder
            </h2>
          </div>

          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm">
                <DropDownList
                  setHeaderBlockModalState={setHeaderBlockModalState}
                  setBlockState={setHeaderBlockState} blockState={headerBlockState} title={'Header Block'} />
                {
                  <FeatureHeaderCardPlain
                    headerBlockState={headerBlockState}
                    resumeHeaderData={resumeHeaderData}
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
      <div className="container bg-slate-400 h-screen mx-auto">
        <Resume />
        {/* <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3"> */}
        {/* <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
            <div className="text-sm font-medium text-gray-500 truncate">
              Total users
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">
              12,00
            </div>
          </div>
          <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
            <div className="text-sm font-medium text-gray-500 truncate">
              Total Profit
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">
              $ 450k
            </div>
          </div>
          <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
            <div className="text-sm font-medium text-gray-500 truncate">
              Total Orders
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">
              20k
            </div>
          </div> */}
        {/* <div className="w-10/12 px-4 py-5 bg-white rounded-lg shadow"> */}
        {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default ResumeBuildSidebar;