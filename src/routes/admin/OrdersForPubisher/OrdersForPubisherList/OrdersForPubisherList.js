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
import Select from 'react-select';
import history from '../../../../history';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import s from './OrdersForPubisherList.css';
import Spinner from '../../../../components/Admin/Spinner';
import OrderForPublisherTable from '../../../../components/Admin/OrderForPublisher/OrderForPublisherTable';
import RowAdder from '../../../../components/moreTableRowSelector';
import {
  ACCOUNTS_COLUMNS_LABELS_ARRAY,
  ACCOUNTS_RECORDE_ITEM_NAMES_ARRAY,
} from '../../../../constants/constantData';
import { SERVER } from '../../../../constants';
// import { onAct } from './userSelectHelper';
class OrdersForPubisherList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasChoiceForRole: true,
      isLoading: false,
      firstRender: true,
      pageIndex: 0,
      pageSize: 10,
      totalPageNum: '',
      currentOrders: [
        { publisher: 'aaaaaaaaaaaa', numberOfReady: 12 },
        { publisher: 'aaaaaaaaaaaa', numberOfReady: 12 },
        { publisher: 'sssss', numberOfReady: 152 },
        { publisher: 'fffff', numberOfReady: 122 },
      ],
      searchClear: true,
      ordersSearchFilter: {
        publisherName: '',
        state: '',
        city: '',
        country: '',
      },
    };
    // this.onAct = this.onAct.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.fetchOrders = this.fetchOrders.bind(this);
    this.onAccountClick = this.onAccountClick.bind(this);
    this.showMore = this.showMore.bind(this);
  }
  // onAct(e, id) {
  //   e.stopPropagation();
  //   onAct(this, id);
  // }
  componentDidMount() {
    // this.fetchOrders();
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

    let accountsSearchFilter = { ...this.state.ordersSearchFilter };
    accountsSearchFilter[state] = value;
    this.setState({ accountsSearchFilter, searchClear: false });
  }
  clearFilters() {
    this.setState(
      {
        ordersSearchFilter: {
          publisherName: '',
          state: '',
          city: '',
          country: '',
        },
        searchClear: true,
      },
      () => {
        this.fetchOrders();
      },
    );
  }
  fetchOrders() {
    const url = `${SERVER}/getAllUsers`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      searchBy: this.state.ordersSearchFilter,
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
            currentOrders: response.currentRecords,
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
      this.fetchOrders();
    });
  }
  handleSelectChange = (selectedOption, op) => {
    let accountsSearchFilter = { ...this.state.ordersSearchFilter };
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
        this.fetchOrders();
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
                <h5 className="card-header">Sent Publishers Orders</h5>
                <div className="card-body p-0">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <form className={s.searchContainer}>
                          <div className="row mt-2">
                            <div className="col-md-2 col-sm-4 form-group">
                              <input
                                id="fn"
                                name="name"
                                type="text"
                                className="form-control"
                                placeholder="Publisher Name"
                                value={this.state.ordersSearchFilter.firstName}
                                // className="form-control"
                                onChange={this.handleInputChange}
                              />
                            </div>
                            <div className="col-md-2 col-sm-4 form-group">
                              <Select
                                value={this.state.ordersSearchFilter.country}
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

                            <div className="col-md-2 col-sm-4 form-group">
                              <input
                                id="un"
                                name="state"
                                type="text"
                                placeholder="State"
                                value={this.state.ordersSearchFilter.userName}
                                className="form-control"
                                onChange={this.handleInputChange}
                              />
                            </div>
                            <div className="col-md-2 col-sm-4 form-group">
                              <input
                                id="cn"
                                name="city"
                                type="text"
                                placeholder="City"
                                value={
                                  this.state.ordersSearchFilter.contractName
                                }
                                className="form-control"
                                onChange={this.handleInputChange}
                              />
                            </div>
                            <div className="col-xl-2 col-md-3">
                              <button
                                className="btn btn-primary"
                                onClick={this.fetchOrders}
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

                    <div className={`${s.btnContainer} row mt-1`}>
                      <div className="col-xl-1 col-md-1 col-sm-2">
                        <RowAdder
                          showMore={this.showMore}
                          pageSize={this.state.pageSize}
                        />
                      </div>
                    </div>

                    <OrderForPublisherTable
                      // onSelect={this.onAct}
                      pageSize={this.state.pageSize}
                      pageCount={this.state.totalPageNum}
                      currentPageNumber={this.state.pageIndex}
                      records={this.state.currentOrders}
                      handlePageChange={this.handlePageChange}
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

export default withStyles(s)(OrdersForPubisherList);
