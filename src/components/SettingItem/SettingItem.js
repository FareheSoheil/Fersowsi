import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import EditableCustomTable from '../EditableCustomTable';
import Spinner from '../Admin/Spinner';
// import crypto from 'crypto';
// import cookie from 'react-cookies';
import s from './SettingItem.css';
import { fetchWithTimeOut } from '../../fetchWithTimeout';

class SettingItem extends React.Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
    fetchUrl: PropTypes.string.isRequired,
    editUrl: PropTypes.string.isRequired,
    addUrl: PropTypes.string.isRequired,
    cardTitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      pageSize: 10,
      pageIndex: 0,
      newName: '',
      currentRecords: [
        { a: 1 },
        { a: 1 },
        { a: 1 },
        { a: 1 },
        { a: 1 },
        { a: 1 },
        { a: 1 },
      ],
      totalPageNum: 10,
    };
    this.applyChanges = this.applyChanges.bind(this);
    this.addRecord = this.addRecord.bind(this);
    this.fetchRecords = this.fetchRecords.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentDidMount() {
    // this.fetchRecords();
  }
  onNameChange(event, number) {
    let records = this.state.currentRecords;
    records[number].name = event.target.value;
    this.setState({
      records: records,
    });
  }
  applyChanges() {
    this.setState({
      isLoading: true,
    });
    const credentials = {
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize,
      newRecords: this.state.records,
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
  fetchRecords() {
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
      this.props.fetchUrl,
      options,
      response => {
        that.setState({
          currentRecords: response.currentRecords,
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
    this.fetchRecords();
  }
  addRecord(name) {
    window.alert(name);
    this.setState({
      isLoading: true,
    });
    const credentials = {
      newName: name,
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
        that.fetchRecords();
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
            <div style={{ top: '300px' }}>
              Hellow {true}
              {this.state.isLoading}
            </div>
          ) : (
            <div className="offset-xl-1 col-xl-10 col-lg-12 col-md-6 col-sm-12 col-12">
              <div className="card">
                <h4 className="card-header">{this.props.cardTitle}</h4>
                <div className="card-body p-0">
                  <div className="container-fluid">
                    <EditableCustomTable
                      pageCount={this.state.totalPageNum}
                      currentPageNumber={this.state.pageIndex}
                      isLoading={this.state.isLoading}
                      title={this.props.title}
                      onNameChange={this.onNameChange}
                      applyChanges={this.applyChanges}
                      handlePageChange={this.handlePageChange}
                      addRecord={this.addRecord}
                      records={this.state.currentRecords}
                      recordItemNames={['id', 'name']}
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
export default withStyles(s)(SettingItem);
