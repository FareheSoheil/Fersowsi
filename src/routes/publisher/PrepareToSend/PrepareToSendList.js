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
import s from './PrepareToSendList.css';
import Spinner from '../../../components/Admin/Spinner';
import PrepareToSendTable from '../../../components/Publisher/PrepareToSendTable';
import RowAdder from '../../../components/moreTableRowSelector';
// import AccountSearch from '../../../components/Admin/Accounts/AccountSearch';
// import {
//   ACCOUNTS_COLUMNS_LABELS_ARRAY,
//   ACCOUNTS_RECORDE_ITEM_NAMES_ARRAY,
// } from '../../../constants/constantData';
import { SERVER } from '../../../constants';
// import { onAct } from './userSelectHelper';
class PrepareToSendList extends React.Component {
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
      searchBy: {
        orderNo: '',
        publication: '',
        subscriber: '',
        publisherOrderNo: '',
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
    state = event.target.name;
    value = event.target.value;

    let searchBy = { ...this.state.searchBy };
    searchBy[state] = value;
    this.setState({ searchBy, searchClear: false });
  }
  clearFilters() {
    this.setState(
      {
        searchBy: {
          orderNo: '',
          publication: '',
          subscriber: '',
          publisherOrderNo: '',
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
    let searchBy = { ...this.state.searchBy };
    searchBy[op] = selectedOption;
    this.setState({ searchBy, searchClear: false });
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
                <h5 className="card-header">All PrepareToSendList</h5>
                <div className="card-body p-0">
                  <div className="container-fluid">
                    {/* <AccountSearch
                      hasChoiceForRole={true}
                      searchClear={this.state.searchClear}
                      jobs={this.state.jobs}
                      countries={this.state.countries}
                      searchBy={this.state.searchBy}
                      handleInputChange={this.handleInputChange}
                      handleSelectChange={this.handleSelectChange}
                      fetchAccounts={this.fetchAccounts}
                      clearFilters={this.clearFilters}
                      showMore={this.showMore}
                      pageSize={this.state.pageSize}
                      currentPageNumber={this.state.pageIndex}
                    /> */}
                    <div className="row mt-2 mb-1">
                      <div className="col-xl-3">Order No.</div>
                      <div className="col-xl-3">
                        <input
                          name="orderNo"
                          onChange={this.handleInputChange}
                          value={this.state.searchBy.orderNo}
                        />
                      </div>
                    </div>
                    <div className="row mt-2 mb-1">
                      <div className="col-xl-3">Publication</div>
                      <div className="col-xl-3">
                        <input
                          name="publication"
                          onChange={this.handleInputChange}
                          value={this.state.searchBy.publication}
                        />
                      </div>
                    </div>
                    <div className="row mt-2 mb-1">
                      <div className="col-xl-3">Subscriber</div>
                      <div className="col-xl-3">
                        <input
                          name="subscriber"
                          onChange={this.handleInputChange}
                          value={this.state.searchBy.subscriber}
                        />
                      </div>
                    </div>
                    <div className="row mt-2 mb-3">
                      <div className="col-xl-3">Publisher Order No.</div>
                      <div className="col-xl-3">
                        <input
                          name="publisherOrderNo"
                          onChange={this.handleInputChange}
                          value={this.state.searchBy.publisherOrderNo}
                          input
                        />
                      </div>
                    </div>
                    <div className="row mt-2 mb-1">
                      <div className="col-xl-1">
                        <button onClick={this.fetchAccounts}>Search</button>
                      </div>
                      <div className="col-xl-1">
                        <button onClick={this.clearFilters}>Clear</button>
                      </div>
                    </div>
                    <hr />
                    <div className={`${s.btnContainer} row mt-2`}>
                      <div className="col-xl-1 col-md-1 col-sm-2">
                        <RowAdder
                          showMore={this.showMore}
                          pageSize={this.state.pageSize}
                        />
                      </div>
                    </div>

                    <PrepareToSendTable
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

export default withStyles(s)(PrepareToSendList);
