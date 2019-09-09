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
import Select from 'react-select';
import {
  MESSAGE_STATUS,
  MESSAGE_STATUS_ARRAY,
  CLAIM_STATUS,
  CLAIM_STATUS_ARRAY,
} from '../../constants/constantData';
import s from './Claim.css';

class Claim extends React.Component {
  static propTypes = {
    claim: PropTypes.object.isRequired,
    handleSimpleInputChange: PropTypes.func.isRequired,
    handleSelectChange: PropTypes.func.isRequired,
  };
  render() {
    return (
      // <div className={s.root}>
      <div className={s.container}>
        <div className="container-fluid">
          <div className={s.header}>
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-5 col-sm-4">
                <label>From</label> : {this.props.claim.senderUsername}
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4">
                <label>To :&nbsp;</label>
                {this.props.claim.receiverUsername}aaaaaaaaaaaaaaaaaaa
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4">
                <label>Order Id :&nbsp;</label>assssssssssssssss{' '}
                {this.props.claim.customerOrderId}
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4">
                <label>Replied To :&nbsp;</label>assssssssssssssss{' '}
                {this.props.claim.repliedMessageId}
              </div>
            </div>
            <div className="row ">
              <div className="col-xl-4 col-lg-4 col-md-5">
                <label>Message Status :&nbsp;</label>
                {this.props.claim.messageStatus.value ===
                  MESSAGE_STATUS.Pending ||
                this.props.claim.messageStatus.value ===
                  MESSAGE_STATUS.SeenByAdmin ? (
                  <Select
                    value={this.props.claim.messageStatus}
                    options={MESSAGE_STATUS_ARRAY}
                    onChange={so =>
                      this.props.handleSelectChange(id, so, 'messageStatus')
                    }
                  />
                ) : (
                  this.props.claim.messageStatus.label
                )}
              </div>

              {this.props.claim.messageStatus.value ===
              MESSAGE_STATUS.Accepted ? (
                <div className="col-xl-3">
                  <label>Accepted By : </label>
                  {this.props.claim.acceptedAdminUsername}
                </div>
              ) : (
                ''
              )}
              <div className="col-xl-3 col-lg-3 col-md-3">
                {/*  */}
                <label class="custom-color-theme custom-control custom-radio custom-control-inline">
                  <input
                    type="checkbox"
                    name="isFinished"
                    class="custom-control-input"
                    value={!this.props.claim.isFinished}
                    onClick={e => this.props.handleSimpleInputChange(id, e)}
                    defaultChecked={
                      this.props.claim.isFinished === 'true' ||
                      this.props.claim.isFinished === true
                    }
                  />

                  <span class="custom-control-label">Is Finished</span>
                </label>
              </div>
            </div>
          </div>
          <hr />
          <h4>Claim Content</h4>
          <div
            className={s.msgContainer}
            dangerouslySetInnerHTML={{ __html: this.props.claim.messageHtml }}
          />
        </div>
      </div>
      // </div>
    );
  }
}

export default withStyles(s)(Claim);
