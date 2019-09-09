/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import history from '../../../history';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import { fetchURL, SERVER } from '../../../constants';
import s from './ClaimsTable.css';
import Spinner from '../../../components/Admin/Spinner';
import CustomTable from '../../../components/CustomTabel';
import ClaimSearch from '../../../components/Admin/ClaimSearch';
import {
  CLAIMS_COLUMNS_LABELS_ARRAY,
  CLAIMS_RECORDE_ITEM_NAMES_ARRAY,
} from '../../../constants/constantData';

class ClaimsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      firstRender: true,
      currentPageNumber: 1,
      totalPageNum: '',
      currentClaims: '',
      searchClear: true,
      claimsSearchFilter: {
        senderFN: '',
        senderLN: '',
        senderEmail: '',
        senderUN: '',
        recieverFN: '',
        recieverLN: '',
        recieverEmail: '',
        recieverUN: '',
        isFinished: '',
      },
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.fetchClaims = this.fetchClaims.bind(this);
    this.onClaimClick = this.onClaimClick.bind(this);
  }

  componentDidMount() {
    if (!this.state.firstRender)
      this.setState({
        claimsSearchFilter:
          localStorage.getItem('claimsSearchFilter') !== null
            ? JSON.parse(localStorage.getItem('claimsSearchFilter'))
            : this.state.claimsSearchFilter,
      });
    this.fetchClaims();
  }
  handleInputChange(event) {
    let state, value;
    if (event.target.type === 'radio') {
      state = 'isFinished';
    } else {
      state = event.target.name;
    }
    value = event.target.value;
    let claimsSearchFilter = { ...this.state.claimsSearchFilter };
    claimsSearchFilter[state] = value;
    this.setState({ claimsSearchFilter, searchClear: false });
    localStorage.setItem(
      'claimsSearchFilter',
      JSON.stringify(claimsSearchFilter),
    );
  }
  clearFilters() {
    localStorage.removeItem('claimsSearchFilter');
    this.setState({
      claimsSearchFilter: {
        senderFN: '',
        senderLN: '',
        senderEmail: '',
        senderUN: '',
        recieverFN: '',
        recieverLN: '',
        recieverEmail: '',
        recieverUN: '',
        isFinished: '',
      },
      searchClear: true,
    });
  }
  fetchClaims() {
    const url = fetchURL;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      searchBy: this.state.claimsSearchFilter,
      pageNumber: this.state.currentPageNumber,
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
          currentClaims: response.currentRecords,
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
  handlePageChange(pageNumber) {
    this.setState({ currentPageNumber: pageNumber.selected });
    this.fetchClaims();
  }
  onClaimClick(id, orderId) {
    // window.alert(orderId);?orderId=:oid orderId=${orderId}
    history.push(`/admin/claims/id=${id} & orderId=${orderId}`);
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
                <h4 className="card-header">Claims</h4>
                <div className="card-body p-0">
                  <div className="container-fluid">
                    <ClaimSearch
                      searchClear={this.state.searchClear}
                      claimsSearchFilter={this.state.claimsSearchFilter}
                      handleInputChange={this.handleInputChange}
                      fetchClaims={this.fetchClaims}
                      clearFilters={this.clearFilters}
                    />
                    <hr />
                    <CustomTable
                      pageCount={20}
                      currentPageNumber={this.state.currentPageNumber}
                      records={this.state.currentClaims}
                      columnLabels={CLAIMS_COLUMNS_LABELS_ARRAY}
                      recordItemNames={CLAIMS_RECORDE_ITEM_NAMES_ARRAY}
                      handlePageChange={this.handlePageChange}
                      onRecordClick={this.onClaimClick}
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

export default withStyles(s)(ClaimsTable);
