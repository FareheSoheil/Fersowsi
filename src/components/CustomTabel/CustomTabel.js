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
    hasPagination: PropTypes.bool.isRequired,
    currentPageNumber: PropTypes.number.isRequired,
    records: PropTypes.array.isRequired,
    columnLabels: PropTypes.array.isRequired,
    recordItemNames: PropTypes.array.isRequired,
    onRecordClick: PropTypes.func.isRequired,
    handlePageChange: PropTypes.func.isRequired,
  };
  static defaultProps = {
    hasPagination: true,
  };

  render() {
    const tableHeaders = this.props.columnLabels.map((label, i) => (
      <th className="border-0">{label}</th>
    ));
    let records = '';
    let toDisplay = <div className={s.noRecords}> No Match Found</div>;
    if (this.props.records !== undefined && this.props.records.length !== 0) {
      records = this.props.records.map((record, i) => (
        <tr
          onClick={() => {
            this.props.onRecordClick(record.id, record.publisherOrderId);
          }}
        >
          <td>{i + 1}</td>
          {this.props.recordItemNames.map(
            label =>
              label === 'profilePic' || label === 'coverImage' ? (
                <td>
                  <img
                    className={
                      label === 'profilePic' ? s.profilePicContiner : ''
                    }
                    src={record[label]}
                    width="60"
                    height="60"
                  />
                </td>
              ) : label === 'status' || label === 'publisher' ? (
                <td>{record[label].label}</td>
              ) : record[label] === true ? (
                <td>
                  <i style={{ color: 'green' }} class="fas fa-check" />
                </td>
              ) : record[label] === false ? (
                <td>
                  <i
                    style={{ color: 'red' }}
                    class="fa fa-times"
                    aria-hidden="true"
                  />
                </td>
              ) : (
                <td>{record[label]}</td>
              ),
          )}
        </tr>
      ));
      toDisplay = (
        <div className={`table-responsive ${s.table}`}>
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
      );
    }

    return (
      // window.alert(this.props.pa)
      <div>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12" />
          {toDisplay}
        </div>
        {/* Pagination */}
        <div className="row">
          <div className="col-12">
            {this.props.hasPagination ? (
              <ReactPaginate
                previousLabel="<"
                nextLabel=">"
                pageCount={this.props.pageCount}
                pageRangeDisplayed={3}
                onPageChange={this.props.handlePageChange}
                containerClassName="paginate"
                subContainerClassName="pages paginate"
                activeClassName="active-page"
                breakClassName="break-me"
                initialPage={this.props.currentPageNumber}
                disableInitialCallback
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CustomTabel);
