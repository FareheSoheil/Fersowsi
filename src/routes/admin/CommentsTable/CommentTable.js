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
import ReactPaginate from 'react-paginate';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import { fetchURL } from '../../../constants';
import s from './CommentTable.css';
import Spinner from '../../../components/Admin/Spinner';

class CommentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      firstRender: true,
      currentPage: '',
      totalPageNum: '',
      currentComments: '',
      searchFilter: '',
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  fetchComments() {
    const url = fetchURL;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      searchBy: this.state.searchFilter,

      pageNumber: this.state.currentPageNumber,
    };
    console.log('credentials in search and sort: ', credentials, this.state);
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
          currentComments: response[currentRecordsName],
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
  handlePageChange(pageNumber) {
    console.log('active page is', pageNumber);
    // this.setState({ activePage: pageNumber });
  }
  render() {
    return (
      <div className="container-fluid dashboard-content">
        <div className="row">
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
              <div className="card">
                <h5 className="card-header">Comments</h5>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className={`table table-hover ${s.hoverableTr}`}>
                      <thead className="bg-light">
                        <tr className="border-0">
                          <th className="border-0">#</th>
                          <th className="border-0">Product Name</th>
                          <th className="border-0">Product Id</th>
                          <th className="border-0">Quantity</th>
                          <th className="border-0">Price</th>
                          <th className="border-0">Order Time</th>
                          <th className="border-0">Customer</th>
                          <th className="border-0">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Product #1 </td>
                          <td>id000001 </td>
                          <td>20</td>
                          <td>$80.00</td>
                          <td>27-08-2018 01:22:12</td>
                          <td>Patricia J. King </td>
                          <td>
                            <span className="badge-dot badge-brand mr-1" />InTransit{' '}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div>
                      <ReactPaginate
                        previousLabel="<"
                        nextLabel=">"
                        pageCount={20}
                        pageRangeDisplayed={3}
                        onPageChange={this.handlePageChange}
                        marginPagesDisplayed={1}
                        containerClassName="paginate"
                        subContainerClassName="pages paginate"
                        activeClassName="active-page"
                        breakClassName="break-me"
                        disableInitialCallback
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CommentTable);
