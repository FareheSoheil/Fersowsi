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
import s from './Footer.css';
import Link from '../../../Link';

class Footer extends React.Component {
  render() {
    return (
      <div>
        <div className={s.root}>
          <div className={s.container}>
            <div className="container-fluid">
              <div className="row mt-3">
                <div className="col-xl-2 col-lg-4 col-sm 6">
                  <img
                    height="80"
                    width="80"
                    src="/assets/images/footer_logo.png"
                  />
                </div>
                <div className="col-xl-2 col-lg-4 col-sm 6">
                  <div className="row mt-3">
                    {' '}
                    <div className="col-xl-12">
                      <a className={s.link} href="/aboutUs">
                        About
                      </a>
                    </div>
                  </div>
                  <div className="row mt-3">
                    {' '}
                    <div className="col-xl-12">
                      <a className={s.link} href="/terms">
                        Terms
                      </a>
                    </div>
                  </div>
                  <div className="row mt-3">
                    {' '}
                    <div className="col-xl-12">
                      <a className={s.link} href="/siteMap">
                        Site Map
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-4 col-sm 6">
                  <div className="row mt-3">
                    {' '}
                    <div className="col-xl-12">
                      <a className={s.link} href="/offices">
                        Offices
                      </a>
                    </div>
                  </div>
                  <div className="row mt-3">
                    {' '}
                    <div className="col-xl-12">
                      <a className={s.link} href="/login">
                        Publisher Login
                      </a>
                    </div>
                  </div>
                  <div className="row mt-3">
                    {' '}
                    <div className="col-xl-12">
                      <a className={s.link} href="/">
                        Contract Information
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-sm 6">
                  <div className="row mt-3">
                    {' '}
                    <div className="col-xl-12">
                      <a className={s.link} href="/contactUs">
                        Contact Us
                      </a>
                    </div>
                  </div>
                  <div className="row mt-3">
                    {' '}
                    <div className="col-xl-12">
                      <a className={s.link} href="/howToSearch">
                        How To Search
                      </a>
                    </div>
                  </div>
                  <div className="row mt-3">
                    {' '}
                    <div className="col-xl-12">
                      <a className={s.link} href="/howToShop">
                        How to Subscribe
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    s.iconContainer
                  } col-xl-3 col-lg-4 col-sm 6 pt-3`}
                >
                  <i class="fab fa-twitter" />
                  <i class="fab fa-instagram" />
                  <i class="fab fa-facebook-f" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Footer);
