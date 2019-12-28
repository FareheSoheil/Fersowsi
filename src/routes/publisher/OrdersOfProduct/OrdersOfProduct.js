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
import s from './OrdersOfProduct.css';
import Spinner from '../../../components/Admin/Spinner';
import OrdersForProductTable from '../../../components/Publisher/OrdersForProductTable';
import RowAdder from '../../../components/moreTableRowSelector';
// import AccountSearch from '../../../components/Admin/Accounts/AccountSearch';
// import {
//   ACCOUNTS_COLUMNS_LABELS_ARRAY,
//   ACCOUNTS_RECORDE_ITEM_NAMES_ARRAY,
// } from '../../../constants/constantData';
import { SERVER } from '../../../constants';
// import { onAct } from './userSelectHelper';
class OrdersOfProduct extends React.Component {
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
        companyName: '',
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
    };
    this.onAct = this.onAct.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.fetchAccounts = this.fetchAccounts.bind(this);
    this.onAccountClick = this.onAccountClick.bind(this);
    this.showMore = this.showMore.bind(this);
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
      value = { value: parseInt(event.target.value) };
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
    history.push(`/publisher/orderDetails/${id}`);
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
                <h5 className="card-header">All ordersOfProduct</h5>
                <div className="card-body p-0">
                  <div className="container-fluid">
                    {/* <AccountSearch
                      hasChoiceForRole={true}
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
                    /> */}
                    <div className={`${s.btnContainer} row mt-2`}>
                      <div className="col-xl-1 col-md-1 col-sm-2">
                        <RowAdder
                          showMore={this.showMore}
                          pageSize={this.state.pageSize}
                        />
                      </div>
                    </div>

                    <OrdersForProductTable
                      pageSize={this.state.pageSize}
                      pageCount={this.state.totalPageNum}
                      currentPageNumber={this.state.pageIndex}
                      records={this.state.currentAccounts}
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

export default withStyles(s)(OrdersOfProduct);
