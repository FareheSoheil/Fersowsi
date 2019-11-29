import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ReactPaginate from 'react-paginate';
import ContentHeader from '../../../../components/User/ContentHeader';
import AddAddress from '../../../../components/User/AddAddress';
import Table from '../../../../components/User/Table';
import Spinner from '../../../../components/User/Spinner';
import s from './AddressBook.css';
import {
  ADDRESS_TABLE_LABELS,
  ADDRESS_RECORD_ITEMS,
  ADDRESS_SORT_OPTION,
  SERVER,
} from '../../constants';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import history from '../../../../history';
class AddressBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      pageIndex: 0,
      pageSize: 15,
      totalPageNum: 1,
      sortBy: { value: 1, label: 'Country' },
      addresses: [
        {
          id: 1,
          detailAddress:
            'asjkdas;lkdas;kljm;ojernfmsakdjwqeifowemfngo;jfnasojfnoflmsejnpwfnwrjg;nm',
          province: 'Mazandaran',
          country: 'iran',
          zipCode: '+98',
          city: 'sari',
        },
        {
          id: 2,
          detailAddress:
            'asjkdas;lkdasksldjfsdfhawluifhWYEFGSBDKQYUFGBldiysbxqiyfgdlbkxnelif;kljm;ojernfmsakdjwqeifowemfngo;jfnasojfnoflmsejnpwfnwrjg;nm',
          province: 'Tehran',
          country: 'iran',
          zipCode: '+98',
          city: 'Karaj',
        },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
      ],
      allCountries: [],
    };
    this.fetchAddresses = this.fetchAddresses.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.getAllCountries = this.getAllCountries.bind(this);
  }
  componentDidMount() {
    this.getAllCountries();
    this.fetchAddresses();
  }
  handlePageChange(pageIndex) {
    this.setState({ pageIndex: pageIndex.selected }, () => {
      this.fetchAddresses();
    });
  }
  onAddressClick(id) {
    history.push(`/user/address/${id}`);
  }
  handleSelectChange = (selectedOption, op) => {
    window.alert('op');
    this.setState(
      {
        [op]: selectedOption,
      },
      () => {
        this.fetchAddresses();
      },
    );
  };
  fetchAddresses() {
    const url = `${SERVER}/getAllAddressesOfSpecificUser`;
    this.setState({ isLoading: true });
    const credentials = {
      pageIndex: this.state.name,
      pageSize: this.state.password,
      sortBy: this.state.sortBy.value,
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
          that.setState({
            addresses: response,
            // totalPageNum: response.totalPageNum,
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
    const url = `${SERVER}/getAuxInfoForAllUsers`;
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
            <ContentHeader
              title="Address List"
              hasSort={true}
              onSortFunc={this.handleSelectChange}
              sortOptions={ADDRESS_SORT_OPTION}
            />
            <Table
              onRecordClick={this.onAddressClick}
              columnLabels={ADDRESS_TABLE_LABELS}
              records={this.state.addresses}
              recordItemNames={ADDRESS_RECORD_ITEMS}
            />
            <div className="row">
              <div className="offset-xl-1 col-xl-3">
                {' '}
                <button
                  data-toggle="modal"
                  data-target="#addressModal"
                  className={`btn ${s.addBtn}`}
                >
                  Add Address
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <AddAddress
                  countries={this.state.allCountries}
                  callBack={this.fetchAddresses}
                  // newAddress={this.state.newAddress}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withStyles(s)(AddressBook);
