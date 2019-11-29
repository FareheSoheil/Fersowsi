import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './RequestTable.css';
import zeroTrimmer from '../../../../zeroTrimmer';

class RequestTable extends React.Component {
  static propTypes = {
    records: PropTypes.array.isRequired,
    onRecordClick: PropTypes.func.isRequired,
  };

  render() {
    const tableHeaders = (
      <tr>
        <th>Name</th>
        <th>Category</th>
        <th>Language</th>
        <th>Age Group</th>
        <th>Periodical</th>
      </tr>
    );
    let records = '';
    let toDisplay = <div className={s.noRecords}> Empty Table </div>;
    if (this.props.records !== undefined && this.props.records.length !== 0) {
      records = this.props.records.map((record, i) => (
        <tr
          onClick={() => {
            this.props.onRecordClick(record.id, record.publisherOrderId);
          }}
        >
          <td>{record.name}</td>
          <td>{record.category.label}</td>
          <td>{record.language.label}</td>
          <td>{record.ageGroup.label}</td>
          <td>{record.period.label}</td>
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

export default withStyles(s)(RequestTable);
