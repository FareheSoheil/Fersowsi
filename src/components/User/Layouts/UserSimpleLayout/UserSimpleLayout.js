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
import normalizeCss from 'normalize.css';
import { connect } from 'react-redux';
// external-global styles must be imported in your JS.

import s from './UserSimpleLayout.css';

import Header from '../Header';
// import Feedback from '../Feedback';
import Footer from '../Footer';

const mapStateToProps = state => {
  console.log('in mapStateToProps , ', state.changeCurrency.currency);
  return { currency: state.changeCurrency.currency };
};

class UserSimpleLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    context: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      currency: '',
    };
  }

  render() {
    // window.alert('rerendering');
    return (
      <div
        style={{
          backgroundColor: 'white',
          height: '100%',
          width: '100%',
        }}
      >
        <Header context={this.props.context} />
        <div
          style={{
            backgroundColor: 'white',
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

export default withStyles(normalizeCss, s)(
  connect(mapStateToProps, null)(UserSimpleLayout),
);
