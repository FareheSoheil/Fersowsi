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
import RichText from '../../../../components/RichText';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import Spinner from '../../../../components/Admin/Spinner';
import Claim from '../../../../components/Admin/Claim';
import s from './ClaimDetails.css';
import { SERVER, ROLES } from '../../../../constants';
class ClaimDetails extends React.Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      publisherOrderId: this.props.context.query.orderId,
      claimId: this.props.context.query.id,
      customerId: '',
      publisherId: '',
      allClaimsOfOrder: [],
      newClaim: '',
      sendEmail: false,
      userId: '',
    };
    this.fetchClaims = this.fetchClaims.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.sendClaimByAdmin = this.sendClaimByAdmin.bind(this);
    this.sendClaimToAdmin = this.sendClaimToAdmin.bind(this);
    this.onEmailCheck = this.onEmailCheck.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    this.fetchClaims();
    this.setState({
      role: localStorage.getItem('role'),
    });
  }
  handleInputChange(id, event) {
    let state, value;
    if (event.target.type === 'radio') {
      state = 'accountStatus';
      value = parseInt(event.target.value);
    } else {
      state = event.target.name;
      value = event.target.value;
    }

    let accountsSearchFilter = { ...this.state.accountsSearchFilter };
    accountsSearchFilter[state] = value;
    this.setState({ accountsSearchFilter, searchClear: false });
  }
  handleEditorChange(e) {
    this.setState({ newClaim: e.target.getContent() });
  }
  fetchClaims() {
    const url = `${SERVER}/getClaimCollection`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      publisherOrderId: this.state.publisherOrderId,
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
        console.log('msgs : ', response.claims);
        that.setState({
          allClaimsOfOrder: response.claims,
          customerId: response.publisherId,
          isLoading: false,
          firstRender: false,
        });
      },
      error => {
        console.log(error);
      },
    );
  }
  handlePageChange(pageIndex) {
    this.setState({ pageIndex: pageIndex.selected });
    this.fetchClaims();
  }
  sendClaimByAdmin(user) {
    let isCustomer;
    user == 'customer' ? (isCustomer = true) : (isCustomer = false);
    const url = `${SERVER}/addClaimByAdmin`;
    const credentials = {
      publisherOrderId: this.state.publisherOrderId,
      receiverIsCustomer: isCustomer,
      sendEmail: this.state.sendEmail,
      messageHtml: `{"content":"${this.state.newClaim}"}`,
      //  `{"value":0,"lable":'',content:}`,
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('cred : ', credentials);
    const that = this;
    fetchWithTimeOut(
      url,
      options,
      response => {
        console.log('insert Claim : ', response);
        that.fetchClaims();
      },
      error => {
        console.log(error);
      },
    );
  }
  sendClaimToAdmin() {
    const url = `${SERVER}/addClaimByCustomerOrPublisher`;
    const credentials = {
      publisherOrderId: this.state.publisherId,
      messageHtml: this.state.newClaim,
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
        that.fetchClaims();
      },
      error => {
        console.log(error);
      },
    );
  }
  onEmailCheck() {
    let preVal = this.state.sendEmail;
    window.alert(preVal);
    this.setState({
      sendEmail: !preVal,
    });
  }
  render() {
    let claims = <div>No Message</div>;
    if (!this.state.isLoading && this.state.allClaimsOfOrder.length != 0)
      claims = this.state.allClaimsOfOrder.map((claim, i) => (
        <Claim claim={claim} userId={this.state.customerId} />
      ));
    return (
      <div className="container-fluid dashboard-content">
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div className={s.container}>
            {/* {} */}
            <div className={s.claimsListContainer}>{claims}</div>
            <div className={s.rixtContainer}>
              <hr />
              <h3>
                {' '}
                Add a claim : <br />
              </h3>
              <RichText
                min_height={300}
                width="80%"
                initialValue="new claim ..."
                handleEditorChange={this.handleEditorChange}
              />
              <br />

              {this.state.role == ROLES.publisher.value ? (
                <div className="row">
                  <div className="offset-1 col-xl-3 mb-1">
                    <button
                      onClick={() => this.sendClaimByAdmin('customer')}
                      className={`${s.btn} ${s.sendPub}`}
                    >
                      {' '}
                      Send Message To Publisher{' '}
                    </button>
                  </div>
                  <div className="col-xl-3 mb-1">
                    <button
                      onClick={() => this.sendClaimByAdmin('publisher')}
                      className={`${s.btn} ${s.sendCus}`}
                    >
                      {' '}
                      Send Message To Customer{' '}
                    </button>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3">
                    <label className="custom-color-theme custom-control custom-radio custom-control-inline">
                      <input
                        type="checkbox"
                        name="sendEmail"
                        className="custom-control-input"
                        value={!this.state.sendEmail}
                        onChange={this.onEmailCheck}
                        checked={this.state.sendEmail}
                      />
                      <span className="custom-control-label">
                        Send By Email
                      </span>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="offset-1 col-xl-3 mb-1">
                    <button
                      onClick={() => this.sendClaimToAdmin()}
                      className={`${s.btn} ${s.sendCus}`}
                    >
                      {' '}
                      Send Message To Admin{' '}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(s)(ClaimDetails);
