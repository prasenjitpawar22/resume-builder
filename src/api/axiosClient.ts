import axios from "axios";

let beUrl
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    beUrl = "http://localhost:8000/resume/"

} else {
    // production code
    beUrl = process.env.REACT_APP_BACKEND
}
console.log(beUrl);

export const resumeClient = axios.create({
    baseURL: beUrl

})

export const featureClient = axios.create({
    baseURL: beUrl
})

export const userClient = axios.create({
    baseURL: beUrl
})

// http://localhost:8000
//https://resume-builder-backend-ten.vercel.app