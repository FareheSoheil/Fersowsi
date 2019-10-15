import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Claim.css';
class Claim extends React.Component {
  static propTypes = {
    claim: PropTypes.object.isRequired,
  };
  render() {
    return (
      <div>
        <span className={s.claimBanner}>
          <i class="fas fa-chevron-right" /> Claim 123
        </span>
        <div className={`row ${s.claimContainer}`}>
          <div className="col-xl-12 col-lg-12 addInputContainer">
            <div className="row mb-3">
              <div className="col-xl-2">
                <span>Order Id :</span>{' '}
              </div>
              <div className="col-xl-4">
                <span>{this.props.claim.orderId}</span>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-xl-2">
                <span> Date :</span>{' '}
              </div>
              <div className="col-xl-4">
                <span>{this.props.claim.createdAt}</span>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-xl-2">
                <span>Status :</span>{' '}
              </div>
              <div className="col-xl-4">
                <span>{this.props.claim.status.label}</span>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-xl-2">
                <span>Sender :</span>{' '}
              </div>
              <div className="col-xl-4">
                <span>{this.props.claim.customerName}</span>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-xl-2">
                <span>Receiver :</span>{' '}
              </div>
              <div className="col-xl-4">
                {/* <input value= disabled /> */}
                <span>{this.props.claim.publisherName}</span>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-xl-2">
                <span>Content :</span>{' '}
              </div>
              <div className="col-xl-4">
                <div
                  className={s.msgContainer}
                  dangerouslySetInnerHTML={{
                    __html: this.props.claim.messageHtml,
                  }}
                />
                {/* <textarea
                  className={s.textArea}
                  rows="5"
                  cols="50"
                  value={this.props.claim.content}
                  disabled
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(Claim);
