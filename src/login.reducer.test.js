import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startLogin} from "./login.reducer";
jest.mock('./user.service');
const mockStore = configureStore([thunk]);

it('should execute fetch data', () => {
  const store = mockStore({});

  // Return the promise
  return store.dispatch(startLogin())
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({type:'LOGIN_START'});
    })
})
