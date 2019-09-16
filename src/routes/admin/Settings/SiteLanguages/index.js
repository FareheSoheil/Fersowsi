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
import SiteLanguages from './SiteLanguages';

const title = 'SiteLanguages';

function action(context) {
  return {
    chunks: ['adminSiteLanguages'],
    title,
    component: (
      <AdminLayout>
        <SiteLanguages context={context} />
      </AdminLayout>
    ),
  };
}

export default action;
