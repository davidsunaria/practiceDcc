import { Action, action, thunk, Thunk } from 'easy-peasy';
import crypt from 'crypto-js';
import {API_ERROR_MESSAGES} from "tt-frontend-message";
import {
  userSignUp,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword
} from 'tt-frontend-api/AuthApi.js';
import { toast } from 'react-toastify';

interface UserAuth {
  userName: string;
  password: string;
}

export interface AuthenticationModel {
  token: string;
  error: string;

  userDirectLogin: Thunk<AuthenticationModel>;
  userSignUp: Thunk<AuthenticationModel>;
  forgotPassword: Thunk<AuthenticationModel, string>;
  resetPassword: Thunk<AuthenticationModel, any>;

}

const authenticationModel: AuthenticationModel = {
  token: '',
  error: '',


  userDirectLogin: thunk(async (actions, payload, { getStoreActions }) => {
    let response = await loginUser(payload);
		toast.dismiss();

		if (!response.success) {
			toast.error(API_ERROR_MESSAGES[response.messageCode])
			return false
		} else {
      localStorage.setItem('auth_token', response.data.token)
      localStorage.setItem('isLoggedIn', 'true')
			toast.success(API_ERROR_MESSAGES[response.messageCode])
			return true;
		}
  }),

  userSignUp : thunk(async (actions, payload, { getStoreActions }) => {
    let response = await userSignUp(payload);
		toast.dismiss();

     console.log(response);

		if (!response.success) {
      if(response && response.errors && response.errors.password) {
        toast.error(response.errors.password.message);
        return false;
      }
			toast.error(API_ERROR_MESSAGES[response.messageCode])
			return false
		} else {
			toast.success(API_ERROR_MESSAGES[response.messageCode])
			return true;
		}
  }),

  forgotPassword : thunk(async (actions, payload, { getStoreActions }) => {
    let response = await forgotPassword(payload);
		toast.dismiss();

		if (!response.success) {
			toast.error(API_ERROR_MESSAGES[response.messageCode])
			return false
		} else {
			toast.success(API_ERROR_MESSAGES[response.messageCode])
			return true;
		}
  }),

  resetPassword : thunk(async (actions, payload, { getStoreActions }) => {
    let response = await resetPassword(payload);
		toast.dismiss();

		if (!response.success) {
			toast.error(API_ERROR_MESSAGES[response.messageCode])
			return false
		} else {
			toast.success(API_ERROR_MESSAGES[response.messageCode])
			return true;
		}
  }),
};

export default authenticationModel;
