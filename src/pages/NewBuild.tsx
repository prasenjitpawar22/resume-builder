import React, { useEffect, useState } from 'react'
import BuildNavbar from '../comps/Navbar/BuildNavbar'
import { FormsTypes } from '../types'
import EducationForm from '../comps/Wrapper/EducationForm'
import ContactForm from '../comps/Wrapper/ContactForm'
import ExperienceForm from '../comps/Wrapper/ExperienceForm'


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
            : <h1>asda</h1>}
    </>
  )
}

export default NewBuild