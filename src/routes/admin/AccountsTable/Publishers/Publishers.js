/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import history from '../../../../history';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import RowAdder from '../../../../components/moreTableRowSelector';
import s from './Publishers.css';
import Spinner from '../../../../components/Admin/Spinner';
import AccountsTable from '../../../../components/Admin/Accounts/AccountsTable';
import AccountSearch from '../../../../components/Admin/Accounts/AccountSearch';
import {
  ROLES,
  ACCOUNTS_COLUMNS_LABELS_ARRAY,
  ACCOUNTS_RECORDE_ITEM_NAMES_ARRAY,
} from '../../../../constants/constantData';
import { SERVER } from '../../../../constants';
import { onAct } from '../userSelectHelper';
class Publishers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasChoiceForRole: true,
      isLoading: false,
      firstRender: true,
      pageIndex: 0,
      pageSize: 10,
      totalPageNum: '',
      currentAccounts: '',
      searchClear: true,
      jobs: '',
      countries: '',
      accountsSearchFilter: {
        firstName: '',
        lastName: '',
        contractName: '',
        email: '',
        userName: '', //remove
        country: '',
        role: ROLES.publisher,
        userSubCategory: '',
        job: '',
        hasOpenClaim: '', //remove
        userActivitionStatus: '',
        numberType: '',
        numberValue: '',
      },
    };
    this.onAct = this.onAct.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.showMore = this.showMore.bind(this);
    this.fetchAccounts = this.fetchAccounts.bind(this);
    this.onAccountClick = this.onAccountClick.bind(this);
  }
  onAct(e, id) {
    e.stopPropagation();
    onAct(this, id);
  }
  componentDidMount() {
    this.fetchAccounts();
  }
  handleInputChange(event) {
    let state, value;
    if (event.target.type === 'radio') {
      state = 'userActivitionStatus';
      value = parseInt(event.target.value);
    } else {
      state = event.target.name;
      value = event.target.value;
    }

    let accountsSearchFilter = { ...this.state.accountsSearchFilter };
    accountsSearchFilter[state] = value;
    this.setState({ accountsSearchFilter, searchClear: false });
  }
  clearFilters() {
    this.setState(
      {
        accountsSearchFilter: {
          firstName: '',
          lastName: '',
          contractName: '',
          email: '',
          userName: '', //remove
          country: '',
          role: '',
          userSubCategory: '',
          job: '',
          hasOpenClaim: '', //remove
          userActivitionStatus: '',
          numberType: '',
          numberValue: '',
        },
        searchClear: true,
      },
      () => {
        this.fetchAccounts();
      },
    );
  }
  fetchAccounts() {
    const url = `${SERVER}/getAllUsers`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      searchBy: this.state.accountsSearchFilter,
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize,
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
        that.setState(
          {
            currentAccounts: response.currentRecords,
            totalPageNum: response.totalPageNum,
            // isLoading: false,
            firstRender: false,
          },
          () => {
            const auxUrl = `${SERVER}/getAuxInfoForAllUsers`;

            const auxOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            };
            const thatthat = that;
            fetchWithTimeOut(
              auxUrl,
              auxOptions,
              response => {
                thatthat.setState({
                  countries: response.countries,
                  jobs: response.jobs,
                  isLoading: false,
                });
              },
              error => {
                console.log(error);
              },
            );
          },
        );
      },
      error => {
        console.log(error);
      },
    );
  }

  handlePageChange(pageIndex) {
    this.setState({ pageIndex: pageIndex.selected }, () => {
      this.fetchAccounts();
    });
  }
  handleSelectChange = (selectedOption, op) => {
    let accountsSearchFilter = { ...this.state.accountsSearchFilter };
    accountsSearchFilter[op] = selectedOption;
    this.setState({ accountsSearchFilter, searchClear: false });
  };
  onAccountClick(id) {
    history.push(`/admin/accounts/${id}`);
  }
  showMore(num) {
    this.setState(
      {
        pageSize: num,
      },
      () => {
        this.fetchAccounts();
      },
    );
  }
  render() {
    return (
      <div className="container-fluid dashboard-content">
        <div className="row">
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="card">
                <h5 className="card-header">publishers</h5>
                <div className="card-body p-0">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <form>
                          <div className="row mt-2">
                            <div className="col-md-2 col-sm-4 form-group">
                              <input
                                id="fn"
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                value={
                                  this.state.accountsSearchFilter.firstName
                                }
                                className="form-control"
                                onChange={this.handleInputChange}
                              />
                            </div>
                            <div className="col-md-2 col-sm-4 form-group">
                              <input
                                id="ln"
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                value={this.state.accountsSearchFilter.lastName}
                                className="form-control"
                                onChange={this.handleInputChange}
                              />
                            </div>

                            <div className="col-md-2 col-sm-4 form-group">
                              <input
                                id="un"
                                name="userName"
                                type="text"
                                placeholder="User Name"
                                value={this.state.accountsSearchFilter.userName}
                                className="form-control"
                                onChange={this.handleInputChange}
                              />
                            </div>
                            <div className="col-md-2 col-sm-4 form-group">
                              <input
                                id="cn"
                                name="contractName"
                                type="text"
                                placeholder="Contract Name"
                                value={
                                  this.state.accountsSearchFilter.contractName
                                }
                                className="form-control"
                                onChange={this.handleInputChange}
                              />
                            </div>
                            <div className="col-xl-2 col-md-2 col-sm-4 form-group">
                              <div className="form-group">
                                <input
                                  id="email"
                                  name="Email"
                                  type="email"
                                  value={this.state.accountsSearchFilter.Email}
                                  placeholder="Email"
                                  className="form-control"
                                  onChange={this.handleInputChange}
                                />{' '}
                              </div>
                            </div>
                            <div className="col-xl-2 col-md-3">
                              <button
                                className="btn btn-primary mr-3"
                                onClick={this.fetchAccounts}
                              >
                                <i class="fas fa-search" />
                              </button>
                              <button
                                className="btn btn-primary"
                                onClick={this.clearFilters}
                              >
                                Clear
                              </button>
                            </div>
                            <div className="col-xl-1 col-md-2" />
                          </div>
                        </form>
                      </div>
                    </div>
                    <AccountSearch
                      hasChoiceForRole={false}
                      searchClear={this.state.searchClear}
                      jobs={this.state.jobs}
                      countries={this.state.countries}
                      accountsSearchFilter={this.state.accountsSearchFilter}
                      handleInputChange={this.handleInputChange}
                      handleSelectChange={this.handleSelectChange}
                      fetchAccounts={this.fetchAccounts}
                      clearFilters={this.clearFilters}
                      showMore={this.showMore}
                      pageSize={this.state.pageSize}
                      currentPageNumber={this.state.pageIndex}
                    />
                    <div className={`${s.btnContainer} row`}>
                      <div className="col-xl-1 col-md-1 col-sm-2">
                        <RowAdder
                          showMore={this.showMore}
                          pageSize={this.state.pageSize}
                        />
                      </div>
                      <div className="offset-xl-9 col-xl-2 offset-md-8 col-lg-3 col-md-3 col-sm-12">
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
                    </div>

                    <AccountsTable
                      onSelect={this.onAct}
                      pageSize={this.state.pageSize}
                      pageCount={this.state.totalPageNum}
                      currentPageNumber={this.state.pageIndex}
                      records={this.state.currentAccounts}
                      columnLabels={ACCOUNTS_COLUMNS_LABELS_ARRAY}
                      recordItemNames={ACCOUNTS_RECORDE_ITEM_NAMES_ARRAY}
                      handlePageChange={this.handlePageChange}
                      onRecordClick={this.onAccountClick}
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

export default withStyles(s)(Publishers);
