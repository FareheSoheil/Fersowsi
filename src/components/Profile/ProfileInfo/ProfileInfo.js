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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { USER_ACTIVITION_STATUS, ROLES } from '../../../constants/constantData';
import s from './ProfileInfo.css';

class ProfileInfo extends React.Component {
  static propTypes = {
    user: {
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired, //
      lastName: PropTypes.string.isRequired, //
      username: PropTypes.string.isRequired, //
      contractName: PropTypes.string.isRequired, //
      phoneNumber: PropTypes.string.isRequired, //
      mobileNumber: PropTypes.string.isRequired, //
      faxNumber: PropTypes.string.isRequired, //
      homepage: PropTypes.string.isRequired, //
      VatId: PropTypes.string.isRequired, //
      email: PropTypes.string.isRequired, //
      dateOfBirth: PropTypes.object.isRequired, //
      psn: PropTypes.string.isRequired, //
      discount: PropTypes.number.isRequired, //
      emailConfirmed: PropTypes.bool.isRequired, //
      profilePic: PropTypes.string.isRequired, //
      bio: PropTypes.string.isRequired, //
    },
    handleSimpleInputChange: PropTypes.func.isRequired,
    handleDateInputChange: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      profilePic: '',
    };
    this.uploadImage = this.uploadImage.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.handleUploadedImage = this.handleUploadedImage.bind(this);
  }

  uploadImage() {
    document.getElementById('fileInput').click();
  }
  handleUploadedImage() {
    let inp = document.getElementById('fileInput');
    let imgContainer = document.getElementById('detailsAvatar');
    let reader = new FileReader();
    let that = this;
    if (inp.files && inp.files[0]) {
      reader.onload = function(e) {
        imgContainer.src = e.target.result;
        that.setState({
          profilePic: e.target.result,
        });
      };
      let imgt = reader.readAsDataURL(inp.files[0]);
    }
  }
  onStatusChange(value) {
    this.props.changeStatus(value);
  }
  render() {
    return (
      <div className="col-xl-5 col-lg-4 col-md-6 col-sm-12 col-12">
        {/* user profile  */}
        <div className={`card ${s.userDetailContainer}`}>
          <div className={`${s.avatarContainer} card-body`}>
            <div
              className={
                this.props.userStatus.value === USER_ACTIVITION_STATUS.ACTIVE
                  ? `${s.activeUser} 
                  user-avatar text-center d-block`
                  : this.props.userStatus.value ===
                    USER_ACTIVITION_STATUS.DEACTIVE
                    ? `${s.deactiveUser} 
                    user-avatar text-center d-block`
                    : this.props.userStatus.value ===
                      USER_ACTIVITION_STATUS.WAITFORAPPROVAL
                      ? `${s.pendingUser} 
                    user-avatar text-center d-block`
                      : 'user-avatar text-center d-block'
              }
            >
              <img
                src={this.props.user.profilePic}
                alt="User Avatar"
                id="detailsAvatar"
                onClick={this.uploadImage}
                className={`rounded-circle user-avatar-xxl ${s.avatar}`}
              />

              <div>
                <input
                  onChange={this.handleUploadedImage}
                  style={{ display: 'none' }}
                  type="file"
                  id="fileInput"
                  name="fileInput"
                />
              </div>
            </div>
          </div>
          <div className="card-body ">
            {/* <label className="custom-color-theme custom-control custom-radio custom-control-inline">
              <input
                type="checkbox"
                name="emailConfirmed"
                className="custom-control-input"
                value={!this.props.user.emailConfirmed}
                onClick={this.props.handleSimpleInputChange}
                defaultChecked={this.props.user.emailConfirmed === true}
              /> */}

            {/* <span className="custom-control-label">Is Email Confirmed</span> */}
            {/* </label> */}
            {/* <label className="custom-color-theme custom-control custom-radio custom-control-inline"> */}
            <div className="text-center">
              <label>Confirm User Email : &nbsp;&nbsp;</label>
              {this.props.user.emailConfirmed === true ? (
                <i
                  style={{ color: 'red', fontSize: '20px' }}
                  class="fa fa-times"
                  aria-hidden="true"
                  onClick={() =>
                    this.onStatusChange(!this.props.user.emailConfirmed)
                  }
                />
              ) : (
                <i
                  style={{ color: 'green', fontSize: '20px' }}
                  class="fas fa-check"
                  onClick={() =>
                    this.onStatusChange(!this.props.user.emailConfirmed)
                  }
                />
              )}
            </div>
          </div>
          <div className="card-body">
            <div className="text-center">
              <form className={s.formS}>
                <div className="form-group">
                  <div className="row">
                    <div className="col-4">
                      <label>First Name:</label>
                    </div>
                    <div className="col-6">
                      <input
                        name="firstName"
                        type="text"
                        className="form-control form-control-sm"
                        onChange={this.props.handleSimpleInputChange}
                        value={this.props.user.firstName}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-4">
                      <label>Last Name:</label>
                    </div>
                    <div className="col-6">
                      <input
                        name="lastName"
                        type="text"
                        className="form-control form-control-sm"
                        onChange={this.props.handleSimpleInputChange}
                        value={this.props.user.lastName}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-4">
                      <label>Username:</label>
                    </div>
                    <div className="col-6">
                      <input
                        name="username"
                        type="text"
                        className="form-control form-control-sm"
                        onChange={this.props.handleSimpleInputChange}
                        value={this.props.user.username}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-4">
                      <label>Contract Name:</label>
                    </div>
                    <div className="col-6">
                      <input
                        name="contractName"
                        type="text"
                        className="form-control form-control-sm"
                        onChange={this.props.handleSimpleInputChange}
                        value={this.props.user.contractName}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-4">
                      <label>Date Of Birth: </label>
                    </div>
                    <div className="col-6">
                      <DatePicker
                        name="dateOfBirth"
                        selected={this.props.user.dateOfBirth}
                        onChange={this.props.handleDateInputChange}
                      />
                    </div>
                  </div>
                </div>
              </form>
              {/* </h4> */}
            </div>
          </div>
          <div className="card-body border-top">
            <h3 className="font-16">User Information</h3>
            <div className={s.numberContainer}>
              <ul className="list-unstyled mb-0">
                <li className="mb-3">
                  <form>
                    <div className="form-group">
                      <i
                        className="fas fa-fw fa-envelope mr-2"
                        data-toggle="tooltip"
                        title="email"
                      />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        name="email"
                        type="text"
                        className="form-control form-control-sm inlineInput"
                        onChange={this.props.handleSimpleInputChange}
                        value={this.props.user.email}
                      />
                    </div>
                    <div className="form-group">
                      <i
                        className="fas fa-fw fa-phone mr-2"
                        data-toggle="tooltip"
                        title="phone number"
                      />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        name="phoneNumber"
                        type="text"
                        className="form-control form-control-sm inlineInput"
                        onChange={this.props.handleSimpleInputChange}
                        value={this.props.user.phoneNumber}
                      />
                    </div>
                    <div className="form-group">
                      <i
                        className="fas fa-fax mr-2"
                        data-toggle="tooltip"
                        title="fax number"
                      />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        name="faxNumber"
                        type="text"
                        className="form-control form-control-sm inlineInput"
                        onChange={this.props.handleSimpleInputChange}
                        value={this.props.user.faxNumber}
                      />
                    </div>
                    <div className="form-group">
                      <i
                        className="fas fa-mobile-alt mr-3"
                        data-toggle="tooltip"
                        title="mobile number"
                      />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        name="mobileNumber"
                        type="text"
                        className="form-control form-control-sm inlineInput"
                        onChange={this.props.handleSimpleInputChange}
                        value={this.props.user.mobileNumber}
                      />
                    </div>

                    {/* website */}
                    <div className="form-group">
                      <i
                        className="fa fa-globe mr-3"
                        aria-hidden="true"
                        data-toggle="tooltip"
                        title="home page"
                      />&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        name="homepage"
                        type="text"
                        className="form-control form-control-sm inlineInput"
                        onChange={this.props.handleSimpleInputChange}
                        value={this.props.user.homepage}
                      />
                    </div>
                  </form>
                </li>
              </ul>
            </div>
          </div>
          <div className="card-body border-top">
            <form className={s.labelHolder}>
              <div className="form-group">
                <div className="row">
                  <div className="col-4">
                    {' '}
                    <label>
                      <b>Vat Id &nbsp;</b>
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      name="VatId"
                      type="text"
                      className="form-control form-control-sm inlineInput"
                      onChange={this.props.handleSimpleInputChange}
                      value={this.props.user.VatId}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-4">
                    {' '}
                    <label>
                      <b>GLM Code &nbsp;</b>
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      name="glmCode"
                      type="text"
                      className="form-control form-control-sm inlineInput"
                      onChange={this.props.handleSimpleInputChange}
                      value={this.props.user.glmCode}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-4">
                    {' '}
                    <label>
                      <b>Refrence No. &nbsp;</b>
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      name="referenceNo"
                      type="text"
                      className="form-control form-control-sm inlineInput"
                      onChange={this.props.handleSimpleInputChange}
                      value={this.props.user.referenceNo}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-4">
                    {' '}
                    <label>
                      <b>Eori No. &nbsp;</b>
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      name="eoriNo"
                      type="text"
                      className="form-control form-control-sm inlineInput"
                      onChange={this.props.handleSimpleInputChange}
                      value={this.props.user.eoriNo}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-4">
                    {' '}
                    <label>
                      <b>Bank Name &nbsp;</b>
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      name="bankName"
                      type="text"
                      className="form-control form-control-sm inlineInput"
                      onChange={this.props.handleSimpleInputChange}
                      value={this.props.user.bankName}
                    />
                  </div>
                </div>
              </div>
              {this.props.user.Role.value == ROLES.publisher.value ? (
                <div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-4">
                        {' '}
                        <label>
                          <b>Account No &nbsp;</b>
                        </label>
                      </div>
                      <div className="col-6">
                        <input
                          name="AccountNo"
                          type="text"
                          className="form-control form-control-sm inlineInput"
                          onChange={this.props.handleSimpleInputChange}
                          value={this.props.user.AccountNo}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-4">
                        {' '}
                        <label>
                          <b>Iban &nbsp;</b>
                        </label>
                      </div>
                      <div className="col-6">
                        <input
                          name="iban"
                          type="text"
                          className="form-control form-control-sm inlineInput"
                          onChange={this.props.handleSimpleInputChange}
                          value={this.props.user.iban}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-4">
                        {' '}
                        <label>
                          <b>Swift Address &nbsp;</b>
                        </label>
                      </div>
                      <div className="col-6">
                        <input
                          name="swiftAddress"
                          type="text"
                          className="form-control form-control-sm inlineInput"
                          onChange={this.props.handleSimpleInputChange}
                          value={this.props.user.swiftAddress}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-4">
                        {' '}
                        <label>
                          <b>Bank Giro &nbsp;</b>
                        </label>
                      </div>
                      <div className="col-6">
                        <input
                          name="bankGiro"
                          type="text"
                          className="form-control form-control-sm inlineInput"
                          onChange={this.props.handleSimpleInputChange}
                          value={this.props.user.bankGiro}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}

              <div className="form-group">
                <div className="row">
                  <div className="col-4">
                    {' '}
                    <label>
                      <b>PSN </b>
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      name="psn"
                      type="text"
                      className="form-control form-control-sm inlineInput"
                      onChange={this.props.handleSimpleInputChange}
                      value={this.props.user.psn}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-4">
                    <label>
                      <b>Discount </b>
                    </label>
                  </div>
                  <div className="col-4">
                    <input
                      name="discount"
                      type="text"
                      className="form-control form-control-sm inlineInput"
                      onChange={this.props.handleSimpleInputChange}
                      value={this.props.user.discount}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* end user profile */}
      </div>
    );
  }
}

export default withStyles(s)(ProfileInfo);
