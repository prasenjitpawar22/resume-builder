import axios from "axios";

let beUrl
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    beUrl = process.env.REACT_APP_LOCALHOST

} else {
    // production code
    beUrl = process.env.REACT_APP_BACKEND
}

export const resumeClient = axios.create({
    baseURL: beUrl + "resume/"
})

export const featureClient = axios.create({
    baseURL: beUrl + "feature/"
})

export const userClient = axios.create({
    baseURL: beUrl + "user/"
})

export const formClient = axios.create({
    baseURL: beUrl + "build/"
})
