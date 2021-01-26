import {
  AUTH_SIGN_IN,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_IN_FAILURE,
  AUTH_SIGN_OUT,
  AUTH_SIGN_OUT_SUCCESS,
  AUTH_SIGN_OUT_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
  username: undefined,
  errorSignIn: undefined,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_SIGN_IN:
      return { ...state, loading: true };
    case AUTH_SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        username: action.payload.username,
        errorSignIn: undefined
      };
    case AUTH_SIGN_IN_FAILURE:
      return {
        ...state,
        loading: false,
        username: undefined,
        errorSignIn: action.payload.errorSignIn
      };
    case AUTH_SIGN_OUT:
      return { ...state, loading: true };
    case AUTH_SIGN_OUT_SUCCESS:
      return {
        ...state,
        loading: false,
        username: undefined,
        errorSignIn: undefined
      };
    case AUTH_SIGN_OUT_FAILURE:
      return {
        ...state,
        loading: false,
        username: undefined,
        errorSignIn: action.payload.errorSignOut
      };

    default:
      console.log(
        'reducerAuth default ??? unhandled action.type: ',
        action.type
      );
      return state;
  }
};
