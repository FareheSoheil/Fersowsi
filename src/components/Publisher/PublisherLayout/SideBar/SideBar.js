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
import s from './SideBar.css';
import cookie from 'react-cookies';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import { SSRSERVER } from '../../../../constants';
import history from '../../../../history';

class SideBar extends React.Component {
  goTo(url) {
    history.push(url);
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
      response => {
        cookie.remove('TokenId', { path: '/' });
        cookie.remove('role', { path: '/' });
        history.push('/login');
        localStorage.clear();
      },
      error => {
        console.log('error fetchWithTimeOut: ', error);
      },
    );
  }
  render() {
    return (
      <div className={` ${s.scroll} nav-left-sidebar sidebar-dark`}>
        {/* <div> */}
        {/* headr */}
        <div className={` dashboard-header`}>
          <nav
            className={`${
              s.dashboard_header
            } navbar navbar-expand-lg bg-white fixed-top`}
          >
            <a className="navbar-brand">Ferdosi</a>
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
            />
          </nav>
        </div>
        {/* sidebar */}
        <nav
          className={`${s.mainContainer} navbar navbar-expand-lg navbar-light`}
          // style={{ marginBottom: '80px' }}
        >
          <a className="d-xl-none d-lg-none" href="#">
            Dashboard
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className={`${s.itemContainer} navbar-nav flex-column `}>
              <li className={`${s.avatarContainer}`}>
                {/*  */}
                <img
                  src="/assets/images/blank_avatar.png"
                  alt=""
                  className="user-avatar-lg rounded-circle"
                  href="#avatar"
                  data-toggle="collapse"
                  aria-expanded="false"
                  data-target="#avatar"
                  aria-controls="avatar"
                />

                <div
                  id="avatar"
                  className={`collapse submenu ${s.submenuContainer} `}
                >
                  <ul className="nav flex-column">
                    {/* <li className="nav-item">
                      <a
                        className="nav-link"
                        onClick={() => this.goTo('/admin/accounts/all', '')}
                      >
                        My Account{' '}
                      </a>
                    </li> */}
                    <li className="nav-item">
                      <a className="nav-link" onClick={() => this.logOut()}>
                        {/*  */}
                        Log out{' '}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              {/* Publisher Order item */}
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#publisherOrder"
                  data-toggle="collapse"
                  aria-expanded="false"
                  data-target="#publisherOrder"
                  aria-controls="publisherOrder"
                >
                  {/* <i className="fab fa-leanpub" />  */}
                  Orders
                </a>
                <div
                  id="publisherOrder"
                  className={`collapse submenu ${s.submenuContainer} `}
                >
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        onClick={() =>
                          this.goTo('/publisher/orders/active', '')
                        }
                      >
                        Active Orders{' '}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        onClick={() => this.goTo('/publisher/orders/ended')}
                      >
                        Ended Orders{' '}
                      </a>
                    </li>

                    {/* <li className="nav-item">
                      <a
                        className="nav-link"
                        onClick={() => this.goTo('/admin/publisherOrder/add')}
                      >
                        Add Order{' '}
                      </a>
                    </li>
                 */}
                  </ul>
                </div>
              </li>
              <li className="nav-item ">
                <a
                  className="nav-link"
                  onClick={() => this.goTo('/publisher/myProfile')}
                >
                  {/* <i className="fa fa-comments" /> */}
                  My Profile{' '}
                </a>
              </li>
              {/* claims item */}
              <li className="nav-item ">
                <a
                  className="nav-link"
                  onClick={() => this.goTo('/admin/claims')}
                >
                  Claims{' '}
                </a>
              </li>
              {/* Comments item */}
              {/* <li className="nav-item ">
                <a
                  className="nav-link"
                  onClick={() => this.goTo('/admin/comments')}
                >
                  Comments{' '}
                </a>
              </li> */}
              {/* Comments item */}
              <li className="nav-item ">
                <a
                  className="nav-link"
                  onClick={() => this.goTo('/publisher/prepares')}
                >
                  {/* <i className="fa fa-comments" /> */}
                  Prepare to Send Publications{' '}
                </a>
              </li>
              {/* Settings item */}
              \
            </ul>
          </div>
        </nav>
        {/* </div> */}
      </div>
    );
  }
}

export default withStyles(s)(SideBar);
