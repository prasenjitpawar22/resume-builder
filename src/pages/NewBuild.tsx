import React, { useEffect, useState } from 'react'
import BuildNavbar from '../comps/Navbar/BuildNavbar'
import { FormsTypes } from '../types'
import EducationForm from '../comps/Forms/EducationForm'
import ContactForm from '../comps/Forms/ContactForm'
import ExperienceForm from '../comps/Forms/ExperienceForm'
import SkillForm from '../comps/Forms/SkillForm'
import CertificationForm from '../comps/Forms/CertificationForm'


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
                : <h1>asda</h1>}
    </>
  )
}

export default NewBuild