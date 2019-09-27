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
import s from './Register.css';

class Register extends React.Component {
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
      <div className={s.root}>
        <div class="card">
          <div class="card-header">
            <h3 class="mb-1">Sign Up</h3>
          </div>
          <div class="card-body">
            <div class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                name="firstName"
                required="true"
                placeholder="First Name"
                autocomplete="off"
              />
            </div>
            <div class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                name="lastName"
                required="true"
                placeholder="Last Name"
                autocomplete="off"
              />
            </div>
            <div class="form-group">
              <input
                class="form-control form-control-lg"
                type="type"
                name="userName"
                required="true"
                placeholder="Username"
                autocomplete="off"
              />
            </div>
            <div class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                name="contractName"
                required="true"
                placeholder="Contract Name"
                autocomplete="off"
              />
            </div>
            <div class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                name="password"
                required="true"
                placeholder="Password"
                autocomplete="off"
              />
            </div>
            <div class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                name="email"
                required=""
                placeholder="E-mail"
                autocomplete="off"
              />
            </div>
            <div class="form-group">
              <Select placeholder="Role" />
            </div>
            <div class="form-group">
              <Select placeholder="User Subcategory" />
            </div>
            <div class="form-group">
              <Select placeholder="Currency" />
            </div>
            <div class="form-group">
              <Select placeholder="Language" />
            </div>
            <div class="form-group">
              <Select placeholder="Job" />
            </div>
            <div class="form-group pt-2">
              <button class="btn btn-block btn-primary" type="submit">
                Register My Account
              </button>
            </div>
          </div>
          <div class="card-footer bg-white">
            <p>
              Already member?{' '}
              <a
                onClick={this.goToLogin}
                style={{ cursor: 'pointer' }}
                class="text-secondary"
              >
                Login Here.
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Register);
