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
import ReactPaginate from 'react-paginate';
import Spinner from '../../../components/Admin/Spinner';
import Claim from '../../../components/Claim';
import history from '../../../history';
import s from './ClaimDetails.css';

class ClaimDetails extends React.Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      orderId: this.props.context.params.oid,
      claimId: this.props.context.params.cid,
      pageIndex: 1,
      pageSize: 3,
      pageCount: 5,
      allClaimsOfOrder: [{ a: 1 }, { a: 1 }, { a: 1 }],
      newClaim: '',
    };
    this.fetchClaims = this.fetchClaims.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.sendClaim = this.sendClaim.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
    const url = 'http://localhost:3004/getClaimsOfOrder';
    this.setState({
      isLoading: true,
    });
    const credentials = {
      orderId: this.state.orderId,
      searchBy: 'this.state.claimsSearchFilter',
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
          allClaimsOfOrder: response.allCalims,
          totalPageNum: response.totalPageNumber,
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
    // this.fetchClaims();
  }
  sendClaim() {
    window.alert('send new claim with user id and trigger user id');
  }
  render() {
    console.log('context : ', this.props.context);
    console.log('history : ', history.location);
    let claims = <div>Nothing</div>;
    if (
      this.state.allClaimsOfOrder !== undefined &&
      this.state.allClaimsOfOrder.length !== 0
    )
      claims = this.state.allClaimsOfOrder.map((claim, i) => (
        <Claim
          claim={{
            senderUsername: 'abbas',
            isFinished: true,
            acceptedByAdmin: false,
            b: 2,
            messageHtml: '<div><i>hello</i></div>',
            messageStatus: { value: 1, label: 'Accepted' },
          }}
        />
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
              <div className="row">
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
              </div>
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
                initialValue="sala azizam"
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
