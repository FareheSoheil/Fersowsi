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
import { toastr } from 'react-redux-toastr';
import ProfileInfo from '../../../components/Profile/ProfileInfo';
import ProfileProInfo from '../../../components/Profile/ProfileProInfo';
import Spinner from '../../../components/Admin/Spinner';

import PageHeader from '../../../components/Admin/PageHeader';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import { SERVER, AVATAR } from '../../../constants';
import { USER_ACTIVITION_STATUS_ARRAY } from '../../../constants/constantData';
import s from './AddUser.css';
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
        contractName: '',
        companyName: '',
        password: '',
        email: '',
        username: '',
        phoneNumber: '',
        mobileNumber: '',
        faxNumber: '',
        homepage: '',
        VatId: '',
        dateOfBirth: new Date(),
        psn: '',
        discount: '',
        nonLocalDiscount: '',
        emailConfirmed: true,
        profilePic: AVATAR,
        bio: '',
        contractName: 'dasdsfsd',
        roleId: 4,
        userActivitionStatusId: '',
        expectedPaymentMethod: '',
        countryId: '',
        roleId: '',
        jobId: '',
        userSubCategoryId: '',
        currencyId: '',
        glmCode: '',
        referenceNo: '',
        eoriNo: '',
        bankName: '',
        AccountNo: '',
        iban: '',
        swiftAddress: '',
        bankGiro: '',
        addressId: '',
        UserActivitionStatus: USER_ACTIVITION_STATUS_ARRAY[0],
        UserSubCategory: {},
        Role: {},
        Job: {},
        Currency: '',
        address: {
          province: '',
          city: '',
          detailAddress: '',
          zipCode: '',
          Country: '',
        },
        Country: '',
        claims: [],
        addresses: [],
        customerInvoices: [],
        orders: [],
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
    this.onUserAdd = this.onUserAdd.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onAddressSelectChange = this.onAddressSelectChange.bind(this);
  }
  componentDidMount() {
    this.fetchAllInfo();
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
  onUserAdd() {
    const url = `${SERVER}/addUser`;
    let cred = { ...this.state.user };

    cred.vatId = this.state.user.VatId;
    cred.languageId = 22;
    cred.userActivitionStatusId = this.state.user.UserActivitionStatus.value;
    cred.countryId = this.state.user.Country.value;
    cred.jobId = this.state.user.Job.value;
    cred.roleId = this.state.user.Role.value;
    cred.userSubCategoryId = this.state.user.UserSubCategory.value;
    cred.currencyId = this.state.user.Currency.value;
    cred.address.countryId = this.state.user.address.Country.value;
    cred.discount = parseFloat(this.state.user.discount);
    cred.nonLocalDiscount = parseFloat(this.state.user.nonLocalDiscount);
    console.log(cred);
    const options = {
      method: 'POST',
      body: JSON.stringify(cred),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetchWithTimeOut(
      url,
      options,
      response => {
        if (response.error == undefined) {
          toastr.success('', 'User Added Successfully');
        } else {
          toastr.error(response.error.title, response.error.description);
        }
      },
      error => {
        toastr.error('', "Couldn't Add User");
      },
    );
  }
  onAddressChange(e) {
    let user = { ...this.state.user };
    const value = event.target.value;
    const state = event.target.name;
    user.address[state] = value;
    this.setState({ user: user });
  }
  onAddressSelectChange(so) {
    let user = { ...this.state.user };

    user.address.Country = so;
    this.setState({ user: user });
  }
  onChangeInput(event) {
    let value;
    if (event.target.type === 'checkbox') value = event.target.checked;
    else value = event.target.value;
    const state = event.target.name;
    // window.alert(typeof value);
    let user = { ...this.state.user };
    user[state] = value;
    this.setState({ user });
  }
  changeStatus(value) {
    let user = { ...this.state.user };
    user.emailConfirmed = value;
    this.setState({ user: user });
  }
  handleDateChange(date) {
    let user = { ...this.state.user };
    user.dateOfBirth = date;
    this.setState({ user });
  }
  handleSelectChange = (selectedOption, op) => {
    let user = { ...this.state.user };
    user[op] = selectedOption;
    console.log(op, '  :  ', selectedOption);
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
                  isForAdd={true}
                  user={this.state.user}
                  onAddressSelectChange={this.onAddressSelectChange}
                  onAddressChange={this.onAddressChange}
                  countries={this.state.countries}
                  userStatus={this.state.user.UserActivitionStatus}
                  handleSimpleInputChange={this.onChangeInput}
                  changeStatus={this.changeStatus}
                  handleDateInputChange={this.handleDateChange}
                  editUser={this.onUserEdit}
                />
                {/* Campaing data */}
                <ProfileProInfo
                  isForAdd={true}
                  user={this.state.user}
                  onUserEditAdd={this.onUserAdd}
                  pageCount={this.state.user.claims.length / 15}
                  countries={this.state.countries}
                  jobs={this.state.jobs}
                  siteLanguages={this.state.siteLanguages}
                  currencies={this.state.currencies}
                  handleSelectInputChange={this.handleSelectChange}
                  handleSimpleInputChange={this.onChangeInput}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AddUser);
