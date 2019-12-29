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
import history from '../../../../history';
import dateTrimmer from '../../../../dateTrimmer';
import s from './OrderForPublisherTable.css';

class OrderForPublisherTable extends React.Component {
  static propTypes = {
    pageCount: PropTypes.number.isRequired,
    hasPagination: PropTypes.bool.isRequired,
    currentPageNumber: PropTypes.number.isRequired,
    records: PropTypes.array.isRequired,
    onRecordClick: PropTypes.func.isRequired,
    handlePageChange: PropTypes.func.isRequired,
  };
  static defaultProps = {
    hasPagination: true,
  };
  constructor(props) {
    super(props);
    this.onNumberChange = this.onNumberChange.bind(this);
  }
  colorPicker(record) {
    let color = '';

    // if (record.isPaid !== undefined) {
    // PRODUCT_STATUS
    if (!record.isPaid) {
      color = s.activeOrder;
    } else color = s.sentOrder;
    return color;
  }
  goTo(e, url) {
    e.stopPropagation();
    history.push(url);
  }
  onNumberChange() {
    var x = parseInt(document.getElementById('numberSelect').value);
    this.props.showMore(x);
  }
  render() {
    const tableHeaders = (
      <tr>
        <th>Publisher Order No.</th>
        <th>Publisher</th>
        <th>Number Of Ready To Send Orders</th>
        <th>Date</th>
        <th>Action</th>
      </tr>
    );
    let records = '';
    let toDisplay = <div className={s.noRecords}> No Match Found</div>;
    if (this.props.records !== undefined && this.props.records.length !== 0) {
      // window.alert(records);
      records = this.props.records.map((record, i) => (
        <tr className={this.colorPicker(record)}>
          <td>{record.id}</td>
          <td>
            <u
              onClick={e =>
                this.goTo(e, `/admin/accounts/${record.publisherId}`)
              }
            >
              <i>{record.User.publisherName}</i>
            </u>
          </td>
          <td>{record.numberOfReadyOrdersToSend}</td>
          <td>{dateTrimmer(record.createdAt)}</td>
          <td>
            {record.isPaid == false ? (
              <button
                onClick={e => {
                  this.goTo(e, `/admin/ordersForPublisher/${record.id}`);
                }}
              >
                Continue
              </button>
            ) : (
              <button
                onClick={() => {
                  this.goTo(e, `/admin/ordersForPublisher/${record.id}`);
                }}
              >
                Prepare
              </button>
            )}
          </td>
        </tr>
      ));
      toDisplay = (
        <div className={`table-responsive ${s.table}`}>
          <table
            className={`table table-hover table-bordered ${s.hoverableTr}`}
          >
            <thead className="bg-light">{tableHeaders}</thead>
            <tbody>{records}</tbody>
          </table>
        </div>
      );
    }

    return (
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

export default withStyles(s)(OrderForPublisherTable);
