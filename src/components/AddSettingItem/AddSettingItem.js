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
import PropTypes from 'prop-types';
import s from './AddSettingItem.css';

class AddSettingItem extends React.Component {
  static propTypes = {
    addRecord: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      recordId: '',
      newName: '',
    };

    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({
      newName: e.target.value,
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <br />
        <div className="row" style={{ verticalAlign: 'middle' }}>
          <span
            style={{
              paddingTop: '9px',
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>
              Add {this.props.title} :{' '}
            </b>
          </span>
          <div className="col-xl-4 col-lg-4 col-md-5 col-sm-12">
            <input
              value={this.state.newName}
              className="form-control form-control-lg "
              onChange={this.props.onChange}
            />{' '}
          </div>
          <div className="col-1">
            {' '}
            <button
              className="btn btn-success"
              onClick={e => this.props.addRecord(this.state.newName)}
            >
              {' '}
              Add
            </button>
          </div>
          <div className="col-2"> </div>
        </div>
        <br />
      </div>
    );
  }
}

export default withStyles(s)(AddSettingItem);
