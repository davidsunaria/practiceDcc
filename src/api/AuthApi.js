import axios from 'axios';
import { getToken, setToken } from 'tt-frontend-utils/Service.js';

const AuthInstance = axios.create();
AuthInstance.interceptors.response.use(function (response) {
  if (response.headers) {
    localStorage.setItem('api_token', response.headers.api_token);
  }
  return response;
}, function (error) {
   if(!error.response) {
      return {data : {data : "", message : "server_error", status : 500}}
   } else {
      if(error.response.status == 500) {
        return {data : {data : "", message : "server_error", status : 500}}
      }
      console.log(error);/*
      if(error.response.status == 422) {
        return {data : {data : "", message : error.password, status : 500}}
      }*/
      return Promise.reject(error);
   }
});

AuthInstance.interceptors.request.use(function (config) {
    const token = getToken();
    if (token) {
      config.headers.Authorization =  'Bearer '+token;
    }

    return config;
});

const apiUrl = process.env.REACT_APP_TT_API;

export const userSignUp = async (formData) => {
	try {
	  let response = await AuthInstance.post(apiUrl+'/auth/register', formData);
	  return response.data;
	} catch(error) {
	  return error.response.data;
	}
};

export const loginUser = async (formData) => {
	try {
	  let response = await AuthInstance.post(apiUrl+'/auth/login', formData);
	  return response.data;
	} catch(error) {
	  return error.response.data;
	}
};

export const forgotPassword = async (formData) => {
	try {
	  let response = await AuthInstance.post(apiUrl+'/auth/forgot-password', formData);
	  return response.data;
	} catch(error) {
	  return error.response.data;
	}
};

export const resetPassword = async (formData) => {
	try {
	  let response = await AuthInstance.post(apiUrl+'/auth/reset-password', formData);
	  return response.data;
	} catch(error) {
	  return error.response.data;
	}
};

export const logoutUser = async () => {
	try{
	  let response = await AuthInstance.get(apiUrl+'/auth/logout');
	  return response.data;
	} catch(error) {
	  return error.response.data;
	}
};
