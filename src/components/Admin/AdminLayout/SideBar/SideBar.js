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
import history from '../../../../history';

class SideBar extends React.Component {
  goTo(url) {
    // console.log(history);
    history.push(url);
  }
  render() {
    return (
      <div className={` ${s.scroll} nav-left-sidebar sidebar-dark`}>
        <div>
          <nav
            className="navbar navbar-expand-lg navbar-light"
            style={{ marginBottom: '80px' }}
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
                <li className="nav-divider">Menu</li>

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
                    <i className="fa fa-fw fa-user-circle" />* Users
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
                          <i className="fa fa-fw fa-user-circle" />All Users{' '}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          onClick={() => this.goTo('/admin/accounts/customers')}
                        >
                          <i className="fa fa-fw fa-user-circle" />Customers{' '}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          onClick={() =>
                            this.goTo('/admin/accounts/publishers')
                          }
                        >
                          <i className="fa fa-fw fa-user-circle" />Publishers{' '}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          onClick={() => this.goTo('/admin/accounts/operators')}
                        >
                          <i className="fa fa-fw fa-user-circle" />Operators{' '}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          onClick={() => this.goTo('/admin/accounts/add')}
                        >
                          <i className="fa fa-fw fa-user-circle" />Add User{' '}
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
                    <i className="far fa-hdd" />Claims{' '}
                  </a>
                </li>
                {/* Comments item */}
                <li className="nav-item ">
                  <a
                    className="nav-link"
                    onClick={() => this.goTo('/admin/comments')}
                  >
                    <i className="fa fa-comments" />Comments{' '}
                  </a>
                </li>
                {/* Comments item */}
                <li className="nav-item ">
                  <a
                    className="nav-link"
                    onClick={() => this.goTo('/admin/address')}
                  >
                    <i className="fa fa-comments" />Address{' '}
                  </a>
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
                    <i className=" fab fa-product-hunt" />Products
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
                          <i className=" fab fa-product-hunt" />All Products{' '}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          onClick={() => this.goTo('/admin/products/ready')}
                        >
                          <i className=" fab fa-product-hunt" />Ready Products{' '}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          onClick={() => this.goTo('/admin/products/pending')}
                        >
                          <i className=" fab fa-product-hunt" />Pending Products{' '}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          onClick={() =>
                            this.goTo('/admin/products/notAvailable')
                          }
                        >
                          <i className=" fab fa-product-hunt" />Not Available
                          Products{' '}
                        </a>
                      </li>
                      <li class="nav-item">
                        <i
                          class="fas fa-plus nav-link"
                          onClick={() => this.goTo('/admin/products/add')}
                        />{' '}
                        Add Product{' '}
                        {/* </i>
                        <a class="" /> */}
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
                    <i className="fa fa-fw fa-user-circle" />Customer Orders
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
                          <i class="fa-plus-circle" aria-hidden="true" />Add
                          Order{' '}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          onClick={() =>
                            this.goTo('/admin/customerOrder/all', '')
                          }
                        >
                          <i class="fas fa-plus-circle" />All Orders{' '}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          onClick={() => this.goTo('/admin/customerOrder/new')}
                        >
                          <i className="fa fa-fw fa-user-circle" />New Orders{' '}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          onClick={() =>
                            this.goTo('/admin/customerOrder/ignored')
                          }
                        >
                          <i className="fa fa-fw fa-user-circle" />Ignored
                          Orders{' '}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          onClick={() =>
                            this.goTo('/admin/customerOrder/cancelled')
                          }
                        >
                          <i className="fa fa-fw fa-user-circle" />Cancelled
                          Orders{' '}
                        </a>
                      </li>

                      <li class="nav-item">
                        <a
                          class="nav-link"
                          onClick={() =>
                            this.goTo('/admin/customerOrder/delayed')
                          }
                        >
                          <i className="fa fa-fw fa-user-circle" />Delayed
                          Orders{' '}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          onClick={() =>
                            this.goTo('/admin/customerOrder/inProgress')
                          }
                        >
                          <i className="fa fa-fw fa-user-circle" />In Progress
                          Orders{' '}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          onClick={() => this.goTo('/admin/customerOrder/done')}
                        >
                          <i className="fa fa-fw fa-user-circle" />Done Orders{' '}
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
                    <i className="fab fa-leanpub" /> Orders For Publishers
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
                          <i className="fa fa-fw fa-user-circle" />All Orders{' '}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          onClick={() =>
                            this.goTo('/admin/publisherOrder/cancelled')
                          }
                        >
                          <i className="fa fa-fw fa-user-circle" />Cancelled
                          Orders{' '}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          onClick={() =>
                            this.goTo('/admin/publisherOrder/accepted')
                          }
                        >
                          <i className="fa fa-fw fa-user-circle" />Accepted
                          Orders{' '}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          onClick={() => this.goTo('/admin/publisherOrder/add')}
                        >
                          <i className="fa fa-fw fa-user-circle" />Add Order{' '}
                        </a>
                      </li>
                    </ul>
                  </div>
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
                    <i class="fa fa-fw fa-rocket" />Settings
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
                          onClick={() =>
                            this.goTo('/admin/settings/currencies')
                          }
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
        </div>
      </div>
    );
  }
}

export default withStyles(s)(SideBar);
