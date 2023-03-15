import { AxiosError } from "axios"
import { v4 as uuid4 } from 'uuid'

import { IEducation, IExperience, IResumeEducation, IResumeExperience, IResumeHeader } from "../types"
import { resumeClient } from "./axiosClient"


//  ----------------------------------------header-------------------------------------------------
type ResumeHeaderDataResponse = {
    data?: IResumeHeader[],
    error?: AxiosError,
    status: number
}

// get resume header data
export const ResumeHeaderDataRequest = async (token: string) => {
    let response: ResumeHeaderDataResponse = {
        status: 0,
        data: undefined,
        error: undefined
    }

    await resumeClient.get('get-all-header',
        { headers: { Authorization: 'Bearer ' + token } }
    )
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
export const ResumeHeaderDeleteRequest = async (id: string, token: string) => {

    let response: ResumeHeaderDeleteResponse = {
        status: 0,
        data: undefined,
        error: undefined
    }

    await resumeClient.post('delete-header', { id: id },
        { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
            response.data = res.data
            response.status = res.status
        })
        .catch((error) => {
            response.error = error
        })

    return response
}

//add to resume header
interface ResumeHeaderAddResponse extends Omit<ResumeHeaderDataResponse, "data"> {
    data: IResumeHeader | undefined
}

export const ResumeHeaderAddRequest =
    async (data: IResumeHeader, token: string): Promise<ResumeHeaderAddResponse> => {
        let response: ResumeHeaderAddResponse = {
            status: 0,
            data: undefined,
            error: undefined
        }
        // const {contact, featureHeaderId, fullname, github, id, linkedin, website } = data
        await resumeClient.post('add-header', data,
            { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                response.data = res.data
                response.status = res.status
            })
            .catch((error) => {
                response.error = error
            })

        return response
    }

//---------------------------------------------edu------------------------------------
type ResumeEduDataResponse = {
    data?: IResumeEducation[],
    error?: AxiosError,
    status: number
}

// create
type ResumeEducationAddResponse = {
    data?: IResumeEducation,
    error?: AxiosError,
    status: number
}
export const ResumeEduAddRequest = async (data: IResumeEducation, token: string) => {
    let { end, location, start, university, current, featureEducationId } = data

    let response: ResumeEducationAddResponse = {
        status: 0,
        data: undefined,
        error: undefined
    }

    await resumeClient.post('add-education',
        { end, location, start, university, current, featureEducationId },
        { headers: { Authorization: 'Bearer ' + token } })
        .then((res) => {
            response.data = res.data
            response.status = res.status
        })
        .catch((error) => {
            response.error = error
        })

    return response
}

// get all list
export const ResumeEduDataRequest = async (token: string) => {
    let response: ResumeEduDataResponse = {
        status: 0,
        data: undefined,
        error: undefined
    }

    await resumeClient.get('get-all-education', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
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
export const ResumeEduDeleteRequest = async (id: string, token: string) => {

    let response: ResumeHeaderDeleteResponse = {
        status: 0,
        data: undefined,
        error: undefined
    }

    await resumeClient.post('delete-education', { id: id },
        { headers: { Authorization: 'Bearer ' + token } })
        .then((res) => {
            response.data = res.data
            response.status = res.status
        })
        .catch((error) => {
            response.error = error
        })

    return response
}

//  ---------------------------------------exp--------------------------------------------------
type ResumeExpDeleteResponse = {
    data?: IResumeExperience[],
    error?: AxiosError,
    status: number
}
//delete resume edu
export const ResumeExpDeleteRequest = async (id: string, token: string) => {

    let response: ResumeExpDeleteResponse = {
        status: 0,
        data: undefined,
        error: undefined
    }

    await resumeClient.post('delete-experience', { id: id },
        { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
            response.data = res.data
            response.status = res.status
        })
        .catch((error) => {
            response.error = error
        })

    return response
}

// get all list
export const ResumeExpDataRequest = async (token: string) => {
    let response: ResumeExpDeleteResponse = {
        status: 0,
        data: undefined,
        error: undefined
    }

    await resumeClient.get('get-all-experience',
        { headers: { Authorization: 'Bearer ' + token } })
        .then((res) => {
            response.data = res.data
            response.status = res.status
        })
        .catch((error) => {
            response.error = error
        })

    return response
}

// create
type ResumeExpAddResponse = {
    data?: IResumeExperience,
    error?: AxiosError,
    status: number
}
export const ResumeExpAddRequest = async (data: IResumeExperience, token: string) => {
    let { id, end, company, start, description, position, current, featureExperienceId } = data

    let response: ResumeExpAddResponse = {
        status: 0,
        data: undefined,
        error: undefined
    }

    await resumeClient.post('add-experience',
        { id, end, company, start, description, position, current, featureExperienceId },
        { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
            response.data = res.data
            response.status = res.status
        })
        .catch((error) => {
            response.error = error
        })

    return response
}