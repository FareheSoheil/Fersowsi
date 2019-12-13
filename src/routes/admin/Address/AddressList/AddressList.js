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

import AddressTable from '../../../../components/Admin/Address/AddressTable';
import history from '../../../../history';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import { SERVER } from '../../../../constants';
import s from './AddressList.css';

class AddressList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      firstRender: true,
      pageIndex: 0,
      pageSize: 10,
      totalPageNum: 20,
      currentAddresses: [],
      searchClear: true,
    };
    this.fetchAddresses = this.fetchAddresses.bind(this);
    this.onNumberChange = this.onNumberChange.bind(this);
  }
  componentDidMount() {
    this.fetchAddresses();
  }

  fetchAddresses() {
    const url = `${SERVER}/getAllAddressesOfSpecificUser`;
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
          currentAddresses: response.currentRecords,
          totalPageNum: response.totalPageNum,
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
    this.fetchAddresses();
  }

  onNumberChange() {
    var x = parseInt(document.getElementById('numberSelect').value);
    this.setState(
      {
        pageSize: x,
      },
      () => {
        this.fetchAddresses();
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
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="card">
                <h4 className="card-header">All Addresses</h4>
                <div className="card-body p-0">
                  <div className="container-fluid">
                    {/* <br />
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
                    <br /> */}
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

                    <AddressTable
                      pageCount={this.state.totalPageNum}
                      currentPageNumber={this.state.pageIndex}
                      records={this.state.currentAddresses}
                      handlePageChange={this.handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    return <div className="container-fluid dashboard-content">{content}</div>;
  }
}

export default withStyles(s)(AddressList);
