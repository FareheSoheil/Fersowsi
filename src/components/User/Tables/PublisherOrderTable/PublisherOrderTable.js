import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './PublisherOrderTable.css';
import { PRICE_SIGNS } from '../../../../constants/constantData';
import zeroTrimmer from '../../../../zeroTrimmer';
import dateTrimmer from '../../../../dateTrimmer';

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
        <th>Total Price</th>
        <th>Postal Cost</th>
        <th>Discount</th>
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
          className={s.row}
          // onClick={() => {
          //   this.props.onRecordClick(record.id, record.customerOrderId);
          // }}
        >
          <td>{record.id}</td>
          {/* <td>{record.customerOrderId}</td> */}
          <td>{record.Product.label}</td>
          <td>
            {record.price[sign]} <span>({PRICE_SIGNS[sign + 1]})</span>
          </td>
          <td>
            {record.totalDeliveryCost[sign]}{' '}
            <span>({PRICE_SIGNS[sign + 1]})</span>
          </td>
          <td>
            {' '}
            {record.discount[sign]} <span>({PRICE_SIGNS[sign + 1]})</span>
          </td>
          <td>{record.count}</td>
          <td>{`${dateTrimmer(record.startDate)}\n ${dateTrimmer(
            record.endDate,
          )}`}</td>
          <td onClick={e => this.onAddressClick(e, record.Address.value)}>
            {`${record.Address.province} ${record.Address.city} ${
              record.Address.detailAddress
            } ${record.Address.zipCode} ${record.Address.Country.label} `}
          </td>
          <td
            className={
              record.OrderStatus.label == 'Accepted'
                ? s.accepted
                : record.OrderStatus.label == 'cancelled'
                  ? s.cancelled
                  : s.pending
            }
          >
            {record.OrderStatus.label}
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
                this.props.renew(record.Product.value);
              }}
            >
              Renew
            </button>
            <button
              onClick={e => {
                this.props.cancel(record.id);
              }}
            >
              Cancel
            </button>
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
