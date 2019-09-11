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
import history from '../../../history';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import { fetchURL } from '../../../constants';
import s from './AccountsTable.css';
import Spinner from '../../../components/Admin/Spinner';
import CustomTable from '../../../components/CustomTabel';
import AccountSearch from '../../../components/Admin/AccountSearch';
import {
  ACCOUNTS_COLUMNS_LABELS_ARRAY,
  ACCOUNTS_RECORDE_ITEM_NAMES_ARRAY,
} from '../../../constants/constantData';

class AccountsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      firstRender: true,
      pageIndex: 0,
      pageSize: 15,
      totalPageNum: '',
      currentAccounts: '',
      searchClear: true,
      jobs: '',
      countries: '',
      accountsSearchFilter: {
        firstName: '',
        lastName: '',
        contractName: '',
        Email: '',
        userName: '',
        country: '',
        role: '',
        subcategory: '',
        job: '',
        hasOpenClaim: '',
        accountStatus: '',
        numberType: '',
        numberValue: '',
      },
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.fetchAccounts = this.fetchAccounts.bind(this);
    this.onAccountClick = this.onAccountClick.bind(this);
    this.fetchAllInfo = this.fetchAllInfo.bind(this);
  }
  componentDidMount() {
    this.fetchAccounts();
  }
  handleInputChange(event) {
    let state, value;
    if (event.target.type === 'radio') {
      state = 'accountStatus';
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
    // localStorage.removeItem('accountsSearchFilter');
    this.setState({
      accountsSearchFilter: {
        firstName: '',
        lastName: '',
        Email: '',
        userName: '',
        country: '',
        role: '',
        job: '',
        hasOpenClaim: '',
        accountStatus: '',
        numberType: '',
        numberValue: '',
      },
      searchClear: true,
    });
  }
  fetchAccounts(pageIndex) {
    const url = fetchURL;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      searchBy: this.state.accountsSearchFilter,
      pageIndex: pageIndex,
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
      'http://localhost:3000/getUsers',
      options,
      response => {
        that.setState({
          pageIndex: pageIndex,
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
        });
      },
      error => {
        console.log(error);
      },
    );
  }
  handlePageChange(pageIndex) {
    this.setState({ pageIndex: pageIndex.selected });
    this.fetchAccounts();
  }
  handleSelectChange = (selectedOption, op) => {
    let accountsSearchFilter = { ...this.state.accountsSearchFilter };
    accountsSearchFilter[op] = selectedOption;
    this.setState({ accountsSearchFilter, searchClear: false });
  };
  onAccountClick(id) {
    history.push(`/admin/accounts/${id}`);
  }
  render() {
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
                    <AccountSearch
                      searchClear={this.state.searchClear}
                      jobs={this.state.jobs}
                      countries={this.state.countries}
                      accountsSearchFilter={this.state.accountsSearchFilter}
                      handleInputChange={this.handleInputChange}
                      handleSelectChange={this.handleSelectChange}
                      fetchAccounts={this.fetchAccounts}
                      clearFilters={this.clearFilters}
                      currentPageNumber={this.state.pageIndex}
                    />
                    <hr />
                    <CustomTable
                      pageCount={20}
                      pageIndex={this.state.pageIndex}
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

export default withStyles(s)(AccountsTable);
