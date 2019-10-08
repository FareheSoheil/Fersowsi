import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import EditableCustomTable from '../../../components/EditableCustomTable';
import Spinner from '../../../components/Admin/Spinner';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import {
  CURRENCIES_COLUMNS_LABELS_ARRAY,
  CURRENCIES_RECORDE_ITEM_NAMES_ARRAY,
  SERVER,
} from '../../../constants/constantData';
import s from './Currencies.css';
class Countries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      firstRender: true,
      pageIndex: 0,
      pageSize: 15,
      totalPageNum: 8,
      name: '',
      abbr: '',
      usdRatio: '',
      isAutomatic: '',
      currentCurrencies: [
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
    this.addCurrency = this.addCurrency.bind(this);
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
  }
  componentDidMount() {
    this.fetchCurrencies();
  }
  onInputChange(event, number, label) {
    let records = this.state.currentCurrencies;
    records[number][label] = event.target.value;
    this.setState({
      currentCurrencies: records,
    });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  applyChanges() {
    console.log(this.state.currentCurrencies);
    this.setState({
      isLoading: true,
    });
    const credentials = {
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize,
      newRecords: this.state.currentCurrencies,
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
  fetchCurrencies() {
    const url = `${SERVER}/getAllCurrencies`;
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
          currentCurrencies: response.currentRecords,
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
    this.fetchCurrencies();
  }
  addCurrency() {
    this.setState({
      isLoading: true,
    });
    const credentials = {
      newCurrency: {
        name: this.state.name,
        abbr: this.state.abbr,
        usdRatio: this.state.usdRatio,
        isAutomatic: this.state.isAutomatic,
      },
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize,
    };
    console.log(credentials);
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
        that.fetchCurrencies();
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
                <h4 className="card-header">Currencies</h4>
                <div className="card-body p-0">
                  <div className={`container-fluid ${s.additionContainer}`}>
                    <div> Add Currency : </div>
                    <br />
                    <div className={`row `}>
                      <div className="col-xl-2 col-lg-2 col-sm-12">
                        <input
                          placeholder="Name"
                          className="form-control"
                          value={this.state.name}
                          name="name"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="col-xl-2 col-lg-2 col-sm-12">
                        <input
                          placeholder="Abbrivation"
                          className="form-control"
                          value={this.state.abbr}
                          name="abbr"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="col-xl-2 col-lg-2 col-sm-12">
                        <input
                          placeholder="Usd Ratio"
                          className="form-control"
                          value={this.state.usdRatio}
                          name="usdRatio"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="col-xl-2 col-lg-2 col-sm-12">
                        <label class="custom-color-theme custom-control custom-radio custom-control-inline">
                          <input
                            type="checkbox"
                            name="isAutomatic"
                            class="custom-control-input"
                            value={!this.state.isAutomatic}
                            onClick={this.onChange}
                            defaultChecked={this.state.isAutomatic === true}
                          />

                          <span class="custom-control-label">Is Automatic</span>
                        </label>
                      </div>

                      <div className="col-xl-2">
                        <button
                          onClick={this.addCurrency}
                          className="btn btn-success"
                          style={{ height: '35px' }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid">
                    <hr />

                    <EditableCustomTable
                      style={{
                        marginLeft: '15px',
                        width: '140px',
                      }}
                      applyChanges={this.applyChanges}
                      onInputChange={this.onInputChange}
                      title="Currency"
                      pageCount={this.state.totalPageNum}
                      pageIndex={this.state.pageIndex}
                      records={this.state.currentCurrencies}
                      columnLabels={CURRENCIES_COLUMNS_LABELS_ARRAY}
                      recordItemNames={CURRENCIES_RECORDE_ITEM_NAMES_ARRAY}
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
