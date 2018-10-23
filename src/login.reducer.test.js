import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startLogin} from "./login.reducer";

jest.mock('./user.service');
const mockStore = configureStore([thunk]);

it('should execute fetch data', async () => {
  const store = mockStore({});
  await store.dispatch(startLogin());
  const actions = store.getActions();
  expect(actions[0]).toEqual({type: 'LOGIN_START'});
  expect(actions[1]).toEqual({type: 'LOGIN_SUCCESS'});
  expect(actions[2]).toEqual({type: 'LOAD_PROFILE_START'});
  expect(actions[3]).toEqual({type: 'LOAD_PROFILE_SUCCESS'});
});
