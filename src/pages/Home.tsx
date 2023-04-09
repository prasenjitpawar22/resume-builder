import React, { useContext, useEffect, useState, } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useAnimation } from 'framer-motion'
import { useInView, } from 'react-intersection-observer'
import { Parallax, } from 'react-scroll-parallax'
import { useUser } from '@clerk/clerk-react'
import { GoLinkExternal } from 'react-icons/go'

import { UserContext } from '../context/UserContext'
import Blob from '../comps/Blob'

type TProps = {}
const Home: React.FC<TProps> = () => {
    const navigate = useNavigate()
    // const { user } = useContext(UserContext)

    const { user, isSignedIn, isLoaded } = useUser()

    const { ref, inView } = useInView({
        threshold: .75,
    })
    const animationBolobLeft = useAnimation()
    const animationBolobRight = useAnimation()
    const [firstRender, setFirstRender] = useState(true)

    const resumeTemplates = [1, 2, 4, 5, 6, 7,]

    //first render animation set
    useEffect(() => {
        setFirstRender(false)
    }, [])

    // blob effect 
    useEffect(() => {
        // firstRender animationBolobLeft && blobRight
        if (firstRender) {
            animationBolobLeft.start({
                y: [-100, 0],
                transition: {
                    duration: 1,
                },
                opacity: [0, 1]
            })
            animationBolobRight.start({
                y: [100, 0],
                transition: {
                    duration: 1,
                },
                opacity: [0, 1]
            })
        }

        if (!firstRender) {
            if (inView) {
                animationBolobLeft.start({
                    x: 0,
                    transition: {
                        type: 'spring', bounce: .3, duration: 1,
                    },
                    opacity: 1,
                })
                animationBolobRight.start({
                    x: 0,
                    transition: {
                        type: 'spring', bounce: .3, duration: 1,
                    },
                    opacity: 1,
                })
            }
            if (!inView) {
                animationBolobLeft.start({
                    x: '-100vw',
                    transition: {
                        type: 'spring', bounce: .3, duration: .8,
                    },
                    opacity: 0
                })
                animationBolobRight.start({
                    x: '100vw',
                    transition: {
                        type: 'spring', bounce: .3, duration: .8,
                    },
                    opacity: 0
                })
            }
        }
    }, [inView])

    // useEffect(() => {
    //     console.log(user, isSignedIn, isLoaded)
    // }, [user, isSignedIn, isLoaded])

    return (
        // <div className='grid grid-cols-1 w-full h-full gap-0'>
        <>
            <Parallax speed={-40} className="h-full">
                <motion.div ref={ref} className='min-h-screen h-full font-Lato flex items-center justify-center'>
                    <div className='z-10 relative flex flex-col gap-4 justify-center items-center'>
                        <h2 className="flex font-Lato phone:text-3xl tablet:text-7xl text-primary text-center
                    font-extrabold z-10" style={{ textShadow: 'rgb(0 0 0 / 25%) -2px 4px 5px' }}>
                            Resume Builder
                        </h2>
                        <button onClick={() => { user && isSignedIn ? navigate('/new-build') : navigate('/login') }}
                            className='bg-component-secondary p-3 rounded text-slate-100 z-10
                        font-bold hover:bg-component-primary transition-all duration-300 focus:outline-none'>
                            Build Resume
                        </button>
                    </div>
                    <Blob animationBolobLeft={animationBolobLeft} animationBolobRight={animationBolobRight} />
                </motion.div>
            </Parallax>
            <Parallax speed={5}
                className='relative col-span-1 p-8 items-center justify-center min-h-screen 
                    w-full h-full bg-gray-50 flex'>
                <div className='p-4'>
                    <div className='mb-8'>
                        <div className='text-primary flex flex-col gap-2 justify-center phone:text-3xl tablet:text-5xl'>
                            <h1 className='capitalize text-center 
                             text-primary '>
                                inspired from
                            </h1>
                            <a target="_blank" rel="noopener noreferrer"
                                href='https://www.rezi.ai/'
                                className='text-[40px] hover:text-violet-500 justify-center leading-loose w-full items-center flex'>Rezi.ai
                                <GoLinkExternal size={25} />
                            </a>
                        </div>
                    </div>

                    {/* <div className='flex flex-wrap gap-4 justify-center'>
                        {resumeTemplates.map((resumeTemplate, index) =>
                            <motion.div key={index} className="max-w-sm rounded overflow-hidden shadow-lg">
                                <div className="px-6 py-4 bg-slate-50">
                                    <div className="font-bold text-xl mb-2">The Coldest Sunset {resumeTemplate} </div>
                                    <p className="text-gray-700 text-base">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2 bg-slate-400">
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                                </div>
                            </motion.div>
                        )}
                    </div> */}
                </div>
            </Parallax>
        </>
    )
}

export default Home
