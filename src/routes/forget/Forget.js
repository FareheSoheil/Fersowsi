/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { toastr } from 'react-redux-toastr';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { SERVER } from '../../constants/constantData';
import { fetchWithTimeOut } from '../../fetchWithTimeout';
import history from '../../history';
import s from './Forget.css';

class Forget extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
    this.goToLogin = this.goToLogin.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }
  goToLogin() {
    history.push('/register');
  }
  setEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  sendEmail() {
    const url = `${SERVER}/sendResetPasswordEmail`;
    const credentials = {
      email: this.state.email,
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
      url,
      loginOptions,
      data => {
        if (data.error == undefined) {
          toastr.success('Reset Password', data.message.description);
          // history.push(`/changePass/${this.state.email}`);
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
              Please enter your Email
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
                  type="email"
                  name="email"
                  onChange={this.setEmail}
                  value={this.state.email}
                  required=""
                  placeholder="Your Email"
                  autocomplete="off"
                />
              </div>
              <div class="form-group pt-1">
                <a
                  onClick={this.sendEmail}
                  class="btn btn-block btn-xl"
                  style={{ backgroundColor: 'black', color: 'white' }}
                >
                  Send Reset Password link
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
                Sign Up
              </a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Forget);
