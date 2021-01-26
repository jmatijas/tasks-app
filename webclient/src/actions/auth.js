import api from '../api/api';

import {
  AUTH_SIGN_IN,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_IN_FAILURE,
  AUTH_SIGN_OUT,
  AUTH_SIGN_OUT_SUCCESS,
  AUTH_SIGN_OUT_FAILURE
} from './types';

//
// ACTION CREATOR authSignIn
//
export const authSignIn = (username, password) => async (dispatch) => {
  dispatch({ type: AUTH_SIGN_IN }); // <<-- reducer will reset auth data and set state.auth.loading = true

  try {
    const response = await api.post('/auth', {
      username,
      password
    });

    console.log('response received');
    if (response && response.status >= 200 && response.status < 300) {
      console.log('response received - status 2xx');
      dispatch({
        type: AUTH_SIGN_IN_SUCCESS, // <<-- reducer will put received auth data to state and set state.auth.loading = false
        payload: { username }
      });
      console.log('response received - save local storage');
      localStorage.setItem('auth_user', username);
    } else {
      const errorSignIn2 = `Sing in failed for user: ${username}. Response status: ${
        response ? response.status : null
      }`;
      console.log('response received - error2:', errorSignIn2);
      dispatch({
        type: AUTH_SIGN_IN_FAILURE, // <<-- reducer will put received error to state and set state.auth.loading = false
        payload: { errorSignIn: errorSignIn2 }
      });

      localStorage.removeItem('auth_user');
    }
  } catch (e) {
    const errorSignIn = `Sing in failed for user: ${username}. Response status: ${e.response.status}`;
    console.log('response received - error1:', errorSignIn);
    dispatch({
      type: AUTH_SIGN_IN_FAILURE, // <<-- reducer will put received error to state and set state.auth.loading = false
      payload: { errorSignIn }
    });

    localStorage.removeItem('auth_user');
  }
};

//
// ACTION CREATOR authSignOut
//
export const authSignOut = () => async (dispatch) => {
  dispatch({ type: AUTH_SIGN_OUT }); // <<-- reducer will reset auth data and set state.auth.loading = true

  const username = localStorage.getItem('auth_user');

  try {
    const response = await api.delete('/auth', {
      username
    });

    console.log('response received');
    if (response && response.status >= 200 && response.status < 300) {
      console.log('response received - status 2xx');
      dispatch({
        type: AUTH_SIGN_OUT_SUCCESS // <<-- reducer will put received auth data to state and set state.auth.loading = false
      });
      console.log('response received - remove local storage to sign out');
      localStorage.removeItem('auth_user');
    } else {
      const errorSignOut2 = `Sing out failed. Response status: ${
        response ? response.status : null
      }`;
      console.log('response received - error2:', errorSignOut2);
      dispatch({
        type: AUTH_SIGN_OUT_FAILURE, // <<-- reducer will put received error to state and set state.auth.loading = false
        payload: { errorSignOut: errorSignOut2 }
      });

      localStorage.removeItem('auth_user');
    }
  } catch (e) {
    const errorSignOut = `Sing out failed. Response status: ${e.response.status}`;
    console.log('response received - error1:', errorSignOut);
    dispatch({
      type: AUTH_SIGN_OUT_FAILURE, // <<-- reducer will put received error to state and set state.auth.loading = false
      payload: { errorSignOut }
    });

    localStorage.removeItem('auth_user');
  }
};
