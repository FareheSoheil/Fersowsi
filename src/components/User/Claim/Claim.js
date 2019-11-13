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
      <div className="container">
        <div className={`${s.claimContainer} `}>
          {/* justify-content-end */}
          <div
            className={
              this.props.claim.status.label == 'seen'
                ? 'row justify-content-end'
                : 'row'
            }
          >
            <div className="col-xl-6">
              <div className="row">
                <span className={`col-xl-12 col-lg-12 ${s.claimBanner} `}>
                  <i class="fas fa-chevron-right" /> Claim 123
                </span>
              </div>
              <div className="row">
                <div
                  className={`col-xl-12 col-lg-12 addInputContainer ${
                    s.claimBody
                  } `}
                >
                  <div className="row mb-1">
                    <div className="col-xl-4 col-lg-6 col-md-6 mb-2">
                      <span>Order Id : </span> <a>{this.props.claim.orderId}</a>
                    </div>
                    <div className="col-xl-4  col-lg-6 col-md-6 mb-2">
                      <span> Date :</span>{' '}
                      <span>{this.props.claim.createdAt}</span>
                    </div>
                    {/* <div className="col-xl-4  col-lg-6 col-md-6 mb-2">
                      <span>Status :</span>{' '}
                      <span
                        className={
                          this.props.claim.status.label == 'new'
                            ? s.new
                            : s.seen
                        }
                      >
                        {this.props.claim.status.label}
                      </span>
                    </div> */}
                  </div>

                  {/* <div className="row mb-3">
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
                  <span>{this.props.claim.publisherName}</span>
                </div>
              </div>
          */}

                  <div className="row mb-3">
                    <div className="col-xl-12">
                      {/* <span>Message :</span> */}
                      <div
                        className={s.msgContainer}
                        dangerouslySetInnerHTML={{
                          __html: this.props.claim.messageHtml,
                        }}
                      />
                    </div>
                    <div className="col-xl-4">
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
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(Claim);
