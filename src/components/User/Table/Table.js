import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './Table.css';
import zeroTrimmer from '../../../zeroTrimmer';

class Table extends React.Component {
  static propTypes = {
    records: PropTypes.array.isRequired,
    columnLabels: PropTypes.array.isRequired,
    recordItemNames: PropTypes.array.isRequired,
    onRecordClick: PropTypes.func.isRequired,
  };

  render() {
    const tableHeaders = this.props.columnLabels.map((label, i) => (
      <th>{label}</th>
    ));
    let records = '';
    let toDisplay = <div className={s.noRecords}> No Match Found</div>;
    if (this.props.records !== undefined && this.props.records.length !== 0) {
      records = this.props.records.map((record, i) => (
        <tr
          onClick={() => {
            this.props.onRecordClick(record.id, record.customerOrderId);
          }}
        >
          {this.props.recordItemNames.map(
            label =>
              label !== 'id' ? (
                record[label] !== null && record[label] !== undefined ? (
                  record[label].constructor === {}.constructor ? (
                    <td>{zeroTrimmer(record[label].label)}</td>
                  ) : (
                    <td>{zeroTrimmer(record[label])}</td>
                  )
                ) : (
                  <td>''</td>
                )
              ) : (
                <td>{record.id}</td>
              ),
          )}
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

export default withStyles(s)(Table);
