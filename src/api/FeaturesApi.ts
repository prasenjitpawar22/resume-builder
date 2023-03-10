import { featureClient } from "./axiosClient"
import axios, { AxiosError, AxiosResponse } from "axios"

import { IEducation, IExperience, ISkill, IHeader } from '../types'
import { v4 as uuid4 } from "uuid"

//*********************************************header****************************************
type FeatureHeaderDataResponse = {
  data?: IHeader[],
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
export const FeatureHeaderDeleteRequest = async (id: string, token: string) => {
  let response = {
    data: undefined,
    status: 0,
    error: undefined,
  };

  await featureClient.post('delete-header', { id: id },
    { headers: { 'Authorization': `Bearer ${token}` } })
    .then((res: AxiosResponse) => {
      response.data = res.data
      response.status = res.status
    })
    .catch((e: any) => {
      response.error = e
    })

  return response;
}

interface IFeatureHeaderCreateRequestResponse {
  data: IHeader | undefined
  error: AxiosError | any
  status: number | undefined
}


/**
 * It's a function that sends a request to the server to create a header.
 * @param {IHeader} data - IHeader
 * @returns An object with the following properties:
 * data,
 * error,
 * status
 */
export const FeatureHeaderCreateRequest = async (data: Omit<IHeader, "id">) => {
  let response: IFeatureHeaderCreateRequestResponse = {
    data: undefined,
    error: undefined,
    status: undefined
  }

  const { contact, fullname, github, linkedin, website } = data
  const token = localStorage.getItem('token')

  await featureClient.post<IHeader>('create-header',
    { contact, fullname, github, linkedin, website },
    { headers: { 'Authorization': 'Bearer ' + token } }
  ).then((res) => {
    console.log(res);
    response.data = res.data
    response.status = res.status
  }).catch((err: AxiosError) => {
    console.log(err);
    response.error = err.response?.data
    response.status = err.response?.status
  })

  return response
}

//-------edu------------------------------------------------------------------------------
type FeatureEduDataResponse = {
  data?: IEducation[],
  error?: AxiosError,
  status: number
}


//get all feature header
export const FeatureEduDataRequest = async (token: string) => {
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
export const FeatureEduCreateRequest = async (data: IEducation) => {
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
  data?: IExperience[],
  error?: AxiosError,
  status: number
}

//create exp
export const FeatureExpCreateRequest = async (data: IExperience) => {
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
export const FeatureExpDataRequest = async (token: string) => {
  let response: FeatureExpDataResponse = {
    data: undefined,
    error: undefined,
    status: 0
  }

  await featureClient.get('get-all-experience', {
    headers: {
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