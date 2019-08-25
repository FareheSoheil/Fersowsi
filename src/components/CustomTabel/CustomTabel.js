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
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import s from './CustomTabel.css';

class CustomTabel extends React.Component {
  static propTypes = {
    pageCount: PropTypes.number.isRequired,
    currentPageNumber: PropTypes.number.isRequired,
    records: PropTypes.array.isRequired,
    columnLabels: PropTypes.array.isRequired,
    recordItemNames: PropTypes.array.isRequired,
    onRecordClick: PropTypes.func.isRequired,
    handlePageChange: PropTypes.func.isRequired,
  };

  render() {
    //   vars[labels[0]]);
    console.log('recordItemNames : ', this.props.recordItemNames);
    console.log('recordItem : ', this.props.recordItemNames[3]);
    const tableHeaders = this.props.columnLabels.map((label, i) => (
      <th className="border-0">{label}</th>
    ));
    console.log('records : ', this.props.records);
    const records = this.props.records.map((record, i) => (
      <tr
        onClick={() => {
          this.props.onRecordClick(record.id);
        }}
      >
        <td>{i + 1}</td>
        {this.props.recordItemNames.map(label => <td>{record[label]}</td>)}
      </tr>
    ));
    return (
      <div>
        <h4 className="card-header">{this.props.title}</h4>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
            <div className="table-responsive">
              <table
                className={`table table-hover table-bordered ${s.hoverableTr}`}
              >
                <thead className="bg-light">
                  <th>#</th>
                  {tableHeaders}
                </thead>
                <tbody>{records}</tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Pagination */}
        <div className="row">
          <div className="col-12">
            <ReactPaginate
              previousLabel="<"
              nextLabel=">"
              pageCount={this.props.pageCount}
              pageRangeDisplayed={3}
              onPageChange={this.props.handlePageChange}
              marginPagesDisplayed={1}
              containerClassName="paginate"
              subContainerClassName="pages paginate"
              activeClassName="active-page"
              breakClassName="break-me"
              initialPage={this.props.currentPageNumber}
              disableInitialCallback
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CustomTabel);