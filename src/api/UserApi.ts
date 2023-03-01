import { AxiosError } from "axios";
import { userClient } from "./axiosClient";


interface LoginResponse {
    status: number,
    data: {
        userdata: { name: string, email: string },
        token: string
    } | undefined,
    error: AxiosError | any
    header: string | undefined
}
export const LoginRequest = async (data: { email: string, password: string }) => {

    let response: LoginResponse = {
        status: 0,
        data: undefined,
        error: undefined,
        header: undefined
    }

    await userClient.post('login', { email: data.email, password: data.password })
        .then((res) => {
            response.data = res.data
            response.status = res.status
        })
        .catch((error: AxiosError) => {
            response.error = error.response?.data
        })

    return response

}