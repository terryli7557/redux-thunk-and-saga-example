import React, {Component} from 'react';
import Button from 'antd/lib/button';
import {connect} from 'react-redux'

import 'antd/dist/antd.css';
import {startLogin} from "./login.reducer";

const UserProfile = ({firstName, loading}) => (
  loading ?
    <div>Loading profile...</div>
    :
    <div>
      Hello {firstName}
    </div>
);

const ErrorHandler = ({hasError}) => (
  hasError ? <div>Got an error</div> : <></>
);


class App extends Component {
  render() {
    return (
      <>
        <ErrorHandler hasError={this.props.hasError}/>
        <div>
          {this.props.isAuthenticated ?
            <>
              <div> You have logged in.</div>
              <UserProfile firstName={this.props.firstName} loading={this.props.loadingProfile}/>
            </>
            :
            <>
              <div>
                <Button type="primary" loading={this.props.loading} onClick={this.props.login}>
                  Login (thunk)
                </Button>
              </div>
              <br/>
              <div>
                <Button type="primary" loading={this.props.loading} onClick={this.props.loginSaga}>
                  Login (saga)
                </Button>
              </div>
            </>
          }
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.login.logining,
    firstName: state.profile.firstName,
    isAuthenticated: state.login.isAuthenticated,
    loadingProfile: state.profile.loadingProfile,
    hasError: state.profile.hasError,
  }
}


function mapStateToDispatch(dispatch) {
  return {
    login: () => {
      dispatch(startLogin());
    },
    loginSaga: () => {
      dispatch({type: 'USER_LOGIN_REQUESTED', payload: {id: 123}})
    }
  };
}

export default connect(mapStateToProps, mapStateToDispatch)(App);
