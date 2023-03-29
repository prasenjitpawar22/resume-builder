import React, { useEffect, useState } from 'react'
import BuildNavbar from '../comps/Navbar/BuildNavbar'
import ContactForm from '../comps/Forms/ContactForm'
import ExperienceForm from '../comps/Forms/ExperienceForm'
import { FormsTypes } from '../types'


const NewBuild = () => {

  const [currentForm, setCurrentForm] = useState<FormsTypes>(FormsTypes.contact)

  useEffect(() => {
    console.log(currentForm);

  }, [currentForm])

  return (
    <>
      <BuildNavbar currentForm={currentForm} setCurrentForm={setCurrentForm} />
      {currentForm === FormsTypes.contact ?
        <ContactForm />
        : currentForm === FormsTypes.experience ?
          <ExperienceForm />
          : <h1>asda</h1>}
    </>
  )
}

export default NewBuild