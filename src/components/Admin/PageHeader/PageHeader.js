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
import s from './PageHeader.css';

class PageHeader extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    breadCrumbs: PropTypes.array.isRequired,
  };
  render() {
    return (
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="page-header">
            <h2 className="pageheader-title">{this.props.title} </h2>

            <div className="page-breadcrumb">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  {this.props.breadCrumbs.map(
                    (brc, i) =>
                      i === this.props.breadCrumbs.length - 1 ? (
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          {brc.label}
                        </li>
                      ) : (
                        <li className="breadcrumb-item">
                          <a href={brc.link} className="breadcrumb-link">
                            {brc.label}
                          </a>
                        </li>
                      ),
                  )}
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(PageHeader);
