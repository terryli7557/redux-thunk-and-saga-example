import React, {Component} from 'react';
import Button from 'antd/lib/button';
import {connect} from 'react-redux'

import 'antd/dist/antd.css';
import {startLogin} from "./reducer";

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
            <Button type="primary" loading={this.props.loading} onClick={this.props.login}>
              Login
            </Button>
          }
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.logining,
    firstName: state.firstName,
    isAuthenticated: state.isAuthenticated,
    loadingProfile: state.loadingProfile,
    hasError: state.hasError,
  }
}


function mapStateToDispatch(dispatch) {
  return {
    login: () => {
      dispatch(startLogin());
    }
  };
}

export default connect(mapStateToProps, mapStateToDispatch)(App);
