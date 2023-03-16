import React from 'react'
import PropTypes from 'prop-types'
import { redirect, useNavigate } from 'react-router-dom'

type TProps = {}
const Home: React.FC<TProps> = () => {
    const navigate = useNavigate()

    return (
        <div>
            <button onClick={() => {
                navigate('/build')
            }}
            >build</button>
        </div>
    )
}



export default Home
