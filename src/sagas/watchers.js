import { takeLatest } from 'redux-saga';
import { searchRepoSaga, clearRepoSaga } from './repoSagas';
import * as types from '../constants/actionTypes';

export default function* watchSearchMedia() {
  yield* takeLatest(types.SEARCH_REPOSITORI_REQUEST, searchRepoSaga);
  yield* takeLatest(types.CLEAR, clearRepoSaga);
}
