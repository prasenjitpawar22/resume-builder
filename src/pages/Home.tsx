import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { redirect, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import Blob from '../comps/Blob'

type TProps = {}
const Home: React.FC<TProps> = () => {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    return (
        <div className='min-h-screen font-Lato flex items-center justify-center'>
            <div className='z-10 flex flex-col gap-4 justify-center items-center'>
                <h2 className="font-Lato phone:text-3xl tablet:text-7xl text-primary text-center
               tablet:font-extrabold" style={{ textShadow: 'rgb(0 0 0 / 25%) -2px 4px 5px' }}>
                    Resume Builder
                </h2>
                <button onClick={() => { user?.logedIn ? navigate('/build') : navigate('/login') }}
                    className='bg-component-secondary p-3 rounded text-slate-100
                font-bold hover:bg-component-primary transition-all duration-300'>
                    Build Resume
                </button>
            </div>
            <div className='absolute w-full h-full overflow-hidden'>
                <Blob />
            </div>
        </div>
    )
}



export default Home
