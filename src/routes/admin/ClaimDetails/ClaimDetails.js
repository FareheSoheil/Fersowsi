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
import RichText from '../../../components/RichText';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import Spinner from '../../../components/Admin/Spinner';
import Claim from '../../../components/Claim';
import s from './ClaimDetails.css';
import { SERVER } from '../../../constants';
class ClaimDetails extends React.Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      customerOrderId: this.props.context.query.orderId,
      claimId: this.props.context.query.id,

      allClaimsOfOrder: [
        {
          id: 1,
          messageHtml: '<html><head></head><body>Hello</body></html>',
          messageStatus: { value: 1, label: 'accepted' },
          senderUser: {
            id: 6,
            email: 'customer1@gmail.com',
            firstName: 'Customer',
            lastName: 'Customer',
            profilePic: null,
          },
          receiverUser: {
            id: 4,
            email: 'publisher1@gmail.com',
            firstName: 'Publisher',
            lastName: 'Publisher',
            profilePic: null,
          },
          actionUser: {
            id: 6,
            email: 'customer1@gmail.com',
            firstName: 'Customer',
            lastName: 'Customer',
            profilePic: null,
          },
          messageStatusId: 3,
          repliedMessageId: 0,
          imageAddress: '',
          createdAt: '2019-10-08T13:53:59.000Z',
          updatedAt: '2019-10-08T13:53:59.000Z',
          customerOrderId: 1,
        },
        {
          id: 2,
          messageHtml: '<html><head></head><body>Hello My Friend</body></html>',
          messageStatus: { value: 1, label: 'accepted' },
          senderUser: {
            id: 4,
            email: 'publisher1@gmail.com',
            firstName: 'Publisher',
            lastName: 'Publisher',
            profilePic: null,
          },
          receiverUser: {
            id: 6,
            email: 'customer1@gmail.com',
            firstName: 'Customer',
            lastName: 'Customer',
            profilePic: null,
          },
          actionUser: {
            id: 4,
            email: 'publisher1@gmail.com',
            firstName: 'Publisher',
            lastName: 'Publisher',
            profilePic: null,
          },
          messageStatusId: 3,
          repliedMessageId: 0,
          imageAddress: '',
          createdAt: '2019-10-08T13:53:59.000Z',
          updatedAt: '2019-10-08T13:53:59.000Z',
          customerOrderId: 1,
        },
        {
          id: 3,
          messageStatus: { value: 1, label: 'accepted' },
          messageHtml:
            '<html><head></head><body>My magazine was not delivered yet</body></html>',
          senderUser: {
            id: 6,
            email: 'customer1@gmail.com',
            firstName: 'Customer',
            lastName: 'Customer',
            profilePic: null,
          },
          receiverUser: {
            id: 4,
            email: 'publisher1@gmail.com',
            firstName: 'Publisher',
            lastName: 'Publisher',
            profilePic: null,
          },
          actionUser: {
            id: 6,
            email: 'customer1@gmail.com',
            firstName: 'Customer',
            lastName: 'Customer',
            profilePic: null,
          },
          messageStatusId: 3,
          repliedMessageId: 0,
          imageAddress: '',
          createdAt: '2019-10-08T13:53:59.000Z',
          updatedAt: '2019-10-08T13:53:59.000Z',
          customerOrderId: 1,
        },
      ],
      newClaim: '',
    };
    this.fetchClaims = this.fetchClaims.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.sendClaim = this.sendClaim.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    // this.fetchClaims();
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
    console.log('Content was updated:', e.target.getContent());
    this.setState({ newClaim: e.target.getContent() });
  }
  fetchClaims() {
    console.log('this.props.context.params : ', this.props.context);
    const url = `${SERVER}/getClaim`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      customerOrderId: this.state.customerOrderId,
      searchBy: this.state.claimsSearchFilter,
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize,
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
        that.setState({
          allClaimsOfOrder: response,
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
  sendClaim() {
    window.alert('send new claim with user id and trigger user id');
  }
  render() {
    let claims = <div>Nothing</div>;
    if (
      !this.state.isLoading &&
      this.state.allClaimsOfOrder !== undefined &&
      this.state.allClaimsOfOrder.length !== 0
    )
      claims = this.state.allClaimsOfOrder.map((claim, i) => (
        <Claim claim={claim} orderId={this.state.customerOrderId} />
      ));
    return (
      <div className="container-fluid dashboard-content">
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div className={s.container}>
            {/* {} */}
            <div className={s.claimsListContainer}>
              {claims}
              {/* <div className="row">
                <div className="col-12">
                  <ReactPaginate
                    previousLabel="<"
                    nextLabel=">"
                    pageCount={this.state.pageCount}
                    pageRangeDisplayed={3}
                    onPageChange={this.handlePageChange}
                    marginPagesDisplayed={1}
                    containerClassName="paginate"
                    subContainerClassName="pages paginate"
                    activeClassName="active-page"
                    breakClassName="break-me"
                    initialPage={this.state.pageIndex}
                    disableInitialCallback
                  />
                </div>
              </div> */}
            </div>
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
              <button onClick={this.sendClaim} className="btn btn-success">
                {' '}
                Send Claim{' '}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(s)(ClaimDetails);
