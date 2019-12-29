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
import { toastr } from 'react-redux-toastr';
import s from './EmailConfirmed.css';
import { fetchWithTimeOut } from '../../fetchWithTimeout';
import { SERVER } from '../../constants/constantData';

class EmailConfirmed extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.fetch = this.fetch.bind(this);
  }
  componentDidMount() {
    this.fetch();
  }
  fetch() {
    const url = `${SERVER}/verifyEmail`;
    const cred = {
      token: this.props.context.params.token,
    };
    const ops = {
      method: 'POST',
      body: JSON.stringify(cred),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const that = this;
    fetchWithTimeOut(
      url,
      ops,
      data => {
        if (data.error != undefined) {
          document.getElementById('res').innerText = `${
            data.error.description
          } :(`;
          // history.push(`/changePass/${this.state.email}`);
        } else {
          document.getElementById('res').innerText =
            'Your Email Was Confirmed Successfully :D';
        }
      },
      error => {
        document.getElementById('res').innerText =
          'Could not Confirm your Email';
      },
    );
  }
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <p id="res" />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(EmailConfirmed);
