import {call, put, takeLatest} from 'redux-saga/effects'
import UserService from './user.service';
import {loginStart, loginSuccess} from "./login.reducer";
import {getError, loadingProfileSuccess, startLoadingProfile} from "./profile.reducer";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* login(action) {
  try {
    yield put(loginStart());
    yield call(UserService.login, action.payload.userId);
    yield put(loginSuccess());

    yield put(startLoadingProfile());
    const firstName = yield call(UserService.getUserProfile, action.payload.userId);
    yield put(loadingProfileSuccess(firstName));

  } catch (e) {
    yield put(getError(e.message));
  }
}


function* mySaga() {
  yield takeLatest("USER_LOGIN_REQUESTED", login);
}

export default mySaga;
