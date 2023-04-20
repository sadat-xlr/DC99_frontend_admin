import { all, takeEvery, put, fork } from 'redux-saga/effects';
import { createBrowserHistory } from 'history';

import { getToken, clearToken } from '@iso/lib/helpers/utility';
import actions from './actions';

import jwt from 'express-jwt'; //
const history = createBrowserHistory();
const fakeApiCall = true; // auth0 or express JWT
const authMiddleware = jwt({ secret: 'hajksdfh238yrewhcisdhca0w89eryq39hfjkesfhiyd378ry' }); // replace 'your_secret_key' with your actual secret key

export function* loginRequest() {
  console.log('hello')
  yield takeEvery('LOGIN_REQUEST', function*({ payload }) {
    const { token } = payload;
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token: token,
        profile: 'Profile',
      });
    } else {
      // Use express-jwt middleware to authenticate the token
      authMiddleware(null, null, (err) => {
        if (err) {
          yield put({ type: actions.LOGIN_ERROR });
        } else {
          yield put({
            type: actions.LOGIN_SUCCESS,
            token: 'secret token',
            profile: 'Profile',
          });
        }
      });
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function*({payload}) {
    yield localStorage.setItem('id_token', payload.token);
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    yield clearToken();
    history.push('/');
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function*() {
    const token = getToken().get('idToken');
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
        profile: 'Profile',
      });
    }
  });
}
export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
  ]);
}
