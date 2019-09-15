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
              <ul className={`${s.itemContainer} navbar-nav flex-column `}>
                <li className="nav-divider">Menu</li>
                {/* accounts item */}
                <li className="nav-item ">
                  <a className="nav-link" href="/admin/accounts">
                    <i className="fa fa-fw fa-user-circle" />Accounts{' '}
                  </a>
                </li>
                {/* claims item */}
                <li className="nav-item ">
                  <a className="nav-link" href="/admin/claims">
                    <i className="far fa-hdd" />Claims{' '}
                  </a>
                </li>
                {/* Comments item */}
                <li className="nav-item ">
                  <a className="nav-link" href="/admin/comments">
                    <i className="fa fa-comments" />Comments{' '}
                  </a>
                </li>
                {/* Currencies item */}
                <li className="nav-item ">
                  <a className="nav-link" href="/admin/currencies">
                    <i className="far fa-money-bill-alt" />Currencies{' '}
                  </a>
                </li>
                {/* CMS item */}
                <li className="nav-item ">
                  <a className="nav-link" href="/admin/CMS">
                    <i className="far fa-object-group" />CMS{' '}
                  </a>
                </li>
                {/* Product item */}
                <li className="nav-item ">
                  <a className="nav-link" href="/admin/products">
                    <i className=" fab fa-product-hunt" />Products{' '}
                  </a>
                </li>
                {/* Customer Order item */}
                <li className="nav-item ">
                  <a className="nav-link" href="/admin/customerOrder">
                    <i className=" fa fa-shopping-basket" />Customer Order{' '}
                  </a>
                </li>
                {/* Publisher Order item */}
                <li className="nav-item ">
                  <a className="nav-link" href="/admin/publisherOrder">
                    <i className="fab fa-leanpub" />Publisher Order{' '}
                  </a>
                </li>
                {/* Settings item */}
                <li className="nav-item ">
                  <a className="nav-link" href="/admin/puborder">
                    <i className="icon-settings" />Settings{' '}
                  </a>
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
