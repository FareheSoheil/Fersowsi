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
        password: '',
        username: '',
        companyName: '',
        contractName: '',
        email: '',
        mobileNumber: '',
        repPassword: '',
        Country: '',
        roleId: '',
        UserSubCategory: '',
        Job: '',
        Language: '',
        Currency: '',
        address: {
          province: '',
          city: '',
          detailAddress: '',
          zipCode: '',
          countryId: '',
        },
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
    this.handleAddressChange = this.handleAddressChange.bind(this);
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
    let res = 1;
    const title = 'Register';
    if (this.state.user.username == '') {
      res = 0;
      toastr.error(title, 'Enter Username');
    } else if (this.state.user.password !== this.state.user.repPassword) {
      res = 0;
      toastr.error(title, 'Passwords do not match');
    } else if (this.state.user.email == '') {
      res = 0;
      toastr.error(title, 'Enter Email');
    } else if (this.state.user.Currency.value == undefined) {
      res = 0;
      toastr.error(title, 'Choose Currency');
    } else if (this.state.user.Country.value == undefined) {
      res = 0;
      toastr.error(title, 'Choose Country');
    } else if (this.state.user.address.province == undefined) {
      res = 0;
      toastr.error(title, 'Enter Province');
    } else if (this.state.user.address.city == undefined) {
      res = 0;
      toastr.error(title, 'Enter City');
    } else if (this.state.user.address.detailAddress == undefined) {
      res = 0;
      toastr.error(title, 'Enter Address');
    } else if (this.state.user.address.zipCode == undefined) {
      res = 0;
      toastr.error(title, 'Enter zip code');
    }
    return res;
  }
  register() {
    if (this.validatePass()) {
      const url = `${SERVER}/register`;
      let cred = { ...this.state.user };
      console.log('let credentials : ', cred);
      cred.countryId = this.state.user.Country.value;
      cred.address.countryId = this.state.user.Country.value;
      cred.currencyId = this.state.user.Currency.value;
      cred.roleId = this.state.user.roleId;
      cred.languageId = this.state.user.Language.value;
      cred.jobId = this.state.user.Job.value;
      cred.userSubCategoryId = this.state.user.UserSubCategory.value;
      console.log('after credentials : ', cred);
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
              password: '',
              username: '',
              companyName: '',
              contractName: '',
              email: '',
              mobileNumber: '',
              repPassword: '',
              Country: '',
              roleId: '',
              UserSubCategory: '',
              Job: '',
              Language: '',
              Currency: '',
              address: {
                province: '',
                city: '',
                detailAddress: '',
                zipCode: '',
                countryId: '',
              },
            };
            that.setState({
              user: user,
            });
          } else toastr.error(response.error.title, response.error.description);
        },
        error => {
          console.log('error : ', error);
        },
      );
    }
  }
  handleSelectChange = (selectedOption, op) => {
    let user = { ...this.state.user };
    user[op] = selectedOption;
    this.setState({ user }, () => {
      // console.log('state L ', this.state);
    });
  };
  handleInputChange(event) {
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
        user: user,
      },
      () => {
        console.log('state L ', this.state);
      },
    );
  }
  handleAddressChange(event) {
    let state, value;

    state = event.target.name;
    value = event.target.value;

    let user = { ...this.state.user };
    user.address[state] = value;

    this.setState(
      {
        user: user,
      },
      () => {
        console.log('state L ', this.state.user);
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
                {this.state.user.roleId == ROLES.customer.value ? (
                  <div class="form-group">
                    <Select
                      options={this.state.subcats}
                      value={this.state.user.UserSubCategory}
                      onChange={so =>
                        this.handleSelectChange(so, 'UserSubCategory')
                      }
                      placeholder="User Subcategory"
                    />
                  </div>
                ) : (
                  ''
                )}

                {this.state.user.roleId == ROLES.customer.value &&
                this.state.user.UserSubCategory.value ==
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
                ) : this.state.user.UserSubCategory.value != '' ? (
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
                    name="username"
                    required="true"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleInputChange}
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
                    onChange={so => this.handleSelectChange(so, 'Currency')}
                    options={this.state.currencies}
                    value={this.state.user.Currency}
                    placeholder="Currency"
                  />
                </div>
                <div class="form-group">
                  <Select
                    options={this.state.countries}
                    value={this.state.user.Country}
                    onChange={so => this.handleSelectChange(so, 'Country')}
                    placeholder="Country"
                  />
                </div>
                <div class="form-group">
                  <input
                    class="form-control form-control-sm"
                    type="text"
                    name="province"
                    required="true"
                    placeholder="province"
                    value={this.state.province}
                    onChange={this.handleAddressChange}
                  />
                </div>
                <div class="form-group">
                  <input
                    class="form-control form-control-sm"
                    type="text"
                    name="city"
                    required="true"
                    placeholder="city"
                    value={this.state.city}
                    onChange={this.handleAddressChange}
                  />
                </div>
                <div class="form-group">
                  <input
                    class="form-control form-control-sm"
                    type="text"
                    name="detailAddress"
                    required="true"
                    placeholder="Address"
                    value={this.state.detailAddress}
                    onChange={this.handleAddressChange}
                  />
                </div>
                <div class="form-group">
                  <input
                    class="form-control form-control-sm"
                    type="text"
                    name="zipCode"
                    required="true"
                    placeholder="zip Code"
                    value={this.state.zipCode}
                    onChange={this.handleAddressChange}
                  />
                </div>
                <div class="form-group">
                  <Select
                    onChange={so => this.handleSelectChange(so, 'Language')}
                    options={this.state.languages}
                    value={this.state.user.Language}
                    placeholder="Language"
                  />
                </div>
                <div class="form-group">
                  <Select
                    onChange={so => this.handleSelectChange(so, 'Job')}
                    options={this.state.jobs}
                    value={this.state.user.Job}
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
