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
import s from './CustomerInvoice.css';
import { PRICE_SIGNS } from '../../../constants/constantData';
import dateTrimmer from '../../../dateTrimmer';
import adminPriceTrimmer from '../../../adminPriceTrimmer';
// import { PRODUCT_STATUS } from '../../constants/constantData';

class CustomerInvoice extends React.Component {
  static propTypes = {
    invoice: PropTypes.object.isRequired,
  };
  // static defaultProps = {
  //   hasPagination: true,
  // };

  render() {
    return (
      <div className={`row mb-2 ${s.mainContainer}`}>
        <h5 className={`col-12 ${s.title}`}> Publication Title : </h5>
        <div className={`col-xl-3 col-lg-5 col-md-6 ${s.reciever}`}>
          <b>Reciever : </b> <br />
          {this.props.invoice.reciever}
        </div>
        <div className="col-xl-4 col-lg-5 col-md-6 ">
          <div>
            <label>Order No: &nbsp;</label>
            {this.props.invoice.orderNo}
          </div>
          <div>
            <label>User Order No: &nbsp;</label>
            {this.props.invoice.userOrderNo}
          </div>
          <div>
            <label>Number Of Copies: &nbsp;</label>
            {this.props.invoice.count}
          </div>
          <div>
            <label>Terms Of Delivery No:&nbsp;</label>
            {this.props.invoice.deliveryType.label}
          </div>
          <div>
            <label>Start Date : &nbsp;</label>
            {dateTrimmer(this.props.invoice.startDate)}
          </div>
          <div>
            <label>Enda Date :&nbsp; </label>
            {dateTrimmer(this.props.invoice.endDate)}
          </div>
        </div>
        <div className="col-xl-4 col-lg-5 col-md-6 ">
          <div>
            <label>Price: &nbsp;</label>
            {this.props.invoice.orderNo}
          </div>
          <div>
            <label>Discount: &nbsp;</label>
            {adminPriceTrimmer(this.props.invoice.discount)}
          </div>
          <div>
            <label>Postal Cost: &nbsp;</label>
            {adminPriceTrimmer(
              this.props.invoice.deliveryCost[
                this.props.invoice.currencyId - 1
              ],
              'price',
            )}{' '}
            {PRICE_SIGNS[this.props.invoice.currencyId]}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CustomerInvoice);