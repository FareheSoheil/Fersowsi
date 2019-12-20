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
import s from './CustomerOrderTable.css';
import adminPriceTrimmer from '../../../adminPriceTrimmer';
import { PRODUCT_STATUS, PRICE_SIGNS } from '../../../constants/constantData';

class CustomerOrderTable extends React.Component {
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
  render() {
    const tableHeaders = (
      <tr>
        <th className="border-0">Id</th>
        <th className="border-0">Username</th>

        <th className="border-0">User Type</th>
        <th className="border-0">Invoice Number</th>
        <th className="border-0">Total Cost</th>
        <th className="border-0">Payment Method</th>
      </tr>
    );
    let records = '';
    let toDisplay = <div className={s.noRecords}> No Match Found</div>;
    if (this.props.records !== undefined && this.props.records.length !== 0) {
      records = this.props.records.map((record, i) => (
        <tr
          // style={{ lineHeight: '14px' }}
          // className={this.colorPicker(record)}
          onClick={() => {
            this.props.onRecordClick(
              record.id,
              record.publisherOrderId,
              record.productId,
            );
          }}
        >
          <td>{record.id}</td>
          {/* {record.user.username} */}
          <td>username</td>
          {/* {record.user.username} */}
          <td>user type</td>
          {/* {record.invoiceNumber} */}
          <td>Invoice Number</td>
          {/* <td>
            {adminPriceTrimmer(
              record.totalCost[record.currencyId - 1],
              'price',
            )}{' '}
            {PRICE_SIGNS[record.currencyId]}
          </td> */}
          <td>
            {adminPriceTrimmer(
              record.totalPrice[record.currencyId - 1],
              'price',
            )}{' '}
            {PRICE_SIGNS[record.currencyId]}
          </td>
          <td>{record.paymentMethod}</td>
          {/* <td>{adminPriceTrimmer(record.discount, 'price')} %</td> */}
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

export default withStyles(s)(CustomerOrderTable);
