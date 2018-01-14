import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function (state = initialState.repo, action) {
  switch (action.type) {
    case types.CLEAR:
      return { ...state, data: [] };
    case types.LOADING:
      return { ...state, loading: action.status };
    case types.GET_DATA_SUCCESS:
      return { ...state, data: action.repo };
    case types.SELECTED_DATA:
      return { ...state, selectedRepo: action.selectRow };
    default:
      return state;
  }
}
