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
import { toastr } from 'react-redux-toastr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import history from '../../../history';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import { SERVER } from '../../../constants/constantData';
import s from './ChangePass.css';

class ChangePass extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.context.params.token,
      newPass: '',
      repPassword: '',
    };
    this.setEmail = this.setEmail.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
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
    if (this.state.newPass !== this.state.repPassword)
      toastr.error('', 'Passwords do not match');
    else if (this.state.newPass.length < 5)
      toastr.error('', 'Passwords length must be atleast 5');
    else if (this.state.newPass == '' || this.state.repPassword == '')
      toastr.error('', 'Please fill all the inputs');
    else {
      const credentials = {
        token: this.state.token,
        password: this.state.newPass,
        repPassword: this.state.repPassword,
      };
      console.log(JSON.stringify(credentials));
      const loginOptions = {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const that = this;
      fetchWithTimeOut(
        url,
        loginOptions,
        data => {
          if (data.error === undefined) {
            toastr.success(
              'Reset Password',
              'Your password was changed successfully',
            );
            history.push(`/login`);
          } else {
            toastr.error('Reset Password', data.error.description);
          }
        },
        error => {
          toastr.error('Reset Password', "Couldn'nt Reset your password");
        },
      );
    }
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
              <div class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  name="newPass"
                  onChange={this.setEmail}
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
                  onChange={this.setEmail}
                  value={this.state.repPassword}
                  required=""
                  placeholder="repeat password"
                  autocomplete="off"
                />
              </div>
            </form>
            <div class="form-group pt-1">
              <button
                onClick={this.sendEmail}
                class="btn btn-block btn-xl"
                style={{ backgroundColor: 'black', color: 'white' }}
              >
                Reset Password
              </button>
            </div>
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
