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
import { toastr } from 'react-redux-toastr';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import s from './CMSTable.css';

import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import { SERVER } from '../../../../constants/constantData';
import dateTrimmer from '../../../../dateTrimmer';
import history from '../../../../history';

class CMSTable extends React.Component {
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
  delete(e, id) {
    e.stopPropagation();
    const url = `${SERVER}/deleteCMS`;

    const credentials = {
      id: id,
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
        if (response.error == undefined) {
          toastr.success('', 'CMS DeletedSuccessfully');
          that.props.ondel();
        } else toastr.error('', 'CMS was not deleted');
      },
      error => {
        console.log(error);
        toastr.error('', 'CMS was not deleted');
      },
    );
  }

  goToOrder(id) {
    history.push(`/admin/publisherOrder/${id}`);
  }
  render() {
    const tableHeaders = (
      <tr>
        <th className="border-0">Title</th>
        <th className="border-0">Link</th>
        <th className="border-0">Active</th>
        <th className="border-0">Language</th>
        <th className="border-0">Date</th>
        <th className="border-0">Action</th>
      </tr>
    );

    let records = '';
    let toDisplay = <div className={s.noRecords}> No Match Found</div>;
    if (this.props.records !== undefined && this.props.records.length !== 0) {
      records = this.props.records.map((record, i) => (
        <tr
          // style={{ lineHeight: '14px' }}

          onClick={() => {
            this.props.onRecordClick(
              `/admin/cms/edit/${record.link}&${record.languageId}&${
                record.id
              }`,
            );
          }}
        >
          <td>{record.title}</td>
          <td>{record.link}</td>
          <td>
            {record.isActive ? (
              <i style={{ color: 'green' }} class="fas fa-check" />
            ) : (
              <i
                style={{ color: 'red' }}
                class="fa fa-times"
                aria-hidden="true"
              />
            )}
          </td>
          <td>{record.SiteLanguage.label}</td>
          <td>{dateTrimmer(record.createdAt)}</td>
          <td>
            <button onClick={e => this.delete(e, record.id)}>Delete</button>{' '}
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

export default withStyles(s)(CMSTable);
