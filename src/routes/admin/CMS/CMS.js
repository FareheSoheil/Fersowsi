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
import history from '../../../history';
import s from './CMS.css';
import Spinner from '../../../components/Admin/Spinner';
import CMSTable from '../../../components/Admin/CMS/CMSTable';
import RowAdder from '../../../components/moreTableRowSelector';
import { SERVER } from '../../../constants';
class CMS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.context.params.id,
      isLoading: false,
      pageIndex: 0,
      pageSize: 10,
      totalPageNum: '',
      currentCMSs: '',
      type: '',
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.fetchCMSs = this.fetchCMSs.bind(this);
    this.onCMSCLick = this.onCMSCLick.bind(this);
    this.showMore = this.showMore.bind(this);
  }

  componentDidMount() {
    this.fetchCMSs();
  }

  fetchCMSs() {
    const url = `${SERVER}/getAllCMS`;

    this.setState({
      isLoading: true,
    });
    const credentials = {
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
          currentCMSs: response.currentRecords,
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
      this.fetchCMSs();
    });
  }

  onCMSCLick(str) {
    history.push(str);
  }
  showMore(num) {
    this.setState(
      {
        pageSize: num,
      },
      () => {
        this.fetchCMSs();
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
                <h5 className="card-header">All CMS</h5>
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

                    <CMSTable
                      ondel={this.fetchCMSs}
                      pageSize={this.state.pageSize}
                      pageCount={this.state.totalPageNum}
                      currentPageNumber={this.state.pageIndex}
                      records={this.state.currentCMSs}
                      handlePageChange={this.handlePageChange}
                      onRecordClick={this.onCMSCLick}
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

export default withStyles(s)(CMS);
