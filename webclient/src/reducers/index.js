import { combineReducers } from 'redux';
import reducerAuth from './reducerAuth';
import reducerUsers from './reducerUsers';
import reducerToast from './reducerToast';

export default combineReducers({
  auth: reducerAuth,
  users: reducerUsers,
  toasts: reducerToast
});
