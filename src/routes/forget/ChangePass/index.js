/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import LoginLayout from '../../../components/Login/LoginLayout';
import ChangePass from './ChangePass';

const title = 'Change Password';

function action(context) {
  return {
    chunks: ['ChangePass'],
    title,
    component: (
      <LoginLayout>
        <ChangePass title={title} context={context} />
      </LoginLayout>
    ),
  };
}

export default action;
