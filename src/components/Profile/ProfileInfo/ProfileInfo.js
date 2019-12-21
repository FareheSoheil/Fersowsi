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
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import {
  USER_ACTIVITION_STATUS,
  ROLES,
  USER_SUBCATEGORY,
} from '../../../constants/constantData';
import { AVATAR } from '../../../constants';
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
        that.props.setAvatar(e.target.result);
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
        <div className={`card ${s.userDetailContainer}`}>
          <div className="card-body">
            <div className="row">
              <div className="col-xl-4">
                <div className="row">
                  <div
                    className={
                      this.props.userStatus.value ==
                      USER_ACTIVITION_STATUS.ACTIVE
                        ? `${s.activeUser} 
                  user-avatar text-center d-block col-12`
                        : this.props.userStatus.value ==
                          USER_ACTIVITION_STATUS.DEACTIVE
                          ? `${s.deactiveUser} 
                    user-avatar text-center d-block col-12`
                          : this.props.userStatus.value ==
                            USER_ACTIVITION_STATUS.WAITFORAPPROVAL
                            ? `${s.pendingUser} 
                    user-avatar text-center d-block col-12`
                            : 'user-avatar text-center d-block col-12'
                    }
                  >
                    <img
                      src={
                        this.props.user.profilePic == undefined ||
                        this.props.user.profilePic == null ||
                        this.props.user.profilePic == ''
                          ? AVATAR
                          : this.props.user.profilePic
                      }
                      alt="User Avatar"
                      id="detailsAvatar"
                      onClick={this.uploadImage}
                      className={`rounded-circle user-avatar-xl ${s.avatar}`}
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
                <br />
              </div>
              {/* {this.props.user.Role.value == ROLES.customer.value
                ? 'yes'
                : 'no'}
              <br />
              {this.props.user.UserSubCategory.value ==
              USER_SUBCATEGORY.Single.value
                ? 'seccond yes'
                : 'seccond no'} */}
              {this.props.user.Role.value == ROLES.customer.value &&
              this.props.user.UserSubCategory.value ==
                USER_SUBCATEGORY.Single.value ? (
                <div className={`${s.essentials} col-xl-8`}>
                  <form className={s.formS}>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-5">
                          <label>First Name:</label>
                        </div>
                        <div className="col-7">
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
                        <div className="col-5">
                          <label>Last Name:</label>
                        </div>
                        <div className="col-7">
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
                        <div className="col-5">
                          <label>Birt Date: </label>
                        </div>
                        <div className="col-7">
                          <DatePicker
                            name="dateOfBirth"
                            style={{ width: '30px' }}
                            selected={new Date(this.props.user.dateOfBirth)}
                            onChange={this.props.handleDateInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              ) : this.props.user.Role.value == ROLES.publisher.value ? (
                <div className={`${s.essentials} col-xl-8`}>
                  <form className={s.formS}>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-5">
                          <label>Publisher Name:</label>
                        </div>
                        <div className="col-7">
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
                  </form>
                </div>
              ) : (
                <div className={`${s.essentials} col-xl-8`}>
                  <form className={s.formS}>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-5">
                          <label>Corporation Name:</label>
                        </div>
                        <div className="col-7">
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
                  </form>
                </div>
              )}
            </div>

            <div className="row mt-2">
              <div className="col-xl-12">
                {' '}
                <div className="form-group">
                  <div className="row">
                    <div className="col-xl-4 col-md-6">
                      <label>Username:</label>
                    </div>
                    <div className="col-xl-8 col-md-12">
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
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                {' '}
                <div className="form-group">
                  <div className="row">
                    <div className="col-xl-4">
                      <label>Password:</label>
                    </div>
                    <div className="col-xl-8">
                      <input
                        name="password"
                        type="password"
                        className="form-control form-control-sm"
                        onChange={this.props.handleSimpleInputChange}
                        value={this.props.user.password}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${s.emailConfirmation} row mt-1`}>
              <div className="col-xl-5">
                <label>
                  {this.props.user.emailConfirmed == true
                    ? 'Disconfirm User Email'
                    : 'Confirm User Email'}
                </label>
              </div>
              <div className="col-xl-2">
                {this.props.user.emailConfirmed == true ? (
                  <i
                    className={` fa fa-times ${s.iconBtn} ${s.disconfirmBtn} `}
                    aria-hidden="true"
                    onClick={() =>
                      this.onStatusChange(!this.props.user.emailConfirmed)
                    }
                  />
                ) : (
                  <i
                    className={`${s.iconBtn} ${s.confirmBtn} fas fa-check`}
                    onClick={() =>
                      this.onStatusChange(!this.props.user.emailConfirmed)
                    }
                  />
                )}
              </div>
            </div>
          </div>
          <div className="card-body border-top">
            <div className={`${s.moreDetails} row`}>
              <form className="col-xl-12 col-md-12 col-lg-12 col-sm-12">
                <div className="row">
                  <div className="col-xl-6 col-md-12">
                    <div className="row ">
                      <i
                        className="fas fa-fw fa-envelope pl-2"
                        data-toggle="tooltip"
                        title="email"
                      />
                      &nbsp;
                      <input
                        name="email"
                        type="text"
                        className="form-control form-control-sm inlineInput ml-2"
                        onChange={this.props.handleSimpleInputChange}
                        value={this.props.user.email}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-12">
                    <div className="row mb-1">
                      <i
                        className="fas fa-fw fa-phone ml-1"
                        data-toggle="tooltip"
                        title="phone number"
                      />
                      <input
                        name="phoneNumber"
                        type="text"
                        className="ml-1 form-control form-control-sm inlineInput"
                        onChange={this.props.handleSimpleInputChange}
                        value={this.props.user.phoneNumber}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-6 col-md-12">
                    <div className=" row">
                      <i
                        className="fas fa-fax  pl-2"
                        data-toggle="tooltip"
                        title="fax number"
                      />
                      <input
                        name="faxNumber"
                        type="text"
                        className="form-control form-control-sm inlineInput ml-2"
                        onChange={this.props.handleSimpleInputChange}
                        value={this.props.user.faxNumber}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-12">
                    <div className="row">
                      <i
                        className="fas fa-mobile-alt pl-2"
                        data-toggle="tooltip"
                        title="mobile number"
                      />
                      <input
                        name="mobileNumber"
                        type="text"
                        className="form-control form-control-sm inlineInput ml-2"
                        onChange={this.props.handleSimpleInputChange}
                        value={this.props.user.mobileNumber}
                      />
                    </div>
                  </div>
                </div>
                {/* website */}
                <div className="row mt-2">
                  <i
                    className="fa fa-globe pl-2"
                    aria-hidden="true"
                    data-toggle="tooltip"
                    title="home page"
                  />
                  <div className="col-xl-10 col-md-12">
                    <input
                      name="homepage"
                      type="text"
                      placeholder="home page"
                      className="form-control form-control-sm inlineInput ml-2"
                      onChange={this.props.handleSimpleInputChange}
                      value={this.props.user.homepage}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="card-body border-top">
            {this.props.isForAdd ||
            this.props.user.Role.value == ROLES.customer.value ||
            this.props.user.Role.value == ROLES.publisher.value ? (
              <div className={`row mb-2 ${s.address}`}>
                <div className="col-12">
                  <div className="row mb-2 pl-3">
                    <label>Country : </label>
                    <div className="col-7">
                      {' '}
                      <Select
                        className={s.country}
                        styles={{ width: '220px' }}
                        options={this.props.countries}
                        value={this.props.user.address.Country}
                        onChange={this.props.onAddressSelectChange}
                      />
                    </div>
                  </div>
                  <label>Province : </label>
                  <input
                    name="province"
                    value={this.props.user.address.province}
                    onChange={this.props.onAddressChange}
                  />
                  <label>City : </label>
                  <input
                    name="city"
                    value={this.props.user.address.city}
                    onChange={this.props.onAddressChange}
                  />
                  <br />
                  <label>Address : </label>
                  <input
                    style={{ width: '250px' }}
                    name="detailAddress"
                    value={this.props.user.address.detailAddress}
                    onChange={this.props.onAddressChange}
                  />
                  <br />
                  <label>Zip Code : </label>
                  <input
                    name="zipCode"
                    value={this.props.user.address.zipCode}
                    onChange={this.props.onAddressChange}
                  />
                </div>
              </div>
            ) : (
              ''
            )}

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
      </div>
    );
  }
}

export default withStyles(s)(ProfileInfo);
