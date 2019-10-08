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
import history from '../../../history';

class SideBar extends React.Component {
  goTo(url) {
    console.log(history);
    history.push(url);
  }
  render() {
    return (
      <div className="nav-left-sidebar sidebar-dark">
        <div className={` ${s.scrollbar}`}>
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
                {/* accounts item */}
                <li className="nav-item ">
                  <a
                    className="nav-link"
                    onClick={() => this.goTo('/admin/accounts')}
                  >
                    <i className="fa fa-fw fa-user-circle" />Accounts{' '}
                  </a>
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
                {/* Currencies item */}
                {/* <li className="nav-item ">
                  <a
                    className="nav-link"
                    onClick={() => this.goTo('/admin/currencies')}
                  >
                    <i className="far fa-money-bill-alt" />Currencies{' '}
                  </a>
                </li> */}
                {/* CMS item */}
                <li className="nav-item ">
                  <a
                    className="nav-link"
                    onClick={() => this.goTo('/admin/CMS')}
                  >
                    <i className="far fa-object-group" />CMS{' '}
                  </a>
                </li>
                {/* Product item */}
                <li className="nav-item ">
                  <a
                    className="nav-link"
                    onClick={() => this.goTo('/admin/products')}
                  >
                    <i className=" fab fa-product-hunt" />Products{' '}
                  </a>
                </li>
                {/* Customer Order item */}
                <li className="nav-item ">
                  <a
                    className="nav-link"
                    onClick={() => this.goTo('/admin/customerOrder')}
                    // href="/admin/customerOrder"
                  >
                    <i className=" fa fa-shopping-basket" />Customer Order{' '}
                  </a>
                </li>
                {/* Publisher Order item */}
                <li className="nav-item ">
                  <a
                    className="nav-link"
                    onClick={() => this.goTo('/admin/publisherOrder')}
                    href="/admin/publisherOrder"
                  >
                    <i className="fab fa-leanpub" />Publisher Order{' '}
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
