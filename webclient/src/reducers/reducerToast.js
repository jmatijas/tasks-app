import { TOAST_ADD, TOAST_REMOVE } from 'src/actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case TOAST_ADD:
      return [action.payload, ...state];
    case TOAST_REMOVE:
      return state.filter((toast) => toast.id !== action.payload);
    default:
      console.log(
        'reducerToast default ??? unhandled action.type: ',
        action.type
      );
      return state;
  }
};
