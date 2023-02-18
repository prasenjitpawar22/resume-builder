import { featureClient } from "./axiosClient"
import { AxiosError, AxiosResponse } from "axios"

import { Education, Header } from '../types'

//-------header------------------------------------------------------------------------------
type FeatureHeaderDataResponse = {
  data?: Header[],
  error?: AxiosError,
  status: number
}

//get all feature header
export const FeatureHeaderDataRequest = async () => {
  let response: FeatureHeaderDataResponse = {
    data: undefined,
    error: undefined,
    status: 0
  }

  await featureClient.get('get-all-header')
    .then((res) => {
      response.data = res?.data
      response.status = res.status
    })
    .catch((error) => {
      response.error = error
    })

  return response
}

//delete feature header
export const FeatureHeaderDeleteRequest = async (id: string) => {
  let response = {
    data: undefined,
    status: 0,
    error: undefined,
  };

  await featureClient.post('remove-feature-header', { id: id })
    .then((res: AxiosResponse) => {
      response.data = res.data
      response.status = res.status
    })
    .catch((e: any) => {
      response.error = e
    })

  return response;
}

//-------edu------------------------------------------------------------------------------
type FeatureEduDataResponse = {
  data?: Education[],
  error?: AxiosError,
  status: number
}


//get all feature header
export const FeatureEduDataRequest = async () => {
  let response: FeatureEduDataResponse = {
    data: undefined,
    error: undefined,
    status: 0
  }

  await featureClient.get('get-all-feature-education')
    .then((res) => {
      response.data = res?.data
      response.status = res.status
    })
    .catch((error) => {
      response.error = error
    })

  return response
}

//delete feature header
export const FeatureEduDeleteRequest = async (id: string) => {
  let response = {
    data: undefined,
    status: 0,
    error: undefined,
  };

  await featureClient.post('remove-feature-education', { id: id })
    .then((res: AxiosResponse) => {
      response.data = res.data
      response.status = res.status
    })
    .catch((e: any) => {
      response.error = e
    })

  return response;
}

//create
export const FeatureEduCreateRequest = async (data: Education) => {
  let response = {
    data: undefined,
    status: 0,
    error: undefined,
  };

  let { _id, end, location, start, university } = data

  await featureClient.post('set-feature-education', { _id, end, location, start, university })
    .then((res: AxiosResponse) => {
      response.data = res.data
      response.status = res.status
    })
    .catch((e: any) => {
      response.error = e
    })

  return response;
}
