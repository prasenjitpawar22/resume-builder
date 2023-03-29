import React, { Dispatch, SetStateAction } from 'react'
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai'
import { BiHome, BiUser } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

interface Props {
    rightBarState: boolean
    setRightBarState: Dispatch<SetStateAction<boolean>>
}

const QuickNavbar = (props: Props) => {
    const { rightBarState, setRightBarState } = props
    const navigate = useNavigate()

    return (
        <div
            className={`fixed top-2 right-0 bg-component-primary h-12 rounded-l-3xl z-10
        flex justify-between px-4 items-center ${rightBarState ? 'w-60' : 'w-12'} 
        transition-all duration-700 shadow-md
        `}>
            {rightBarState ?
                <div className='transition-all duration-100 w-full flex justify-between px-4 items-center'>
                    <AiOutlineDoubleRight cursor={'pointer'}
                        className='text-white hover:text-slate-600'
                        onClick={() => { setRightBarState(!rightBarState) }} />
                    <div className='flex gap-2'>
                        <BiHome cursor={'pointer'} onClick={() => {
                            setRightBarState(false)
                            navigate('/')
                        }}
                            className='bg-component-ternary text-slate-700 hover:bg-component-secondary w-8 h-8 px-2 rounded-full' />
                        <BiUser cursor={'pointer'}
                            className='bg-component-ternary text-slate-700 hover:bg-component-secondary w-8 h-8 px-2 rounded-full' />
                    </div>
                </div> :
                <AiOutlineDoubleLeft cursor={'pointer'} className='text-white hover:text-slate-600'
                    onClick={() => { setRightBarState(!rightBarState) }} />
            }
        </div>
    )
}

export default QuickNavbar