import { AxiosError } from "axios"
import { Header } from "../types"
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

    await resumeClient.post('/delete-resume-header', { id: id })
        .then((res) => {
            response.data = res.data
            response.status = res.status
        })
        .catch((error) => {
            response.error = error
        })

    return response
}