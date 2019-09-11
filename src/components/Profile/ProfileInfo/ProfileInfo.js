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
    this.handleUploadedImage = this.handleUploadedImage.bind(this);
  }
  componentDidMount() {}
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

  render() {
    console.log('props : ', this.props);
    return (
      <div class="col-xl-5 col-lg-4 col-md-6 col-sm-12 col-12">
        {/* user profile  */}
        <div class={`card ${s.userDetailContainer}`}>
          <div class="card-body">
            <div class="user-avatar text-center d-block">
              <img
                src={this.props.user.profilePic}
                alt="User Avatar"
                id="detailsAvatar"
                onClick={this.uploadImage}
                class={`rounded-circle user-avatar-xxl ${s.avatar}`}
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
          <div class="card-body border-top">
            <div class="text-center">
              <form className={s.formS}>
                <div class="form-group">
                  <div className="row">
                    <div className="col-4">
                      <label>First Name:</label>
                    </div>
                    <div className="col-6">
                      <input
                        name="firstName"
                        type="text"
                        class="form-control form-control-sm"
                        onChange={this.props.handleSimpleInputChange}
                        value={this.props.user.firstName}
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div className="row">
                    <div className="col-4">
                      <label>Last Name:</label>
                    </div>
                    <div className="col-6">
                      <input
                        name="lastName"
                        type="text"
                        class="form-control form-control-sm"
                        onChange={this.props.handleSimpleInputChange}
                        value={this.props.user.lastName}
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div className="row">
                    <div className="col-4">
                      <label>Username:</label>
                    </div>
                    <div className="col-6">
                      <input
                        name="username"
                        type="text"
                        class="form-control form-control-sm"
                        onChange={this.props.handleSimpleInputChange}
                        value={this.props.user.username}
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div className="row">
                    <div className="col-4">
                      <label>Contract Name:</label>
                    </div>
                    <div className="col-6">
                      <input
                        name="contractName"
                        type="text"
                        class="form-control form-control-sm"
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
          <div class="card-body border-top">
            <h3 class="font-16">User Information</h3>
            <div class={s.numberContainer}>
              <ul class="list-unstyled mb-0">
                <li class="mb-3">
                  <form>
                    <div class="form-group">
                      <i
                        class="fas fa-fw fa-envelope mr-2"
                        data-toggle="tooltip"
                        title="email"
                      />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        name="email"
                        type="text"
                        class="form-control form-control-sm inlineInput"
                        onChange={this.props.handleSimpleInputChange}
                        value={this.props.user.email}
                      />
                    </div>
                    <div class="form-group">
                      <i
                        class="fas fa-fw fa-phone mr-2"
                        data-toggle="tooltip"
                        title="phone number"
                      />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        name="phoneNumber"
                        type="text"
                        class="form-control form-control-sm inlineInput"
                        onChange={this.props.handleSimpleInputChange}
                        value={this.props.user.phoneNumber}
                      />
                    </div>
                    <div class="form-group">
                      <i
                        class="fas fa-fax mr-2"
                        data-toggle="tooltip"
                        title="fax number"
                      />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        name="faxNumber"
                        type="text"
                        class="form-control form-control-sm inlineInput"
                        onChange={this.props.handleSimpleInputChange}
                        value={this.props.user.faxNumber}
                      />
                    </div>
                    <div class="form-group">
                      <i
                        class="fas fa-mobile-alt mr-3"
                        data-toggle="tooltip"
                        title="mobile number"
                      />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        name="mobileNumber"
                        type="text"
                        class="form-control form-control-sm inlineInput"
                        onChange={this.props.handleSimpleInputChange}
                        value={this.props.user.mobileNumber}
                      />
                    </div>

                    {/* website */}
                    <div class="form-group">
                      <i
                        class="fa fa-globe mr-3"
                        aria-hidden="true"
                        data-toggle="tooltip"
                        title="home page"
                      />&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        name="homepage"
                        type="text"
                        class="form-control form-control-sm inlineInput"
                        onChange={this.props.handleSimpleInputChange}
                        value={this.props.user.homepage}
                      />
                    </div>
                  </form>
                </li>
              </ul>
            </div>
          </div>
          <div class="card-body border-top">
            <form className={s.labelHolder}>
              <div class="form-group">
                <div className="row">
                  <div className="col-3">
                    {' '}
                    <label>
                      <b>Vat Id &nbsp;</b>
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      name="VatId"
                      type="text"
                      class="form-control form-control-sm inlineInput"
                      onChange={this.props.handleSimpleInputChange}
                      value={this.props.user.VatId}
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div className="row">
                  <div className="col-3">
                    {' '}
                    <label>
                      <b>PSN </b>
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      name="psn"
                      type="text"
                      class="form-control form-control-sm inlineInput"
                      onChange={this.props.handleSimpleInputChange}
                      value={this.props.user.psn}
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div className="row">
                  <div className="col-3">
                    <label>
                      <b>Discount </b>
                    </label>
                  </div>
                  <div className="col-4">
                    <input
                      name="discount"
                      type="text"
                      class="form-control form-control-sm inlineInput"
                      onChange={this.props.handleSimpleInputChange}
                      value={this.props.user.discount}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="card-body border-top">
            <label class="custom-color-theme custom-control custom-radio custom-control-inline">
              <input
                type="checkbox"
                name="emailConfirmed"
                class="custom-control-input"
                value={!this.props.user.emailConfirmed}
                onClick={this.props.handleSimpleInputChange}
                defaultChecked={this.props.user.emailConfirmed === true}
              />

              <span class="custom-control-label">Is Email Confirmed</span>
            </label>
          </div>
        </div>
        {/* end user profile */}
      </div>
    );
  }
}

export default withStyles(s)(ProfileInfo);
