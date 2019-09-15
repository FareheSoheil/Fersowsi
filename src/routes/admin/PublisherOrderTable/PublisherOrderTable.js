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
import PublisherOrderSideFilter from '../../../components/Admin/PublisherOrderSideFilter';
import {
  PUBLISHER_ORDERS_COLUMNS_LABELS_ARRAY,
  PUBLISHER_ORDERS_RECORDE_ITEM_NAMES_ARRAY,
  OPCODES,
} from '../../../constants/constantData';
import s from './PublisherOrderTable.css';

class PublisherOrderTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      firstRender: true,
      pageIndex: 1,
      pageSize: 9,
      totalPageNum: 20,
      currentPublisherOrders: [
        { id: 1, address: 1 },
        { a: 1 },
        { a: 1 },
        { a: 1 },
      ],
      searchClear: true,
      allPublishers: '',
      allProductContentTypes: '',
      allLanguages: '',
      allAgeGroups: '',

      publisherOrderSearchFilter: {
        productName: '',

        publishers: '',
        singlProductTypes: '',
        productTypes: '',
        productContentTypes: '',
        status: '',
        languages: '',
        ageGroups: '',
        periods: '',
        priceRange: { min: 5, max: 10 },
        countRange: { min: 30, max: 400 },
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
    this.clearFilters = this.clearFilters.bind(this);
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    // this.fetchAllInfo();
    // this.fetchPublisherOrders();
  }
  onCustomerOrderClick(id) {
    history.push(`/admin/publisherOrder/${id}`);
  }
  fetchPublisherOrders() {
    const url = `${SERVER}/getCustomerIds`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      searchBy: this.state.publisherOrderSearchFilter,
      pageNumber: this.state.pageIndex,
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
    const url = `${SERVER}/getAllInfo`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      // searchBy: this.state.publisherOrderSearchFilter,
      // pageNumber: this.state.currentPageNumber,
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
          allPublishers: response.publishers,
          allProductContentTypes: response.contentTypes,
          allLanguages: response.languages,
          allAgeGroups: response.ageGroups,
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
    this.setState({ pageIndex: pageIndex.selected });
    this.fetchPublisherOrders();
  }
  search() {
    this.fetchPublisherOrders();
  }
  clearFilters() {
    this.setState({
      publisherOrderSearchFilter: {
        publishers: '',
        singlProductTypes: '',
        productTypes: '',
        productContentTypes: '',
        status: '',
        languages: '',
        ageGroups: '',
        periods: '',
        priceRange: { min: 5, max: 10 },
        countRange: { min: 30, max: 400 },
        sortCount: false,
        sortPrice: false,
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
          {' '}
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="page-header">
                <h2 className="pageheader-title">Publisher Order List</h2>
                <hr />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12 col-12">
              <div className="card">
                <h4 className="card-header">Publisher Orders</h4>
                <div className="card-body p-0">
                  <div className="container-fluid">
                    <CustomTable
                      pageCount={20}
                      pageIndex={this.state.pageIndex}
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
              filters={this.state.publisherOrderSearchFilter}
              allPublishers={[
                { value: 1, label: 'aa1' },
                { value: 2, label: 'aa2' },
                { value: 3, label: 'aa3' },
                { value: 4, label: 'aa4' },
              ]}
              allProductContentTypes={this.state.allProductContentTypes}
              allLanguages={this.state.allLanguages}
              allAgeGroups={this.state.allAgeGroups}
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

export default withStyles(s)(PublisherOrderTable);
