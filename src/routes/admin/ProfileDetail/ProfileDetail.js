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
import cookie from 'react-cookies';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { toastr } from 'react-redux-toastr';
import ProfileInfo from '../../../components/Profile/ProfileInfo';
import ProfileProInfo from '../../../components/Profile/ProfileProInfo';
import Spinner from '../../../components/Admin/Spinner';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import { nullFillerHelper } from '../../../nullFillerHelper';
import s from './ProfileDetail.css';
import {
  SERVER,
  SSRSERVER,
  AVATAR,
  COOKIE_EXPIRATION,
} from '../../../constants';
import history from '../../../history';

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
        id: this.props.context.params.id,
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
    this.onUserDelete = this.onUserDelete.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.setAvatar = this.setAvatar.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onAddressSelectChange = this.onAddressSelectChange.bind(this);
  }
  componentDidMount() {
    // window.alert;
    this.fetchUser();
    // this.fetchAllInfo();
  }
  // TO DO
  reponseValidator(tmp) {
    if (tmp.address === null || tmp.address === undefined) tmp.address = {};
    if (
      tmp.UserActivitionStatus === null ||
      tmp.UserActivitionStatus === undefined
    )
      tmp.UserActivitionStatus = {};
    if (tmp.Country === null || tmp.Country === undefined) tmp.Country = {};
    if (tmp.Job === null || tmp.Job === undefined) tmp.Job = {};
    if (tmp.Role === null || tmp.Job === undefined) tmp.Role = {};
    if (tmp.UserSubCategory === null || tmp.UserSubCategory === undefined)
      tmp.UserSubCategory = {};
    if (tmp.Currency === null || tmp.Currency === undefined) tmp.Currency = {};
    if (tmp.Country === null || tmp.Country === undefined) tmp.Country = {};

    if (tmp.dateOfBirth === null || tmp.dateOfBirth === undefined)
      tmp.dateOfBirth = new Date();
  }
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
        if (response.error == undefined) {
          let tmp = { ...response.user };
          this.reponseValidator(tmp);
          nullFillerHelper(tmp);
          that.setState(
            {
              user: tmp,
            },
            () => {
              console.log('state : ', that.state.user);
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
                  // window.alert('all fetched');
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
        } else window.alert(response.error.title);
      },
      error => {
        console.log(error);
      },
    );
  }
  onUserEdit() {
    const url = `${SERVER}/editUser`;
    let cred = { ...this.state.user };
    if (this.errorHanlder(cred)) {
      cred.vatId = cred.VatId;
      cred.languageId = 22;
      cred.userActivitionStatusId = cred.UserActivitionStatus.value;
      cred.countryId = cred.Country.value;
      cred.jobId = cred.Job.value;
      cred.roleId = cred.Role.value;
      cred.userSubCategoryId = cred.UserSubCategory.value;
      cred.currencyId = cred.Currency.value;
      cred.address.countryId = cred.address.Country.value;
      cred.discount = 0.3;
      //  parseFloat(this.state.user.discount);
      cred.nonLocalDiscount = 0.4;
      // parseFloat(this.state.user.nonLocalDiscount);
      // nullFillerHelper(cred);
      console.log('cred : ', JSON.stringify(cred));
      console.log('cred : ', cred);
      if (this.state.user.profilePic == null) cred.profilePic = '';
      const options = {
        method: 'POST',
        body: JSON.stringify(cred),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const that = this;
      fetchWithTimeOut(
        url,
        options,
        response => {
          if (response.error == undefined) {
            toastr.success('', 'User Edited Successfully');
            that.setState({
              user: cred,
            });
          } else {
            toastr.error(response.error.title, response.error.description);
          }
        },
        error => {
          toastr.error('', "Couldn't save the changes");
        },
      );
    }
  }
  errorHanlder(obj) {
    let pass = true;
    if (obj.email == '') {
      toastr.error('Edit UserError', 'Email can not be empty');
      pass = false;
    } else if (
      Object.entries(obj.address).length === 0 ||
      Object.entries(obj.address.Country).length === 0
    ) {
      toastr.error('Add UserError', 'Address Country can not be empty');
      pass = false;
    } else if (Object.entries(obj.UserActivitionStatus).length === 0) {
      toastr.error('Add UserError', 'User Status can not be empty');
      pass = false;
    } else if (Object.entries(obj.Country).length === 0) {
      // else if (obj.address.province == '') {
      //   toastr.error('Add UserError', 'Province can not be empty');
      //   pass = false;
      // } else if (obj.address.city == '') {
      //   toastr.error('Add UserError', 'City can not be empty');
      //   pass = false;
      // } else if (obj.address.detailAddress == '') {
      //   toastr.error('Add UserError', 'Address can not be empty');
      //   pass = false;
      // } else if (obj.address.zipCode == '') {
      //   toastr.error('Add UserError', 'Zip Code can not be empty');
      //   pass = false;
      // }
      toastr.error('Add UserError', 'Country can not be empty');
      pass = false;
    } else if (Object.entries(obj.Job).length === 0) {
      toastr.error('Add UserError', 'Job can not be empty');
      pass = false;
    } else if (Object.entries(obj.Currency).length === 0) {
      toastr.error('Add UserError', 'Currency can not be empty');
      pass = false;
    } else if (Object.entries(obj.Role).length === 0) {
      toastr.error('Add UserError', 'Role can not be empty');
      pass = false;
    } else if (obj.VatId == '') {
      toastr.error('Add UserError', 'VAT Id can not be empty');
      pass = false;
    } else if (obj.psn == '') {
      toastr.error('Add UserError', 'PSN Id can not be empty');
      pass = false;
    } else if (
      isNaN(parseFloat(obj.discount)) ||
      !isFinite(obj.discount) ||
      parseFloat(obj.discount) > 100
    ) {
      toastr.error(
        'Add UserError',
        'User discount should be a number less than 100',
      );
      pass = false;
    } else if (
      isNaN(parseFloat(obj.nonLocalDiscount)) ||
      !isFinite(obj.nonLocalDiscount) ||
      parseFloat(obj.nonLocalDiscount) > 100
    ) {
      toastr.error(
        'Add UserError',
        'User Non Local Discount should be a number less than 100',
      );
      pass = false;
    } else if (Object.entries(obj.UserSubCategory).length === 0) {
      if (obj.Role.value == ROLES.customer.value) {
        toastr.error('Add UserError', 'SubCategory can not be empty');
        pass = false;
      } else obj.UserSubCategory = USER_SUBCATEGORY_ARRAY[4];
    }
    // window.alert(pass);
    return pass;
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
    if (value) toastr.success('', 'User Email Confirmed');
    else toastr.error('', 'User Email Disconfirmed');
    user.emailConfirmed = value;
    this.setState({ user: user });
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
  setAvatar(src) {
    let user = { ...this.state.user };
    user.profilePic = src;
    this.setState({ user: user });
  }
  onUserDelete() {
    if (confirm('Are you sure you want to delete this user?')) {
      const url = `${SERVER}/deleteUser`;
      const cred = {
        userId: this.state.id,
      };
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
            toastr.success('', 'User Deleted Successfully');
            history.goBack();
          } else {
            toastr.error('', "Couldn't Delete the user");
          }
        },
        error => {
          toastr.error('', "Couldn't Delete the User");
        },
      );
    }
  }

  onAct(id) {
    const url = `${SERVER}/loginInsteadACustomer`;
    const cred = {
      userId: id,
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(cred),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const that = this;
    fetchWithTimeOut(
      url,
      options,
      response => {
        if (response.error === undefined) {
          const setStateURL = `${SSRSERVER}/state/setState`;
          const setStateOptions = {
            method: 'POST',
            body: JSON.stringify(response),
            headers: {
              'Content-Type': 'application/json',
            },
          };
          fetchWithTimeOut(setStateURL, setStateOptions, () => {
            const expires = new Date();
            const now = new Date();
            expires.setDate(now.getDate() + COOKIE_EXPIRATION);

            cookie.save('role', response.role.value, {
              path: '/',
              expires,
            });
            cookie.save('TokenId', response.TokenId, {
              path: '/',
              expires,
            });

            cookie.save('userSubCategory', response.userSubCategory.value, {
              path: '/',
              expires,
            });
            localStorage.setItem('TokenId', response.TokenId);
            localStorage.setItem('id', response.id);
            localStorage.setItem('role', response.role.value);
            history.push('/user/products');
          });
        } else {
          toastr.error(response.error.title, response.error.description);
        }
      },
      error => {
        console.log(error);
      },
    );
  }
  // componentDidMount() {}
  render() {
    return (
      <div class="influence-profile">
        <div class="container-fluid dashboard-content ">
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <div>
              <div className={`row ${s.container}`}>
                <ProfileInfo
                  isForAdd={false}
                  user={this.state.user}
                  onAddressSelectChange={this.onAddressSelectChange}
                  onAddressChange={this.onAddressChange}
                  countries={this.state.countries}
                  setAvatar={this.setAvatar}
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
                    id: this.state.user.id,
                    Role: this.state.user.Role,
                    Country: this.state.user.Country,
                    Currency: this.state.user.Currency,
                    UserSubCategory: this.state.user.UserSubCategory,
                    UserActivitionStatus: this.state.user.UserActivitionStatus,
                    Job: this.state.user.Job,
                    nonLocalDiscount: this.state.user.nonLocalDiscount,
                    claims: this.state.user.claims,
                    addresses: this.state.user.addresses,
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
                    expectedPaymentMethod: this.state.user
                      .expectedPaymentMethod,
                    discount: this.state.user.discount,
                    customerOrders: this.state.user.customerInvoices,
                    publisherOrders: this.state.user.orders,
                    handleSimpleInputChange: this.onChangeInput,
                    handleDateInputChange: this.handleDateChange,
                  }}
                  onUserDelete={this.onUserDelete}
                  onUserEditAdd={this.onUserEdit}
                  onAct={this.onAct}
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
