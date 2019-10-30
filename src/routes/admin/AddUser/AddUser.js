/**
 * React Starter Kit (https:www.reactstarterkit.com/)
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
import s from './AddUser.css';
import PageHeader from '../../../components/Admin/PageHeader';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import { SERVER, AVATAR } from '../../../constants';
import { USER_ACTIVITION_STATUS_ARRAY } from '../../../constants/constantData';
class AddUser extends React.Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: {
        firstName: '',
        lastName: '',
        username: '',
        contractName: '',
        phoneNumber: '',
        mobileNumber: '',
        faxNumber: '',
        homepage: '',
        VatId: '',
        email: '',
        dateOfBirth: new Date(),
        psn: '',
        discount: '',
        emailConfirmed: true,
        profilePic: AVATAR,
        bio: '',
        claims: '',
        createdAt: '',
        updatedAt: '',

        role: {},
        country: {},
        currency: {},
        userSubCategory: {},
        UserActivitionStatus: USER_ACTIVITION_STATUS_ARRAY[0],
        siteLanguage: {},
      },

      countries: '',
      jobs: '',
      siteLanguages: '',
      currencies: '',
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.fetchAllInfo = this.fetchAllInfo.bind(this);
  }
  componentDidMount() {
    this.fetchAllInfo();
  }
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
      `${SERVER}/getUserDetails`,
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
  fetchAllInfo() {
    const url = `${SERVER}/getAuxInfoForAll`;
    this.setState({
      isLoading: true,
    });
    const options = {
      method: 'POST',
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
          countries: response.Country,
          siteLanguages: response.SiteLanguage,
          jobs: response.Job,
          currencies: response.Currency,
          isLoading: false,
        });
      },
      error => {
        console.log(error);
      },
    );
  }
  onChangeInput(event) {
    let value;
    if (event.target.type === 'checkbox') value = event.target.checked;
    else value = event.target.value;
    const state = event.target.name;
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
  onAddUser() {
    const url = fetchURL;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      user: this.state.user,
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
      '${SERVER}/getUserDetails',
      options,
      response => {
        that.setState({
          isLoading: false,
        });
      },
      error => {
        console.log(error);
      },
    );
  }

  render() {
    return (
      <div class="influence-profile">
        <div class="container-fluid dashboard-content ">
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <div>
              <PageHeader
                title="Add New User"
                breadCrumbs={[
                  { label: 'Accounts', link: '/admin/accounts/all' },
                  { label: 'Add New User' },
                ]}
              />
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
                  userStatus={this.state.user.UserActivitionStatus}
                  handleSimpleInputChange={this.onChangeInput}
                  handleDateInputChange={this.handleDateChange}
                />
                {/* Campaing data */}
                <ProfileProInfo
                  pageCount={0}
                  user={{
                    role: this.state.user.role,
                    country: this.state.user.country,
                    currency: this.state.user.currency,
                    subCategory: this.state.user.subCategory,
                    activitionStatus: this.state.user.activitionStatus,
                    siteLanguage: this.state.user.siteLanguage,
                    job: this.state.user.job,
                    bio: this.state.user.bio,
                    claims: [],
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
                    Add User &nbsp; &nbsp;<i class="fas fa-plus" />
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

export default withStyles(s)(AddUser);
