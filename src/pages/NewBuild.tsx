import React, { useEffect, useState } from 'react'
import BuildNavbar from '../comps/Navbar/BuildNavbar'
import { FormsTypes } from '../types'

import SkillForm from '../comps/Forms/SkillForm'
import CertificationForm from '../comps/Forms/CertificationForm'
import ContactForm from '../comps/Forms/ContactForm'
import EducationForm from '../comps/Forms/EducationForm'
import ExperienceForm from '../comps/Forms/ExperienceForm'
import PreviewResume from '../comps/Resume/PreviewResume'
import ProjectForm from '../comps/Forms/ProjectForm'
import SummaryForm from '../comps/Forms/SummaryForm'


const NewBuild = () => {

  const [currentForm, setCurrentForm] = useState<FormsTypes>(FormsTypes.contact)

  useEffect(() => {
    console.log(currentForm);

  }, [currentForm])

  return (
    <>
      <BuildNavbar currentForm={currentForm} setCurrentForm={setCurrentForm} />
      {currentForm === FormsTypes.contact ? <ContactForm />
        : currentForm === FormsTypes.education ? <EducationForm />
          : currentForm === FormsTypes.experience ? <ExperienceForm />
            : currentForm === FormsTypes.skill ? <SkillForm />
              : currentForm === FormsTypes.certifications ? <CertificationForm />
                : currentForm === FormsTypes.project ? <ProjectForm />
                  : currentForm === FormsTypes.summary ? <SummaryForm />
                    : <PreviewResume />}
    </>
  )
}

export default NewBuild