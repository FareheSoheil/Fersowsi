/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import React from 'react';
import SiteMap from './SiteMap';
import UserSimpleLayout from '../../../components/User/Layouts/UserSimpleLayout';

async function action(context) {
  return {
    title: 'Ferdowsi',
    chunks: ['siteMap'],
    component: (
      <UserSimpleLayout context={context}>
        <SiteMap context={context} />
      </UserSimpleLayout>
    ),
  };
}

export default action;
