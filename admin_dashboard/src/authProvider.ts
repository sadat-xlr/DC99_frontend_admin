import {
  AuthActionType,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_ERROR,
} from 'react-admin';

const apiUrl = 'http://localhost:4000/api/v1/';

const authProvider = (type: AuthActionType, params?: any) => {
  if (type === AUTH_LOGIN) {
    const { email, password } = params;
    console.log(email + password);
    const request = new Request(`${apiUrl}/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((auth) => {
        localStorage.setItem('auth', JSON.stringify(auth));
        return Promise.resolve();
      });
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('auth');
    return Promise.resolve();
  }
  if (type === AUTH_ERROR) {
    const { status } = params;
    if (status === 401 || status === 403) {
      localStorage.removeItem('auth');
      return Promise.reject();
    }
    return Promise.resolve();
  }
  return Promise.resolve();
};

export default authProvider;
