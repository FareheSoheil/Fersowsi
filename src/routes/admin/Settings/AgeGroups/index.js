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
import AgeGroups from './AgeGroups';

const title = 'AgeGroups';

function action(context) {
  return {
    chunks: ['adminAgeGroups'],
    title,
    component: (
      <AdminLayout>
        <AgeGroups title={title} context={context} />
      </AdminLayout>
    ),
  };
}

export default action;
