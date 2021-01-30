import api from '../api/api';

import {
  USERS_GET,
  USERS_GET_SUCCESS,
  USERS_GET_FAILURE,
  USERS_POST,
  USERS_POST_SUCCESS,
  USERS_POST_FAILURE,
  USERS_DELETE_MANY,
  USERS_DELETE_MANY_SUCCESS,
  USERS_DELETE_MANY_FAILURE,
  USERS_SET_SELECTED_IDS,
  USERS_SET_LIMIT,
  USERS_SET_PAGE
} from './types';

import { toastAdd } from 'src/actions/toast';

//
// ACTION CREATOR usersGet
//
export const usersGet = () => async (dispatch) => {
  dispatch({ type: USERS_GET });

  try {
    const response = await api.get('/users');

    if (response && response.status >= 200 && response.status < 300) {
      dispatch({
        type: USERS_GET_SUCCESS,
        payload: { users: response.data }
      });

      console.log('response received');
    } else {
      const error2 = `Failed getUsers. Response status: ${
        response ? response.status : null
      }`;

      dispatch({
        type: USERS_GET_FAILURE,
        payload: { error: error2 }
      });
    }
  } catch (e) {
    console.log('error e:', e);
    const error = `Failed getUsers. Response status: ${e.response.status}`;
    dispatch({
      type: USERS_GET_FAILURE,
      payload: { error }
    });
  }
};

//
// ACTION CREATOR usersPost
//
export const usersPost = (user) => async (dispatch) => {
  dispatch({ type: USERS_POST });

  try {
    const response = await api.post('/users', user);

    if (response && response.status >= 200 && response.status < 300) {
      const userId = response.headers.location.substring(
        response.headers.location.lastIndexOf('/') + 1
      );

      dispatch({
        type: USERS_POST_SUCCESS,
        payload: { userId }
      });

      dispatch(toastAdd({ text: `Created user with ID: ${userId}` }));

      dispatch(usersGet());
    } else {
      dispatch({
        type: USERS_POST_FAILURE,
        payload: {
          error: `Crete user failed with response status ${response.status} ${response.statusText}`
        }
      });
      dispatch(
        toastAdd({
          text:
            'ERROR Crete user failed with response status ${response.status} ${response.statusText}'
        })
      );
    }
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    dispatch({
      type: USERS_POST_FAILURE,
      payload: {
        error: `ERROR Crete user failed with error message ${error.message}`
      }
    });
    dispatch(
      toastAdd({
        text: `ERROR Crete user failed with error message ${error.message}`
      })
    );
  }
};

//
// ACTION CREATOR usersDeleteMany
//
export const usersDeleteMany = (userIds) => async (dispatch) => {
  dispatch({ type: USERS_DELETE_MANY });

  try {
    const response = await api.delete('/users', {
      headers: {
        'Content-Type': 'application/json'
      },
      data: userIds
    });

    if (response && response.status >= 200 && response.status < 300) {
      dispatch({
        type: USERS_DELETE_MANY_SUCCESS
      });

      dispatch(
        toastAdd({ text: `${userIds.length} users are deleted successfully!` })
      );

      dispatch(usersGet());
    } else {
      dispatch({
        type: USERS_DELETE_MANY_FAILURE,
        payload: {
          error: `Delete many users failed with response status ${response.status} ${response.statusText}`
        }
      });
      dispatch(
        toastAdd({
          text: `Delete many users failed with response status ${response.status} ${response.statusText}`
        })
      );
    }
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    dispatch({
      type: USERS_DELETE_MANY_FAILURE,
      payload: {
        error: `Delete many users failed with error message ${error.message}`
      }
    });
    dispatch(
      toastAdd({
        text:
          'ERROR `Delete many users failed with error message ${error.message}`'
      })
    );
  }
};

export const usersSetSelectedIds = (selectedIds) => {
  return { type: USERS_SET_SELECTED_IDS, payload: selectedIds };
};

export const usersSetLimit = (limit) => {
  return { type: USERS_SET_LIMIT, payload: limit };
};

export const usersSetPage = (page) => {
  return { type: USERS_SET_PAGE, payload: page };
};

export const usersPostReset = () => {
  return {
    type: USERS_POST_SUCCESS,
    payload: { userId: undefined }
  };
};
