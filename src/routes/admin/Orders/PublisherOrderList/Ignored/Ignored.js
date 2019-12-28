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
import PublisherOrderMain from '../../../../../components/Admin/PublisherOrder/PublisherOrderMain';
import { CUSTOMER_ORDER_STATUS } from '../../../../../constants/constantData';

import s from './Ignored.css';

class Ignored extends React.Component {
  render() {
    return <PublisherOrderMain status={CUSTOMER_ORDER_STATUS.Ignored} />;
  }
}

export default withStyles(s)(Ignored);