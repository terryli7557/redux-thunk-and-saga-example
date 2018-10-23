const LOAD_PROFILE_START = 'LOAD_PROFILE_START';
const LOAD_PROFILE_SUCCESS = 'LOAD_PROFILE_SUCCESS';
const ERROR = 'ERROR';

export const getError = error => (
  {type: ERROR, error}
);

export const startLoadingProfile = () => (
  {type: LOAD_PROFILE_START}
);

export const loadingProfileSuccess = (firstName) => (
  {type: LOAD_PROFILE_SUCCESS, firstName}
);

const initialState = {
  firstName: '',
  loadingProfile: false,
  hasError: false,
};


const profileReducer = (state = initialState, action) => {
  switch (action.type) {
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
export default profileReducer;
