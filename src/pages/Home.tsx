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
        <div className='min-h-screen  overflow-hidden font-Lato flex items-center justify-center'>
            <div className='z-10 relative flex flex-col gap-4 justify-center items-center'>
                <h2 className="font-Lato phone:text-3xl tablet:text-7xl text-primary text-center
                    font-extrabold z-10" style={{ textShadow: 'rgb(0 0 0 / 25%) -2px 4px 5px' }}>
                    Resume Builder
                </h2>
                <button onClick={() => { user?.logedIn ? navigate('/build') : navigate('/login') }}
                    className='bg-component-secondary p-3 rounded text-slate-100 z-10
                font-bold hover:bg-component-primary transition-all duration-300 focus:outline-none'>
                    Build Resume
                </button>
            </div>
            <Blob />
        </div>
    )
}

export default Home
