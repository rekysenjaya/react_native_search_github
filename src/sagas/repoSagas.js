import { put, call, all } from 'redux-saga/effects';
import { flickrImages } from '../Api/api';
import * as types from '../constants/actionTypes';


export  function* searchRepoSaga({ payload }) {
  try {
    yield put({ type: types.LOADING, status: true })
    const repo = yield call(flickrImages, payload);
    yield all([
      put({ type: types.LOADING, status: false }),
      put({ type: types.GET_DATA_SUCCESS, repo }),
      put({ type: types.SELECTED_DATA, selectRow: {} })
    ]);
  } catch (error) {
    yield put({ type: 'SEARCH_FAILURE', error });
  }
}

export  function* clearRepoSaga() {
  try {
    yield put({ type: types.CLEAR })
  } catch (error) {
    yield put({ type: 'SEARCH_FAILURE', error });
  }
}