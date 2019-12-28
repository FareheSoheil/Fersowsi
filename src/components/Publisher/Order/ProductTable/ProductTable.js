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
import { PRODUCT_STATUS } from '../../../../constants/constantData';
import dateTrimmer from '../../../../dateTrimmer';
import s from './ProductTable.css';

class ProductTable extends React.Component {
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
  onNumberChange() {
    var x = parseInt(document.getElementById('numberSelect').value);
    this.props.showMore(x);
  }
  render() {
    const tableHeaders = (
      <tr>
        <th>Id</th>
        <th>Cover</th>
        <th>ISSN</th>
        <th>Title</th>
        <th>Publisher</th>
        <th>Country</th>
        <th>Language</th>
        <th>Last Price Updated At</th>
      </tr>
    );
    let records = '';
    let toDisplay = <div className={s.noRecords}> No Match Found</div>;
    if (this.props.records !== undefined && this.props.records.length !== 0) {
      records = this.props.records.map((record, i) => (
        <tr
          className={this.colorPicker(record)}
          onClick={() => {
            this.props.onRecordClick(record.id);
          }}
        >
          <td>{record.id}</td>
          <td>
            <img
              className={s.profilePicContiner}
              src={record.coverImage}
              width="40"
              height="40"
            />
          </td>
          <td>{record.issn}</td>
          <td>{record.originalTitle}</td>
          <td>{record.publisher.label}</td>
          <td>{record.country.label}</td>
          <td>{record.productLanguage.label}</td>
          <td>{dateTrimmer(record.publisherPriceUpdatedAt)}</td>
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

export default withStyles(s)(ProductTable);
