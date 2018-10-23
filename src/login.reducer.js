import userService from "./user.service";
import {loadingProfileSuccess, startLoadingProfile} from "./profile.reducer";

const LOGIN_START = 'LOGIN_START';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERROR = 'ERROR';

export const startLogin = () => async (dispatch) => {
  try {
    dispatch(loginStart());

    await userService.login();
    dispatch(loginSuccess());
    dispatch(startLoadingProfile());

    const firstName = await userService.getUserProfile();
    dispatch(loadingProfileSuccess(firstName));
  } catch (e) {
    dispatch({type: ERROR});
  }
};

export const loginStart = () => (
  {
    type: LOGIN_START
  }
);

export const loginSuccess = () => (
  {
    type: LOGIN_SUCCESS
  }
);

const initialState = {
  logining: false,
  isAuthenticated: false,
};


const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {...state, logining: true};
    case LOGIN_SUCCESS :
      return {...state, logining: false, isAuthenticated: true};
    default:
      return state;
  }
};
export default loginReducer;
