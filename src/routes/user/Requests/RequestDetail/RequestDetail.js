import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Select from 'react-select';
import ContentHeader from '../../../../components/User/ContentHeader';
import Spinner from '../../../../components/User/Spinner';
import s from './RequestDetail.css';
import { SERVER } from '../../constants';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import history from '../../../../history';
class RequestDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.context.params.id,
      isLoading: false,
      request: {
        id: 3,
        name: 'ASDDF',
        category: { value: 2, label: 'Sports' },
        language: { value: 2, label: 'English' },
        ageGroup: { value: 2, label: 'Teenager' },
        period: { value: 2, label: 'Daily' },
        details: 'alskjhd;owuefdlougfbdslofucshwfjzd',
      },
      allCountries: [
        { value: '1', label: 'iran' },
        { value: '3', label: 'afghanistan' },
        { value: '2', label: 'iraq' },
      ],
    };
    this.fetchRequest = this.fetchRequest.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getAllCountries = this.getAllCountries.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }
  componentDidMount() {
    // this.getAllCountries();
    // this.fetchRequest();
  }

  handleInputChange(event) {
    const state = event.target.name;
    const value = event.target.value;
    let address = { ...this.state.request };
    address[state] = value;
    this.setState({ address });
  }
  handleSelectChange = (selectedOption, op) => {
    let address = { ...this.state.request };
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
      address: this.state.request,
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
  fetchRequest() {
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
                    <div className="col-xl-4">
                      <input
                        name="name"
                        value={this.state.request.name}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xl-2">
                      <span>Category :</span>{' '}
                    </div>
                    <div className="col-xl-4">
                      <Select
                        className={s.selectWS}
                        options={this.state.allCategories}
                        onChange={so => this.handleSelectChange(so, 'category')}
                        value={
                          this.state.request.category == ''
                            ? {
                                value: this.state.request.categoryId,
                                label: this.state.request.categoryName,
                              }
                            : this.state.request.category
                        }
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-xl-2">
                      <span>Language :</span>{' '}
                    </div>
                    <div className="col-xl-4">
                      <Select
                        className={s.selectWS}
                        options={this.state.allLanguages}
                        onChange={so => this.handleSelectChange(so, 'language')}
                        value={this.state.request.language}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xl-2">
                      <span>Age Group :</span>{' '}
                    </div>
                    <div className="col-xl-4">
                      <Select
                        className={s.selectWS}
                        options={this.state.allAgeGroups}
                        onChange={so => this.handleSelectChange(so, 'ageGroup')}
                        value={this.state.request.ageGroup}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xl-2">
                      <span>Periodical :</span>{' '}
                    </div>
                    <div className="col-xl-4">
                      <Select
                        className={s.selectWS}
                        options={this.state.allPeriods}
                        onChange={so => this.handleSelectChange(so, 'period')}
                        value={this.state.request.period}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xl-2">
                      <span>Details :</span>{' '}
                    </div>
                    <div className="col-xl-6">
                      <textarea
                        rows="6"
                        name="details"
                        value={this.state.request.details}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="offset-xl-7 col-xl-2">
                  <button className="user-btn edit-btn" onClick={this.onEdit}>
                    edit
                  </button>
                </div>
                <div className="col-xl-2">
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
export default withStyles(s)(RequestDetail);
