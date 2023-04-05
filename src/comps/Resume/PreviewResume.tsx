import React from 'react'
import { motion } from 'framer-motion'
import { MdEmail, MdLocationPin, MdPhone, MdPhoneAndroid } from 'react-icons/md'
import { BsDownload, BsLinkedin } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'


const PreviewResume = () => {
    const navigate = useNavigate()
    return (
        <motion.div className='grid grid-cols-1 gap-6 font-Lato phone:px-4 desktop:px-14 py-12 bg-slate-50'
            animate={{ opacity: [0, 1], transition: { duration: .8 } }}
        >
            <div className='flex justify-between items-center w-full px-4 h-20 mb-12 bg-white rounded-md shadow'>
                <button onClick={() => navigate('/download')}
                    className='capitalize flex items-center gap-2 bg-component-secondary hover:bg-component-primary h-fit text-white p-2 rounded transition-all duration-200'>
                    <BsDownload /> download</button>
            </div>

            <div className='bg-slate-200 h-full w-full rounded-md font-Lato'>
                <div className='flex justify-center items-center h-full p-12 bg-white'>
                    <article className='relative w-full phone:text-[10px] desktop:text-[20px] text-primary'>
                        <h1 className='text-center text-[1.72em] mb-4'>Prasenjit Pawar</h1>
                        <div className='flex flex-wrap justify-center items-center phone:gap-1  phone:text-[10px] desktop:text-[20px] phone:mb-4 desktop:mb-8 '>
                            <span className='flex items-center gap-[1.2px] text-[0.75em] phone:px-[0.1px] desktop:px-2'><MdLocationPin color='#434343' /> Maharashtra, India</span>
                            <span className='flex items-center gap-[1.2px] text-[0.75em] phone:px-[0.1px] desktop:px-2'><MdEmail color='#434343' /> prasenjitpawar@gmail.com</span>
                            <span className='flex items-center gap-[1.2px] text-[0.75em] phone:px-[0.1px] desktop:px-2'><MdPhoneAndroid color='#434343' /> 9981291231</span>
                            <span className='flex items-center gap-[1.2px] text-[0.75em] phone:px-[0.1px] desktop:px-2'><BsLinkedin color='#434343' /> https://www.linkedin.com/in/prasenjit-pawar-2b378b77</span>
                        </div>

                        <section className='mb-4'>
                            <hr className='' />
                            <div className='phone:text-[10px] desktop:text-[20px]'>
                                <span className='uppercase text-[1em] font-bold w-full'>summary</span>
                                <hr className='phone:border-t-[0.2px] desktop:border-[1.2px] border-black' />
                                <p className='text-left text-[0.85em] desktop:leading-6 phone:leading-3'>
                                    Experienced software engineer with 1 year of experience in
                                    frontend and backend development. Proficient in multiple programming
                                    languages and able to quickly learn new technologies. Demonstrated ability to
                                    solve technical problems and develop software solutions
                                </p>
                            </div>
                        </section>

                        <section className=''>
                            <hr className='' />
                            <div className='phone:text-[10px] desktop:text-[20px]'>
                                <span className='uppercase text-[1em] font-bold w-full'>experience</span>
                                <hr className='phone:border-t-[0.2px] desktop:border-[1.2px] border-black' />
                                <div className='flex justify-between items-end'>
                                    <div className='flex flex-col phone:text-[10px] desktop:text-[20px]'>
                                        <span className='font-bold text-[.8em]'>MERN Stack Intern</span>
                                        <span className='font-bold text-[.7em]'>Bano Tech</span>
                                    </div>
                                    <div className='phone:text-[10px] desktop:text-[20px]'>
                                        <span className='font-bold text-[.8em] '>March 2023 - April 2023, Bangalore, India</span>
                                    </div>
                                </div>
                                <div className='phone:px-[10px] desktop:px-4 mb-3'>
                                    <ul className='list-disc text-left text-[0.85em] desktop:leading-6 phone:leading-3'>
                                        <li>Designed and implemented responsive mobile applications for both user android and iOS using React Native and Expo technologies.</li>
                                        <li>Added functionalities for web users by making them more user-friendly and responsive using React and CSS Frameworks.</li>
                                        <li>Tech Stack – React, React Native, Bootstrap, Tailwind CSS, MongoDB, Nodejs.</li>
                                    </ul>
                                </div>


                                <div className='flex justify-between items-end'>
                                    <div className='flex flex-col phone:text-[10px] desktop:text-[20px]'>
                                        <span className='font-bold text-[.8em]'>Software Engineer</span>
                                        <span className='font-bold text-[.7em]'>Capgemini</span>
                                    </div>
                                    <div className='phone:text-[10px] desktop:text-[20px]'>
                                        <span className='font-bold text-[.8em] '>April 2022 - Present, Mumbai, India</span>
                                    </div>
                                </div>
                                <div className='phone:px-[10px] desktop:px-4 mb-4'>
                                    <ul className='list-disc text-left text-[0.85em] desktop:leading-6 phone:leading-3'>
                                        <li>Implemented scalable REST APIs on enterprise-level microservices and created workflows using Uber Cadence while working as a backend developer.</li>
                                        <li> Became AWS Certified Cloud Practitioner and added unit/integration test cases which increased the code coverage up to 70%, CI/CD, pull  request, and code review.</li>
                                        <li>Tech Stack – C#, .NET, Azure, MSSQL, Jira, Git, Docker.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>


                        <section className=''>
                            <hr className='' />
                            <div className='phone:text-[10px] desktop:text-[20px]'>
                                <span className='uppercase text-[1em] font-bold w-full'>education</span>
                                <hr className='phone:border-t-[0.2px] desktop:border-[1.2px] border-black' />

                                <div className='flex flex-col desktop:gap-2 phone:gap-1 mb-4'>
                                    <div className='flex flex-col phone:text-[10px] desktop:text-[20px]'>
                                        <span className='font-bold text-[.8em]'>Bachelor of Technology in Computer Science and Engineering</span>
                                        <span className='text-[.7em]'>Dr. Babasaheb Ambedkar Marathwada Technological University - Maharashtra, India - 2021 - 7.8</span>
                                    </div>
                                    <div className='flex flex-col phone:text-[10px] desktop:text-[20px]'>
                                        <span className='font-bold text-[.8em]'>Diploma in Computer Engineering</span>
                                        <span className='text-[.7em]'>Maharashtra State Board of Technical Education - Maharashtra, India - 2018 - 7.3</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className=''>
                            <hr className='' />
                            <div className='phone:text-[10px] desktop:text-[20px]'>
                                <span className='uppercase text-[1em] font-bold w-full'>certifications</span>
                                <hr className='phone:border-t-[0.2px] desktop:border-[1.2px] border-black' />

                                <div className='flex flex-col desktop:gap-2 phone:gap-1 mb-4'>
                                    <div className='flex flex-col phone:text-[10px] desktop:text-[20px]'>
                                        <span className='font-bold text-[.8em]'>AWS Certified Cloud Practitioner</span>
                                        <span className='text-[.7em]'>Dr. Babasaheb Ambedkar Marathwada Technological University - Maharashtra, India - 2021 - 7.8</span>
                                    </div>
                                    <div className='flex flex-col phone:text-[10px] desktop:text-[20px]'>
                                        <span className='font-bold text-[.8em]'>Diploma in Computer Engineering</span>
                                        <span className='text-[.7em]'>Amazon - 2023</span>
                                        <p className='text-left text-[0.85em] desktop:leading-6 phone:leading-3'>The AWS Certified Cloud Practitioner offers a foundational understanding of AWS Cloud concepts, services, and terminology</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className=''>
                            <hr className='' />
                            <div className='phone:text-[10px] desktop:text-[20px]'>
                                <span className='uppercase text-[1em] font-bold w-full'>skills</span>
                                <hr className='phone:border-t-[0.2px] desktop:border-[1.2px] border-black' />

                                <div className='flex flex-col desktop:gap-2 phone:gap-1 mb-4'>
                                    <span className='font-bold text-[.8em]'>Programming: C#, JavaScript, Java, Python</span>
                                    <span className='font-bold text-[.8em]'>Framework: Next.js, Vue.js, .NET Core, Django</span>
                                    <span className='font-bold text-[.8em]'>MSSQL, MySQL, NoSQL, Git, MongoDB, Azure, AWS, Jira</span>
                                </div>
                            </div>
                        </section>

                    </article>
                </div>
            </div>
        </motion.div>
    )
}

export default PreviewResume