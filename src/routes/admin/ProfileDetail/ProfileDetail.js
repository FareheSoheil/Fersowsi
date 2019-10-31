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
import PageHeader from '../../../components/Admin/PageHeader';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import s from './ProfileDetail.css';
import { USER_ACTIVITION_STATUS_ARRAY } from '../../../constants/constantData';
import { SERVER, AVATAR } from '../../../constants';

class ProfileDetail extends React.Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      id: this.props.context.params.id,
      user: {
        id: '',

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
        glmCode: '',
        referenceNo: '',
        eoriNo: '',
        bankName: '',
        AccountNo: '',
        iban: '',
        swiftAddress: '',
        bankGiro: '',
        // pro info
        Role: {},
        Country: {},
        Currency: {},
        UserSubCategory: {},
        UserActivitionStatus: '',
        siteLanguage: {},
        Job: {},
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
    this.fetchUser = this.fetchUser.bind(this);
    this.onUserEdit = this.onUserEdit.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }
  componentDidMount() {
    // window.alert;
    this.fetchUser();
    // this.fetchAllInfo();
  }
  // TO DO
  fetchUser() {
    const url = `${SERVER}/getUser`;
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
      url,
      options,
      response => {
        if (response.error == undefined)
          that.setState(
            {
              user: response.user,
            },
            () => {
              const auxUrl = `${SERVER}/getAuxInfoForAll`;
              const auxOptions = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
              };
              const thatthat = that;
              fetchWithTimeOut(
                auxUrl,
                auxOptions,
                auxResponse => {
                  thatthat.setState({
                    countries: auxResponse.Country,
                    siteLanguages: auxResponse.SiteLanguage,
                    jobs: auxResponse.Job,
                    currencies: auxResponse.Currency,
                    isLoading: false,
                  });
                },
                error => {
                  console.log(error);
                },
              );
            },
          );
        else window.alert(response.error.title);
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
  changeStatus(value) {
    let user = { ...this.state.user };
    user.emailConfirmed = value;
    this.setState({ user: user });
  }
  onChangeInput(event) {
    let value;
    if (event.target.type === 'checkbox') value = event.target.checked;
    else value = event.target.value;
    const state = event.target.name;
    let user = { ...this.state.user };
    user[state] = value;
    this.setState({ user: user });
  }
  handleDateChange(date) {
    let user = { ...this.state.user };
    user.dateOfBirth = date;
    this.setState({ user: user });
  }
  handleSelectChange = (selectedOption, op) => {
    let user = { ...this.state.user };
    user[op] = selectedOption;
    this.setState({ user: user });
  };
  onUserDelete() {
    window.alert('send delete ajax with user id');
  }
  onUserEdit() {
    window.alert(JSON.stringify(this.state.user));
  }
  onAct() {
    window.alert('send act ajax with this user id and current userId');
  }
  // componentDidMount() {}
  render() {
    console.log('publisherRRRr :  : ', this.state.user);
    return (
      <div class="influence-profile">
        <div class="container-fluid dashboard-content ">
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <div>
              <PageHeader
                title="User Details"
                breadCrumbs={[
                  { label: 'Accounts', link: '/admin/accounts/all' },
                  { label: 'User Profile Details' },
                ]}
              />
              <div className="row mb-5">
                <div
                  className={`col-xl-12 col-lg-12 col-md-10 col-sm-12  ${
                    s.btnContainer
                  }`}
                >
                  {' '}
                  <button
                    type="submit"
                    class="btn btn-success "
                    onClick={this.onUserDelete}
                  >
                    Save Changes &nbsp; &nbsp; <i class="fas fa-edit" />
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

              <div className="row">
                <ProfileInfo
                  user={{
                    Role: this.state.user.Role,
                    firstName: this.state.user.firstName,
                    lastName: this.state.user.lastName,
                    username: this.state.user.username,
                    contractName: this.state.user.contractName,
                    phoneNumber: this.state.user.phoneNumber,
                    mobileNumber: this.state.user.mobileNumber,
                    faxNumber: this.state.user.faxNumber,
                    homepage: this.state.user.homepage,
                    VatId: this.state.user.VatId,
                    glmCode: this.state.user.glmCode,
                    referenceNo: this.state.user.referenceNo,
                    eoriNo: this.state.user.eoriNo,
                    bankName: this.state.user.bankName,
                    AccountNo: this.state.user.AccountNo,
                    iban: this.state.user.iban,
                    swiftAddress: this.state.user.swiftAddress,
                    bankGiro: this.state.user.bankGiro,
                    email: this.state.user.email,
                    dateOfBirth: new Date(this.state.user.dateOfBirth),
                    psn: this.state.user.psn,
                    discount: this.state.user.discount,
                    emailConfirmed: this.state.user.emailConfirmed,
                    profilePic:
                      this.state.user.profilePic === null
                        ? AVATAR
                        : this.state.user.profilePic,
                    bio: this.state.user.bio,
                  }}
                  userStatus={this.state.user.UserActivitionStatus}
                  handleSimpleInputChange={this.onChangeInput}
                  changeStatus={this.changeStatus}
                  handleDateInputChange={this.handleDateChange}
                  editUser={this.onUserEdit}
                />
                {/* Campaing data */}
                <ProfileProInfo
                  isForAdd={false}
                  user={{
                    Role: this.state.user.Role,
                    Country: this.state.user.Country,
                    Currency: this.state.user.Currency,
                    UserSubCategory: this.state.user.UserSubCategory,
                    UserActivitionStatus: this.state.user.UserActivitionStatus,
                    Job: this.state.user.Job,
                    bio: this.state.user.bio,
                    claims: this.state.user.claims,
                    addresses: this.state.user.addresses,

                    customerOrders: this.state.user.customerOrders,
                    publisherOrders: this.state.user.publisherOrders,
                    handleSimpleInputChange: this.onChangeInput,
                    handleDateInputChange: this.handleDateChange,
                  }}
                  pageCount={this.state.user.claims.length / 15}
                  countries={this.state.countries}
                  jobs={this.state.jobs}
                  siteLanguages={this.state.siteLanguages}
                  currencies={this.state.currencies}
                  handleSelectInputChange={this.handleSelectChange}
                  handleSimpleInputChange={this.onChangeInput}
                />
              </div>
              <br />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProfileDetail);
