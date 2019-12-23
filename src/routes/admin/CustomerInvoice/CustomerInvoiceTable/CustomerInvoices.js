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
import CustomerInvoiceTable from '../../../../components/Admin/CustomerInvoiceTable';
import history from '../../../../history';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CustomerInvoiceSideFilter from '../../../../components/Admin/CustomerInvoiceSideFilter';
import { OPCODES } from '../../../../constants/constantData';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import { SERVER } from '../../../../constants';
import s from './CustomerInvoices.css';

class CustomerInvoices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      firstRender: true,
      pageIndex: 0,
      pageSize: 10,
      totalPageNum: 20,
      currentCustomerInvoices: [],
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
    this.fetchCustomerInvoices = this.fetchCustomerInvoices.bind(this);
    this.fetchAllInfo = this.fetchAllInfo.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.addCustomerInvoice = this.addCustomerInvoice.bind(this);
    this.search = this.search.bind(this);
    this.onNumberChange = this.onNumberChange.bind(this);
  }
  componentDidMount() {
    this.fetchAllInfo();
    this.fetchCustomerInvoices();
  }
  addCustomerInvoice() {
    history.push('/admin/customerInvoice/add');
  }
  onCustomerInvoiceClick(id) {
    history.push(`/admin/customerInvoice/${id}`);
  }
  fetchCustomerInvoices() {
    const url = `${SERVER}/getAllCustomerInvoices`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      searchBy: { status: '' },
      //  this.state.customerOrderSearchFilter,
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
          currentCustomerInvoices: response.currentRecords,
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
    const url = `${SERVER}/getAuxInfoForAll`;
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
          isLoading: false,
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
    this.fetchCustomerInvoices();
  }
  search() {
    this.fetchCustomerInvoices();
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
  onNumberChange() {
    var x = parseInt(document.getElementById('numberSelect').value);
    this.setState(
      {
        pageSize: x,
      },
      () => {
        this.fetchCustomerInvoices();
      },
    );
  }
  render() {
    let content;
    if (this.state.isLoading) content = <Spinner />;
    else
      content = (
        <div>
          <div className="row">
            <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12 col-12">
              <div className="card">
                <h4 className="card-header">All Customer Orders</h4>
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

                    <CustomerInvoiceTable
                      pageCount={this.state.totalPageNum}
                      currentPageNumber={this.state.pageIndex}
                      records={this.state.currentCustomerInvoices}
                      handlePageChange={this.handlePageChange}
                      onRecordClick={this.onCustomerInvoiceClick}
                    />
                  </div>
                </div>
              </div>
            </div>

            <CustomerInvoiceSideFilter
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

export default withStyles(s)(CustomerInvoices);
