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
import ProfileInfo from '../../../components/Profile/ProfileInfo';
import ProfileProInfo from '../../../components/Profile/ProfileProInfo';
import Spinner from '../../../components/Admin/Spinner';
import s from './ProfileDetail.css';

class ProfileDetail extends React.Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      // id:context,
      isLoading: false,
      user: {
        firstName: 'faree', //
        lastName: 'soheil', //
        username: '', //
        contractName: '', //
        phoneNumber: '', //
        mobileNumber: '', //
        faxNumber: '', //
        homepage: '', //
        VatId: '', //
        email: '', //
        dateOfBirth: new Date(), //
        psn: '', //
        discount: '', //
        emailConfirmed: true, //
        profilePic: '/assets/images/bitbucket.png', //
        bio: '', //
        claims: '',
        createdAt: 'datetime',
        updatedAt: 'datetime',

        // pro info
        role: {
          //
          value: 'id of the  role',
          label: 'name of the role (string)',
        },
        country: {
          //
          value: 'id of the  country',
          label: 'name of the country (string)',
        },
        currency: {
          //

          value: 'id of the   currency',
          label: 'name of the currency (string)',
        },
        subCategory: {
          //
          value: 'id of the  subCategory',
          label: 'name of the subCategory (string)',
        },
        activitionStatus: {
          //
          value: 'id of the   activitionStatus',
          label: 'name of the activitionStatus (string)',
        },
        siteLanguage: {
          //

          value: 'id of the  language',
          label: 'name of the language (string)',
        },
        job: {
          //

          value: 'id of the  job',
          label: 'name of the job (string)',
        },
      },

      countries: '',
      jobs: '',
      siteLanguages: '',
      currencies: '',
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  // TO DO
  fetchUser() {
    const url = fetchURL;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      userId: this.state.id,
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
      'http://localhost:3000/getUserDetails',
      options,
      response => {
        that.setState({
          user: response.user,
          isLoading: false,
        });
      },
      error => {
        console.log(error);
      },
    );
  }
  onChangeInput(event) {
    const state = event.target.name;
    const value = event.target.value;
    let user = { ...this.state.user };
    user[state] = value;
    this.setState({ user });
  }
  handleDateChange(date) {
    let user = { ...this.state.user };
    user.dateOfBirth = date;
    this.setState({ user });
  }
  handleSelectChange = (selectedOption, op) => {
    let user = { ...this.state.user };
    user[op] = selectedOption;
    this.setState({ user });
  };
  onUserDelete() {
    window.alert('send delete ajax with user id');
  }
  onUserEdit() {
    window.alert('send edi ajax with all user info');
  }
  onAct() {
    window.alert('send act ajax with this user id and current userId');
  }
  componentDidMount() {}
  render() {
    return (
      <div class="influence-profile">
        <div class="container-fluid dashboard-content ">
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <div>
              <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div class="page-header">
                    <h3 class="mb-2">User Details </h3>
                    <div class="page-breadcrumb">
                      <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                          <li class="breadcrumb-item">
                            <a href="/admin/accounts" class="breadcrumb-link">
                              Accounts
                            </a>
                          </li>
                          <li
                            class="breadcrumb-item active"
                            aria-current="page"
                          >
                            User Profile Details
                          </li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <ProfileInfo
                  user={{
                    firstName: this.state.user.firstName,
                    lastName: this.state.user.lastName,
                    username: this.state.user.username,
                    contractName: this.state.user.contractName,
                    phoneNumber: this.state.user.phoneNumber,
                    mobileNumber: this.state.user.mobileNumber,
                    faxNumber: this.state.user.faxNumber,
                    homepage: this.state.user.homepage,
                    VatId: this.state.user.VatId,
                    email: this.state.user.email,
                    dateOfBirth: this.state.user.dateOfBirth,
                    psn: this.state.user.psn,
                    discount: this.state.user.discount,
                    emailConfirmed: this.state.user.emailConfirmed,
                    profilePic: this.state.user.profilePic,
                    bio: this.state.user.bio,
                  }}
                  handleSimpleInputChange={this.onChangeInput}
                  handleDateInputChange={this.handleDateChange}
                />
                {/* Campaing data */}
                <ProfileProInfo
                  user={{
                    role: this.state.user.role,
                    country: this.state.user.country,
                    currency: this.state.user.currency,
                    subCategory: this.state.user.subCategory,
                    activitionStatus: this.state.user.activitionStatus,
                    siteLanguage: this.state.user.siteLanguage,
                    job: this.state.user.job,
                    homepage: this.state.user.homepage,
                    VatId: this.state.user.VatId,
                    email: this.state.user.email,
                    dateOfBirth: this.state.user.dateOfBirth,
                    psn: this.state.user.psn,
                    discount: this.state.user.discount,
                    emailConfirmed: this.state.user.emailConfirmed,
                    profilePic: this.state.user.profilePic,
                    bio: this.state.user.bio,
                    claims: [
                      {
                        id: 'Product#1',
                        senderUserName: 'id22222',
                        receiverUserName: 'farehe1',
                        repliedMSGId: '3000',
                        msgStatus: 'sd',
                        status: 'pending',
                      },
                      {
                        id: 'Product#2',
                        senderUserName: 'id22222',
                        receiverUserName: 'farehe2',
                        repliedMsgId: '300tt',
                        msgStatus: 'ef',
                        status: 'rej',
                      },
                      {
                        id: 'Product#3',
                        senderUserName: 'id22222',
                        receiverUserName: 'farehe3',
                        repliedMSGId: '7ujfh65',
                        msgStatus: 'e',
                        status: 'acc',
                      },
                    ],
                    handleSimpleInputChange: this.onChangeInput,
                    handleDateInputChange: this.handleDateChange,
                  }}
                  countries={this.state.countries}
                  jobs={this.state.jobs}
                  currencies={this.state.currencies}
                  handleSelectInputChange={this.handleSelectChange}
                  handleSimpleInputChange={this.onChangeInput}
                />
              </div>
              <br />
              <div className="row">
                <div
                  className={`col-xl-10 col-lg-10 col-md-10 col-sm-12  ${
                    s.btnContainer
                  }`}
                >
                  {' '}
                  <button
                    type="submit"
                    class="btn btn-success "
                    onClick={this.onUserDelete}
                  >
                    Save Changes &nbsp; &nbsp;<i class="fas fa-edit" />
                  </button>
                  <button
                    className="btn btn-warning"
                    disabled
                    onClick={this.onAct}
                  >
                    Act as this user
                  </button>
                  <button
                    type="submit"
                    class="btn btn-danger"
                    onClick={this.onUserEdit}
                  >
                    Delete User &nbsp; &nbsp;<i
                      class="fa fa-trash"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProfileDetail);
