/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import AddressDetail from './AddressDetail';
import UserLayout from '../../../components/User/UserLayout';

async function action(context) {
  return {
    title: 'Ferdowsi',
    chunks: ['userAddressDetail'],
    component: (
      <UserLayout>
        <AddressDetail context={context} />
      </UserLayout>
    ),
  };
}

export default action;
