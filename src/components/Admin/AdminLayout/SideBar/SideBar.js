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
    // console.log(history);
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
                  class={`collapse submenu ${s.submenuContainer} `}
                >
                  <ul className="nav flex-column">
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() => this.goTo('/admin/accounts/all', '')}
                      >
                        {/*  */}
                        My Account{' '}
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" onClick={() => this.logOut()}>
                        {/*  */}
                        log out{' '}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Accounts item */}
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#accounts"
                  data-toggle="collapse"
                  aria-expanded="false"
                  data-target="#accounts"
                  aria-controls="accounts"
                >
                  {/* * */}
                  Users
                </a>
                <div
                  id="accounts"
                  class={`collapse submenu ${s.submenuContainer} `}
                >
                  <ul class="nav flex-column">
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() => this.goTo('/admin/accounts/all', '')}
                      >
                        {/*  */}
                        All Users{' '}
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() => this.goTo('/admin/accounts/customers')}
                      >
                        {/*  */}
                        Customers{' '}
                      </a>
                    </li>

                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() => this.goTo('/admin/accounts/publishers')}
                      >
                        {/*  */}
                        Publishers{' '}
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() => this.goTo('/admin/accounts/operators')}
                      >
                        {/*  */}
                        Operators{' '}
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() => this.goTo('/admin/accounts/add')}
                      >
                        {/*  */}
                        Add User{' '}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Product item */}
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#products"
                  data-toggle="collapse"
                  aria-expanded="false"
                  data-target="#products"
                  aria-controls="products"
                >
                  {/*  */}
                  Products
                </a>
                <div
                  id="products"
                  class={`collapse submenu ${s.submenuContainer} `}
                >
                  <ul class="nav flex-column">
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() => this.goTo('/admin/products/all')}
                      >
                        All Products{' '}
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() => this.goTo('/admin/products/ready')}
                      >
                        Ready Products{' '}
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() => this.goTo('/admin/products/pending')}
                      >
                        Pending Products{' '}
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() =>
                          this.goTo('/admin/products/notAvailable')
                        }
                      >
                        Unavailable Products{' '}
                      </a>
                    </li>

                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() => this.goTo('/admin/products/add')}
                      >
                        Add Product{' '}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#customerOrders"
                  data-toggle="collapse"
                  aria-expanded="false"
                  data-target="#customerOrders"
                  aria-controls="customerOrders"
                >
                  {/*  */}
                  Customer Orders
                </a>
                <div
                  id="customerOrders"
                  class={`collapse submenu ${s.submenuContainer} `}
                >
                  <ul class="nav flex-column">
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() =>
                          this.goTo('/admin/customerOrder/add', '')
                        }
                      >
                        Add Order{' '}
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() =>
                          this.goTo('/admin/customerOrder/all', '')
                        }
                      >
                        All Orders{' '}
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() => this.goTo('/admin/customerOrder/new')}
                      >
                        New Orders{' '}
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() =>
                          this.goTo('/admin/customerOrder/ignored')
                        }
                      >
                        Ignored Orders{' '}
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() =>
                          this.goTo('/admin/customerOrder/cancelled')
                        }
                      >
                        Cancelled Orders{' '}
                      </a>
                    </li>

                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() =>
                          this.goTo('/admin/customerOrder/delayed')
                        }
                      >
                        Delayed Orders{' '}
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() =>
                          this.goTo('/admin/customerOrder/inProgress')
                        }
                      >
                        In Progress Orders{' '}
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() => this.goTo('/admin/customerOrder/done')}
                      >
                        Done Orders{' '}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Publisher Order item */}

              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#publisherOrder"
                  data-toggle="collapse"
                  aria-expanded="false"
                  data-target="#publisherOrder"
                  aria-controls="publisherOrder"
                >
                  {/* <i className="fab fa-leanpub" />  */}
                  Orders For Publishers
                </a>
                <div
                  id="publisherOrder"
                  class={`collapse submenu ${s.submenuContainer} `}
                >
                  <ul class="nav flex-column">
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() =>
                          this.goTo('/admin/publisherOrder/all', '')
                        }
                      >
                        All Orders{' '}
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() =>
                          this.goTo('/admin/publisherOrder/cancelled')
                        }
                      >
                        Cancelled Orders{' '}
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() =>
                          this.goTo('/admin/publisherOrder/accepted')
                        }
                      >
                        Accepted Orders{' '}
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() => this.goTo('/admin/publisherOrder/add')}
                      >
                        Add Order{' '}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              {/* claims item */}
              <li className="nav-item ">
                <a
                  className="nav-link"
                  onClick={() => this.goTo('/admin/claims')}
                  // href="/admin/claims"
                >
                  {/* <i className="far fa-hdd" /> */}
                  Claims{' '}
                </a>
              </li>
              {/* Comments item */}
              <li className="nav-item ">
                <a
                  className="nav-link"
                  onClick={() => this.goTo('/admin/comments')}
                >
                  {/* <i className="fa fa-comments" /> */}
                  Comments{' '}
                </a>
              </li>
              {/* Comments item */}
              <li className="nav-item ">
                <a
                  className="nav-link"
                  onClick={() => this.goTo('/admin/address')}
                >
                  {/* <i className="fa fa-comments" /> */}
                  Address{' '}
                </a>
              </li>

              {/* Settings item */}
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#"
                  data-toggle="collapse"
                  aria-expanded="false"
                  data-target="#submenu"
                  aria-controls="submenu"
                >
                  {/* <i class="fa fa-fw fa-rocket" /> */}
                  Settings
                </a>
                <div
                  id="submenu"
                  class={`collapse submenu ${s.submenuContainer} `}
                >
                  <ul class="nav flex-column">
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() => this.goTo('/admin/settings/ageGroups')}
                      >
                        Age Groups{' '}
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() =>
                          this.goTo('/admin/settings/poductLanguages')
                        }
                      >
                        Product Language
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() =>
                          this.goTo('/admin/settings/siteLanguages')
                        }
                      >
                        Site Language
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() =>
                          this.goTo('/admin/settings/productContentTypes')
                        }
                      >
                        Product Content Type
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() => this.goTo('/admin/settings/currencies')}
                      >
                        Currency
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() =>
                          this.goTo('/admin/settings/deliveryTypes')
                        }
                      >
                        Delivery Type
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() => this.goTo('/admin/settings/jobs')}
                      >
                        Job
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() => this.goTo('/admin/settings/zones')}
                      >
                        Zone
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        onClick={() => this.goTo('/admin/settings/countries')}
                      >
                        Country
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        {/* </div> */}
      </div>
    );
  }
}

export default withStyles(s)(SideBar);
