import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import EditableCustomTable from '../../../../components/EditableCustomTable';
import Spinner from '../../../../components/Admin/Spinner';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import {
  COUNTRIES_COLUMNS_LABELS_ARRAY,
  COUNTRIES_RECORDE_ITEM_NAMES_ARRAY,
} from '../../../../constants/constantData';
import s from './Countries.css';
class Countries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      firstRender: true,
      pageIndex: 0,
      pageSize: 15,
      totalPageNum: 8,
      newName: '',
      newNiceName: '',
      newISO: '',
      newISO3: '',
      newNumCode: '',
      newPhoneCode: '',
      currentCountries: [
        { id: 12 },
        { id: 12 },
        { id: 12 },
        { id: 12 },
        { id: 12 },
        { id: 12 },
      ],
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.applyChanges = this.applyChanges.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addCountry = this.addCountry.bind(this);
    this.fetchCountries = this.fetchCountries.bind(this);
  }
  componentDidMount() {
    // this.fetchCountries();
  }
  onInputChange(event, number, label) {
    let records = this.state.currentCountries;
    records[number][label] = event.target.value;
    this.setState({
      currentCountries: records,
    });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  applyChanges() {
    console.log(this.state.currentCountries);
    this.setState({
      isLoading: true,
    });
    const credentials = {
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize,
      newRecords: this.state.currentCountries,
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
      this.props.editUrl,
      options,
      response => {
        that.setState({
          isLoading: false,
        });
      },
      error => {
        console.log(error);
      },
    );
  }
  fetchCountries() {
    const url = 'fetchURL';
    this.setState({
      isLoading: true,
    });
    const credentials = {
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize,
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
        that.setState({
          currentCountries: response.currentRecords,
          totalPageNum: response.totalPageNumber,
          isLoading: false,
          firstRender: false,
        });
      },
      error => {
        console.log(error);
      },
    );
  }
  handlePageChange(pageIndex) {
    this.setState({ pageIndex: pageIndex.selected });
    this.fetchCountries();
  }
  addCountry() {
    this.setState({
      isLoading: true,
    });
    const credentials = {
      newCountry: {
        newName: this.state.newName,
        newNiceName: this.state.newNiceName,
        newISO: this.state.newISO,
        newISO3: this.state.newISO3,
        newNumCode: this.state.newNumCode,
        newPhoneCode: this.state.newPhoneCode,
      },
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
      this.props.addUrl,
      options,
      response => {
        that.fetchCountries();
      },
      error => {
        console.log(error);
      },
    );
  }

  render() {
    return (
      <div className="container-fluid dashboard-content">
        <div className="row">
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
              <div className="card">
                <h4 className="card-header">Countries</h4>
                <div className="card-body p-0">
                  <div className={`container-fluid ${s.additionContainer}`}>
                    <div> Add Country : </div>
                    <br />
                    <div className={`row `}>
                      <div className="col-xl-2 col-lg-2 col-sm-12">
                        <input
                          placeholder="Name"
                          className="form-control"
                          value={this.state.newName}
                          name="newName"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="col-xl-2 col-lg-2 col-sm-12">
                        <input
                          placeholder="Nice Name"
                          className="form-control"
                          value={this.state.newNiceName}
                          name="newNiceName"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="col-xl-2 col-lg-2 col-sm-12">
                        <input
                          placeholder="Num Code"
                          className="form-control"
                          value={this.state.newNumCode}
                          name="newNumCode"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="col-xl-2 col-lg-2 col-sm-12">
                        <input
                          placeholder="Phone Code"
                          className="form-control"
                          value={this.state.newPhoneCode}
                          name="newPhoneCode"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="col-xl-1 col-lg-1 col-sm-12">
                        <input
                          placeholder="Iso"
                          className="form-control"
                          value={this.state.newISO}
                          name="newISO"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="col-xl-1 col-lg-1 col-sm-12">
                        <input
                          placeholder="Iso3"
                          className="form-control"
                          value={this.state.newISO3}
                          name="newISO3"
                          onChange={this.onChange}
                        />
                      </div>

                      <div className="col-xl-1 col-lg-1 col-sm-12">
                        <button
                          onClick={this.addCountry}
                          className="btn btn-success"
                          style={{ height: '35px' }}
                        >
                          Add
                        </button>
                      </div>

                      {/* <div className /> */}
                    </div>
                    <br />
                  </div>
                  <div className="container-fluid">
                    <hr />

                    <EditableCustomTable
                      style={{
                        marginLeft: '5px',
                        width: '120px',
                      }}
                      applyChanges={this.applyChanges}
                      onInputChange={this.onInputChange}
                      title="Country"
                      pageCount={this.state.totalPageNum}
                      pageIndex={this.state.pageIndex}
                      records={this.state.currentCountries}
                      columnLabels={COUNTRIES_COLUMNS_LABELS_ARRAY}
                      recordItemNames={COUNTRIES_RECORDE_ITEM_NAMES_ARRAY}
                      handlePageChange={this.handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Countries);
