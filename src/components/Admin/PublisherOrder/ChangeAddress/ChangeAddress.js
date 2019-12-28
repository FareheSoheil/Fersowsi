import React from 'react';
import Select from 'react-select';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { toastr } from 'react-redux-toastr';
import s from './ChangeAddress.css';
import DatePicker from 'react-datepicker';
import dateTrimmer from '../../../../dateTrimmer';
import { PRICE_SIGNS } from '../../../../constants/constantData';

class ChangeAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newRecieverName: this.props.currentRecieverName,
      newCO: this.props.currentCO,
      newAddress: {
        city: this.props.currentAddress.city,
        province: this.props.currentAddress.province,
        detailAddress: this.props.currentAddress.detailAddress,
        zipCode: this.props.currentAddress.zipCode,
        Country: this.props.currentAddress.Country,
      },
    };
    this.countryChange = this.countryChange.bind(this);
    this.printAddress = this.printAddress.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }
  onInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    let pres = { ...this.state };
    if (name == 'newRecieverName' || name == 'newCO') {
      pres[name] = value;
    } else {
      pres.newAddress[name] = value;
    }
    this.setState(pres, () => {
      console.log(this.state);
    });
  }
  countryChange(so) {
    let pres = { ...this.state.newAddress };
    pres.Country = so;
    this.setState({
      pres,
    });
  }
  printAddress() {
    if (
      this.state.newAddress.city == '' ||
      this.state.newAddress.province == '' ||
      this.state.newAddress.detailAddress == '' ||
      this.state.newAddress.zipCode == '' ||
      this.state.newAddress.Country.value == '' ||
      this.state.newAddress.newCO == '' ||
      this.state.newAddress.newRecieverName == ''
    )
      toastr.error('Changing Address', 'Please Fill all of the inputs');
    else
      this.props.printAddress(
        this.state.newAddress,
        this.state.newCO,
        this.state.newRecieverName,
      );
  }
  applySend(code) {
    if (
      this.state.newAddress.city == '' ||
      this.state.newAddress.province == '' ||
      this.state.newAddress.detailAddress == '' ||
      this.state.newAddress.zipCode == '' ||
      this.state.newAddress.Country.value == '' ||
      this.state.newAddress.newCO == '' ||
      this.state.newAddress.newRecieverName == ''
    )
      toastr.error('Address', 'Please Fill all of the inputs');
    else
      this.props.applySend(
        this.state.newAddress,
        this.state.newCO,
        this.state.newRecieverName,
        code,
      );
  }
  render() {
    return (
      <div className={`${s.container} container-fluid`}>
        <table className={s.table} cellpadding="15">
          <thead>
            <th width="20%">Fields</th>
            <th width="35%">New Address</th>
            <th width="30%">Current Address</th>
            {/* <th width="30%">Old Address</th> */}
          </thead>
          <tbody>
            <tr>
              <td>Reciever Name : </td>
              <td>
                <input
                  name="newRecieverName"
                  value={this.state.newRecieverName}
                  onChange={this.onInputChange}
                />
              </td>
              <td>
                <label>{this.props.currentRecieverName}</label>
              </td>
              {/* <td>
                <label>{this.props.oldRecieverName}</label>
              </td> */}
            </tr>

            <tr>
              <td>C/O : </td>
              <td>
                <input
                  name="newCO"
                  value={this.state.newCO}
                  onChange={this.onInputChange}
                />
              </td>
              <td>
                <label>{this.props.currentCO}</label>
              </td>
              {/* <td>
                <label>{this.props.oldCO}</label>
              </td> */}
            </tr>

            <tr>
              <td>Address : </td>
              <td>
                <input
                  name="detailAddress"
                  value={this.state.newAddress.detailAddress}
                  onChange={this.onInputChange}
                />
              </td>
              <td>
                <label>{this.props.currentAddress.detailAddress}</label>
              </td>
              {/* <td>
                <label>{this.props.oldAddress.detailAddress}</label>
              </td> */}
            </tr>

            <tr>
              <td>City : </td>
              <td>
                <input
                  name="city"
                  value={this.state.newAddress.city}
                  onChange={this.onInputChange}
                />
              </td>
              <td>
                <label>{this.props.currentAddress.city}</label>
              </td>
              {/* <td>
                <label>{this.props.oldAddress.city}</label>
              </td> */}
            </tr>

            <tr>
              <td>Zip Code : </td>
              <td>
                <input
                  name="zipCode"
                  value={this.state.newAddress.zipCode}
                  onChange={this.onInputChange}
                />
              </td>
              <td>
                <label>{this.props.currentAddress.zipCode}</label>
              </td>
              {/* <td>
                <label>{this.props.oldAddress.zipCode}</label>
              </td> */}
            </tr>

            <tr>
              <td>Province : </td>
              <td>
                <input
                  name="province"
                  value={this.state.newAddress.province}
                  onChange={this.onInputChange}
                />
              </td>
              <td>
                <label>{this.props.currentAddress.province}</label>
              </td>
              {/* <td>
                <label>{this.props.oldAddress.province}</label>
              </td> */}
            </tr>

            <tr>
              <td>Country : </td>
              <td>
                <Select
                  options={this.props.allCountries}
                  value={this.state.newAddress.Country}
                  onChange={this.countryChange}
                />
              </td>
              <td>
                <label>{this.props.currentAddress.Country.label}</label>
              </td>
              {/* <td>
                <label>{this.props.oldAddress.detailAddress.Country}</label>
              </td> */}
            </tr>
          </tbody>
        </table>

        <div className="row mt-3">
          <div className="col-2">
            <button onClick={() => this.applySend(1)}>Apply Changes</button>
          </div>
          <div className="col-2">
            <button onClick={this.printAddress}>Print Address</button>
          </div>
          <div className="col-3">
            <button onClick={() => this.applySend(2)}>
              Send Address To Publisher
            </button>
          </div>
          <div className="col-2">
            <button onClick={() => this.props.addressHistory('address')}>
              History
            </button>
          </div>
          <div className="col-2">
            <button onClick={this.props.back}>Back To Order</button>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(ChangeAddress);
