import {call, put, takeLatest} from 'redux-saga/effects';
import {GET_DATA_REQUEST, getDataFail, getDataSuccess} from '../actions/UserActions';
import {getUser} from '../api/Api';
import {sendNetworkFail} from '../actions/actions';

export function* watchGetUser() {
  yield takeLatest(GET_DATA_REQUEST, handleGetUser);
}

function* handleGetUser(action) {
  const response = yield call(getUser, action.payload);
  if (response !== []) {
    yield put(getDataSuccess(response.data));
  } else {
    if (
      response.problem !== 'NETWORK_ERROR' &&
      response.problem !== 'TIMEOUT_ERROR' &&
      response.problem !== 'CONNECTION_ERROR'
    ) {
      yield put(getDataFail(response.problem));
    } else {
      yield put(sendNetworkFail(response.problem));
      yield put(getDataFail(response.problem));
    }
  }
}
