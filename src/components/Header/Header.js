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
import s from './Header.css';
import cookie from 'react-cookies';
import { SSRSERVER, SERVER } from '../../constants';
import history from '../../history';
import { fetchWithTimeOut } from '../../fetchWithTimeout';

// import { Navbar, Nav, FormControl } from 'react-bootstrap';

class Header extends React.Component {
  constructor(props) {
    this.state = {
      isLoading: true,
      categories: [],
    };
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
  fetchCategories() {
    this.setState({ isLoading: true });
    const url = `${SERVER}/getAuxInfoForLandingPage`;
    const options = {
      method: 'POST',
      body: JSON.stringify(removeStateOptions),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetchWithTimeOut(
      url,
      options,
      response => {
        this.setState({
          categories: response.ProductContentType,
        });
      },
      () => {},
    );
  }
  render() {
    return (
      <div>
        {' '}
        {this.state.isLoading ? (
          ''
        ) : (
          <div className="dashboard-header">
            <nav className="navbar navbar-expand-lg bg-white fixed-top">
              <a className="navbar-brand">Ferdowsi</a>
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
                  <li className="nav-item dropdown notification">
                    <a
                      className="nav-link nav-icons"
                      href="#"
                      id="navbarDropdownMenuLink1"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-fw fa-bell" />{' '}
                      <span className="indicator" />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-right notification-dropdown">
                      <li>
                        <div className="notification-title"> Notification</div>
                        <div className="notification-list">
                          <div className="list-group">
                            <a
                              href="#"
                              className="list-group-item list-group-item-action active"
                            >
                              <div className="notification-info">
                                <div className="notification-list-user-img">
                                  <img
                                    src="assets/images/avatar-2.jpg"
                                    alt=""
                                    className="user-avatar-md rounded-circle"
                                  />
                                </div>
                                <div className="notification-list-user-block">
                                  <span className="notification-list-user-name">
                                    Jeremy Rakestraw
                                  </span>accepted your invitation to join the
                                  team.
                                  <div className="notification-date">
                                    2 min ago
                                  </div>
                                </div>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="list-group-item list-group-item-action"
                            >
                              <div className="notification-info">
                                <div className="notification-list-user-img">
                                  <img
                                    src="assets/images/avatar-3.jpg"
                                    alt=""
                                    className="user-avatar-md rounded-circle"
                                  />
                                </div>
                                <div className="notification-list-user-block">
                                  <span className="notification-list-user-name">
                                    John Abraham{' '}
                                  </span>is now following you
                                  <div className="notification-date">
                                    2 days ago
                                  </div>
                                </div>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="list-group-item list-group-item-action"
                            >
                              <div className="notification-info">
                                <div className="notification-list-user-img">
                                  <img
                                    src="assets/images/avatar-4.jpg"
                                    alt=""
                                    className="user-avatar-md rounded-circle"
                                  />
                                </div>
                                <div className="notification-list-user-block">
                                  <span className="notification-list-user-name">
                                    Monaan Pechi
                                  </span>{' '}
                                  is watching your main repository
                                  <div className="notification-date">
                                    2 min ago
                                  </div>
                                </div>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="list-group-item list-group-item-action"
                            >
                              <div className="notification-info">
                                <div className="notification-list-user-img">
                                  <img
                                    src="assets/images/avatar-5.jpg"
                                    alt=""
                                    className="user-avatar-md rounded-circle"
                                  />
                                </div>
                                <div className="notification-list-user-block">
                                  <span className="notification-list-user-name">
                                    Jessica Caruso
                                  </span>accepted your invitation to join the
                                  team.
                                  <div className="notification-date">
                                    2 min ago
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="list-footer">
                          {' '}
                          <a href="#">View all notifications</a>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown connection">
                    <a
                      className="nav-link"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {' '}
                      <i className="fas fa-fw fa-th" />{' '}
                    </a>
                    <ul className="dropdown-menu dropdown-menu-right connection-dropdown">
                      <li className="connection-list">
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                            <a href="#" className="connection-item">
                              <img src="assets/images/github.png" alt="" />{' '}
                              <span>Github</span>
                            </a>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                            <a href="#" className="connection-item">
                              <img src="assets/images/dribbble.png" alt="" />{' '}
                              <span>Dribbble</span>
                            </a>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                            <a href="#" className="connection-item">
                              <img src="assets/images/dropbox.png" alt="" />{' '}
                              <span>Dropbox</span>
                            </a>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                            <a href="#" className="connection-item">
                              <img src="assets/images/bitbucket.png" alt="" />{' '}
                              <span>Bitbucket</span>
                            </a>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                            <a href="#" className="connection-item">
                              <img src="assets/images/mail_chimp.png" alt="" />
                              <span>Mail chimp</span>
                            </a>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                            <a href="#" className="connection-item">
                              <img src="assets/images/slack.png" alt="" />{' '}
                              <span>Slack</span>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="conntection-footer">
                          <a href="#">More</a>
                        </div>
                      </li>
                    </ul>
                  </li>
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
                        src="assets/images/avatar-1.jpg"
                        alt=""
                        className="user-avatar-md rounded-circle"
                      />
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-right nav-user-dropdown"
                      aria-labelledby="navbarDropdownMenuLink2"
                    >
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-user mr-2" />Account
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-cog mr-2" />Setting
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
        )}
      </div>
    );
  }
}

export default withStyles(s)(Header);
