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
            <img
              height="600"
              style={{ width: '100%' }}
              src="/assets/images/World_map.png"
            />
            <div className={s.mapTxt}>
              <h2>Ferdosiinfo</h2>{' '}
              {/* <div>Subscription Services With Free-Delivery</div> */}
              <br />
              <span>World Wide</span>
            </div>
          </div>
        </div>
        <div className={`${s.whiteBanner} row`}>
          <div className="col-12">
            Built for Professionals <br /> from Freelancer to Agency
          </div>
        </div>
        <div className="row">
          <div className={`${s.whiteContainer} col-12`}>
            <div className={`${s.img} row`}>
              <div className="offset-xl-1 col-xl-4 col-md-6 col-lg-6 col-sm-12 col-12">
                <br />
                <h2>Expansion and history</h2>
                <div className={s.justify}>
                  <div>
                    For fifty years from the book store's establishment, the
                    logo designed by Ramos herself was used which consists of
                    the name of the store on a white background and surrounded
                    by a red and white stripe design.
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-md-6 col-lg-6 col-sm-12">
                <img
                  src="/assets/images/greenC.png"
                  className={s.greenImgContainer}
                />
              </div>
            </div>{' '}
            <div className={`${s.img} row`}>
              <div className="offset-xl-1 col-xl-5 col-md-6 col-lg-6 col-sm-12">
                <img
                  src="/assets/images/pinkC.png"
                  className={s.pinkImgContainer}
                />
              </div>
              <div className="col-xl-4 col-md-6 col-lg-6 col-sm-12">
                <br />
                <br />
                <br />
                <h2>Get More Traffic Ads &amp; Conversations </h2>
                <div className={s.justify}>
                  <div>
                    For fifty years from the book store's establishment, the
                    logo designed by Ramos herself was used which consists of
                    the name of the store on a white background and surrounded
                    by a red and white stripe design.
                  </div>
                </div>
              </div>
            </div>{' '}
          </div>
        </div>

        <div className="row">
          {' '}
          <div className={`${s.woodContainer} col-12`}>
            {' '}
            <img
              height="600"
              style={{ width: '100%' }}
              src="/assets/images/table.png"
            />
          </div>
        </div>
        <div className="row mt-4" style={{ textAlign: 'center' }}>
          <div className="col-12">
            <h2>Technology For Institutions</h2>
          </div>
        </div>
        <div className={`${s.grayCardRow} row`}>
          {/* <div className="col-12" /> */}
          <div className="offset-xl-2 col-xl-3 mb-3">
            <div className={s.grayCard}>
              <h1>
                <i className="fas fa-gift" />
              </h1>

              <h3>Gift Card</h3>
              <div>
                Login to obtain your course materials , view order history, and
                more. All materials will be displayed for each course
              </div>
            </div>
          </div>
          <div className="col-xl-3 mb-3">
            <div className={s.grayCard}>
              <h1>
                <i className="fa fa-cog" aria-hidden="true" />
              </h1>

              <h3>Settings</h3>
              <div>
                Login to obtain your course materials , view order history, and
                more. All materials will be displayed for each course
              </div>
            </div>
          </div>
          <div className="col-xl-3 mb-3">
            <div className={s.grayCard}>
              <h1>
                <i className="fa fa-shopping-basket" aria-hidden="true" />
              </h1>

              <h3>Basket</h3>
              <div>
                Login to obtain your course materials , view order history, and
                more. All materials will be displayed for each course
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className={`${s.greenContainer}`}>
            <div className="col-xl-12">
              {' '}
              <h1 className="mb-5">Get Started With Ferdosiinfo Today</h1>
              Natural book store collaborated with french design firm <br />{' '}
              Malherbe for a new and more modern
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Landing);
