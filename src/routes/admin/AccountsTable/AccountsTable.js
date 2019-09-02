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
import history from '../../../history';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import { fetchURL, SERVER } from '../../../constants';
import s from './AccountsTable.css';
import Spinner from '../../../components/Admin/Spinner';
import CustomTable from '../../../components/CustomTabel';
import {
  AccountStats,
  UserTypesArray,
  UserNumbersArray,
} from '../../../constants';

class AccountsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      firstRender: true,
      currentPageNumber: 1,
      totalPageNum: '',
      currentAccounts: '',
      searchClear: true,
      jobs: '',
      countries: '',
      accountsSearchFilter: {
        firstName: '',
        lastName: '',
        Email: '',
        userName: '',
        country: '',
        userType: '',
        job: '',
        hasOpenClaim: '',
        accountStatus: '',
        numberType: '',
        numberValue: '',
      },
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.fetchAccounts = this.fetchAccounts.bind(this);
    this.onCommentClick = this.onCommentClick.bind(this);
  }

  componentDidMount() {
    if (!this.state.firstRender)
      this.setState({
        accountsSearchFilter:
          localStorage.getItem('accountsSearchFilter') !== null
            ? JSON.parse(localStorage.getItem('accountsSearchFilter'))
            : this.state.accountsSearchFilter,
      });
    //   this.fetchAllInfo();
    this.fetchAccounts();
  }
  onChangeInput(event) {
    let state;
    event.target.type === 'radio'
      ? (state = 'accountStatus')
      : (state = event.target.name);

    let accountsSearchFilter = { ...this.state.accountsSearchFilter };
    accountsSearchFilter[state] = event.target.value;
    this.setState({ accountsSearchFilter, searchClear: false });
    localStorage.setItem(
      'accountsSearchFilter',
      JSON.stringify(accountsSearchFilter),
    );
  }
  clearFilters() {
    localStorage.removeItem('accountsSearchFilter');
    this.setState({
      accountsSearchFilter: {
        firstName: '',
        lastName: '',
        Email: '',
        userName: '',
        country: '',
        userType: '',
        job: '',
        hasOpenClaim: '',
        accountStatus: '',
        numberType: '',
        numberValue: '',
      },
      searchClear: true,
    });
  }
  fetchAccounts() {
    const url = fetchURL;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      searchBy: this.state.accountsSearchFilter,
      pageNumber: this.state.currentPageNumber,
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const that = this;
    fetchWithTimeOut(
      url,
      options,
      response => {
        that.setState({
          currentAccounts: response.currentRecords,
          totalPageNum: response.totalPageNumber,
          isLoading: false,
          firstRender: false,
        });
      },
      error => {
        console.log(error);
      },
    );
  }
  fetchAllInfo() {
    const url = fetchURL;
    this.setState({
      isLoading: true,
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const that = this;
    fetchWithTimeOut(
      url,
      options,
      response => {
        that.setState({
          countries: response.countries,
          jobs: response.jobs,
          isLoading: false,
          firstRender: false,
        });
      },
      error => {
        console.log(error);
      },
    );
  }
  handlePageChange(pageNumber) {
    this.setState({ currentPageNumber: pageNumber.selected });
    this.fetchAccounts();
  }
  handleSelectChange = (selectedOption, op) => {
    let accountsSearchFilter = { ...this.state.accountsSearchFilter };
    accountsSearchFilter[op] = selectedOption;
    this.setState({ accountsSearchFilter, searchClear: false });
    localStorage.setItem(
      'accountsSearchFilter',
      JSON.stringify(accountsSearchFilter),
    );
    console.log('selected : ', op);
  };

  onCommentClick(id) {
    history.push(`/admin/accounts/${id}`);
  }
  render() {
    const columnLabels = [
      'Avatar',
      'Id',
      'First Name',
      'Last Name',
      'Username',
      'Email',
    ];
    const recordItemNames = [
      'id',
      'senderUserName',
      'receiverUserName',
      'msgStatus',
      'repliedMsgId',
      'status',
    ];
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' },
    ];
    return (
      <div className="container-fluid dashboard-content">
        <div className="row">
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
              <div className="card">
                <h4 className="card-header">Accounts</h4>
                <div className="card-body p-0">
                  <div className="container-fluid">
                    <div className="row advancedSearchContainer">
                      <div className="col-12">
                        <div>
                          <button
                            class="btn btn-primary"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseExample"
                            aria-expanded="false"
                            aria-controls="collapseExample"
                          >
                            Advanced Search
                          </button>
                        </div>
                        <div
                          class={
                            this.state.searchClear
                              ? 'collapse'
                              : 'collapse show'
                          }
                          id="collapseExample"
                        >
                          <div class="card card-body">
                            {/* Account Status */}
                            <div className="row">
                              <div className="col-xl-12 col-lg-8 col-md-8 col-sm-8 col-12">
                                <span className="advancedSearchLabel">
                                  Acount Status : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                                <br />
                                <br />
                                <label class="custom-color-theme custom-control custom-radio custom-control-inline">
                                  <input
                                    type="radio"
                                    name="approvedAccounts"
                                    class="custom-control-input"
                                    value={AccountStats.approved}
                                    onChange={this.onChangeInput}
                                    checked={
                                      this.state.accountsSearchFilter
                                        .accountStatus === AccountStats.approved
                                    }
                                  />
                                  <span class="custom-control-label">
                                    Approved Accounts
                                  </span>
                                </label>
                                <label class="custom-color-theme custom-control custom-radio custom-control-inline">
                                  <input
                                    type="radio"
                                    name="activeAccounts"
                                    class="custom-control-input"
                                    value={AccountStats.active}
                                    checked={
                                      this.state.accountsSearchFilter
                                        .accountStatus === AccountStats.active
                                    }
                                    onChange={this.onChangeInput}
                                  />
                                  <span class="custom-control-label">
                                    Active Accounts
                                  </span>
                                </label>
                                <label class="custom-color-theme custom-control custom-radio custom-control-inline">
                                  <input
                                    type="radio"
                                    name="deactiveAccounts"
                                    class="custom-control-input"
                                    value={AccountStats.deactive}
                                    checked={
                                      this.state.accountsSearchFilter
                                        .accountStatus === AccountStats.deactive
                                    }
                                    onChange={this.onChangeInput}
                                  />
                                  <span class="custom-control-label">
                                    Deactive Accounts
                                  </span>
                                </label>
                              </div>
                            </div>
                            <br />
                            {/* USER INFO */}
                            <div className="row">
                              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6 advancedSearchLabel">
                                User Information :
                              </div>
                            </div>
                            <br />
                            <div className="row">
                              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <form>
                                  <div className="row">
                                    <div class="col-md-2 col-sm-4 form-group">
                                      <input
                                        id="fn"
                                        name="firstName"
                                        type="text"
                                        placeholder="First Name"
                                        value={
                                          this.state.accountsSearchFilter
                                            .firstName
                                        }
                                        class="form-control"
                                        onChange={this.onChangeInput}
                                      />
                                    </div>
                                    <div class="col-md-2 col-sm-4 form-group">
                                      <input
                                        id="ln"
                                        name="lastName"
                                        type="text"
                                        placeholder="Last Name"
                                        value={
                                          this.state.accountsSearchFilter
                                            .lastName
                                        }
                                        class="form-control"
                                        onChange={this.onChangeInput}
                                      />
                                    </div>
                                    <div className="col-md-3 col-sm-4 form-group">
                                      <div class="form-group">
                                        <input
                                          id="email"
                                          name="Email"
                                          type="email"
                                          value={
                                            this.state.accountsSearchFilter
                                              .Email
                                          }
                                          placeholder="Email"
                                          class="form-control"
                                          onChange={this.onChangeInput}
                                        />{' '}
                                      </div>
                                    </div>
                                    <div class="col-md-2 col-sm-4 form-group">
                                      <input
                                        id="un"
                                        name="userName"
                                        type="text"
                                        placeholder="User Name"
                                        value={
                                          this.state.accountsSearchFilter
                                            .userName
                                        }
                                        class="form-control"
                                        onChange={this.onChangeInput}
                                      />
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>

                            {/* User Type */}
                            <div class="row reactSelectContainer">
                              <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 reactSelectLabel">
                                User Type :
                              </div>
                              <div class="col-xl-4 col-lg-6 col-md-8 col-sm-8 col-7">
                                <Select
                                  value={
                                    this.state.accountsSearchFilter.userType
                                  }
                                  onChange={so =>
                                    this.handleSelectChange(so, 'userType')
                                  }
                                  options={UserTypesArray}
                                  isSearchable
                                  className="reactSelect"
                                  classNamePrefix="innerSelect"
                                />
                              </div>
                            </div>
                            {/* User job */}
                            <div class="row reactSelectContainer">
                              <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 reactSelectLabel">
                                User Job :
                              </div>
                              <div class="col-xl-4 col-lg-6 col-md-8 col-sm-8 col-7">
                                <Select
                                  value={this.state.accountsSearchFilter.job}
                                  onChange={so =>
                                    this.handleSelectChange(so, 'job')
                                  }
                                  options={this.state.jobs}
                                  isSearchable
                                  className="reactSelect"
                                  classNamePrefix="innerSelect"
                                />
                              </div>
                            </div>
                            {/* User Country */}
                            <div class="row reactSelectContainer">
                              <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 reactSelectLabel">
                                User Country :
                              </div>
                              <div class="col-xl-4 col-lg-6 col-md-8 col-sm-8 col-7">
                                <Select
                                  value={
                                    this.state.accountsSearchFilter.country
                                  }
                                  onChange={so =>
                                    this.handleSelectChange(so, 'country')
                                  }
                                  options={this.state.countries}
                                  isSearchable
                                  className="reactSelect"
                                  classNamePrefix="innerSelect"
                                />
                              </div>
                            </div>
                            {/* User numberType */}
                            <div class="row reactSelectContainer">
                              <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 reactSelectLabel">
                                User Number :
                              </div>
                              <div class="col-xl-2 col-lg-2 col-md-4 col-sm-4 ">
                                <Select
                                  value={
                                    this.state.accountsSearchFilter.numberType
                                  }
                                  onChange={so =>
                                    this.handleSelectChange(so, 'numberType')
                                  }
                                  options={UserNumbersArray}
                                  isSearchable
                                  className="reactSelect"
                                  classNamePrefix="innerSelect"
                                />
                              </div>
                              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4">
                                <form>
                                  <input
                                    id="number"
                                    name="numberValue"
                                    type="text"
                                    placeholder="...."
                                    value={
                                      this.state.accountsSearchFilter
                                        .numberValue
                                    }
                                    class="form-control"
                                    onChange={this.onChangeInput}
                                  />
                                </form>
                              </div>
                            </div>

                            {/* Search Buttons */}
                            <br />

                            <div className="row">
                              <div className="col-xl-9 col-lg-9 col-md-1 col-sm-1" />
                              <div className="col-xl-1 col-lg-1 col-md-4 col-sm-4">
                                <a
                                  onClick={this.fetchAccounts}
                                  class="btn btn-outline-success"
                                >
                                  Search
                                </a>
                              </div>
                              <div className="col-xl-1 col-lg-1 col-md-4 col-sm-4">
                                <a
                                  onClick={this.clearFilters}
                                  class="btn btn-outline-success"
                                >
                                  Clear
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr />
                    <CustomTable
                      pageCount={20}
                      currentPageNumber={this.state.currentPageNumber}
                      records={this.state.currentAccounts}
                      columnLabels={columnLabels}
                      recordItemNames={recordItemNames}
                      handlePageChange={this.handlePageChange}
                      onRecordClick={this.onCommentClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AccountsTable);
