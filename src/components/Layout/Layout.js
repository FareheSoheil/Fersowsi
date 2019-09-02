/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cookie from 'react-cookies';
// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './Layout.css';
import AdminLayout from '../Admin/AdminLayout';
import LoginLayout from '../Login/LoginLayout';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    context: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        {/* {cookie.load('role') === undefined ? (
          <LoginLayout className="aabb">{this.props.children}</LoginLayout>
        ) : cookie.load('role') === 'customer' ? (
          <div>{this.props.children}</div>
        ) : (
          // <div className="dashboard-main-wrapper">
          <AdminLayout>{this.props.children}</AdminLayout>
          // </div>
        )} */}
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default withStyles(normalizeCss, s)(Layout);
