/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import LoginLayout from '../../components/Login/LoginLayout';
import Login from './Login';

const title = 'Log In';

function action(context) {
  return {
    chunks: ['login'],
    title,
    component: (
      <LoginLayout>
        <Login title={title} context={context} />
      </LoginLayout>
    ),
  };
}

export default action;
