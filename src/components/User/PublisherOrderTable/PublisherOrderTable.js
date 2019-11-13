import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './PublisherOrderTable.css';

import zeroTrimmer from '../../../zeroTrimmer';
import dateTrimmer from '../../../dateTrimmer';

class PublisherOrderTable extends React.Component {
  static propTypes = {
    records: PropTypes.array.isRequired,
    onRecordClick: PropTypes.func.isRequired,
  };
  gotoClaims(e, customerOrderId) {
    e.stopPropagation();
    this.props.goToClaimsofThisOrder(customerOrderId);
  }
  onAddressClick(e, id) {
    e.stopPropagation();
    this.props.onAddressClick(id);
  }
  renew(e, id) {
    e.stopPropagation();
    this.props.renew(id);
  }
  render() {
    const tableHeaders = (
      <tr>
        <th>Id</th>
        {/* <th>User Order No.</th> */}
        <th>Publication Title</th>
        <th>Publication Price</th>

        <th>Postal Cost</th>
        <th>Number of Issues</th>
        <th>Start/End Date</th>
        <th>Reciever</th>
        <th>Status</th>
        <th>Actions</th>
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
          {/* <td>{record.customerOrderId}</td> */}
          <td>{record.Product.label}</td>
          <td>{zeroTrimmer(record.customerPrice[sign], 'price')}</td>
          <td>{zeroTrimmer(record.deliveryCost[sign], 'price')}</td>
          <td width="100">{record.count}</td>
          <td width="140">{`${dateTrimmer(record.startDate)}\n ${dateTrimmer(
            record.endDate,
          )}`}</td>
          <td onClick={e => this.onAddressClick(e, record.address.id)}>
            {record.address.label}
          </td>
          <td
            className={
              record.status.label == 'Accepted'
                ? s.accepted
                : record.status.label == 'cancelled' ? s.cancelled : s.pending
            }
          >
            {record.status.label}
          </td>
          <td width="130" className={s.btn}>
            <button
              onClick={e => {
                this.gotoClaims(e, record.id);
              }}
            >
              Claim
            </button>
            <button
              onClick={e => {
                this.renew(e, record.Product.id);
              }}
            >
              Renew
            </button>
            <button>Cancel</button>
          </td>
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

export default withStyles(s)(PublisherOrderTable);
