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
import cookie from 'react-cookies';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import s from './PublisherOrderTable.css';
import { SERVER, SSRSERVER, COOKIE_EXPIRATION } from '../../../../constants';
import { fetchWithTimeOut } from '../.././../../fetchWithTimeout';
import history from '../.././../../history';
import dateTrimmer from '../.././../../dateTrimmer';

class PublisherOrderTable extends React.Component {
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
  }

  colorPicker(record) {
    let color = '';

    if (record.productStatus !== undefined) {
      // PRODUCT_STATUS
      if (record.productStatus.value === PRODUCT_STATUS.Ready.value) {
        color = s.readyProduct;
      }
      if (record.productStatus.value === PRODUCT_STATUS.Pending.value)
        color = s.pendingProduct;
      if (record.productStatus.value === PRODUCT_STATUS.NotAvailable.value)
        color = s.notAvailableProduct;
    }
    return color;
  }

  goTo(e, id) {
    e.stopPropagation();
    history.push(`/admin/customerInvoice/${id}`);
  }
  render() {
    const tableHeaders = (
      <tr>
        <th className="border-0">Order No.</th>
        <th className="border-0">User Order No.</th>
        <th className="border-0">Customer Name</th>

        <th className="border-0">Reciever Name</th>
        <th className="border-0">Invoice No.</th>
        <th className="border-0">Publication Title</th>
        <th className="border-0">Publisher</th>
        <th className="border-0">Start Date</th>
        <th className="border-0">End Date</th>
        <th>Claims</th>
      </tr>
    );
    let records = '';
    let toDisplay = <div className={s.noRecords}> No Match Found</div>;
    if (this.props.records !== undefined && this.props.records.length !== 0) {
      records = this.props.records.map((record, i) => (
        <tr
          onClick={() => {
            this.props.onRecordClick(
              record.id,
              record.publisherOrderId,
              record.productId,
            );
          }}
        >
          <td>{record.id}</td>
          <td>{record.userOrderNo}</td>
          <td>
            {record.CustomerInvoice.User.userSubCategoryId != 1
              ? record.CustomerInvoice.User.companyName
              : `${record.CustomerInvoice.User.firstName} ${
                  record.CustomerInvoice.User.lastName
                }`}
          </td>
          <td>{record.recieptName}</td>
          <td>
            <u onClick={e => this.goTo(e, record.CustomerInvoice.id)}>
              <i>{record.CustomerInvoice.id}</i>
            </u>
          </td>
          <td>{record.Product.label}</td>
          <td>
            {record.OrderForPublisher.User.userSubCategoryId != 1
              ? record.OrderForPublisher.User.companyName
              : `${record.OrderForPublisher.User.firstName} ${
                  record.OrderForPublisher.User.lastName
                }`}
          </td>
          <td>{dateTrimmer(record.startDate)}</td>
          <td>{dateTrimmer(record.endDate)}</td>
          <td>
            <button onClick={e => this.goTo(e, `/admin/claims/${record.id}`)}>
              Claims
            </button>{' '}
          </td>
        </tr>
      ));
      toDisplay = (
        <div className={`table-responsive ${s.table}`}>
          <table
            className={`table table-hover table-bordered ${s.hoverableTr}`}
          >
            <thead className="bg-light">
              {/* <th>#</th> */}
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

export default withStyles(s)(PublisherOrderTable);
