import {getUserProfile, login} from "./user.service";

const LOGIN_START = 'LOGIN_START';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_PROFILE_START = 'LOAD_PROFILE_START';
const LOAD_PROFILE_SUCCESS = 'LOAD_PROFILE_SUCCESS';
const ERROR = 'ERROR';

export const startLogin = () => async dispatch => {
  try {
    dispatch({
      type: LOGIN_START
    });

    await login();
    dispatch(loginSuccess());
    dispatch(startLoadingProfile());
    if (true) {
      throw new Error('error');
    }

    const firstName = await getUserProfile();
    dispatch(loadingProfileSuccess(firstName));
  } catch (e) {
    dispatch({type: ERROR});
  }


  // login().then(_ => {
  //   dispatch(loginSuccess());
  //   dispatch(startLoadingProfile());
  //   getUserProfile().then(firstName => {
  //     dispatch(loadingProfileSuccess(firstName));
  //   })
  // });
};

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS
  };
}

export function startLoadingProfile() {
  return {type: LOAD_PROFILE_START};
}

export function loadingProfileSuccess(firstName) {
  return {type: LOAD_PROFILE_SUCCESS, firstName};
}

const initialState = {
  logining: false,
  firstName: '',
  isAuthenticated: false,
  loadingProfile: false,
  hasError: false,
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {...state, logining: true};
    case LOGIN_SUCCESS :
      return {...state, logining: false, isAuthenticated: true};
    case LOAD_PROFILE_START :
      return {...state, loadingProfile: true};
    case LOAD_PROFILE_SUCCESS :
      return {...state, loadingProfile: false, firstName: action.firstName};
    case ERROR: {
      return {...state, hasError: true};
    }
    default:
      return state;
  }
};
export default reducer;
