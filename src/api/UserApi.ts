import axios, { AxiosError, AxiosResponse } from "axios";
import { userClient } from "./axiosClient";

// ********************************************Login ****************************************************
interface LoginResponse {
  status: number | undefined
  data: {
    name: string,
    email: string
    token: string
  } | undefined,
  error: string | any
  success: boolean
}
export const LoginRequest =
  async (data: { email: string, password: string }): Promise<LoginResponse> => {

    let response: LoginResponse = {
      status: undefined,
      data: undefined,
      error: undefined,
      success: false
    }

    await userClient.post('login', { email: data.email, password: data.password })
      .then((res) => {
        response = {
          ...response,
          data: res.data,
          status: res.status
        }
        response = { ...response, success: true }
      })
      .catch((error: AxiosError) => {
        response = { ...response, error: error.response?.data, status: error.status }
      })

    return response
  }

// ********************************************Register User ****************************************************
interface RegisterResponse {
  status: number | undefined
  data: {
    name: string,
    email: string
    token: string
  } | undefined,
  error: string | any
  success: boolean
}
type Data = {
  fullname: string;
  email: string;
  password: string;
}

export const RegisterUserRequest = async ({ email, fullname, password }: Data) => {
  let response: RegisterResponse = {
    data: undefined,
    error: undefined,
    success: false,
    status: undefined
  }

  await userClient.post('register', { email, fullname, password })
    .then((res) => {
      console.log(res, "res");
      response = { ...response, data: res.data, status: res.status }
    })
    .catch((error: AxiosError) => {
      console.log(error, "err");
      response = { ...response, error: error.response?.data }
    })

  return response
}
// ********************************************SetUserContextRequest ****************************************************

type ISetUserContextRequesResponse = {
  data: {
    id: string | undefined;
    name: string | undefined;
    email: string | undefined;
  },
  status: number | undefined
  error: AxiosError | any | undefined;
  success: boolean
}
export const SetUserContextRequest = async (token: string): Promise<ISetUserContextRequesResponse> => {
  let response: ISetUserContextRequesResponse = {
    data: {
      id: undefined,
      name: undefined,
      email: undefined,
    },
    status: undefined,
    error: undefined,
    success: false
  }

  await userClient.post('', {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    response = {
      ...response,
      data: res.data, success: true, status: res.status
    }
  }).catch((error: AxiosError) => {
    response = {
      ...response,
      status: error.response?.status,
      error: error.response?.data,
    }
  })

  return response
}