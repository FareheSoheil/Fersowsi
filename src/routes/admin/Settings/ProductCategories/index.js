/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import AdminLayout from '../../../../components/Admin/AdminLayout';
import ProductCategories from './ProductCategories';

const title = 'ProductCategories';

function action(context) {
  return {
    chunks: ['adminProductCategories'],
    title,
    component: (
      <AdminLayout>
        <ProductCategories context={context} />
      </AdminLayout>
    ),
  };
}

export default action;
