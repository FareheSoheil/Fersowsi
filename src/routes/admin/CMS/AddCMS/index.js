/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import AddCMS from './AddCMS';
import AdminLayout from '../../../../components/Admin/AdminLayout';

async function action(context) {
  return {
    title: 'Ferdowsi',
    chunks: ['adminAddCMS'],
    component: (
      <AdminLayout>
        <AddCMS context={context} />
      </AdminLayout>
    ),
  };
}

export default action;
