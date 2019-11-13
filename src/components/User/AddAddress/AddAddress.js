import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import Select from 'react-select';
import s from './AddAddress.css';
import { SERVER } from '../../../constants';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
// import {fe}

class AddAddress extends React.Component {
  static propTypes = {
    countries: PropTypes.array.isRequired,
    addFunc: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      newAddress: {
        detailAddress: '',
        zipCode: '',
        city: '',
        province: '',
        country: '',
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addAddresses = this.addAddresses.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  addAddresses() {
    const url = `${SERVER}/addAddressOfSpecificUser`;

    const credentials = {
      detailAddress: this.state.newAddress.detailAddress,
      zipCode: this.state.newAddress.zipCode,
      city: this.state.newAddress.city,
      province: this.state.newAddress.province,
      countryId: this.state.newAddress.country.value,
    };
    // window.alert(JSON.stringify(this.state.newAddress.country.value));
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const that = this;

    fetchWithTimeOut(
      url,
      options,
      response => {
        window.alert(response.message);
        if (response.error === undefined) {
          that.setState(
            {
              newAddress: {
                detailAddress: '',
                zipCode: '',
                city: '',
                province: '',
                country: '',
              },
            },
            () => {
              this.props.callBack();
            },
          );
          toastr.success('Address Added Successfully');
        } else {
          toastr.error(response.error.title, response.error.description);
        }
      },
      () => {
        // toastr.error('sala', ERRORS.REPEATED_USER);
        // console.log('login e rror : ', error);
      },
    );
  }
  handleInputChange(event) {
    const state = event.target.name;
    const value = event.target.value;
    let newAddress = { ...this.state.newAddress };
    newAddress[state] = value;
    this.setState({ newAddress });
  }
  handleSelectChange = (selectedOption, op) => {
    let newAddress = { ...this.state.newAddress };
    newAddress[op] = selectedOption;
    this.setState({ newAddress });
  };
  render() {
    return (
      <div class="card-body">
        <div>
          <div
            class="modal fade"
            id="addressModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="addressModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="addressModalLabel">
                    Add Address{' '}
                  </h5>
                  <a
                    href="#"
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
                        name="detailAddress"
                        value={this.state.newAddress.detailAddress}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-xl-3">
                      <span>Zip Code* :</span>{' '}
                    </div>
                    <div className="col-xl-4">
                      <input
                        name="zipCode"
                        value={this.state.newAddress.zipCode}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xl-3">
                      <span>City* :</span>{' '}
                    </div>
                    <div className="col-xl-4">
                      <input
                        name="city"
                        value={this.state.newAddress.city}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xl-3">
                      <span>State :</span>{' '}
                    </div>
                    <div className="col-xl-4">
                      <input
                        name="province"
                        value={this.state.newAddress.province}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-xl-3">
                      <span>Country :</span>{' '}
                    </div>
                    <div className="col-xl-7">
                      <Select
                        options={this.props.countries}
                        onChange={so => this.handleSelectChange(so, 'country')}
                        value={this.state.newAddress.country}
                      />
                    </div>
                  </div>
                </div>
                <div class="modal-footer addInputContainer">
                  <button
                    data-dismiss="modal"
                    href="#"
                    class="btn btn-info"
                    onClick={this.addAddresses}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AddAddress);
