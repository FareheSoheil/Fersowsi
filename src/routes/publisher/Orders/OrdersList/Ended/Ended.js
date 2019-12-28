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
import OrderMain from '../../../../../components/Publisher/Order/OrderMain';
import { PRODUCT_STATUS } from '../../../../../constants/constantData';

import s from './Ended.css';

class Ended extends React.Component {
  render() {
    return <OrderMain status={PRODUCT_STATUS.NotAvailable} />;
  }
}

export default withStyles(s)(Ended);
