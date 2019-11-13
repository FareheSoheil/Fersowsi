import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './ProductTable.css';

import zeroTrimmer from '../../../../zeroTrimmer';
import dateTrimmer from '../../../../dateTrimmer';

class ProductTable extends React.Component {
  static propTypes = {
    records: PropTypes.array.isRequired,
    onRecordClick: PropTypes.func.isRequired,
  };
  gotoClaims(e, customerOrderId) {
    e.stopPropagation();
    this.props.goToClaimsofThisOrder(customerOrderId);
  }
  render() {
    const tableHeaders = (
      <tr>
        <th>Id</th>
        <th>Total Cost</th>
        <th>Total Price</th>
        <th>Discount</th>
        <th>Date</th>
        <th>Status</th>
      </tr>
    );
    let records = '';
    let sign = parseInt(localStorage.getItem('currency'));
    let toDisplay = <div className={s.noRecords}> No Match Found</div>;
    if (this.props.records !== undefined && this.props.records.length !== 0) {
      records = this.props.records.map((record, i) => (
        <tr
          onClick={() => {
            this.props.onRecordClick(record.id, record.customerOrderId);
          }}
        >
          <td>{record.id}</td>
          <td>{zeroTrimmer(record.totalCost[sign], 'price')}</td>
          <td>{zeroTrimmer(record.totalPrice[sign], 'price')}</td>
          <td>{zeroTrimmer(record.discount, 'price')}</td>
          <td width="150">{dateTrimmer(record.createdAt)}</td>
          <td>{record.status.label}</td>
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

export default withStyles(s)(ProductTable);
