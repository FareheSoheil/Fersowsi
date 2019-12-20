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
import { toastr } from 'react-redux-toastr';
import history from '../../history';
import { fetchWithTimeOut } from '../../fetchWithTimeout';
import Spinner from '../../components/Admin/Spinner';
import {
  ROLES,
  USER_SUBCATEGORY_ARRAY,
  SERVER,
  USER_SUBCATEGORY,
} from '../../constants/constantData';
import s from './Register.css';
// import { tr } from 'date-fns/esm/locale';

class Register extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        username: '',
        contractName: '',
        companyName: '',
        password: '',
        repPassword: '',
        roleId: '',
        userSubCategoryId: '',
        jobId: '',
        languageId: '',
        currencyId: '',
        countryId: '',
        email: '',
      },
      countries: '',
      jobs: '',
      languages: '',
      subcats: '',
      currencies: '',
      isLoading: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.fetchAuxInfo = this.fetchAuxInfo.bind(this);
    this.register = this.register.bind(this);
    this.validatePass = this.validatePass.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
  }
  componentDidMount() {
    this.fetchAuxInfo();
  }

  fetchAuxInfo() {
    this.setState({
      isLoading: true,
    });
    const auxUrl = `${SERVER}/getAuxInfoForAll`;
    const auxOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const that = this;
    fetchWithTimeOut(
      auxUrl,
      auxOptions,
      response => {
        that.setState({
          countries: response.Country,
          jobs: response.Job,
          languages: response.ProductLanguage,
          subcats: response.UserSubCategory,
          currencies: response.Currency,
          isLoading: false,
        });
      },
      error => {
        console.log(error);
      },
    );
  }
  validatePass() {
    if (this.state.user.password === this.state.user.repPassword) return true;
    return false;
  }
  register() {
    if (this.validatePass()) {
      const url = `${SERVER}/register`;
      const cred = { ...this.state.user };
      cred.countryId = this.state.user.countryId.value;
      cred.currencyId = this.state.user.currencyId.value;
      cred.roleId = this.state.user.roleId.value;
      cred.languageId = this.state.user.languageId.value;
      cred.jobId = this.state.user.jobId.value;
      cred.userSubCategoryId = this.state.user.userSubCategoryId.value;
      const options = {
        method: 'POST',
        body: JSON.stringify(cred),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const that = this;
      fetchWithTimeOut(
        url,
        options,
        response => {
          if (response.error == undefined) {
            toastr.success('Congrats !', response.message);
            let user = {
              firstName: '',
              lastName: '',
              username: '',
              contractName: '',
              companyName: '',
              password: '',
              repPassword: '',
              roleId: '',
              userSubCategoryId: '',
              jobId: '',
              languageId: '',
              currencyId: '',
              countryId: '',
              email: '',
            };
            that.setState({
              user: user,
            });
          } else toastr.error(response.error.title, response.error.description);
        },
        error => {
          toastr.error(response.error.title, response.error.description);
        },
      );
    } else {
      toastr.error('Attention !', 'Passwords do not match');
    }
  }
  handleSelectChange = (selectedOption, op) => {
    let user = { ...this.state.user };
    user[op] = selectedOption;
    this.setState({ user }, () => {
      console.log('state L ', this.state);
    });
  };
  handleInputChange(e) {
    let state, value;
    if (event.target.type == 'radio') {
      state = 'roleId';
      value = parseInt(event.target.value);
    } else {
      state = event.target.name;
      value = event.target.value;
    }
    let user = { ...this.state.user };
    user[state] = value;

    this.setState(
      {
        user,
      },
      () => {
        console.log('state L ', this.state);
      },
    );
  }
  goToLogin() {
    history.push('/login');
  }
  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div className={s.root}>
            <div class="card">
              <div class={` ${s.header}`}>
                <h3 class="mb-1">Register</h3>
              </div>
              <div class="card-body">
                <div className="row">
                  <div className="col-6">
                    <label className="custom-color-theme custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        name="roleId"
                        className="custom-control-input"
                        value={ROLES.publisher.value}
                        checked={
                          this.state.user.roleId == ROLES.publisher.value
                        }
                        onChange={this.handleInputChange}
                      />
                      <span className="custom-control-label">Publisher </span>
                    </label>
                  </div>
                  <div className="col-6">
                    <label className="custom-color-theme custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        name="roleId"
                        className="custom-control-input"
                        value={ROLES.customer.value}
                        checked={this.state.user.roleId == ROLES.customer.value}
                        onChange={this.handleInputChange}
                      />
                      <span className="custom-control-label">Customer</span>
                    </label>
                  </div>
                </div>
                {this.state.user.roleId != '' ? (
                  <div class="form-group">
                    <Select
                      options={this.state.subcats}
                      value={this.state.userSubCategoryId}
                      onChange={so =>
                        this.handleSelectChange(so, 'userSubCategoryId')
                      }
                      placeholder="User Subcategory"
                    />
                  </div>
                ) : (
                  ''
                )}

                {this.state.user.roleId == ROLES.customer.value &&
                this.state.user.userSubCategoryId.value ==
                  USER_SUBCATEGORY.Single.value ? (
                  <div>
                    <div class="form-group">
                      <input
                        class="form-control form-control-sm"
                        type="text"
                        name="firstName"
                        required="true"
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div class="form-group">
                      <input
                        class="form-control form-control-sm"
                        type="text"
                        name="lastName"
                        required="true"
                        placeholder="Last Name"
                        value={this.state.lastName}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                ) : this.state.user.userSubCategoryId != '' ? (
                  <div class="form-group">
                    <input
                      class="form-control form-control-sm"
                      type="text"
                      name="companyName"
                      required="true"
                      placeholder="Company Name"
                      value={this.state.companyName}
                      onChange={this.handleInputChange}
                    />
                  </div>
                ) : (
                  ''
                )}
                <div class="form-group">
                  <input
                    class="form-control form-control-sm"
                    type="type"
                    name="userName"
                    required="true"
                    placeholder="Username"
                    value={this.state.username}
                    autocomplete="off"
                  />
                </div>
                <div class="form-group">
                  <input
                    class="form-control form-control-sm"
                    type="text"
                    name="contractName"
                    required="true"
                    placeholder="Contract Name"
                    value={this.state.contractName}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div class="form-group">
                  <input
                    class="form-control form-control-sm"
                    type="password"
                    name="password"
                    required="true"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div class="form-group">
                  <input
                    class="form-control form-control-sm"
                    type="password"
                    name="repPassword"
                    required="true"
                    placeholder="Repeat Password"
                    value={this.state.repPassword}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div class="form-group">
                  <input
                    class="form-control form-control-sm"
                    type="email"
                    name="email"
                    required=""
                    placeholder="E-mail"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div class="form-group">
                  <Select
                    onChange={so => this.handleSelectChange(so, 'currencyId')}
                    options={this.state.currencies}
                    value={this.state.currencyId}
                    placeholder="Currency"
                  />
                </div>
                <div class="form-group">
                  <Select
                    options={this.state.countries}
                    value={this.state.countryId}
                    onChange={so => this.handleSelectChange(so, 'countryId')}
                    placeholder="Country"
                  />
                </div>
                <div class="form-group">
                  <Select
                    onChange={so => this.handleSelectChange(so, 'languageId')}
                    options={this.state.languages}
                    value={this.state.languageId}
                    placeholder="Language"
                  />
                </div>
                <div class="form-group">
                  <Select
                    onChange={so => this.handleSelectChange(so, 'jobId')}
                    options={this.state.jobs}
                    value={this.state.jobId}
                    placeholder="Job"
                  />
                </div>
                <div class="form-group pt-2">
                  <button
                    class="btn btn-block "
                    type="submit"
                    onClick={this.register}
                  >
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
        )}
      </div>
    );
  }
}

export default withStyles(s)(Register);
