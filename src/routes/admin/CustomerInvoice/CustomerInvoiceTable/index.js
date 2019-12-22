/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import CustomerInvoices from './CustomerInvoices';
import AdminLayout from '../../../../components/Admin/AdminLayout';

async function action(context) {
  return {
    title: 'Ferdowsi',
    chunks: ['adminCustomerInvoiceTable'],
    component: (
      <AdminLayout>
        <CustomerInvoices context={context} />
      </AdminLayout>
    ),
  };
}

export default action;
