import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import dateTrimmer from '../../../dateTrimmer';
import s from './Claim.css';
class Claim extends React.Component {
  static propTypes = {
    claim: PropTypes.object.isRequired,
    userId: PropTypes.number.isRequired,
  };
  render() {
    const msg = JSON.parse(this.props.claim.messageHtml);

    let txt = '';
    if (msg.value == 2) txt = `missing numbers are : ${msg.missingNo}`;
    else if (msg.value == 3) txt = `wrong numbers are : ${msg.wrongNo}`;
    else if (msg.value == 4) txt = `damaged issues are : ${msg.brokenNo}`;

    return (
      <div className="container">
        <div className={`${s.claimContainer} `}>
          {/* justify-content-end */}
          <div
            className={
              this.props.claim.senderUser.id != this.props.userId
                ? 'row justify-content-end'
                : 'row'
            }
          >
            <div className="col-xl-6">
              <div className="row">
                <div
                  className={`col-xl-12 col-lg-12 addInputContainer ${
                    s.claimBody
                  } `}
                >
                  <div className="row mb-1">
                    {/* <div className="col-xl-4 col-lg-6 col-md-6 mb-2">
                      <span>Order Id : </span> <a>{this.props.claim.orderId}</a>
                    </div> */}
                    <div className="col-xl-12  col-lg-12 col-md-12 mb-2">
                      <span> Date :</span>{' '}
                      <span>{dateTrimmer(this.props.claim.createdAt)}</span>
                    </div>
                    <div className="col-xl-12  col-lg-12 col-md-12 mb-2">
                      <span>Title :</span>{' '}
                      <span>
                        <b>{JSON.parse(this.props.claim.messageHtml).label}</b>
                      </span>
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
                          __html: `${txt} \n ${
                            JSON.parse(this.props.claim.messageHtml).content
                          }`,
                        }}
                      />
                    </div>
                    <div className="col-xl-4" />
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
