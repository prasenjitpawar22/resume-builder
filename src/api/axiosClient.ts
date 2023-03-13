import axios from "axios";


export const resumeClient = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ?
        process.env.REACT_APP_API_URL + "/resume/" :
        "http://localhost:8000/resume/"

})

export const featureClient = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ?
        process.env.REACT_APP_API_URL + "/feature/" :
        "http://localhost:8000/feature/"

})

export const userClient = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ?
        process.env.REACT_APP_API_URL + "/user/" :
        "http://localhost:8000/user/"
})
