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
import normalizeCss from 'normalize.css';
import s from './ClaimSearch.css';
import { CLAIM_STATUS } from '../../../constants/constantData';
class ClaimSearch extends React.Component {
  static propTypes = {
    searchClear: PropTypes.bool.isRequired,
    claimsSearchFilter: {
      senderFN: PropTypes.string.isRequired,
      senderLN: PropTypes.string.isRequired,
      senderEmail: PropTypes.string.isRequired,
      senderUN: PropTypes.string.isRequired,
      recieverFN: PropTypes.string.isRequired,
      recieverLN: PropTypes.string.isRequired,
      recieverEmail: PropTypes.string.isRequired,
      recieverUN: PropTypes.string.isRequired,
      isFinished: PropTypes.string.isRequired,
    },
    handleInputChange: PropTypes.func.isRequired,
    fetchClaims: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
  };

  render() {
    return (
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
            class={this.props.searchClear ? 'collapse' : 'collapse show'}
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
                      value={CLAIM_STATUS.ISFINISHED}
                      onChange={this.props.handleInputChange}
                      checked={
                        this.props.claimsSearchFilter.isFinished === true ||
                        this.props.claimsSearchFilter.isFinished === 'true'
                      }
                    />
                    <span class="custom-control-label">Closed Claims</span>
                  </label>
                  <label class="custom-color-theme custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      name="openClaim"
                      class="custom-control-input"
                      value={CLAIM_STATUS.OPEN}
                      checked={
                        this.props.claimsSearchFilter.isFinished === false ||
                        this.props.claimsSearchFilter.isFinished === 'false'
                      }
                      onChange={this.props.handleInputChange}
                    />
                    <span class="custom-control-label">Open Claims</span>
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
                          value={this.props.claimsSearchFilter.senderFN}
                          class="form-control"
                          onChange={this.props.handleInputChange}
                        />
                      </div>
                      <div class="col-md-2 col-sm-4 form-group">
                        <input
                          id="sln"
                          name="senderLN"
                          type="text"
                          placeholder="Last Name"
                          value={this.props.claimsSearchFilter.senderLN}
                          class="form-control"
                          onChange={this.props.handleInputChange}
                        />
                      </div>
                      <div className="col-md-3 col-sm-4 form-group">
                        <div class="form-group">
                          <input
                            id="semail"
                            name="senderEmail"
                            type="email"
                            placeholder="Email"
                            value={this.props.claimsSearchFilter.senderEmail}
                            class="form-control"
                            onChange={this.props.handleInputChange}
                          />{' '}
                        </div>
                      </div>
                      <div class="col-md-2 col-sm-4 form-group">
                        <input
                          id="sun"
                          name="senderUN"
                          type="text"
                          placeholder="User Name"
                          value={this.props.claimsSearchFilter.senderUN}
                          class="form-control"
                          onChange={this.props.handleInputChange}
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
                          value={this.props.claimsSearchFilter.recieverFN}
                          class="form-control"
                          onChange={this.props.handleInputChange}
                        />
                      </div>
                      <div class="col-md-2 col-sm-4 form-group">
                        <input
                          id="rln"
                          name="recieverLN"
                          type="text"
                          placeholder="Last Name"
                          value={this.props.claimsSearchFilter.recieverLN}
                          class="form-control"
                          onChange={this.props.handleInputChange}
                        />
                      </div>
                      <div className="col-md-3 col-sm-4 form-group">
                        <div class="form-group">
                          <input
                            id="remail"
                            name="recieverEmail"
                            type="email"
                            value={this.props.claimsSearchFilter.recieverEmail}
                            placeholder="Email"
                            class="form-control"
                            onChange={this.props.handleInputChange}
                          />{' '}
                        </div>
                      </div>
                      <div class="col-md-2 col-sm-4 form-group">
                        <input
                          id="run"
                          name="recieverUN"
                          type="text"
                          placeholder="User Name"
                          value={this.props.claimsSearchFilter.recieverUN}
                          class="form-control"
                          onChange={this.props.handleInputChange}
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
                    onClick={this.props.fetchClaims}
                    class="btn btn-outline-success"
                  >
                    Search
                  </a>
                </div>
                <div className="col-xl-1 col-lg-1 col-md-4 col-sm-4">
                  <a
                    onClick={this.props.clearFilters}
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
    );
  }
}

export default withStyles(normalizeCss, s)(ClaimSearch);
