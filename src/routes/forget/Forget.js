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
import Select from 'react-select';
import history from '../../history';
import s from './Forget.css';

class Forget extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.goToLogin = this.goToLogin.bind(this);
  }
  goToLogin() {
    history.push('/login');
  }
  render() {
    return (
      <div class="card">
        <div class="card-header text-center">
          <img class="logo-img" src="../assets/images/logo.png" alt="logo" />
          <span class="splash-description">
            Please enter your user information.
          </span>
        </div>
        <div class="card-body">
          <form>
            <p>Don't worry, we'll send you an email to reset your password.</p>
            <div class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                name="email"
                required=""
                placeholder="Your Email"
                autocomplete="off"
              />
            </div>
            <div class="form-group pt-1">
              <a class="btn btn-block btn-primary btn-xl" href="../index.html">
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
              Sign Up
            </a>
          </span>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Forget);
