import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'

export default function DropDownList(props) {
    const { title, setBlockState, blockState, setHeaderBlockModalState,
         setEduBlockModalState, setExpBlockModalState } = props

    const handleBlockClick = () => {
        setBlockState(!blockState)
    }

    const handleCreateList = (title) => {
        if (title === 'Header Block') {
            setHeaderBlockModalState(true)
        }
        if(title ==='Education Block'){
            setEduBlockModalState(true)
        }
        if(title ==='Experience Block'){
            setExpBlockModalState(true)
        }
        console.log('clicked create');
    }

    return (
        <div className=''>
            <List onClick={handleBlockClick}
                className='px-2 py-4 text-white mt-2 shadow-2xl bg-violet-600 mx-2 rounded-t-xl'>
                <div className='flex justify-between cursor-pointer'>
                    <h1>{title}</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </List>
            <ListEdit blockState={blockState}
                className='overflow-hidden shadow-md'>
                <div className='bg-violet-300 mx-2 px-2 py-1 rounded-b-xl'>
                    <button onClick={() => handleCreateList(title)} className='text-slate-700 hover:text-slate-50'>create</button>
                </div>
            </ListEdit>
        </div>
    )
}


const List = styled.div`
    transition: all;
`
const ListEdit = styled.div`
    height: ${(props) => { return props.blockState ? '2' : 0 }}rem;
    /* width: ${(props) => { return props.blockState ? '100' : 0 }}%; */
    transition: all;
    transition-duration: 1s;
`