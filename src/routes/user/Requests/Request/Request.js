import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ReactPaginate from 'react-paginate';
import ContentHeader from '../../../../components/User/ContentHeader';
import AddRequest from '../../../../components/User/Request/AddRequest';
import RequestTable from '../../../../components/User/Tables/RequestTable';
import { REQUEST_SORT_OPTION } from '../../constants';
import Spinner from '../../../../components/User/Spinner';
import s from './Request.css';

import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import history from '../../../../history';
class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      pageIndex: 0,
      pageSize: 15,
      totalPageNum: 1,
      sortBy: { value: 1, label: 'Country' },
      requests: [
        {
          id: 3,
          name: 'ASDDF',
          category: { value: 2, label: 'Sports' },
          language: { value: 2, label: 'English' },
          ageGroup: { value: 2, label: 'Teenager' },
          period: { value: 2, label: 'Daily' },
        },
      ],
      allCountries: [],
      allAgeGroups: [],
      allCategories: [],
      allPeriods: [],
    };
    this.fetchRequests = this.fetchRequests.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.getAuxInfo = this.getAuxInfo.bind(this);
  }
  componentDidMount() {
    // this.getAuxInfo();
    // this.fetchRequests();
  }
  handlePageChange(pageIndex) {
    this.setState({ pageIndex: pageIndex.selected }, () => {
      this.fetchRequests();
    });
  }
  onRequestClick(id) {
    history.push(`/user/request/${id}`);
  }
  handleSelectChange = (selectedOption, op) => {
    this.setState(
      {
        [op]: selectedOption,
      },
      () => {
        this.fetchRequests();
      },
    );
  };
  fetchRequests() {
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
  getAuxInfo() {
    const url = `${SERVER}/getAuxInfoForAll`;
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
            allPeriods: response.ProductPeriod,
            allCategories: response.ProductContentType,
            allLanguages: response.ProductLanguage,
            allAgeGroups: response.AgeGroup,
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
              title="Request List"
              hasSort={true}
              onSortFunc={this.handleSelectChange}
              sortOptions={REQUEST_SORT_OPTION}
            />
            <RequestTable
              onRecordClick={this.onRequestClick}
              records={this.state.requests}
            />
            <div className="row">
              <div className="offset-xl-1 col-xl-3">
                {' '}
                <button
                  data-toggle="modal"
                  data-target="#requestModal"
                  className={`btn ${s.addBtn}`}
                >
                  Add Request
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <AddRequest
                  periods={this.state.allPeriods}
                  ageGroups={this.state.allAgeGroups}
                  categories={this.state.allCategories}
                  languages={this.state.allLanguages}
                  callBack={this.fetchRequests}
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
export default withStyles(s)(Request);
