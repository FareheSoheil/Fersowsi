/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import LandingLayout from '../../components/User/LandingLayout';
import Landing from './Landing';

const title = 'Ferdosi Landing';

function action(context) {
  return {
    chunks: ['landing'],
    title,
    component: (
      <LandingLayout>
        <Landing title={title} context={context} />
      </LandingLayout>
    ),
  };
}

export default action;
