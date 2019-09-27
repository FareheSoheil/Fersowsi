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
import serialize from 'serialize-javascript';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './main.css';
import config from '../config';

/* eslint-disable react/no-danger */

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        cssText: PropTypes.string.isRequired,
      }).isRequired,
    ),
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    app: PropTypes.object, // eslint-disable-line
    children: PropTypes.string.isRequired,
  };

  static defaultProps = {
    styles: [],
    scripts: [],
  };

  render() {
    const { title, description, styles, scripts, app, children } = this.props;
    return (
      <html className="no-js" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {scripts.map(script => (
            <link key={script} rel="preload" href={script} as="script" />
          ))}
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="apple-touch-icon" href="/icon.png" />

          {/* <link rel="stylesheet" href="/ag-grid.css" />
          <link rel="stylesheet" href="/ag-theme-balham.css" />
          <link rel="stylesheet" href="/ag-theme-balham-dark.css" />
          <link rel="stylesheet" href="/ag-theme-blue.css" />
          <link rel="stylesheet" href="/ag-theme-bootstrap.css" />
          <link rel="stylesheet" href="/ag-theme-dark.css" />
          <link rel="stylesheet" href="/ag-theme-fresh.css" />
          <link rel="stylesheet" href="/ag-theme-material.css" />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
          /> */}
          <link
            rel="stylesheet"
            href="/assets/vendor/bootstrap/css/bootstrap.min.css"
          />
          <link
            href="/assets/vendor/fonts/circular-std/style.css"
            rel="stylesheet"
          />

          <link rel="stylesheet" href="/assets/libs/css/style.css" />
          <link rel="stylesheet" href="/assets/libs/css/user.css" />
          <link
            rel="stylesheet"
            href="/assets/vendor/fonts/fontawesome/css/fontawesome-all.css"
          />
          <link
            rel="stylesheet"
            href="/assets/vendor/charts/chartist-bundle/chartist.css"
          />
          <link
            rel="stylesheet"
            href="/assets/vendor/charts/morris-bundle/morris.css"
          />
          <link
            rel="stylesheet"
            href="/assets/vendor/fonts/material-design-iconic-font/css/materialdesignicons.min.css"
          />
          <link rel="stylesheet" href="/assets/vendor/charts/c3charts/c3.css" />
          <link
            rel="stylesheet"
            href="/assets/vendor/fonts/flag-icon-css/flag-icon.min.css"
          />
          <link rel="stylesheet" href="/main.css" />

          {styles.map(style => (
            <style
              key={style.id}
              id={style.id}
              dangerouslySetInnerHTML={{ __html: style.cssText }}
            />
          ))}
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          <script
            dangerouslySetInnerHTML={{ __html: `window.App=${serialize(app)}` }}
          />
          {scripts.map(script => <script key={script} src={script} />)}
          {config.analytics.googleTrackingId && (
            <script
              dangerouslySetInnerHTML={{
                __html:
                  'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
                  `ga('create','${
                    config.analytics.googleTrackingId
                  }','auto');ga('send','pageview')`,
              }}
            />
          )}
          {config.analytics.googleTrackingId && (
            <script
              src="https://www.google-analytics.com/analytics.js"
              async
              defer
            />
          )}

          <script src="/assets/vendor/jquery/jquery-3.3.1.min.js" />
          <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.js" />
          <script src="/assets/vendor/slimscroll/jquery.slimscroll.js" />
          <script src="/assets/libs/js/main-js.js" />
          <script src="/assets/vendor/charts/chartist-bundle/chartist.min.js" />
          <script src="/assets/vendor/charts/sparkline/jquery.sparkline.js" />
          <script src="/assets/vendor/charts/morris-bundle/raphael.min.js" />
          <script src="/assets/vendor/charts/morris-bundle/morris.js" />
          <script src="/assets/vendor/charts/c3charts/c3.min.js" />
          <script src="/assets/vendor/charts/c3charts/d3-5.4.0.min.js" />
          <script src="/assets/vendor/charts/c3charts/C3chartjs.js" />
          <script src="/assets/libs/js/dashboard-ecommerce.js" />
        </body>
      </html>
    );
  }
}

export default Html;
