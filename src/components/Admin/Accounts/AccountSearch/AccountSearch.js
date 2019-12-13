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
// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import history from '../../../../history';
import s from './AccountSearch.css';
import {
  ROLES_ARRAY,
  USER_SUBCATEGORY_ARRAY,
  USER_ACTIVITION_STATUS,
  USER_NUMBER_ARRAY,
} from '../../../../constants/constantData';

class AccountSearch extends React.Component {
  static propTypes = {
    hasChoiceForRole: PropTypes.bool.isRequired,
    searchClear: PropTypes.bool.isRequired,
    jobs: PropTypes.array.isRequired,
    countries: PropTypes.array.isRequired,
    accountsSearchFilter: {
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      contractName: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      subcategory: PropTypes.string.isRequired,
      job: PropTypes.string.isRequired,
      hasOpenClaim: PropTypes.string.isRequired,
      accountStatus: PropTypes.string.isRequired,
      numberType: PropTypes.string.isRequired,
      numberValue: PropTypes.string.isRequired,
    },
    handleInputChange: PropTypes.func.isRequired,
    handleSelectChange: PropTypes.func.isRequired,
    fetchAccounts: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    // this.onNumberChange = this.onNumberChange.bind(this);
  }
  onAddUser() {
    history.push('/admin/accounts/add');
  }
  // onNumberChange() {
  //   var x = parseInt(document.getElementById('numberSelect').value);
  //   this.props.showMore(x);
  // }
  render() {
    return (
      <div className={`${s.advancedSearchContainer} row`}>
        <div className="col-12">
          {/* <div className={`${s.btnContainer} row`}>
            <div className="offset-xl-10 col-xl-2 offset-md-9 col-lg-3 col-md-3 col-sm-12">
              <button
                className="btn btn-primary"
                type="button"
                data-toggle="collapse"
                data-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Advanced Search
              </button>
            </div>

          </div> */}

          <div
            className={this.props.searchClear ? 'collapse' : 'collapse show'}
            id="collapseExample"
          >
            <div className="card card-body">
              {/* Account Status */}

              {/* USER INFO */}
              {/* <div className="row">
                  <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6 advancedSearchLabel">
                    User Information :
                  </div>
                </div> */}
              {/* <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <form>
                    <div className="row">
                      <div className="col-md-2 col-sm-4 form-group">
                        <input
                          id="fn"
                          name="firstName"
                          type="text"
                          placeholder="First Name"
                          value={this.props.accountsSearchFilter.firstName}
                          className="form-control"
                          onChange={this.props.handleInputChange}
                        />
                      </div>
                      <div className="col-md-2 col-sm-4 form-group">
                        <input
                          id="ln"
                          name="lastName"
                          type="text"
                          placeholder="Last Name"
                          value={this.props.accountsSearchFilter.lastName}
                          className="form-control"
                          onChange={this.props.handleInputChange}
                        />
                      </div>

                      <div className="col-md-2 col-sm-4 form-group">
                        <input
                          id="un"
                          name="userName"
                          type="text"
                          placeholder="User Name"
                          value={this.props.accountsSearchFilter.userName}
                          className="form-control"
                          onChange={this.props.handleInputChange}
                        />
                      </div>
                      <div className="col-md-2 col-sm-4 form-group">
                        <input
                          id="cn"
                          name="contractName"
                          type="text"
                          placeholder="Contract Name"
                          value={this.props.accountsSearchFilter.contractName}
                          className="form-control"
                          onChange={this.props.handleInputChange}
                        />
                      </div>
                      <div className="col-md-3 col-sm-4 form-group">
                        <div className="form-group">
                          <input
                            id="email"
                            name="Email"
                            type="email"
                            value={this.props.accountsSearchFilter.Email}
                            placeholder="Email"
                            className="form-control"
                            onChange={this.props.handleInputChange}
                          />{' '}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div> */}

              {/* User Role */}

              <div className={`${s.reactSelectContainer} row  mb-1`}>
                {this.props.hasChoiceForRole ? (
                  <div className="col-xl-2 col-lg-4 col-md-8 col-sm-8 col-7 form-group">
                    <Select
                      value={this.props.accountsSearchFilter.role}
                      onChange={so => this.props.handleSelectChange(so, 'role')}
                      options={ROLES_ARRAY}
                      placeholder="Role"
                      isSearchable
                      className="reactSelect"
                      classNamePrefix="innerSelect"
                    />
                  </div>
                ) : (
                  ''
                )}

                <div className="col-xl-2 col-lg-4 col-md-8 col-sm-8 col-7">
                  <Select
                    value={this.props.accountsSearchFilter.subcategory}
                    onChange={so =>
                      this.props.handleSelectChange(so, 'subcategory')
                    }
                    options={USER_SUBCATEGORY_ARRAY}
                    placeholder="category"
                    isSearchable
                    className="reactSelect"
                    classNamePrefix="innerSelect"
                  />
                </div>
                <div className="col-xl-2 col-lg-4 col-md-8 col-sm-8 col-7 form-group">
                  <Select
                    value={this.props.accountsSearchFilter.job}
                    onChange={so => this.props.handleSelectChange(so, 'job')}
                    options={this.props.jobs}
                    isSearchable
                    placeholder="Job"
                    className="reactSelect"
                    classNamePrefix="innerSelect"
                  />
                </div>
                <div className="col-xl-2 col-lg-4 col-md-8 col-sm-8 col-7 form-group">
                  <Select
                    value={this.props.accountsSearchFilter.country}
                    onChange={so =>
                      this.props.handleSelectChange(so, 'country')
                    }
                    placeholder="Country"
                    options={this.props.countries}
                    isSearchable
                    className="reactSelect"
                    classNamePrefix="innerSelect"
                  />
                </div>

                <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 form-group">
                  <Select
                    value={this.props.accountsSearchFilter.numberType}
                    onChange={so =>
                      this.props.handleSelectChange(so, 'numberType')
                    }
                    placeholder="number"
                    options={USER_NUMBER_ARRAY}
                    isSearchable
                    className="reactSelect"
                    classNamePrefix="innerSelect"
                  />
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 form-group">
                  <form>
                    <input
                      id="number"
                      name="numberValue"
                      type="text"
                      placeholder="+9"
                      value={this.props.accountsSearchFilter.numberValue}
                      className="form-control"
                      onChange={this.props.handleInputChange}
                    />
                  </form>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-xl-8 col-lg-10 col-md-10 col-sm-12 form-group">
                  <label className="custom-color-theme custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      name="waitForApprovalAccounts"
                      className="custom-control-input"
                      value={USER_ACTIVITION_STATUS.WAITFORAPPROVAL}
                      onChange={this.props.handleInputChange}
                      checked={
                        this.props.accountsSearchFilter.userActivitionStatus
                          .value === USER_ACTIVITION_STATUS.WAITFORAPPROVAL
                      }
                    />
                    <span className="custom-control-label">
                      Wait For Approval Accounts
                    </span>
                  </label>
                  <label className="custom-color-theme custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      name="activeAccounts"
                      className="custom-control-input"
                      value={USER_ACTIVITION_STATUS.ACTIVE}
                      checked={
                        this.props.accountsSearchFilter.userActivitionStatus
                          .value === USER_ACTIVITION_STATUS.ACTIVE
                      }
                      onChange={this.props.handleInputChange}
                    />
                    <span className="custom-control-label">
                      Active Accounts
                    </span>
                  </label>
                  <label className="custom-color-theme custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      name="deactiveAccounts"
                      className="custom-control-input"
                      value={USER_ACTIVITION_STATUS.DEACTIVE}
                      checked={
                        this.props.accountsSearchFilter.userActivitionStatus
                          .value === USER_ACTIVITION_STATUS.DEACTIVE
                      }
                      onChange={this.props.handleInputChange}
                    />
                    <span className="custom-control-label">
                      Deactive Accounts
                    </span>
                  </label>
                </div>

                {/* <div className="col-xl-1 col-lg-1 col-md-4 col-sm-4">
                  <a
                    onClick={this.props.fetchAccounts}
                    className="btn btn-outline-success"
                  >
                    Search
                  </a>
                </div>
                <div className="col-xl-1 col-lg-1 col-md-4 col-sm-4">
                  <a
                    onClick={this.props.clearFilters}
                    className="btn btn-outline-success"
                  >
                    Clear
                  </a>
                </div> */}
              </div>
              {/* User SubCategory
              <div className="row reactSelectContainer">
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 reactSelectLabel">
                  User Subcategory :
                </div>
              </div>
              User job
              <div className="row reactSelectContainer">
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 reactSelectLabel">
                  User Job :
                </div>
              </div>
              User Country
              <div className="row reactSelectContainer">
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 reactSelectLabel">
                  User Country :
                </div>
              </div>
              User numberType
              <div className="row reactSelectContainer">
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 reactSelectLabel">
                  User Number :
                </div>
              </div> */}

              {/* Search Buttons */}
              {/* <br />

              <div className="row">
                <div className="col-xl-9 col-lg-9 col-md-1 col-sm-1" />
                <div className="col-xl-1 col-lg-1 col-md-4 col-sm-4">
                  <a
                    onClick={this.props.fetchAccounts}
                    className="btn btn-outline-success"
                  >
                    Search
                  </a>
                </div>
                <div className="col-xl-1 col-lg-1 col-md-4 col-sm-4">
                  <a
                    onClick={this.props.clearFilters}
                    className="btn btn-outline-success"
                  >
                    Clear
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(normalizeCss, s)(AccountSearch);
