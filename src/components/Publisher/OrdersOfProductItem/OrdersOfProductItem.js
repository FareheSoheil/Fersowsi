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
import s from './OrdersOfProductItem.css';
import { PRICE_SIGNS } from '../../../constants/constantData';
import dateTrimmer from '../../../dateTrimmer';
import adminPriceTrimmer from '../../../adminPriceTrimmer';
// import { PRODUCT_STATUS } from '../../constants/constantData';

class OrdersOfProductItem extends React.Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
    currencyId: PropTypes.number.isRequired,
  };
  // static defaultProps = {
  //   hasPagination: true,
  // };

  render() {
    return (
      <div className={`row mb-2 ${s.mainContainer}`}>
        <div className={`col-xl-7 col-lg-5 col-md-6 ${s.reciever}`}>
          <b>Reciever : </b> <br />
          {this.props.order.Address.province}
          {this.props.order.Address.city}
          {this.props.order.Address.detailAddress}
          {this.props.order.Address.zipCode}
          {this.props.order.Address.Country.label}
        </div>
        <div className="col-xl-4 col-lg-5 col-md-6 ">
          <div>
            <label>Our Order No: &nbsp;</label>
            {this.props.order.id}
          </div>

          <div>
            <label>Number Of Copies: &nbsp;</label>
            {this.props.order.count}
          </div>
          <div>
            <label>Terms Of Delivery No:&nbsp;</label>
            {this.props.order.DeliveryType.label}
          </div>
          <div>
            <label>Start Date : &nbsp;</label>
            {dateTrimmer(this.props.order.startDate)}
          </div>
          <div>
            <label>End Date :&nbsp; </label>
            {dateTrimmer(this.props.order.endDate)}
          </div>
          <div>
            <label>Cost :&nbsp; </label>
            {this.props.order.totalToBePaid[this.props.currencyId - 1]}{' '}
            {PRICE_SIGNS[this.props.currencyId]}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(OrdersOfProductItem);
