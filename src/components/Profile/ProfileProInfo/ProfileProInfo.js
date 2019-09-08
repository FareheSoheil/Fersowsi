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
import Select from 'react-select';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import 'react-datepicker/dist/react-datepicker.css';
import history from '../../../history';
import {
  USER_ACTIVITION_STATUS_ARRAY,
  USER_SUBCATEGORY_ARRAY,
  ROLES_ARRAY,
  CLAIMS_COLUMNS_LABELS_ARRAY,
  CLAIMS_RECORDE_ITEM_NAMES_ARRAY,
} from '../../../constants/constantData';
import CustomTable from '../../CustomTabel';
import s from './ProfileProInfo.css';

class ProfileProInfo extends React.Component {
  static propTypes = {
    user: {
      role: {
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
      },
      country: {
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
      },
      currency: {
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
      },
      subCategory: {
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
      },
      activitionStatus: {
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
      },
      siteLanguage: {
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
      },
      job: {
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
      },
    },
    claims: PropTypes.arrayOf(PropTypes.object).isRequired,
    countries: PropTypes.arrayOf(PropTypes.object).isRequired,
    jobs: PropTypes.arrayOf(PropTypes.object).isRequired,
    siteLanguages: PropTypes.arrayOf(PropTypes.object).isRequired,
    currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleSelectInputChange: PropTypes.func.isRequired,
    handleSimpleInputChange: PropTypes.func.isRequired,
  };
  onClaimClick(id) {
    history.push(`/admin/claims/${id}`);
  }
  componentDidMount() {}
  render() {
    console.log('props : ', this.props);
    return (
      <div class="col-xl-7 col-lg-8 col-md-6 col-sm-12 col-12">
        <div class="influence-profile-content pills-regular">
          <ul
            class="nav nav-pills mb-3 nav-justified"
            id="pills-tab"
            role="tablist"
          >
            <li class="nav-item">
              <a
                class="nav-link active "
                id="pills-info-tab"
                data-toggle="pill"
                href="#pills-info"
                role="tab"
                aria-controls="pills-info"
                aria-selected="false"
              >
                Additional Information
              </a>
            </li>
            <li class="nav-item ">
              <a
                class="nav-link "
                id="pills-claims-tab"
                data-toggle="pill"
                href="#pills-claims"
                role="tab"
                aria-controls="pills-claims"
                aria-selected="false"
              >
                Claims
              </a>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade "
              id="pills-claims"
              role="tabpanel"
              aria-labelledby="pills-claims-tab"
            >
              <div class="card">
                <h5 class="card-header">Claims Of This User</h5>
                <div class="card-body">
                  <CustomTable
                    pageCount={20}
                    currentPageNumber={2}
                    records={this.props.claims}
                    columnLabels={CLAIMS_COLUMNS_LABELS_ARRAY}
                    recordItemNames={CLAIMS_RECORDE_ITEM_NAMES_ARRAY}
                    // handlePageChange={this.handlePageChange}
                    onRecordClick={this.onClaimClick}
                  />
                </div>
              </div>
            </div>
            <div
              class="tab-pane show fade active"
              id="pills-info"
              role="tabpanel"
              aria-labelledby="pills-info-tab"
            >
              <div class="card">
                <h5 class="card-header">Additional Information</h5>
                <div class="card-body">
                  <form>
                    <div class="row">
                      <div
                        class={`${
                          s.additionalInfoContainer
                        } offset-xl-3 col-xl-6 offset-lg-3 col-lg-3 col-md-12 col-sm-12 col-12 p-4`}
                      >
                        <div class="form-group">
                          <label for="name">User Country</label>
                          <Select
                            onChange={so =>
                              this.props.handleSelectInputChange(so, 'country')
                            }
                            options={this.props.countries}
                            isSearchable
                            value={this.props.user.country}
                          />
                        </div>
                        <div class="form-group">
                          <label for="email">User Job</label>
                          <Select
                            onChange={so =>
                              this.props.handleSelectInputChange(so, 'job')
                            }
                            options={this.props.jobs}
                            isSearchable
                            value={this.props.user.job}
                          />
                        </div>
                        <div class="form-group">
                          <label for="email">User Currency</label>
                          <Select
                            options={this.props.currencies}
                            onChange={so =>
                              this.props.handleSelectInputChange(so, 'currency')
                            }
                            isSearchable
                            value={this.props.user.currency}
                          />
                        </div>
                        <div class="form-group">
                          <label for="email">User Site Language</label>
                          <Select
                            onChange={so =>
                              this.props.handleSelectInputChange(
                                so,
                                'siteLanguage',
                              )
                            }
                            options={this.props.siteLanguages}
                            isSearchable
                            value={this.props.user.siteLanguage}
                          />
                        </div>
                        <div class="form-group">
                          <label for="email">User Activition Status</label>
                          <Select
                            options={USER_ACTIVITION_STATUS_ARRAY}
                            isSearchable
                            onChange={so =>
                              this.props.handleSelectInputChange(
                                so,
                                'activitionStatus',
                              )
                            }
                            value={this.props.user.activitionStatus}
                          />
                        </div>

                        <div class="form-group">
                          <label for="email">User Role</label>
                          <Select
                            options={ROLES_ARRAY}
                            isSearchable
                            value={this.props.user.role}
                            onChange={so =>
                              this.props.handleSelectInputChange(so, 'role')
                            }
                          />
                        </div>
                        <div class="form-group">
                          <label for="email">User Subcategory</label>
                          <Select
                            options={USER_SUBCATEGORY_ARRAY}
                            isSearchable
                            value={this.props.user.subCategory}
                            onChange={so =>
                              this.props.handleSelectInputChange(
                                so,
                                'subCategory',
                              )
                            }
                          />
                        </div>

                        <div class="form-group">
                          <label for="messages">Biography</label>
                          <textarea
                            onChange={this.props.handleSimpleInputChange}
                            class="form-control"
                            name="bio"
                            rows="3"
                            value={this.props.user.bio}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProfileProInfo);
