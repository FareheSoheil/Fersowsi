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
import s from './EditableCustomTable.css';

class EditableCustomTable extends React.Component {
  static propTypes = {
    pageCount: PropTypes.number.isRequired,
    currentPageNumber: PropTypes.number.isRequired,
    records: PropTypes.array.isRequired,
    applyChanges: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    handlePageChange: PropTypes.func.isRequired,
    addRecord: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      recordId: '',
      newName: '',
    };

    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({
      newName: e.target.value,
    });
  }

  render() {
    const labels = ['Id', 'Name'];
    const recordItems = ['id', 'name'];
    const tableHeaders = labels.map((label, i) => (
      <th className="border-0">{label}</th>
    ));
    let records = '';
    let toDisplay = <div className={s.noRecords}> No Match Found</div>;
    if (this.props.records !== undefined && this.props.records.length !== 0) {
      records = this.props.records.map((record, i) => (
        <tr>
          <td>{i + 1}</td>
          {recordItems.map(
            label =>
              label === 'id' ? (
                <td>{record.id}</td>
              ) : (
                <td>
                  <input
                    className="form-control form-control-lg "
                    value={record.name}
                    onChange={e => this.props.onNameChange(e, i)}
                  />
                </td>
              ),
          )}
        </tr>
      ));
      toDisplay = (
        <div className={`table-responsive ${s.tableContainer}`}>
          <table
            className={`table table-hover table-bordered ${s.hoverableTr} ${
              s.table
            }`}
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
      <div>
        <div className="container-fluid">
          <br />
          <div className="row" style={{ verticalAlign: 'middle' }}>
            <span
              style={{
                paddingTop: '9px',
              }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>
                Add {this.props.title} :{' '}
              </b>
            </span>
            <div className="col-xl-4 col-lg-4 col-md-5 col-sm-12">
              <input
                value={this.state.newName}
                className="form-control form-control-lg "
                onChange={this.onChange}
              />{' '}
            </div>
            <div className="col-1">
              {' '}
              <button
                className="btn btn-success"
                onClick={e => this.props.addRecord(this.state.newName)}
              >
                {' '}
                Add
              </button>
            </div>
            <div className="col-2">
              {' '}
              <button
                className="btn btn-success"
                onClick={this.props.applyChanges}
              >
                {' '}
                Apply Changes
              </button>
            </div>
          </div>
          <br />
        </div>

        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12" />

          {toDisplay}
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

export default withStyles(s)(EditableCustomTable);
