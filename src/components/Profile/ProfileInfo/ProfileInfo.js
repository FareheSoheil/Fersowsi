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
          {/* <div className={`${s.avatarContainer} card-body`}>
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
          */}

          {/* <div className={`${s.emailConfirmation} card-body`}>
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
        
          </div> */}

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
                      src={this.props.user.profilePic}
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

              <div className={`${s.essentials} col-xl-8`}>
                <form className={s.formS}>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-6">
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
                      <div className="col-6">
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
                      <div className="col-6">
                        <label>Date Of Birth: </label>
                      </div>
                      <div className="col-6">
                        <DatePicker
                          name="dateOfBirth"
                          style={{ width: '30px' }}
                          selected={this.props.user.dateOfBirth}
                          onChange={this.props.handleDateInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="row">
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
                      <label>Contract Name:</label>
                    </div>
                    <div className="col-xl-8">
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
                    <div className="row form-group">
                      <i
                        className="fas fa-fw fa-envelope col-xl-2 col-md-12"
                        data-toggle="tooltip"
                        title="email"
                      />
                      <div className="col-xl-10 col-md-12">
                        <input
                          name="email"
                          type="text"
                          className="form-control form-control-sm inlineInput"
                          onChange={this.props.handleSimpleInputChange}
                          value={this.props.user.email}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-12">
                    <div className="row form-group">
                      <i
                        className="fas fa-fw fa-phone col-xl-2 col-md-12"
                        data-toggle="tooltip"
                        title="phone number"
                      />
                      <div className="col-xl-10 col-md-12">
                        <input
                          name="phoneNumber"
                          type="text"
                          className="form-control form-control-sm inlineInput"
                          onChange={this.props.handleSimpleInputChange}
                          value={this.props.user.phoneNumber}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-6 col-md-12">
                    <div className="form-group row">
                      <i
                        className="fas fa-fax  col-xl-2 col-md-12"
                        data-toggle="tooltip"
                        title="fax number"
                      />
                      <div className="col-xl-10 col-md-12">
                        <input
                          name="faxNumber"
                          type="text"
                          className="form-control form-control-sm inlineInput"
                          onChange={this.props.handleSimpleInputChange}
                          value={this.props.user.faxNumber}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-12">
                    <div className="form-group row">
                      <i
                        className="fas fa-mobile-alt col-xl-2 col-md-12"
                        data-toggle="tooltip"
                        title="mobile number"
                      />
                      <div className="col-xl-10 col-md-12">
                        <input
                          name="mobileNumber"
                          type="text"
                          className="form-control form-control-sm inlineInput"
                          onChange={this.props.handleSimpleInputChange}
                          value={this.props.user.mobileNumber}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* website */}
                <div className="form-group row">
                  <i
                    className="fa fa-globe col-xl-2 col-md-12"
                    aria-hidden="true"
                    data-toggle="tooltip"
                    title="home page"
                  />
                  <div className="col-xl-10 col-md-12">
                    <input
                      name="homepage"
                      type="text"
                      placeholder="home page"
                      className="form-control form-control-sm inlineInput"
                      onChange={this.props.handleSimpleInputChange}
                      value={this.props.user.homepage}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="card-body border-top">
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
        {/* end user profile */}
        <div className={`  ${s.btnContainer} row mb-5`}>
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
      </div>
    );
  }
}

export default withStyles(s)(ProfileInfo);
