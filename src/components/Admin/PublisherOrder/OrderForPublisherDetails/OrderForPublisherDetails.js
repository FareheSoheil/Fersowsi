import React from 'react';
import Select from 'react-select';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './OrderForPublisherDetails.css';
import dateTrimmer from '../../../../dateTrimmer';
import { PRICE_SIGNS } from '../../../../constants/constantData';

class OrderForPublisherDetails extends React.Component {
  render() {
    return (
      <div className={`col-sm ${s.subContainer}`}>
        {/* <div className="row"> */}
        <h5 className="col-12">Publisher Order</h5>
        {/* </div> */}
        <div className="row">
          <div className="col-6">
            <label>Order No to Publisher : </label>
          </div>
          <div className="col-6">
            {this.props.publisherOrder.OrderForPublisher.id}
          </div>
        </div>
        <div className="row mt-1 mb-1 ">
          <div className="col-6">
            <label>Payment Ammount : </label>
          </div>
          <div className="col-6">
            {this.props.publisherOrder.OrderForPublisher.totalPrice}{' '}
            {PRICE_SIGNS[this.props.publisherOrder.currencyId - 1]}
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label>Date of Order :</label>{' '}
          </div>
          <div className="col-6">
            {dateTrimmer(this.props.publisherOrder.OrderForPublisher.createdAt)}
            {/* {this.props.publisherOrder.customerCode} */}
          </div>
        </div>
        <div className="row mt-1 mb-1">
          <div className="col-6">
            <label>Payment Method: </label>
          </div>
          <div className="col-6">
            {this.props.publisherOrder.OrderForPublisher.paymentMethod}
          </div>
        </div>
        <div className="row">
          <div className="col-5">
            <label>Status:</label>{' '}
          </div>
          <div className="col-5">
            <Select
              isDisabled
              name="paymentStatus"
              options={[
                { value: 0, label: 'Cancelled' },
                { value: 1, label: 'Active' },
              ]}
              value={
                this.props.publisherOrder.OrderForPublisher.isActive == 0
                  ? { value: 0, label: 'Cancelled' }
                  : { value: 1, label: 'Active' }
              }
            />
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(OrderForPublisherDetails);
