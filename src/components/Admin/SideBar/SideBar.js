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

class SideBar extends React.Component {
  render() {
    return (
      <div className="nav-left-sidebar sidebar-dark">
        <div className={`menu-list ${s.scrollbar}`}>
          <nav className="navbar navbar-expand-lg navbar-light">
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
              <ul className="navbar-nav flex-column">
                <li className="nav-divider">Menu</li>
                {/* dashboard item */}
                <li className="nav-item ">
                  <a
                    className="nav-link"
                    href="#"
                    data-toggle="collapse"
                    aria-expanded="false"
                    data-target="#submenu-1"
                    aria-controls="submenu-1"
                  >
                    <i className="fa fa-fw fa-user-circle" />Dashboard{' '}
                    <span className="badge badge-success">6</span>
                  </a>
                  <div id="submenu-1" className="collapse submenu">
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#"
                          data-toggle="collapse"
                          aria-expanded="false"
                          data-target="#submenu-1-2"
                          aria-controls="submenu-1-2"
                        >
                          E-Commerce
                        </a>
                        <div id="submenu-1-2" className="collapse submenu">
                          <ul className="nav flex-column">
                            <li className="nav-item">
                              <a className="nav-link" href="index.html">
                                E Commerce Dashboard
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                href="ecommerce-product.html"
                              >
                                Product List
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                href="ecommerce-product-single.html"
                              >
                                Product Single
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                href="ecommerce-product-checkout.html"
                              >
                                Product Checkout
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/admin/contact">
                          Finance
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="dashboard-sales.html">
                          Sales
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#"
                          data-toggle="collapse"
                          aria-expanded="false"
                          data-target="#submenu-1-1"
                          aria-controls="submenu-1-1"
                        >
                          Infulencer
                        </a>
                        <div id="submenu-1-1" className="collapse submenu">
                          <ul className="nav flex-column">
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                href="dashboard-influencer.html"
                              >
                                Influencer
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                href="influencer-finder.html"
                              >
                                Influencer Finder
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                href="influencer-profile.html"
                              >
                                Influencer Profile
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                {/* Comments item */}
                <li className="nav-item ">
                  <a
                    className="nav-link"
                    href="/admin/comments"
                    aria-expanded="false"
                  >
                    <i className="fa fa-fw fa-user-circle" />Comments{' '}
                    {/* <span className="badge badge-success">6</span> */}
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    data-toggle="collapse"
                    aria-expanded="false"
                    data-target="#submenu-2"
                    aria-controls="submenu-2"
                  >
                    <i className="fa fa-fw fa-rocket" />UI Elements
                  </a>
                  <div id="submenu-2" className="collapse submenu">
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <a className="nav-link" href="pages/cards.html">
                          Cards{' '}
                          <span className="badge badge-secondary">New</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/general.html">
                          General
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/carousel.html">
                          Carousel
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/listgroup.html">
                          List Group
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/typography.html">
                          Typography
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/accordions.html">
                          Accordions
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/tabs.html">
                          Tabs
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    data-toggle="collapse"
                    aria-expanded="false"
                    data-target="#submenu-3"
                    aria-controls="submenu-3"
                  >
                    <i className="fas fa-fw fa-chart-pie" />Chart
                  </a>
                  <div id="submenu-3" className="collapse submenu">
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <a className="nav-link" href="pages/chart-c3.html">
                          C3 Charts
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="pages/chart-chartist.html"
                        >
                          Chartist Charts
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/chart-charts.html">
                          Chart
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/chart-morris.html">
                          Morris
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="pages/chart-sparkline.html"
                        >
                          Sparkline
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/chart-gauge.html">
                          Guage
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item ">
                  <a
                    className="nav-link"
                    href="#"
                    data-toggle="collapse"
                    aria-expanded="false"
                    data-target="#submenu-4"
                    aria-controls="submenu-4"
                  >
                    <i className="fab fa-fw fa-wpforms" />Forms
                  </a>
                  <div id="submenu-4" className="collapse submenu">
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <a className="nav-link" href="pages/form-elements.html">
                          Form Elements
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="pages/form-validation.html"
                        >
                          Parsely Validations
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/multiselect.html">
                          Multiselect
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/datepicker.html">
                          Date Picker
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="pages/bootstrap-select.html"
                        >
                          Bootstrap Select
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    data-toggle="collapse"
                    aria-expanded="false"
                    data-target="#submenu-5"
                    aria-controls="submenu-5"
                  >
                    <i className="fas fa-fw fa-table" />Tables
                  </a>
                  <div id="submenu-5" className="collapse submenu">
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <a className="nav-link" href="pages/general-table.html">
                          General Tables
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/data-tables.html">
                          Data Tables
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-divider">Features</li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    data-toggle="collapse"
                    aria-expanded="false"
                    data-target="#submenu-6"
                    aria-controls="submenu-6"
                  >
                    <i className="fas fa-fw fa-file" /> Pages{' '}
                  </a>
                  <div id="submenu-6" className="collapse submenu">
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <a className="nav-link" href="pages/blank-page.html">
                          Blank Page
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="pages/blank-page-header.html"
                        >
                          Blank Page Header
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/login.html">
                          Login
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/404-page.html">
                          404 page
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/sign-up.html">
                          Sign up Page
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="pages/forgot-password.html"
                        >
                          Forgot Password
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/pricing.html">
                          Pricing Tables
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/timeline.html">
                          Timeline
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/calendar.html">
                          Calendar
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="pages/sortable-nestable-lists.html"
                        >
                          Sortable/Nestable List
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/widgets.html">
                          Widgets
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/media-object.html">
                          Media Objects
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/cropper-image.html">
                          Cropper
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/color-picker.html">
                          Color Picker
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    data-toggle="collapse"
                    aria-expanded="false"
                    data-target="#submenu-7"
                    aria-controls="submenu-7"
                  >
                    <i className="fas fa-fw fa-inbox" />Apps{' '}
                    <span className="badge badge-secondary">New</span>
                  </a>
                  <div id="submenu-7" className="collapse submenu">
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <a className="nav-link" href="pages/inbox.html">
                          Inbox
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/email-details.html">
                          Email Detail
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/email-compose.html">
                          Email Compose
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/message-chat.html">
                          Message Chat
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    data-toggle="collapse"
                    aria-expanded="false"
                    data-target="#submenu-8"
                    aria-controls="submenu-8"
                  >
                    <i className="fas fa-fw fa-columns" />Icons
                  </a>
                  <div id="submenu-8" className="collapse submenu">
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="pages/icon-fontawesome.html"
                        >
                          FontAwesome Icons
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/icon-material.html">
                          Material Icons
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="pages/icon-simple-lineicon.html"
                        >
                          Simpleline Icon
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/icon-themify.html">
                          Themify Icon
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/icon-flag.html">
                          Flag Icons
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/icon-weather.html">
                          Weather Icon
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    data-toggle="collapse"
                    aria-expanded="false"
                    data-target="#submenu-9"
                    aria-controls="submenu-9"
                  >
                    <i className="fas fa-fw fa-map-marker-alt" />Maps
                  </a>
                  <div id="submenu-9" className="collapse submenu">
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <a className="nav-link" href="pages/map-google.html">
                          Google Maps
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="pages/map-vector.html">
                          Vector Maps
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    data-toggle="collapse"
                    aria-expanded="false"
                    data-target="#submenu-10"
                    aria-controls="submenu-10"
                  >
                    <i className="fas fa-f fa-folder" />Menu Level
                  </a>
                  <div id="submenu-10" className="collapse submenu">
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          Level 1
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#"
                          data-toggle="collapse"
                          aria-expanded="false"
                          data-target="#submenu-11"
                          aria-controls="submenu-11"
                        >
                          Level 2
                        </a>
                        <div id="submenu-11" className="collapse submenu">
                          <ul className="nav flex-column">
                            <li className="nav-item">
                              <a className="nav-link" href="#">
                                Level 1
                              </a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="#">
                                Level 2
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          Level 3
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
