/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cookie from 'react-cookies';
import history from '../../../../history';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import { SSRSERVER } from '../../../../constants';
import s from './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }
  logOut() {
    const token = cookie.load('TokenId');
    const removeStateURL = `${SSRSERVER}/state/removeState`;
    const removeStateOptions = {
      tokenId: token,
    };
    const logoutOptions = {
      method: 'POST',
      body: JSON.stringify(removeStateOptions),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetchWithTimeOut(
      removeStateURL,
      logoutOptions,
      () => {
        cookie.remove('TokenId', { path: '/' });
        cookie.remove('role', { path: '/' });
        history.push('/login');
      },
      () => {},
    );
  }

  render() {
    return (
      <div className="dashboard-header">
        <nav className="navbar navbar-expand-lg bg-white fixed-top">
          <a className="navbar-brand" href="index.html">
            Ferdowsi
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ml-auto navbar-right-top">
              <li className="nav-item dropdown nav-user">
                <a
                  className="nav-link nav-user-img"
                  href="#"
                  id="navbarDropdownMenuLink2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src="/assets/images/avatar-1.jpg"
                    alt=""
                    className="user-avatar-md rounded-circle"
                  />
                </a>
                <div
                  className={`${
                    s.headerDropDown
                  } dropdown-menu dropdown-menu-right nav-user-dropdown `}
                  aria-labelledby="navbarDropdownMenuLink2"
                >
                  <a className="dropdown-item">
                    <i className="fas fa-user mr-2" />Account
                  </a>

                  <a className="dropdown-item" onClick={this.logOut}>
                    <i className="fas fa-power-off mr-2" />Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default withStyles(s)(Header);
