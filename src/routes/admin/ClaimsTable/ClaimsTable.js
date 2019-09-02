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
import { ClaimStats } from '../../../constants';

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
        claimStatus: '',
      },
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
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
  onChangeInput(event) {
    let state;
    event.target.type === 'radio'
      ? (state = 'claimStatus')
      : (state = event.target.name);

    let claimsSearchFilter = { ...this.state.claimsSearchFilter };
    claimsSearchFilter[state] = event.target.value;
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
        claimStatus: '',
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
  onClaimClick(id) {
    // window.alert(`/admin/claim?${id}`);
    history.push(`/admin/claims/${id}`);
  }
  render() {
    const columnLabels = [
      'Id',
      'Sender',
      'Receiver',
      'MSG Status',
      'Replied to',
      'Status',
    ];
    const recordItemNames = [
      'id',
      'senderUserName',
      'receiverUserName',
      'msgStatus',
      'repliedMsgId',
      'status',
    ];
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
                    <div className="row advancedSearchContainer">
                      <div className="col-12">
                        <div>
                          <button
                            class="btn btn-primary"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseExample"
                            aria-expanded="false"
                            aria-controls="collapseExample"
                          >
                            Advanced Search
                          </button>
                        </div>
                        <div
                          class={
                            this.state.searchClear
                              ? 'collapse'
                              : 'collapse show'
                          }
                          id="collapseExample"
                        >
                          <div class="card card-body">
                            {/* Claim Status */}
                            <div className="row">
                              <div className="col-xl-12 col-lg-8 col-md-8 col-sm-8 col-12">
                                <span className="advancedSearchLabel">
                                  Claim Status : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                                <br />
                                <br />
                                <label class="custom-color-theme custom-control custom-radio custom-control-inline">
                                  <input
                                    type="radio"
                                    name="closedClaim"
                                    class="custom-control-input"
                                    value={ClaimStats.closed}
                                    onChange={this.onChangeInput}
                                    checked={
                                      this.state.claimsSearchFilter
                                        .claimStatus === ClaimStats.closed
                                    }
                                  />
                                  <span class="custom-control-label">
                                    Closed Claims
                                  </span>
                                </label>
                                <label class="custom-color-theme custom-control custom-radio custom-control-inline">
                                  <input
                                    type="radio"
                                    name="openClaim"
                                    class="custom-control-input"
                                    value={ClaimStats.open}
                                    checked={
                                      this.state.claimsSearchFilter
                                        .claimStatus === ClaimStats.open
                                    }
                                    onChange={this.onChangeInput}
                                  />
                                  <span class="custom-control-label">
                                    Open Claims
                                  </span>
                                </label>
                                <label class="custom-color-theme custom-control custom-radio custom-control-inline">
                                  <input
                                    type="radio"
                                    name="allClaims"
                                    class="custom-control-input"
                                    value={ClaimStats.all}
                                    checked={
                                      this.state.claimsSearchFilter
                                        .claimStatus === ClaimStats.all
                                    }
                                    onChange={this.onChangeInput}
                                  />
                                  <span class="custom-control-label">All</span>
                                </label>
                              </div>
                            </div>
                            <br />
                            {/* Sender INFO */}
                            <div className="row">
                              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6 advancedSearchLabel">
                                Sender Information :
                              </div>
                            </div>
                            <br />
                            <div className="row">
                              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <form>
                                  <div className="row">
                                    <div class="col-md-2 col-sm-4 form-group">
                                      <input
                                        id="sfn"
                                        name="senderFN"
                                        type="text"
                                        placeholder="First Name"
                                        value={
                                          this.state.claimsSearchFilter.senderFN
                                        }
                                        class="form-control"
                                        onChange={this.onChangeInput}
                                      />
                                    </div>
                                    <div class="col-md-2 col-sm-4 form-group">
                                      <input
                                        id="sln"
                                        name="senderLN"
                                        type="text"
                                        placeholder="Last Name"
                                        value={
                                          this.state.claimsSearchFilter.senderLN
                                        }
                                        class="form-control"
                                        onChange={this.onChangeInput}
                                      />
                                    </div>
                                    <div className="col-md-3 col-sm-4 form-group">
                                      <div class="form-group">
                                        <input
                                          id="semail"
                                          name="senderEmail"
                                          type="email"
                                          placeholder="Email"
                                          value={
                                            this.state.claimsSearchFilter
                                              .senderEmail
                                          }
                                          class="form-control"
                                          onChange={this.onChangeInput}
                                        />{' '}
                                      </div>
                                    </div>
                                    <div class="col-md-2 col-sm-4 form-group">
                                      <input
                                        id="sun"
                                        name="senderUN"
                                        type="text"
                                        placeholder="User Name"
                                        value={
                                          this.state.claimsSearchFilter.senderUN
                                        }
                                        class="form-control"
                                        onChange={this.onChangeInput}
                                      />
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>

                            {/* Reciever INFO */}
                            <div className="row">
                              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6 advancedSearchLabel">
                                Reciever Information :
                              </div>
                            </div>
                            <br />
                            <div className="row">
                              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <form>
                                  <div className="row">
                                    <div class="col-md-2 col-sm-4 form-group">
                                      <input
                                        id="rfn"
                                        name="recieverFN"
                                        type="text"
                                        placeholder="First Name"
                                        value={
                                          this.state.claimsSearchFilter
                                            .recieverFN
                                        }
                                        class="form-control"
                                        onChange={this.onChangeInput}
                                      />
                                    </div>
                                    <div class="col-md-2 col-sm-4 form-group">
                                      <input
                                        id="rln"
                                        name="recieverLN"
                                        type="text"
                                        placeholder="Last Name"
                                        value={
                                          this.state.claimsSearchFilter
                                            .recieverLN
                                        }
                                        class="form-control"
                                        onChange={this.onChangeInput}
                                      />
                                    </div>
                                    <div className="col-md-3 col-sm-4 form-group">
                                      <div class="form-group">
                                        <input
                                          id="remail"
                                          name="recieverEmail"
                                          type="email"
                                          value={
                                            this.state.claimsSearchFilter
                                              .recieverEmail
                                          }
                                          placeholder="Email"
                                          class="form-control"
                                          onChange={this.onChangeInput}
                                        />{' '}
                                      </div>
                                    </div>
                                    <div class="col-md-2 col-sm-4 form-group">
                                      <input
                                        id="run"
                                        name="recieverUN"
                                        type="text"
                                        placeholder="User Name"
                                        value={
                                          this.state.claimsSearchFilter
                                            .recieverUN
                                        }
                                        class="form-control"
                                        onChange={this.onChangeInput}
                                      />
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-9 col-lg-9 col-md-1 col-sm-1" />
                              <div className="col-xl-1 col-lg-1 col-md-4 col-sm-4">
                                <a
                                  onClick={this.fetchClaims}
                                  class="btn btn-outline-success"
                                >
                                  Search
                                </a>
                              </div>
                              <div className="col-xl-1 col-lg-1 col-md-4 col-sm-4">
                                <a
                                  onClick={this.clearFilters}
                                  class="btn btn-outline-success"
                                >
                                  Clear
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr />
                    <CustomTable
                      pageCount={20}
                      currentPageNumber={this.state.currentPageNumber}
                      records={this.state.currentClaims}
                      columnLabels={columnLabels}
                      recordItemNames={recordItemNames}
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
