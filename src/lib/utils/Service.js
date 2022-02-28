import axios from 'axios';

export function isLoggedIn() {
  if (localStorage.getItem('isLoggedIn') && localStorage.getItem('auth_token')) {
    return true
  } else {
    return false
  }
}

export function handleInvalidToken() {
  //clearToken();
  clearUserData();
  window.location.href = "/login";
}

export function clearUserData() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('api_token');
  window.location.href = "/login";
}

export function getUser() {
  return localStorage.getItem('userData');
}

export function setToken(access_token) {

}

export function getToken() {
  let token = localStorage.getItem('api_token')
  if(token) {
    return token;
  }
  return false;
}
export function logoutCompletely() {
  clearUserData()
}
