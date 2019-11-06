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
import Select from 'react-select';
import s from './AccountsTable.css';
import zeroTrimmer from '../../../../zeroTrimmer';
import { PRODUCT_STATUS } from '../../../../constants/constantData';

class AccountsTable extends React.Component {
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
  // 'profilePic',
  // 'id',
  // 'firstName',
  // 'lastName',
  // 'contractName',
  // 'email',
  onNumberChange() {
    var x = parseInt(document.getElementById('numberSelect').value);
    this.props.showMore(x);
  }
  render() {
    const tableHeaders = (
      <tr>
        <th>Id</th>
        <th>Avatar</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Contract Name</th>
        <th>Email</th>
        <th>Select</th>
      </tr>
    );
    let records = '';
    let toDisplay = <div className={s.noRecords}> No Match Found</div>;
    if (this.props.records !== undefined && this.props.records.length !== 0) {
      records = this.props.records.map((record, i) => (
        <tr
          // style={{ lineHeight: '14px' }}
          className={this.colorPicker(record)}
          onClick={() => {
            this.props.onRecordClick(record.id);
          }}
        >
          <td>{record.id}</td>
          <td>{record.profilePic != null ? record.profilePic : ''}</td>
          <td>{record.firstName}</td>
          <td>{record.lastName}</td>
          <td>{record.contractName}</td>
          <td>{record.email}</td>
          <td>
            <button
              onClick={e => {
                e.stopPropagation();
              }}
            >
              Select
            </button>
          </td>
        </tr>
      ));
      toDisplay = (
        <div className={`table-responsive ${s.table}`}>
          {/* <div className="row">
            <div className="col-xl-1">
              {' '}
              <div className="form-group ">
                <select id="numberSelect" onChange={this.onNumberChange}>
                  <option value={15} selected={this.props.pageSize == 15}>
                    15
                  </option>
                  <option selected={this.props.pageSize == 30} value={30}>
                    30
                  </option>
                  <option value={50} selected={this.props.pageSize == 50}>
                    50
                  </option>
                  <option value={100} selected={this.props.pageSize == 100}>
                    100
                  </option>
                </select>
              </div>
            </div>
          </div> */}
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

export default withStyles(s)(AccountsTable);
