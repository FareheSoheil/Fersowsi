import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Select from 'react-select';
import ContentHeader from '../../../../components/User/ContentHeader';
import Spinner from '../../../../components/User/Spinner';
import s from './AddressDetail.css';
import { SERVER } from '../../constants';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import history from '../../../../history';
class AddressDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.context.params.id,
      isLoading: false,
      address: {
        detailAddress: '',
        zipCode: '',
        city: '',
        state: '',
        country: '',
      },
      allCountries: [
        { value: '1', label: 'iran' },
        { value: '3', label: 'afghanistan' },
        { value: '2', label: 'iraq' },
      ],
    };
    this.fetchAddress = this.fetchAddress.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getAllCountries = this.getAllCountries.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }
  componentDidMount() {
    this.getAllCountries();
    this.fetchAddress();
  }

  handleInputChange(event) {
    const state = event.target.name;
    const value = event.target.value;
    let address = { ...this.state.address };
    address[state] = value;
    this.setState({ address });
  }
  handleSelectChange = (selectedOption, op) => {
    let address = { ...this.state.address };
    address[op] = selectedOption;
    this.setState({ address });
  };
  onDelete() {
    const url = `${SERVER}/deleteAddress`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      id: this.state.id,
    };
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
        if (response.error === undefined) {
          that.setState(
            {
              isLoading: false,
            },
            () => {
              toastr.success('deleted successfully');
              history.push('/user/address');
            },
          );
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
  onEdit() {
    const url = `${SERVER}/editAddress`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      id: this.state.id,
      address: this.state.address,
    };
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
        if (response.error === undefined) {
          that.setState(
            {
              isLoading: false,
            },
            () => {
              toastr.success('edited successfully');
            },
          );
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
  fetchAddress() {
    const url = `${SERVER}/getAddress`;
    const credentials = {
      id: this.state.id,
    };
    this.setState({ isLoading: true });
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
        if (response.error === undefined) {
          that.setState({
            address: response,
            isLoading: false,
          });
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
  getAllCountries() {
    const url = `${SERVER}/getAuxInfoForOneUser`;
    this.setState({ isLoading: true });
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const that = this;

    fetchWithTimeOut(
      url,
      options,
      response => {
        if (response.error === undefined) {
          that.setState({
            allCountries: response.countries,
            isLoading: false,
          });
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
  render() {
    return (
      <div>
        {' '}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div>
            <ContentHeader title="Address Details" hasSort={false} />
            <div className={`${s.addressContainer} container-fluid`}>
              <div className="row">
                <div className="col-xl-12 col-lg-12 ">
                  <div className="row mb-3 ">
                    <div className="col-xl-2 ">
                      <span>Address :</span>{' '}
                    </div>
                    <div className="col-xl-7">
                      <input
                        name="address1"
                        value={this.state.address.detailAddress}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-xl-2">
                      <span>Zip Code* :</span>{' '}
                    </div>
                    <div className="col-xl-4">
                      <input
                        name="zipCode"
                        value={this.state.address.zipCode}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xl-2">
                      <span>City* :</span>{' '}
                    </div>
                    <div className="col-xl-4">
                      <input
                        name="city"
                        value={this.state.address.city}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xl-2">
                      <span>State :</span>{' '}
                    </div>
                    <div className="col-xl-4">
                      <input
                        name="province"
                        value={this.state.address.province}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-xl-2">
                      <span>Country :</span>{' '}
                    </div>
                    <div className="col-xl-4">
                      <Select
                        className={s.selectWS}
                        options={this.state.allCountries}
                        onChange={so => this.handleSelectChange(so, 'country')}
                        value={
                          this.state.address.country === ''
                            ? {
                                value: this.state.address.countryId,
                                label: this.state.address.countryName,
                              }
                            : this.state.address.country
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="offset-xl-7 col-xl-2 col-lg-4 col-4">
                  <button className="user-btn edit-btn" onClick={this.onEdit}>
                    edit
                  </button>
                </div>
                <div className="col-xl-2 col-4">
                  <button
                    className="user-btn delete-btn"
                    onClick={this.onDelete}
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withStyles(s)(AddressDetail);
