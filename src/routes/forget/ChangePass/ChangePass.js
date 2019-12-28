/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import history from '../../../history';
import s from './ChangePass.css';

class ChangePass extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      newPass: '',
      repPassword: '',
    };
    this.goToLogin = this.goToLogin.bind(this);
  }
  goToLogin() {
    history.push('/login');
  }
  setEmail(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  sendEmail() {
    const url = `${SERVER}/resetPassword`;
    credentials = {
      newPass: this.state.newPass,
      repPassword: this.state.repPassword,
    };
    const loginOptions = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const that = this;
    fetchWithTimeOut(
      loginURL,
      loginOptions,
      data => {
        if (data.error === undefined) {
          history.push(`/congrats`);
        } else {
          toastr.error('Reset Password', data.message);
        }
      },
      error => {
        toastr.error('Reset Password', "Couldn'nt Reset your password");
      },
    );
  }
  render() {
    return (
      <div className="col-xl-4">
        <div class="card">
          <div class="card-header text-center">
            <span class="splash-description" style={{ padding: '5px' }}>
              Please enter your New Password
            </span>
          </div>
          <div class="card-body">
            <form>
              <p>
                Don't worry, we'll send you an email to reset your password.
              </p>
              <div class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  name="newPass"
                  value={this.state.newPass}
                  required=""
                  placeholder="new password"
                  autocomplete="off"
                />
              </div>
              <div class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  name="repPassword"
                  value={this.state.repPassword}
                  required=""
                  placeholder="repeat password"
                  autocomplete="off"
                />
              </div>
              <div class="form-group pt-1">
                <a
                  class="btn btn-block btn-xl"
                  style={{ backgroundColor: 'black', color: 'white' }}
                >
                  Reset Password
                </a>
              </div>
            </form>
          </div>
          <div class="card-footer text-center">
            <span>
              Don't have an account?{' '}
              <a
                class="text-secondary"
                onClick={this.goToLogin}
                style={{ cursor: 'pointer' }}
              >
                Back to Login
              </a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ChangePass);
