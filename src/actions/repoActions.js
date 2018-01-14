import * as types from '../constants/actionTypes';

export const selectAction = (selectRow) => ({
  type: types.SELECTED_DATA,
  selectRow
});

export const searchAction = (payload) => ({
  type: types.SEARCH_REPOSITORI_REQUEST,
  payload
});

export const clearAction = () => ({
  type: types.CLEAR
});
