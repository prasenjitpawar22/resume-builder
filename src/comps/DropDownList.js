import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'

export default function DropDownList(props) {
    const { title, setBlockState, blockState } = props

    const handleBlockClick = () => {
        setBlockState(!blockState)
    }
    return (
        <List onClick={handleBlockClick} 
            className='px-2 py-4 text-white mt-2 shadow-2xl bg-violet-600 mx-2 rounded-t-xl'>
            <div className='flex justify-between cursor-pointer'>
                <h1>{title}</h1>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
        </List>
    )
}


const List = styled.div`
    transition: all;
    transition-duration: 2s;
`