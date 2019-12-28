/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import s from './AddressHistory.css';
import Spinner from '../../../components/Admin/Spinner';
import HistoryTable from '../../../components/HistoryTable';
import RowAdder from '../../../components/moreTableRowSelector';
import { SERVER } from '../../../constants';
class AddressHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.context.params.id,
      isLoading: false,
      pageIndex: 0,
      pageSize: 10,
      totalPageNum: '',
      currentHistories: '',
      type: 'Address Change',
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.fetchHistories = this.fetchHistories.bind(this);
    this.onHisClick = this.onHisClick.bind(this);
    this.showMore = this.showMore.bind(this);
  }

  componentDidMount() {
    this.fetchHistories();
  }

  fetchHistories() {
    const url = `${SERVER}/getAllOrderActionHistories`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      orderId: this.state.id,
      type: this.state.type,
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
          currentHistories: response.currentRecords,
          totalPageNum: response.totalPageNum,
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
    this.setState({ pageIndex: pageIndex.selected }, () => {
      this.fetchHistories();
    });
  }

  // onHisClick(id) {
  //   history.push(`/admin/accounts/${id}`);
  // }
  showMore(num) {
    this.setState(
      {
        pageSize: num,
      },
      () => {
        this.fetchHistories();
      },
    );
  }
  render() {
    return (
      <div className="container-fluid dashboard-content">
        <div className="row">
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="card">
                <h5 className="card-header">All Address History</h5>
                <div className="card-body p-0">
                  <div className="container-fluid">
                    <div className={`${s.btnContainer} row`}>
                      <div className="col-xl-1 col-md-1 col-sm-2">
                        <RowAdder
                          showMore={this.showMore}
                          pageSize={this.state.pageSize}
                        />
                      </div>
                    </div>

                    <HistoryTable
                      pageSize={this.state.pageSize}
                      pageCount={this.state.totalPageNum}
                      currentPageNumber={this.state.pageIndex}
                      records={this.state.currentHistories}
                      handlePageChange={this.handlePageChange}
                      onRecordClick={this.onHisClick}
                    />
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

export default withStyles(s)(AddressHistory);
