import {all} from 'redux-saga/effects';
import {watchGetUser} from '../sagas/UserSagas';

export default function* rootSaga() {
  yield all([watchGetUser()]);
}
