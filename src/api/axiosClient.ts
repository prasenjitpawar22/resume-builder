import axios from "axios";


export const resumeClient = axios.create({
    baseURL: "http://localhost:8000/resume/"
})

export const featureClient = axios.create({
    baseURL: "http://localhost:8000/feature/"
})

export const userClient = axios.create({
    baseURL: "http://localhost:8000/user/"
})

// http://localhost:8000
//https://resume-builder-backend-ten.vercel.app