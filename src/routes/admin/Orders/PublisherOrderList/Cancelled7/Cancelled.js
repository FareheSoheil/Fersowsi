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
import CustomerInvoiceMain from '../../../../../components/Admin/CustomerInvoice/CustomerInvoiceMain';
import { CUSTOMER_ORDER_STATUS } from '../../../../../constants/constantData';

import s from './Cancelled.css';

class Cancelled extends React.Component {
  render() {
    return <CustomerInvoiceMain status={CUSTOMER_ORDER_STATUS.Cancelled} />;
  }
}

export default withStyles(s)(Cancelled);