import axios from "axios";


export const resumeClient = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ?
        process.env.REACT_APP_BACKEND + "/resume/" :
        "http://localhost:8000/resume/"

})

export const featureClient = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ?
        process.env.REACT_APP_BACKEND + "/feature/" :
        "http://localhost:8000/feature/"

})

export const userClient = axios.create({
    baseURL: process.env.NODE_ENV === 'developement' ?
        process.env.REACT_APP_BACKEND + "/user/" :
        "http://localhost:8000/user/"
})

// http://localhost:8000
//https://resume-builder-backend-ten.vercel.app