/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import AddressHistory from './AddressHistory';
import AdminLayout from '../../../components/Admin/AdminLayout';
function action(context) {
  return {
    title: 'Address History',
    chunks: ['adminAddressHistory'],
    component: (
      <AdminLayout>
        <AddressHistory context={context} />
      </AdminLayout>
    ),
  };
}

export default action;
