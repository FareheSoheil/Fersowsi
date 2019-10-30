/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Spinner from '../../../components/Admin/Spinner';
import CustomTable from '../../../components/CustomTabel';
import history from '../../../history';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CustomerOrderSideFilter from '../../../components/Admin/CustomerOrderSideFilter';
import {
  CUSTOMER_ORDERS_COLUMNS_LABELS_ARRAY,
  CUSTOMER_ORDERS_RECORDE_ITEM_NAMES_ARRAY,
  OPCODES,
} from '../../../constants/constantData';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import { SSRSERVER, SERVER } from '../../../constants';
import s from './CustomerOrderTable.css';

class CustomerOrderTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      firstRender: true,
      pageIndex: 0,
      pageSize: 9,
      totalPageNum: 20,
      currentCustomerOrders: [],
      searchClear: true,
      allCurrencies: '',
      allDeliveryAddresses: '',
      customerOrderSearchFilter: {
        vatNo: '',
        totalPrice: { min: 2, max: 100 },
        totalTaxCost: { min: 2, max: 100 },
        totalCost: { min: 2, max: 100 },
        totalDeliveryCost: { min: 2, max: 100 },
        status: '',
        userOrderNo: '',
        currency: '',
        deliveryAddress: '',

        sortCount: false,
        sortTotlaPrice: false,
        sortDate: false,
      },
    };
    this.fetchCustomerOrders = this.fetchCustomerOrders.bind(this);
    this.fetchAllInfo = this.fetchAllInfo.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.addCustomerOrder = this.addCustomerOrder.bind(this);
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    this.fetchAllInfo();
    this.fetchCustomerOrders();
  }
  addCustomerOrder() {
    history.push('/admin/customerOrder/add');
  }
  onCustomerOrderClick(id) {
    history.push(`/admin/customerOrder/${id}`);
  }
  fetchCustomerOrders() {
    const url = `${SERVER}/getAllCustomerOrders`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      searchBy: this.state.customerOrderSearchFilter,
      pageSize: this.state.pageSize,
      pageIndex: this.state.pageIndex,
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
          currentCustomerOrders: response.currentRecords,
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
    const url = `${SERVER}/getAllAuxInfoForAllCustomerOrders`;
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
          allCurrencies: response.Currency,
          allDeliveryAddresses: response.Address,
          firstRender: false,
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

    let customerOrderSearchFilter = { ...this.state.customerOrderSearchFilter };
    customerOrderSearchFilter[stateName] = value;
    this.setState({ customerOrderSearchFilter, searchClear: false });
  }
  handleSelectChange = (selectedOption, op) => {
    let customerOrderSearchFilter = { ...this.state.customerOrderSearchFilter };
    customerOrderSearchFilter[op] = selectedOption;
    this.setState({ customerOrderSearchFilter, searchClear: false });
  };
  handlePageChange(pageIndex) {
    this.setState({ pageIndex: pageIndex.selected });
    this.fetchCustomerOrders();
  }
  search() {
    this.fetchCustomerOrders();
  }
  clearFilters() {
    this.setState({
      customerOrderSearchFilter: {
        vatNo: '',
        totalPrice: { min: 2, max: 100 },
        totalTaxCost: { min: 2, max: 100 },
        totalCost: { min: 2, max: 100 },
        totalDeliveryCost: { min: 2, max: 100 },
        status: '',
        userOrderNo: '',
        currency: '',
        deliveryAddress: '',

        sortCount: false,
        sortTotlaPrice: false,
        sortDate: false,
      },
      searchClear: true,
    });
  }
  render() {
    let content;
    if (this.state.isLoading) content = <Spinner />;
    else
      content = (
        <div>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="page-header">
                <h2 className="pageheader-title">Customer Order List</h2>
                <hr />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12 col-12">
              <div className="card">
                <h4 className="card-header">All Customer Orders</h4>
                <div className="card-body p-0">
                  <div className="container-fluid">
                    <br />
                    <div className="row">
                      <div className="col-xl-12">
                        <button
                          onClick={this.addCustomerOrder}
                          className="btn btn-primary"
                        >
                          Add Customer Order
                        </button>
                      </div>
                    </div>
                    <br />
                    <CustomTable
                      pageCount={this.state.totalPageNum}
                      currentPageNumber={this.state.pageIndex}
                      records={this.state.currentCustomerOrders}
                      columnLabels={CUSTOMER_ORDERS_COLUMNS_LABELS_ARRAY}
                      recordItemNames={CUSTOMER_ORDERS_RECORDE_ITEM_NAMES_ARRAY}
                      handlePageChange={this.handlePageChange}
                      onRecordClick={this.onCustomerOrderClick}
                    />
                  </div>
                </div>
              </div>
            </div>

            <CustomerOrderSideFilter
              hasChoiceForStatus={true}
              filters={this.state.customerOrderSearchFilter}
              allCurrencies={this.state.allCurrencies}
              allDeliveryAddresses={this.state.allDeliveryAddresses}
              handleSelectChange={this.handleSelectChange}
              handleInputChange={this.handleInputChange}
              handleClearSearch={this.clearFilters}
              handleSearch={this.search}
            />
          </div>
        </div>
      );
    return <div className="container-fluid dashboard-content">{content}</div>;
  }
}

export default withStyles(s)(CustomerOrderTable);
