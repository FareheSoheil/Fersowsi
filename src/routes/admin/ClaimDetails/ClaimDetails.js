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
import RichText from '../../../components/RichText';
import s from './ClaimDetails.css';

class ClaimDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container-fluid dashboard-content">
        <RichText initialValue="sala azizam" />
      </div>
    );
  }
}

export default withStyles(s)(ClaimDetails);
