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
  CUSTOMER_ORDERS_COLUMNS_LABELS_ARRAY,
  CUSTOMER_ORDERS_RECORDE_ITEM_NAMES_ARRAY,
  PUBLISHER_ORDERS_COLUMNS_LABELS_ARRAY,
  PUBLISHER_ORDERS_RECORDE_ITEM_NAMES_ARRAY,
  ADDRESS_RECORD_ITEMS,
  ADDRESS_TABLE_LABELS,
  ROLES,
} from '../../../constants/constantData';
import CustomTable from '../../CustomTabel';
import s from './ProfileProInfo.css';

class ProfileProInfo extends React.Component {
  static propTypes = {
    pageCount: PropTypes.number.isRequired,
    user: {},

    countries: PropTypes.arrayOf(PropTypes.object).isRequired,
    jobs: PropTypes.arrayOf(PropTypes.object).isRequired,
    siteLanguages: PropTypes.arrayOf(PropTypes.object).isRequired,
    currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleSelectInputChange: PropTypes.func.isRequired,
    handleSimpleInputChange: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.onOrderClick = this.onOrderClick.bind(this);
    this.onClaimClick = this.onClaimClick.bind(this);
    this.onAddressClick = this.onAddressClick.bind(this);
  }
  onClaimClick(id, orderId) {
    history.push({
      pathname: `/admin/claims/claim`,
      search: `id=${id}&orderId=${orderId}`,
      state: { ab: 'ab' },
    });
  }
  onOrderClick(id) {
    let url;
    if (this.props.user.Role.value == ROLES.customer.value) {
      // url = ;window.alert('hie ');
      history.push(`/admin/customerOrder/${id}`);
    } else {
      history.push(`/admin/publisherOrder/${id}`);
    }
  }
  onAddressClick(id) {
    history.push(`/admin/address/${id}`);
  }
  componentDidMount() {}
  render() {
    return (
      <div class="col-xl-7 col-lg-8 col-md-6 col-sm-12 col-12">
        <div className={`  ${s.btnContainer} row mb-2`}>
          {' '}
          <div className="col-xl-4 col-md-6">
            <button
              type="submit"
              class="btn btn-success "
              onClick={this.props.onUserDelete}
            >
              Save Changes
            </button>
          </div>
          <div className="col-xl-4 col-md-6">
            <button
              className="btn btn-warning"
              disabled
              onClick={this.props.onAct}
            >
              Act as this user
            </button>
          </div>
          <div className="col-xl-4 col-md-6">
            <button
              type="submit"
              class="btn btn-danger"
              onClick={this.props.onUserEdit}
            >
              Delete User
            </button>
          </div>
        </div>
        <hr />
        <div class="influence-profile-content pills-regular">
          <ul
            class={`nav nav-pills ${s.userPills} nav-justified`}
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
                Details
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
            {/* ddddddddd */}
            <li class="nav-item ">
              <a
                class="nav-link "
                id="pills-orders-tab"
                data-toggle="pill"
                href="#pills-orders"
                role="tab"
                aria-controls="pills-orders"
                aria-selected="false"
              >
                Orders
              </a>
            </li>
            {/* ddddddddd */}
            <li class="nav-item ">
              <a
                class="nav-link "
                id="pills-addresses-tab"
                data-toggle="pill"
                href="#pills-addresses"
                role="tab"
                aria-controls="pills-addresses"
                aria-selected="false"
              >
                Addresses
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
                    hasPagination={false}
                    // pageCount={this.props.pageCount}
                    // currentPageNumber={2}
                    records={this.props.user.claims}
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
                <h5 class="card-header">Details</h5>
                <div class={`${s.mainContainer} card-body`}>
                  <form>
                    <div class="row">
                      <div
                        //
                        class={`${
                          s.additionalInfoContainer
                        } col-xl- 12 col-lg-12 col-md-12 col-sm-12 p-4`}
                      >
                        <div className="row border-bottom  pb-2 ">
                          <div class="form-group col-xl-4">
                            <label for="email">User Activition Status</label>
                            <Select
                              options={USER_ACTIVITION_STATUS_ARRAY}
                              isSearchable
                              onChange={so =>
                                this.props.handleSelectInputChange(
                                  so,
                                  'UserActivitionStatus',
                                )
                              }
                              value={this.props.user.UserActivitionStatus}
                            />
                          </div>
                          <div class="form-group col-xl-4">
                            <label for="name">User Country</label>
                            <Select
                              onChange={so =>
                                this.props.handleSelectInputChange(
                                  so,
                                  'Country',
                                )
                              }
                              options={this.props.countries}
                              isSearchable
                              value={this.props.user.Country}
                            />
                          </div>
                          <div class="form-group col-xl-4">
                            <label for="email">User Job</label>
                            <Select
                              onChange={so =>
                                this.props.handleSelectInputChange(so, 'Job')
                              }
                              options={this.props.jobs}
                              isSearchable
                              value={this.props.user.Job}
                            />
                          </div>
                        </div>
                        <div className="row border-bottom mt-3  pb-2">
                          <div class="form-group col-xl-4">
                            <label for="email">User Currency</label>
                            <Select
                              options={this.props.currencies}
                              onChange={so =>
                                this.props.handleSelectInputChange(
                                  so,
                                  'Currency',
                                )
                              }
                              isSearchable
                              value={this.props.user.Currency}
                            />
                          </div>

                          <div class="form-group col-xl-4">
                            <label for="email">User Role</label>
                            <Select
                              options={ROLES_ARRAY}
                              isSearchable
                              value={this.props.user.Role}
                              onChange={so =>
                                this.props.handleSelectInputChange(so, 'Role')
                              }
                            />
                          </div>
                          <div class="form-group col-xl-4">
                            <label for="email">User Subcategory</label>
                            <Select
                              options={USER_SUBCATEGORY_ARRAY}
                              isSearchable
                              value={this.props.user.UserSubCategory}
                              onChange={so =>
                                this.props.handleSelectInputChange(
                                  so,
                                  'UserSubCategory',
                                )
                              }
                            />
                          </div>
                        </div>
                        <div
                          className="row pt-2  "
                          // style={{ border: '1px solid red' }}
                        >
                          <div className="col-xl-3">
                            {' '}
                            <div className="form-group">
                              <label>Vat Id : </label>
                              <input
                                name="VatId"
                                type="text"
                                className="form-control form-control-sm "
                                onChange={this.props.handleSimpleInputChange}
                                value={this.props.user.VatId}
                              />
                              {/* </div> */}
                            </div>{' '}
                          </div>

                          <div className="col-xl-3">
                            <div className="form-group">
                              <label>GLM Code</label>
                              <input
                                name="glmCode"
                                type="text"
                                className="form-control form-control-sm"
                                onChange={this.props.handleSimpleInputChange}
                                value={this.props.user.glmCode}
                              />
                              {/* </div> */}
                            </div>
                          </div>
                          <div className="col-xl-3">
                            <div className="form-group ">
                              <label>Refrence No.</label>
                              <input
                                name="referenceNo"
                                type="text"
                                className="form-control form-control-sm "
                                onChange={this.props.handleSimpleInputChange}
                                value={this.props.user.referenceNo}
                              />
                            </div>
                          </div>

                          <div className="col-xl-3">
                            <div className="form-group ">
                              {' '}
                              <label>Eori No</label>
                              <input
                                name="eoriNo"
                                type="text"
                                className="form-control form-control-sm "
                                onChange={this.props.handleSimpleInputChange}
                                value={this.props.user.eoriNo}
                              />
                            </div>
                          </div>
                        </div>
                        {/* jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj */}

                        {this.props.user.Role.value == ROLES.publisher.value ? (
                          <div className="row pt-1">
                            <div className="col-xl-3">
                              {' '}
                              <div className="form-group">
                                <label>Account No</label>
                                <input
                                  name="AccountNo"
                                  type="text"
                                  className="form-control form-control-sm "
                                  onChange={this.props.handleSimpleInputChange}
                                  value={this.props.user.AccountNo}
                                />
                                {/* </div> */}
                              </div>{' '}
                            </div>

                            <div className="col-xl-3">
                              <div className="form-group">
                                <label>Iban</label>
                                <input
                                  name="iban"
                                  type="text"
                                  className="form-control form-control-sm"
                                  onChange={this.props.handleSimpleInputChange}
                                  value={this.props.user.iban}
                                />
                                {/* </div> */}
                              </div>
                            </div>
                            <div className="col-xl-3">
                              <div className="form-group ">
                                <label>Swift Address</label>
                                <input
                                  name="swiftAddress"
                                  type="text"
                                  className="form-control form-control-sm "
                                  onChange={this.props.handleSimpleInputChange}
                                  value={this.props.user.swiftAddress}
                                />
                              </div>
                            </div>
                            <div className="col-xl-3">
                              <div className="form-group ">
                                <label>Bank Giro</label>
                                <input
                                  name="bankGiro"
                                  type="text"
                                  className="form-control form-control-sm "
                                  onChange={this.props.handleSimpleInputChange}
                                  value={this.props.user.bankGiro}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          ''
                        )}
                        <div className="row  pt-1">
                          <div className="col-xl-3">
                            {' '}
                            <div className="form-group">
                              <label>Bank Name</label>
                              <input
                                name="bankName"
                                type="text"
                                className="form-control form-control-sm "
                                onChange={this.props.handleSimpleInputChange}
                                value={this.props.user.bankName}
                              />
                              {/* </div> */}
                            </div>{' '}
                          </div>

                          {/* <div className="col-xl-3">
                            <div className="form-group">
                              <label>PSN</label>
                              <input
                                name="psn"
                                type="text"
                                className="form-control form-control-sm"
                                onChange={this.props.handleSimpleInputChange}
                                value={this.props.user.psn}
                              />
                            </div>
                          </div> */}
                          <div className="col-xl-3">
                            <div className="form-group ">
                              <label>discount</label>
                              <input
                                name="referenceNo"
                                type="text"
                                className="form-control form-control-sm "
                                onChange={this.props.handleSimpleInputChange}
                                value={this.props.user.discount}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* dddddddddddddd */}
            <div
              class="tab-pane fade "
              id="pills-orders"
              role="tabpanel"
              aria-labelledby="pills-orders-tab"
            >
              <div class="card">
                <h5 class="card-header">Orders</h5>
                <div class="card-body">
                  <div class="card-body">
                    {this.props.user.Role.value == 4 ? (
                      <CustomTable
                        hasPagination={false}
                        records={this.props.user.customerOrders}
                        columnLabels={CUSTOMER_ORDERS_COLUMNS_LABELS_ARRAY}
                        recordItemNames={
                          CUSTOMER_ORDERS_RECORDE_ITEM_NAMES_ARRAY
                        }
                        onRecordClick={this.onOrderClick}
                      />
                    ) : (
                      <CustomTable
                        // pageCount={this.props.pageCount}
                        // currentPageNumber={2}
                        hasPagination={false}
                        records={this.props.user.publisherOrders}
                        columnLabels={PUBLISHER_ORDERS_COLUMNS_LABELS_ARRAY}
                        recordItemNames={
                          PUBLISHER_ORDERS_RECORDE_ITEM_NAMES_ARRAY
                        }
                        // handlePageChange={this.handlePageChange}
                        onRecordClick={this.onOrderClick}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div
              class="tab-pane fade "
              id="pills-addresses"
              role="tabpanel"
              aria-labelledby="pills-addresses-tab"
            >
              <div class="card">
                <h5 class="card-header">Addresses</h5>
                <div class="card-body">
                  <CustomTable
                    // pageCount={this.props.pageCount}
                    // currentPageNumber={2}
                    hasPagination={false}
                    records={this.props.user.addresses}
                    columnLabels={ADDRESS_TABLE_LABELS}
                    recordItemNames={ADDRESS_RECORD_ITEMS}
                    // handlePageChange={this.handlePageChange}
                    onRecordClick={this.onAddressClick}
                  />
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
