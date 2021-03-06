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
import ReduxToastr from 'react-redux-toastr';
// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './LoginLayout.css';

class LoginLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className={s.LoginWrapper}>
        {' '}
        <ReduxToastr
          timeOut={3000}
          newestOnTop={false}
          preventDuplicates
          position="top-center"
          transitionIn="bounceIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        />
        {this.props.children}
      </div>
    );
  }
}

export default withStyles(normalizeCss, s)(LoginLayout);
