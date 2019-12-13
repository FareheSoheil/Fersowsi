/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Spinner from '../../../../components/Admin/Spinner';
import PublisherOrderTable from '../../../../components/Admin/PublisherOrder/PublisherOrderTable';
import history from '../../../../history';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PublisherOrderSideFilter from '../../../../components/Admin/PublisherOrder/PublisherOrderSideFilter';
import {
  PUBLISHER_ORDERS_COLUMNS_LABELS_ARRAY,
  PUBLISHER_ORDERS_RECORDE_ITEM_NAMES_ARRAY,
  PUBLISHER_ORDER_STATUS,
  OPCODES,
} from '../../../../constants/constantData';
import { SSRSERVER, SERVER } from '../../../../constants';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import s from './Accepted.css';

class Accepted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pageIndex: 0,
      pageSize: 10,
      totalPageNum: 20,
      currentPublisherOrders: [],
      searchClear: true,
      allProducts: '',
      allSubscriptions: '',
      allDeliverTypes: '',
      allPeriods: '',

      publisherOrderSearchFilter: {
        count: '',
        startDate: '',
        endDate: '',
        deliveryType: '',
        status: PUBLISHER_ORDER_STATUS.Accepted,
        paymentStatus: '',
        productPeriod: '',
        productionSubscription: '',
        currency: '',
        totalCost: { min: 1, max: 100 },
        deliveryCost: { min: 1, max: 100 },
        customerPrice: { min: 1, max: 100 },
        cancelPrice: { min: 1, max: 100 },
        publisherPrice: { min: 1, max: 100 },
        product: '',
        sortCount: false,
        sortPrice: false,
        sortDate: false,
      },
    };
    this.fetchPublisherOrders = this.fetchPublisherOrders.bind(this);
    this.fetchAllInfo = this.fetchAllInfo.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.onNumberChange = this.onNumberChange.bind(this);
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    this.fetchAllInfo();
    this.fetchPublisherOrders();
  }
  onCustomerOrderClick(id) {
    history.push(`/admin/publisherOrder/${id}`);
  }

  onNumberChange() {
    var x = parseInt(document.getElementById('numberSelect').value);
    this.setState(
      {
        pageSize: x,
      },
      () => {
        this.fetchPublisherOrders();
      },
    );
  }
  fetchPublisherOrders() {
    const url = `${SERVER}/getAllPublisherOrders`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      searchBy: this.state.publisherOrderSearchFilter,
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
        that.setState({
          currentPublisherOrders: response.currentRecords,
          totalPageNum: response.totalPageNum,
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
    const url = `${SERVER}/getAllAuxInfoForPublisherOrders`;
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
          allProducts: response.Products,
          allSubscriptions: response.ProductSubscriptionType,
          allDeliverTypes: response.DeliveryType,
          allPeriods: response.ProductPeriod,
        });
      },
      error => {
        console.log(error);
      },
    );
  }
  handleInputChange(opcode, stateName, event) {
    let value;
    if (opcode === OPCODES.checkbox) value = event.target.checked;
    else if (opcode === OPCODES.simple) value = event.target.value;
    else value = event;

    let publisherOrderSearchFilter = {
      ...this.state.publisherOrderSearchFilter,
    };
    publisherOrderSearchFilter[stateName] = value;
    this.setState({ publisherOrderSearchFilter, searchClear: false });
  }
  handleSelectChange = (selectedOption, op) => {
    let publisherOrderSearchFilter = {
      ...this.state.publisherOrderSearchFilter,
    };
    publisherOrderSearchFilter[op] = selectedOption;
    this.setState({ publisherOrderSearchFilter, searchClear: false });
  };
  handlePageChange(pageIndex) {
    this.setState({ pageIndex: pageIndex.selected }, () => {
      this.fetchPublisherOrders();
    });
  }

  handleDateChange(date, op) {
    // window.alert(JSON.stringify(date));
    let publisherOrderSearchFilter = {
      ...this.state.publisherOrderSearchFilter,
    };
    publisherOrderSearchFilter[op] = date;
    this.setState({ publisherOrderSearchFilter, searchClear: false });
  }
  search() {
    console.log('search : ', this.state.publisherOrderSearchFilter);
    this.fetchPublisherOrders();
  }
  clearFilters() {
    this.setState(
      {
        publisherOrderSearchFilter: {
          publishers: '',
          singlProductTypes: '',
          productTypes: '',
          productContentTypes: '',
          status: PUBLISHER_ORDER_STATUS.Accepted,
          languages: '',
          ageGroups: '',
          periods: '',
          priceRange: { min: 5, max: 100 },
          countRange: { min: 1, max: 400 },
          sortCount: false,
          sortPrice: false,
          sortDate: false,
        },
        searchClear: true,
      },
      () => {
        this.fetchPublisherOrders();
      },
    );
  }
  render() {
    let content;
    if (this.state.isLoading) content = <Spinner />;
    else
      content = (
        <div>
          {' '}
          <div className="row">
            <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12 col-12">
              <div className="card">
                <h4 className="card-header">Accepted Publisher Orders</h4>
                <div className="card-body p-0">
                  <div className="container-fluid">
                    <div className="row mt-2 pl-3">
                      table size :
                      <div className="col-xl-1">
                        {' '}
                        <div className="form-group ">
                          {/* <Select options={options} /> */}
                          <select
                            id="numberSelect"
                            onChange={this.onNumberChange}
                          >
                            <option
                              value={10}
                              selected={this.state.pageSize == 10}
                            >
                              10
                            </option>
                            <option
                              selected={this.state.pageSize == 20}
                              value={20}
                            >
                              20
                            </option>
                            <option
                              value={50}
                              selected={this.state.pageSize == 50}
                            >
                              50
                            </option>
                            <option
                              value={100}
                              selected={this.state.pageSize == 100}
                            >
                              100
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <PublisherOrderTable
                      pageCount={this.state.totalPageNum}
                      currentPageNumber={this.state.pageIndex}
                      records={this.state.currentPublisherOrders}
                      columnLabels={PUBLISHER_ORDERS_COLUMNS_LABELS_ARRAY}
                      recordItemNames={
                        PUBLISHER_ORDERS_RECORDE_ITEM_NAMES_ARRAY
                      }
                      handlePageChange={this.handlePageChange}
                      onRecordClick={this.onCustomerOrderClick}
                    />
                  </div>
                </div>
              </div>
            </div>

            <PublisherOrderSideFilter
              hasChoiceForStatus={false}
              filters={this.state.publisherOrderSearchFilter}
              allProducts={this.state.allProducts}
              allSubscriptions={this.state.allSubscriptions}
              allDeliverTypes={this.state.allDeliverTypes}
              allPeriods={this.state.allPeriods}
              handleSelectChange={this.handleSelectChange}
              handleInputChange={this.handleInputChange}
              onDateInput={this.handleDateChange}
              handleClearSearch={this.clearFilters}
              handleSearch={this.search}
            />
          </div>
        </div>
      );
    return <div className="container-fluid dashboard-content">{content}</div>;
  }
}

export default withStyles(s)(Accepted);
