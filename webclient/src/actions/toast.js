import { TOAST_ADD, TOAST_REMOVE } from './types';

import createToast from 'src/factories/createToast';

export const toastAdd = (options = {}) => {
  return {
    payload: createToast(options),
    type: TOAST_ADD
  };
};

export const removeToast = (id) => {
  return {
    payload: id,
    type: TOAST_REMOVE
  };
};
