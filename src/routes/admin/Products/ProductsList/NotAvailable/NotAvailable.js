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
import ProductMain from '../../../../../components/Admin/Product/ProductMain';
import { PRODUCT_STATUS } from '../../../../../constants/constantData';

import s from './NotAvailable.css';

class NotAvailable extends React.Component {
  render() {
    return <ProductMain status={PRODUCT_STATUS.NotAvailable} />;
  }
}

export default withStyles(s)(NotAvailable);
