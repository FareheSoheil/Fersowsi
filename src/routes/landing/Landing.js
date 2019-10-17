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
import history from '../../history';
import s from './Landing.css';

class Landing extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.goToLogin = this.goToLogin.bind(this);
  }
  goToLogin() {
    history.push('/login');
  }
  render() {
    return (
      <div className={`${s.mainContainer} container-fluid`}>
        <div className="row">
          <div className={`${s.mapContainer} col-12`}>
            {' '}
            <h2>Ferdowsiinfo</h2>{' '}
            <div>Subscription Services With Free-Delivery</div>
            <br />
            <span>World Wide</span>
          </div>
          <div className={`${s.whiteContainer} col-12`}>
            <div className={`${s.whiteBanner} row`}>
              <div className="col-12">
                {' '}
                Built for Professionals <br /> from Freelancer to Agency
              </div>
            </div>
            <div className={`${s.row} row`}>
              <div className="col-xl-6 col-md-6 col-lg-6 col-sm-12">txt</div>
              <div className="col-xl-6 col-md-6 col-lg-6 col-sm-12">
                <img
                  src="/assets/images/green.png"
                  className={s.imgContainer}
                />
              </div>
            </div>{' '}
            <div className={`${s.row} row`}>
              <div className="col-xl-6 col-md-6 col-lg-6 col-sm-12">txt</div>
              <div className="col-xl-6 col-md-6 col-lg-6 col-sm-12">
                picture
              </div>
            </div>{' '}
          </div>
          <div className={`${s.woodContainer} col-12`}>
            {' '}
            <img
              height="300"
              style={{ width: '100%' }}
              src="/assets/images/wood.jpg"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Landing);
