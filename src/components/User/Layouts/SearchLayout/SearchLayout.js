/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import normalizeCss from 'normalize.css';
import s from './SearchLayout.css';

// const mapStateToProps = state => {
//   return { currency: state.changeCurrency.currency };
// };

class UserLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    context: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    // this.state = {
    //   currency: '',
    // };
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: 'white',
          height: '100%',
          width: '100%',
        }}
      >
        <div className={s.mainContainer}>
          <div className={`${s.userContentContainer}`}>
            {' '}
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(normalizeCss, s)(
  UserLayout,
  // connect(mapStateToProps, null)(UserLayout),
);
