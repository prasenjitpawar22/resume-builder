import { ClipLoader } from "react-spinners";
import React from 'react'

export const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen w-full">
            <ClipLoader color="#36d7b7" />
        </div>
    )
}
