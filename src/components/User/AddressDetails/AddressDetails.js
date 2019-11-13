import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import Select from 'react-select';
import s from './AddressDetails.css';
import { SERVER } from '../../../constants';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
// import {fe}

class AddressDetails extends React.Component {
  static propTypes = {
    address: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
  }
  close() {
    let x = document.getElementById('addressDetailModal');
    x.classList.remove('show');
    x.style.display = 'none';
  }
  render() {
    return (
      <div class="card-body">
        <div>
          <div
            class="modal fade"
            id="addressDetailModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="addressModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="addressModalLabel">
                    Address Details{' '}
                  </h5>
                  <a
                    onClick={this.close}
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </a>
                </div>
                <div class="modal-body ml-5 addInputContainer">
                  <div className="row mb-3 ">
                    <div className="col-xl-3 ">
                      <span>Address* :</span>{' '}
                    </div>
                    <div className="col-xl-7">
                      <input
                        value={this.props.address.detailAddress}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-xl-3">
                      <span>Zip Code* :</span>{' '}
                    </div>
                    <div className="col-xl-4">
                      <input disabled value={this.props.address.zipCode} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xl-3">
                      <span>City* :</span>{' '}
                    </div>
                    <div className="col-xl-4">
                      <input disabled value={this.props.address.city} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xl-3">
                      <span>State :</span>{' '}
                    </div>
                    <div className="col-xl-4">
                      <input value={this.props.address.province} disabled />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-xl-3">
                      <span>Country :</span>{' '}
                    </div>
                    <div className="col-xl-4">
                      <input value={this.props.address.Country.name} disabled />
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

export default withStyles(s)(AddressDetails);
