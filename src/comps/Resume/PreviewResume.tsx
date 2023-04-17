import React, { useContext, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MdEmail, MdLocationPin, MdPhone, MdPhoneAndroid } from 'react-icons/md'
import { BsDownload, BsLinkedin } from 'react-icons/bs'
import { AiFillCloud } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { FormsDataContext } from '../../context/FormsDataContext'
import Moment from 'moment'
import { toast } from 'react-toastify'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { formClient } from '../../api/axiosClient'
import Cookies from 'js-cookie'
import FileSaver from 'file-saver';

const PreviewResume = () => {
    const navigate = useNavigate()

    const { summary, contact, experience, education, skills, certification } = useContext(FormsDataContext)

    const [disableDownload, setDisableDownload] = useState(false)


    const handleDownlaod = async () => {
        setDisableDownload(true)

        const token = Cookies.get('__session')
        if (!token) return;

        await formClient.get('get-pdf',
            {
                responseType: 'arraybuffer',
                headers: {
                    Authorization: 'Bearer ' + token,
                    Accept: 'application/pdf',
                },
            })
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                FileSaver.saveAs(pdfBlob, 'firstResume.pdf');
            })
            .catch((err) => {
                console.log(err)
            })

        setDisableDownload(false)
    }

    return (
        <motion.div className='grid grid-cols-1 gap-6 font-Lato phone:px-4 desktop:px-14 py-12 bg-slate-50'
            animate={{ opacity: [0, 1], transition: { duration: .8 } }}
        >
            <div className='flex justify-between items-center w-full px-4 h-20 mb-12 bg-white rounded-md shadow'>
                <button onClick={() => {
                    handleDownlaod()
                    // navigate('/download')
                }}
                    className={`capitalize flex items-center gap-2 h-fit text-white p-2 rounded transition-all duration-200
                    ${disableDownload ? 'bg-component-secondary cursor-default' : 'bg-component-secondary hover:bg-component-primary'}
                    `}>
                    <BsDownload /> download</button>
            </div>

            <div className='bg-slate-200 h-full w-full rounded-md font-Lato pdf'>
                <div id='rootElementId' className='flex justify-center items-center h-full p-12 bg-white'>
                    <article className='relative w-full phone:text-[10px] desktop:text-[20px] text-primary'>
                        {contact && contact.fullname ? <h1 className='text-center text-[1.72em] mb-4'>{contact.fullname} </h1> : ''}
                        <div className='flex flex-wrap justify-center items-center phone:gap-1  phone:text-[10px] desktop:text-[20px] phone:mb-4 desktop:mb-8 '>
                            {contact && contact.state ? <span className='flex items-center gap-[1.2px] text-[0.75em] phone:px-[0.1px] desktop:px-2'><MdLocationPin color='#434343' />
                                {contact.state}{contact && contact.country ? `, ${contact.country}` : ''} </span> : ''}
                            {contact && contact.email ? <span className='flex items-center gap-[1.2px] text-[0.75em] phone:px-[0.1px] desktop:px-2'><MdEmail color='#434343' />
                                {contact.email} </span> : ''}
                            {contact && contact.phone ? <span className='flex items-center gap-[1.2px] text-[0.75em] phone:px-[0.1px] desktop:px-2'><MdPhoneAndroid color='#434343' />
                                {contact.phone}</span> : ''}
                            {contact && contact.linkedin ? <span className='flex items-center gap-[1.2px] text-[0.75em] phone:px-[0.1px] desktop:px-2'><BsLinkedin color='#434343' />
                                {contact.linkedin}</span> : ''}
                            {contact && contact.website ? <span className='flex items-center gap-[1.2px] text-[0.75em] phone:px-[0.1px] desktop:px-2'><AiFillCloud color='#434343' />
                                {contact.website}</span> : ''}

                        </div>

                        <section className='mb-4'>
                            <hr className='' />
                            <div className='phone:text-[10px] desktop:text-[20px]'>
                                <span className='uppercase text-[1em] font-bold w-full'>summary</span>
                                <hr className='phone:border-t-[0.2px] desktop:border-[1.2px] border-black' />
                                <p className='text-left text-[0.85em] desktop:leading-6 phone:leading-3'>
                                    {summary && summary.summary ? summary.summary :
                                        <p className='text-center opacity-20 text-3xl w-full'>Blank</p>}
                                </p>
                            </div>
                        </section>

                        <section className=''>
                            <hr className='' />
                            <div className='phone:text-[10px] desktop:text-[20px]'>
                                <span className='uppercase text-[1em] font-bold w-full'>experience</span>
                                <hr className='phone:border-t-[0.2px] desktop:border-[1.2px] border-black' />
                                {experience && experience.length > 0 ? experience.map((exp, index) => {
                                    return <>
                                        <div key={index} className='flex justify-between items-end'>
                                            <div className='flex flex-col phone:text-[10px] desktop:text-[20px]'>
                                                <span className='font-bold text-[.8em]'>{exp.role} </span>
                                                <span className='font-bold text-[.7em]'>{exp.company}</span>
                                            </div>
                                            <div className='phone:text-[10px] desktop:text-[20px]'>
                                                <span className='font-bold text-[.8em] '>
                                                    {exp.startYear ? Moment(exp.startYear).format('MMM YYYY') : ''}
                                                    {exp.startYear && (exp.endYear || exp.present) && ' - '}
                                                    {exp.endYear ? Moment(exp.endYear).format('MMM YYYY') : ''}
                                                    {exp.present && exp.present && 'Present'}
                                                    {(exp.endYear || exp.present) && exp.location && ", "} {exp.location ? exp.location : ''}
                                                </span>
                                            </div>
                                        </div>
                                        <div className=' mb-3'>
                                            <p className='text-left text-[0.85em] desktop:leading-6 phone:leading-3'>
                                                {/* {exp.achivements.split("•").join("\t")} */}
                                                {exp.achivements.split("•").map((achivement, index) =>
                                                    index !== 0 &&
                                                    <ul key={index} className='' >
                                                        <li className=''>• {achivement} </li>
                                                    </ul>
                                                )}
                                            </p>
                                        </div>
                                    </>
                                }) :
                                    <p className='text-center opacity-20 text-3xl w-full'>Blank</p>}
                            </div>
                        </section>


                        <section className=''>
                            <hr className='' />
                            <div className='phone:text-[10px] desktop:text-[20px]'>
                                <span className='uppercase text-[1em] font-bold w-full'>education</span>
                                <hr className='phone:border-t-[0.2px] desktop:border-[1.2px] border-black' />

                                <div className='flex flex-col desktop:gap-2 phone:gap-1 mb-4'>
                                    {education && education.length > 0 ? education.map((edu, index) => {
                                        return <div key={index} className='flex flex-col phone:text-[10px] desktop:text-[20px]'>
                                            <span className='font-bold text-[.8em]'>{edu.degree && edu.degree}</span>
                                            <span className='text-[.7em] font-bold'>
                                                {edu.university && edu.university}
                                                {edu.location && edu.university && ' - '}
                                                {edu.location && edu.location}
                                                {edu.location && edu.year && ' - '}
                                                {edu.year && Moment(edu.year).format('YYYY')}
                                                {edu.year && edu.gpa && ' - '}
                                                {edu.gpa && edu.gpa}
                                            </span>
                                        </div>
                                    }) :
                                        <p className='text-center opacity-20 text-3xl w-full'>Blank</p>}
                                </div>
                            </div>
                        </section>

                        <section className=''>
                            <hr className='' />
                            <div className='phone:text-[10px] desktop:text-[20px]'>
                                <span className='uppercase text-[1em] font-bold w-full'>certifications</span>
                                <hr className='phone:border-t-[0.2px] desktop:border-[1.2px] border-black' />

                                <div className='flex flex-col desktop:gap-2 phone:gap-1 mb-4'>
                                    {certification && certification.length > 0 ? certification.map((certificate, index) =>

                                        <div key={index} className='flex flex-col phone:text-[10px] desktop:text-[20px]'>
                                            <span className='font-bold text-[.8em]'>{certificate.name && certificate.name} </span>
                                            <span className='text-[.7em] font-bold'>
                                                {certificate.location && certificate.location}
                                                {certificate.location && certificate.year && '  • '}
                                                {certificate.year && Moment(certificate.year).format('YYYY')}
                                            </span>
                                            <span className='text-[.7em]'>{certificate.helpful && certificate.helpful} </span>
                                        </div>
                                    ) :
                                        <p className='text-center opacity-20 text-3xl w-full'>Blank</p>}
                                </div>
                            </div>
                        </section>

                        <section className=''>
                            <hr className='' />
                            <div className='phone:text-[10px] desktop:text-[20px]'>
                                <span className='uppercase text-[1em] font-bold w-full'>skills</span>
                                <hr className='phone:border-t-[0.2px] desktop:border-[1.2px] border-black' />

                                <div className='flex flex-col desktop:gap-2 phone:gap-1 mb-4'>
                                    {skills && skills.length > 0 ? skills.map((skill, index) =>
                                        <span key={index} className='font-bold text-[.8em]'>{skill.skill}</span>
                                    ) : <p className='text-center opacity-20 text-3xl w-full'>Blank</p>}
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