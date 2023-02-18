import { featureClient } from "./axiosClient"
import { AxiosError, AxiosResponse } from "axios"

import { Header } from '../types'

// get all feature headers
type FeatureHeaderDataResponse = {
  data?: Header[],
  error?: AxiosError,
  status: number
}
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