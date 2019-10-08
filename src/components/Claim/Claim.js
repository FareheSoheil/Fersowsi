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
import history from '../../history';
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
    orderId: PropTypes.string.isRequired,
    handleSimpleInputChange: PropTypes.func.isRequired,
    handleSelectChange: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    console.log('claims : ', this.props.claim);
    this.goToOrder = this.goToOrder.bind(this);
  }
  goToOrder() {
    history.push(`/admin/customerOrder/${this.props.orderId}`);
  }
  render() {
    return (
      // <div className={s.root}>
      <div className={s.container}>
        <div className="container-fluid">
          <div className={s.header}>
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-5 col-sm-4">
                <label>From</label> :{' '}
                {`${this.props.claim.senderUser.firstName} ${
                  this.props.claim.senderUser.lastName
                }`}
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4">
                <label>To :&nbsp;</label>
                {`${this.props.claim.receiverUser.firstName} ${
                  this.props.claim.receiverUser.lastName
                }`}
              </div>
              {this.props.claim.actionUser.id !==
              this.props.claim.receiverUser.id ? (
                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4">
                  <label>Action User :&nbsp;</label>
                  {`${this.props.claim.actionUser.firstName} ${
                    this.props.claim.actionUser.lastName
                  }`}
                </div>
              ) : (
                ''
              )}
              <div
                className="col-xl-3 col-lg-3 col-md-4 col-sm-4"
                style={{ cursor: 'pointer', color: '#69C9D3' }}
              >
                <label>Order Id :&nbsp;</label>{' '}
                <span onClick={this.goToOrder}>
                  <u> {this.props.orderId}</u>
                </span>
              </div>
              {/* <div className="col-xl-3 col-lg-3 col-md-3">
                <label class="custom-color-theme custom-control custom-radio custom-control-inline">
                  <input
                    type="checkbox"
                    name="isFinished"
                    class="custom-control-input"
                    value={!this.props.claim.isFinished}
                    onClick={e =>
                      this.props.handleSimpleInputChange(this.props.claim.id, e)
                    }
                    defaultChecked={
                      this.props.claim.isFinished === 'true' ||
                      this.props.claim.isFinished === true
                    }
                  />

                  <span class="custom-control-label">Is Finished</span>
                </label>
              </div> */}
            </div>
            <div className="row ">
              <div className="col-xl-4 col-lg-4 col-md-5 ">
                <label>Message Status :&nbsp;</label>
                {this.props.claim.messageStatus.value ===
                  MESSAGE_STATUS.Pending ||
                this.props.claim.messageStatus.value ===
                  MESSAGE_STATUS.SeenByAdmin ? (
                  <div
                    style={{
                      width: '50%',
                      display: 'inline-block',
                      paddingLeft: '5px',
                      textAlign: 'left',
                    }}
                  >
                    <Select
                      value={this.props.claim.messageStatus}
                      options={MESSAGE_STATUS_ARRAY}
                      onChange={so =>
                        this.props.handleSelectChange(
                          this.props.claim.id,
                          so,
                          'messageStatus',
                        )
                      }
                    />
                  </div>
                ) : (
                  this.props.claim.messageStatus.label
                )}
              </div>

              {this.props.claim.messageStatus.value ===
              MESSAGE_STATUS.Accepted ? (
                <div className="col-xl-3">
                  <label>Accepted By : </label>
                  {`${this.props.claim.acceptedAdmin.firstName} ${
                    this.props.claim.acceptedAdmin.lastName
                  }`}
                </div>
              ) : (
                ''
              )}
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
