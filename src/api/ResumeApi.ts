import { AxiosError } from "axios"
import { v4 as uuid4 } from 'uuid'

import { Education, Header } from "../types"
import { resumeClient } from "./axiosClient"



type ResumeHeaderDataResponse = {
    data?: Header[],
    error?: AxiosError,
    status: number
}

// get resume header data
export const ResumeHeaderDataRequest = async () => {
    let response: ResumeHeaderDataResponse = {
        status: 0,
        data: undefined,
        error: undefined
    }

    await resumeClient.get('get-resume-header')
        .then((res) => {
            response.data = res.data
            response.status = res.status
        })
        .catch((error) => {
            response.error = error
        })

    return response
}

// delete resume header data
type ResumeHeaderDeleteResponse = ResumeHeaderDataResponse
export const ResumeHeaderDeleteRequest = async (id: string) => {
    console.log(id, 'delete id');

    let response: ResumeHeaderDeleteResponse = {
        status: 0,
        data: undefined,
        error: undefined
    }

    await resumeClient.post('delete-resume-header', { id: id })
        .then((res) => {
            response.data = res.data
            response.status = res.status
        })
        .catch((error) => {
            response.error = error
        })

    return response
}

//---------edu
type ResumeEduDataResponse = {
    data?: Education[],
    error?: AxiosError,
    status: number
}

// create
export const ResumeEduAddRequest = async (data: Education) => {
    let { _id, end, location, start, university } = data

    let response: ResumeEduDataResponse = {
        status: 0,
        data: undefined,
        error: undefined
    }
    
    await resumeClient.post('add-resume-education',
        { _id: _id, end: end, location: location, start: start, university:university })
        .then((res) => {
            console.log(res);

            response.data = res.data
            response.status = res.status
        })
        .catch((error) => {
            response.error = error
        })

    return response
}

// get all list
export const ResumeEduDataRequest = async () => {
    let response: ResumeEduDataResponse = {
        status: 0,
        data: undefined,
        error: undefined
    }

    await resumeClient.get('get-resume-education')
        .then((res) => {
            response.data = res.data
            response.status = res.status
        })
        .catch((error) => {
            response.error = error
        })

    return response
}

//delete resume edu
export const ResumeEduDeleteRequest = async (id: string) => {

    let response: ResumeHeaderDeleteResponse = {
        status: 0,
        data: undefined,
        error: undefined
    }

    await resumeClient.post('delete-resume-education', { id: id })
        .then((res) => {
            response.data = res.data
            response.status = res.status
        })
        .catch((error) => {
            response.error = error
        })

    return response
}
