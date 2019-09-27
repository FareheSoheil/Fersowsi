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
import Select from 'react-select';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import { fetchURL, SERVER } from '../../../constants';
import s from './CommentTable.css';
import Spinner from '../../../components/Admin/Spinner';

class CommentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      firstRender: true,
      currentPageNumber: 0,
      totalPageNum: '',
      currentComments: '',
      searchFilter: '',
      productComment: '',
      productName: '',
      selectedOption: null,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.fetchComments = this.fetchComments.bind(this);
    this.commentDetails = this.commentDetails.bind(this);
    this.modifyComment = this.modifyComment.bind(this);
  }
  componentDidMount() {
    this.fetchComments();
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log('comment : ', selectedOption);
  };
  commentDetails(id, msg) {
    this.setState({
      productComment: msg,
      productName: id,
    });
  }
  modifyComment(status) {
    const url = `${SERVER}/modifyComments`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      productId: this.state.productId,
      status: status,
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
        that.fetchComments();
      },
      error => {
        console.log(error);
      },
    );
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
          currentComments: response.currentRecords,
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
    this.setState({ currentPageNumber: pageNumber.selected });
    this.fetchComments();
  }
  render() {
    const options = [
      { id: 1, name: 'sss', label: 'Chocolate' },
      { value: 2, label: 'Strawberry' },
      { value: 3, label: 'Vanilla' },
    ];
    let comments = '';
    if (!this.state.isLoading)
      comments = this.state.currentComments.map((comment, i) => (
        <tr>
          <td>{i + 1}</td>
          <td>{comment.id}</td>
          <td>{comment.productName} </td>
          <td>{comment.username}</td>
          <td>{comment.repliedCommentId}</td>
          <td>
            <span className="badge-dot badge-brand mr-1" />
            {comment.status}
          </td>
          <td>{comment.createdAt}</td>
          <td>
            <a
              onClick={() =>
                this.commentDetails(comment.productName, comment.text)
              }
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              See the text
            </a>
          </td>
        </tr>
      ));
    return (
      <div className="container-fluid dashboard-content">
        <div className="row">
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
              <div className="card">
                <h4 className="card-header">Comments</h4>
                <div className="card-body p-0">
                  <div className="container-fluid">
                    <div class="row reactSelectContainer">
                      <div class="reactSelectLabel">Product Name :</div>
                      <div class="col-xl-4 col-lg-6 col-md-8 col-sm-8 col-7">
                        <Select
                          value={this.state.selectedOption}
                          onChange={this.handleChange}
                          options={options}
                          isSearchable
                          className="reactSelect"
                          classNamePrefix="innerSelect"
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                        <div className="table-responsive">
                          <table
                            className={`table table-hover table-bordered ${
                              s.hoverableTr
                            }`}
                          >
                            <thead className="bg-light">
                              <tr className="border-0">
                                <th className="border-0">#</th>
                                <th className="border-0">Comment Id</th>
                                <th className="border-0">Product Name</th>
                                <th className="border-0">Username</th>
                                <th className="border-0">Replied to</th>
                                <th className="border-0">Status</th>
                                <th className="border-0">Created at</th>
                                <th className="border-0">text</th>
                              </tr>
                            </thead>
                            <tbody>{comments}</tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Modal */}
                  <div className="row">
                    <div className="col-12">
                      <div class="card-body">
                        <div>
                          <div
                            class="modal fade"
                            id="exampleModal"
                            tabindex="-1"
                            role="dialog"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div class="modal-dialog" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5
                                    class="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    text of {this.state.productName} comment:
                                  </h5>
                                  <a
                                    href="#"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </a>
                                </div>
                                <div class="modal-body">
                                  <p>{this.state.productComment}</p>
                                </div>
                                <div class="modal-footer">
                                  <a
                                    href="#"
                                    class="btn btn-secondary"
                                    data-dismiss="modal"
                                  >
                                    Close
                                  </a>
                                  <a
                                    data-dismiss="modal"
                                    href="#"
                                    class="btn btn-danger"
                                    onClick={() => this.modifyComment('reject')}
                                  >
                                    Reject
                                  </a>
                                  <a
                                    data-dismiss="modal"
                                    href="#"
                                    class="btn btn-success"
                                    onClick={() => this.modifyComment('accept')}
                                  >
                                    Accept
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <ReactPaginate
                        previousLabel="<<"
                        nextLabel=">>"
                        pageCount={20}
                        pageRangeDisplayed={3}
                        onPageChange={this.handlePageChange}
                        marginPagesDisplayed={1}
                        containerClassName="paginate"
                        subContainerClassName="pages paginate"
                        activeClassName="active-page"
                        breakClassName="break-me"
                        initialPage={this.state.currentPageNumber}
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
