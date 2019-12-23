import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './ClaimTable.css';
import dateTrimmer from '../../../../dateTrimmer';

class ClaimTable extends React.Component {
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
        <th>Order Id</th>
        <th>Customer</th>
        <th>Publisher</th>
        <th>Date</th>
        <th>Is Finished</th>
      </tr>
    );

    let records = '';
    let toDisplay = <div className={s.noRecords}> No Match Found</div>;
    if (this.props.records !== undefined && this.props.records.length !== 0) {
      records = this.props.records.map((record, i) => (
        <tr
          onClick={() => {
            this.props.onRecordClick(record.id, record.orderId);
          }}
        >
          <td>{record.id}</td>
          <td>{record.orderId}</td>
          <td>{record.customerName}</td>
          <td>{record.publisherName}</td>
          <td>{dateTrimmer(record.createdAt)}</td>

          {record.isFinished ? (
            <td>
              <i style={{ color: 'green' }} class="fas fa-check" />
            </td>
          ) : (
            <td>
              {' '}
              <i
                style={{ color: 'red' }}
                class="fa fa-times"
                aria-hidden="true"
              />
            </td>
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

export default withStyles(s)(ClaimTable);
