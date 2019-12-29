/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import EmailConfirmed from './EmailConfirmed';

const title = 'Email Confirmation';

function action(context) {
  return {
    chunks: ['emailConfirmed'],
    title,
    component: (
      <Layout>
        <EmailConfirmed context={context} title={title} />
      </Layout>
    ),
    status: 404,
  };
}

export default action;
