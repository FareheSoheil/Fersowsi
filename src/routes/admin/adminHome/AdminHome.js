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
import { I18n } from 'react-redux-i18n';
import s from './AdminHome.css';
import { loadTranslations, setLocale } from 'react-redux-i18n';
import { translationsObject } from '../../../constants';
import history from '../../../history';
class AdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.changeLang = this.changeLang.bind(this);
  }
  changeLang() {
    localStorage.setItem('locale', 'en');

    document.location.reload(true);
  }
  render() {
    return (
      <div className="container-fluid dashboard-content">
        {/* This is Admin homepage {I18n.t('application.title')}
        <button onClick={this.changeLang}>change the language</button> */}
      </div>
    );
  }
}

export default withStyles(s)(AdminHome);
