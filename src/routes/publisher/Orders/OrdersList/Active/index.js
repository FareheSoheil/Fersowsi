/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Active from './Active';
import PublisherLayout from '../../../../../components/Publisher/PublisherLayout';

async function action(context) {
  return {
    title: 'Ferdowsi',
    chunks: ['publisherActiveOrders'],
    component: (
      <PublisherLayout>
        <Active context={context} />
      </PublisherLayout>
    ),
  };
}

export default action;