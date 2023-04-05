import { Certification, Contact, Education, Experience, Skills } from "../types"
import { formClient } from "./axiosClient"



export const getAllSkills = async (token: String, type: String) => {
    let response: Skills[] = []

    await formClient.get(`get-all-${type}`, { headers: { Authorization: 'Bearer ' + token } })
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            console.log(err)
        })

    return response
}

export const getAllEducations = async (token: String, type: String) => {
    let response: Education[] = []

    await formClient.get(`get-all-${type}`, { headers: { Authorization: 'Bearer ' + token } })
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            console.log(err)
        })
    return response
}

export const getAllContacts = async (token: String, type: String) => {
    let response: Contact[] = []

    await formClient.get(`get-all-${type}`, { headers: { Authorization: 'Bearer ' + token } })
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            console.log(err)
        })
    return response
}


export const getAllCertifications = async (token: String, type: String) => {
    let response: Certification[] = []

    await formClient.get(`get-all-${type}`, { headers: { Authorization: 'Bearer ' + token } })
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            console.log(err)
        })
    return response
}

export const getAllExperiences = async (token: String, type: String) => {
    let response: Experience[] = []

    await formClient.get(`get-all-${type}`, { headers: { Authorization: 'Bearer ' + token } })
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            console.log(err)
        })
    return response
}