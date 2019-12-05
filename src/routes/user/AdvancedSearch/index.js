/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import AdvancedSearch from './AdvancedSearch';
import SearchLayout from '../../../components/User/Layouts/SearchLayout';

async function action(context) {
  return {
    title: 'Ferdowsi',
    chunks: ['userAdvancedSearch'],
    component: (
      <SearchLayout context={context}>
        <AdvancedSearch context={context} />
      </SearchLayout>
    ),
  };
}

export default action;
