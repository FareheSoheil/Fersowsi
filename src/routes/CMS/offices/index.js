/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import React from 'react';
import Offices from './Offices';
import UserSimpleLayout from '../../../components/User/Layouts/UserSimpleLayout';

async function action(context) {
  return {
    title: 'Ferdowsi',
    chunks: ['offices'],
    component: (
      <UserSimpleLayout context={context}>
        <Offices context={context} />
      </UserSimpleLayout>
    ),
  };
}

export default action;
