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
import s from './AdminLayout.css';
import Header from '../Header';
import SideBar from '../SideBar';
// import Feedback from '../Feedback';
// import Footer from '../Footer';

class AdminLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className="dashboard-main-wrapper">
        <Header />
        <SideBar />
        <div className="dashboard-wrapper">
          {/* <div className="container-fluid dashboard-content"> */}
          {this.props.children}
          {/* </div> */}
        </div>
        {/* <Feedback /> */}
        {/* <Footer /> */}
      </div>
    );
  }
}

export default withStyles(normalizeCss, s)(AdminLayout);
