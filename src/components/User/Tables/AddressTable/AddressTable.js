import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './AddressTable.css';
import dateTrimmer from '../../../../dateTrimmer';

class AddressTable extends React.Component {
  static propTypes = {
    records: PropTypes.array.isRequired,
    columnLabels: PropTypes.array.isRequired,
    recordItemNames: PropTypes.array.isRequired,
    onRecordClick: PropTypes.func.isRequired,
  };

  render() {
    const tableHeaders = (
      <tr>
        <th>Id</th>
        <th>Address</th>
        <th>Province</th>
        <th>Zip Code</th>
        <th>City</th>
        <th>Country</th>
      </tr>
    );

    let records = '';
    let toDisplay = <div className={s.noRecords}> No Match Found</div>;
    if (this.props.records !== undefined && this.props.records.length !== 0) {
      records = this.props.records.map((record, i) => (
        <tr
          onClick={() => {
            this.props.onRecordClick(record.id);
          }}
        >
          <td>{record.id}</td>
          <td>{record.detailAddress}</td>
          <td>{record.province}</td>
          <td>{record.zipCode}</td>
          <td>{record.Country.name}</td>
        </tr>
      ));
      // table-hover
      toDisplay = (
        <div className={`user-table-responsive ${s.userTable}`}>
          <table className={`user-table ${s.userHoverableTr}`}>
            <thead className={s.tableHeader}>{tableHeaders}</thead>
            <tbody>{records} </tbody>
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
      </div>
    );
  }
}

export default withStyles(s)(AddressTable);
