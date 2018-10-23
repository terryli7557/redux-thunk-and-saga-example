
import { put, call } from 'redux-saga/effects';
import { login } from './login.saga';
import {loginStart, loginSuccess} from "./login.reducer";
import UserService from "./user.service";
import {loadingProfileSuccess, startLoadingProfile} from "./profile.reducer";

it('should login and load profile',  () => {
  const gen = login();
  expect(gen.next().value).toEqual(put(loginStart()));
  expect(gen.next().value).toEqual(call(UserService.login));
  expect(gen.next().value).toEqual(put(loginSuccess()));
  expect(gen.next().value).toEqual(put(startLoadingProfile()));
  expect(gen.next().value).toEqual(call(UserService.getUserProfile));
  expect(gen.next().value).toEqual(put(loadingProfileSuccess()));
});
