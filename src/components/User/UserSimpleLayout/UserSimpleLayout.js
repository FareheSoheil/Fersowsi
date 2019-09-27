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

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './UserSimpleLayout.css';
import Header from '../Header';
import SideBar from '../SideBar';
// import Feedback from '../Feedback';
import Footer from '../../Footer';

class UserSimpleLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: 'white',
          height: '100%',
          width: '100%',
        }}
      >
        <Header />
        <div
          style={{
            backgroundColor: 'white',
            // border: '3px solid green',
            paddingTop: '40px',
            // paddingRight: '10px',
            // position: 'fixed',
            // minHeight: '100px',
            // height: '100%',
            // width: '100%',
          }}
        >
          <div className={`${s.userContentContainer}`}>
            {' '}
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(normalizeCss, s)(UserSimpleLayout);
