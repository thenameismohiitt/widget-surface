import axios from 'axios';
import {
  LOGIN_LOGIN_BEGIN,
  LOGIN_LOGIN_SUCCESS,
  LOGIN_LOGIN_FAILURE,
  LOGIN_LOGIN_DISMISS_ERROR,
  LOGIN_LOGOUT_REQUEST,
} from './constants';
import { toast } from 'react-toastify';

export function login(args = {}) {
  return dispatch => {
    dispatch({
      type: LOGIN_LOGIN_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.post(`${process.env.REACT_APP_ENGINE_URL}auth`, args);
      doRequest.then(
        res => {
          if (res.data && res.status === 200) {
            dispatch({
              type: LOGIN_LOGIN_SUCCESS,
              token: res.data.accessToken,
              username: res.data.username,
            });
          } else {
            toast.error('Invalid email or password');
            dispatch({
              type: LOGIN_LOGIN_FAILURE,
              data: { error: 'Invalid email or password' },
            });
          }
          resolve(res);
        },
        err => {
          toast.error('Invalid email or password');
          dispatch({
            type: LOGIN_LOGIN_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissLoginError() {
  return {
    type: LOGIN_LOGIN_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case LOGIN_LOGIN_BEGIN:
      return {
        ...state,
        loginPending: true,
        loginError: '',
      };

    case LOGIN_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        username: action.username,
      };

    case LOGIN_LOGIN_FAILURE:
      return {
        ...state,
        loginPending: false,
        loginError: action.data.error,
      };

    case LOGIN_LOGIN_DISMISS_ERROR:
      return {
        ...state,
        loginError: '',
      };

    case LOGIN_LOGOUT_REQUEST:
      return {
        ...state,
        token: '',
        role: '',
        uuid: '',
        username: '',
        isLoggedIn: false,
      };

    default:
      return state;
  }
}
