/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import History from './History';
import AdminLayout from '../../../components/Admin/AdminLayout';
function action(context) {
  return {
    title: 'History',
    chunks: ['adminHistory'],
    component: (
      <AdminLayout>
        <History context={context} />
      </AdminLayout>
    ),
  };
}

export default action;
