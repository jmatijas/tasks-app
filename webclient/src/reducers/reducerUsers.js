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
} from '../actions/types';

const INITIAL_STATE = {
  list: [],
  createdUserId: undefined,
  selectedIds: [],
  limit: 10,
  page: 0,
  error: undefined,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERS_GET:
      return { ...state, loading: true };
    case USERS_GET_SUCCESS:
      return {
        ...state,
        list: action.payload.users,
        selectedIds: [],
        page: 0,
        loading: false,
        error: undefined
      };
    case USERS_GET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case USERS_POST:
      return { ...state, createdUserId: undefined, loading: true };
    case USERS_POST_SUCCESS:
      return {
        ...state,
        createdUserId: action.payload.userId,
        loading: false,
        error: undefined
      };
    case USERS_POST_FAILURE:
      return {
        ...state,
        createdUserId: undefined,
        loading: false,
        error: action.payload.error
      };
    case USERS_DELETE_MANY:
      return { ...state, loading: true };
    case USERS_DELETE_MANY_SUCCESS:
      return {
        ...state,
        list: [],
        selectedIds: [],
        page: 0,
        loading: false
      };
    case USERS_DELETE_MANY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case USERS_SET_SELECTED_IDS:
      return { ...state, selectedIds: action.payload };
    case USERS_SET_PAGE:
      return { ...state, page: action.payload };
    case USERS_SET_LIMIT:
      return { ...state, limit: action.payload };
    default:
      console.log(
        'reducerUsers default ??? unhandled action.type: ',
        action.type
      );
      return state;
  }
};
