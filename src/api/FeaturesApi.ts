import { featureClient } from "./axiosClient"
import { AxiosError, AxiosResponse } from "axios"

import { Education, Experience, Header } from '../types'
import { v4 as uuid4 } from "uuid"

//-------header------------------------------------------------------------------------------
type FeatureHeaderDataResponse = {
  data?: Header[],
  error?: AxiosError,
  status: number
}

//get all feature header
export const FeatureHeaderDataRequest = async (token: string) => {
  let response: FeatureHeaderDataResponse = {
    data: undefined,
    error: undefined,
    status: 0
  }

  await featureClient.get('get-all-header', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
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
export const FeatureEduDataRequest = async (token:string) => {
  let response: FeatureEduDataResponse = {
    data: undefined,
    error: undefined,
    status: 0
  }

  await featureClient.get('get-all-education', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
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
  let response: FeatureEduDataResponse = {
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
  let response: FeatureEduDataResponse = {
    data: undefined,
    status: 0,
    error: undefined,
  };

  let { end, location, start, university } = data

  await featureClient.post('set-feature-education', { _id: uuid4(), end, location, start, university })
    .then((res: AxiosResponse) => {
      response.data = res.data
      response.status = res.status
    })
    .catch((e: any) => {
      response.error = e
    })

  return response;
}

// exp ----------------------------------------------------------------------
type FeatureExpDataResponse = {
  data?: Experience[],
  error?: AxiosError,
  status: number
}

//create exp
export const FeatureExpCreateRequest = async (data: Experience) => {
  let response: FeatureEduDataResponse = {
    data: undefined,
    status: 0,
    error: undefined,
  };
  console.log("data in fe api", data);

  let { end, company, start, description, position } = data
  console.log(position);
  
  await featureClient.post('create-feature-experience',
    { _id: uuid4(), position: position, end, start, company, description })
    .then((res: AxiosResponse) => {
      response.data = res.data
      response.status = res.status
    })
    .catch((e: any) => {
      response.error = e
    })

  return response;
}

//delete feature exp
export const FeatureExpDeleteRequest = async (id: string) => {
  let response: FeatureExpDataResponse = {
    data: undefined,
    status: 0,
    error: undefined,
  };

  await featureClient.post('remove-feature-experience', { id: id })
    .then((res: AxiosResponse) => {
      response.data = res.data
      response.status = res.status
    })
    .catch((e: any) => {
      response.error = e
    })

  return response;
}

//get all feature exp
export const FeatureExpDataRequest = async (token:string) => {
  let response: FeatureExpDataResponse = {
    data: undefined,
    error: undefined,
    status: 0
  }

  await featureClient.get('get-all-experience', {
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      response.data = res?.data
      response.status = res.status
    })
    .catch((error) => {
      response.error = error.response?.data
    })

  return response
}