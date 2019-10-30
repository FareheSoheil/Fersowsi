import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import EditableCustomTable from '../EditableCustomTable';
import Spinner from '../Admin/Spinner';
import AddSettingItem from '../AddSettingItem';
// import crypto from 'crypto';
// import cookie from 'react-cookies';
import s from './SettingItem.css';
import { fetchWithTimeOut } from '../../fetchWithTimeout';

class SettingItem extends React.Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
    fetchUrl: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    editUrl: PropTypes.string.isRequired,
    addUrl: PropTypes.string.isRequired,
    cardTitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    columnLabels: PropTypes.array.isRequired,
    recordItemNames: PropTypes.array.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      pageSize: 10,
      pageIndex: 0,
      newName: '',
      currentRecords: [],
      totalPageNum: 10,
    };
    this.applyChanges = this.applyChanges.bind(this);
    this.addRecord = this.addRecord.bind(this);
    this.fetchRecords = this.fetchRecords.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentDidMount() {
    this.fetchRecords();
  }
  onInputChange(event, number, label) {
    let records = this.state.currentRecords;
    records[number][label] = event.target.value;
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
          currentRecords: response[this.props.type],
          totalPageNum: response.totalPageNum,
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
            <Spinner />
          ) : (
            <div className="offset-xl-1 col-xl-10 col-lg-12 col-md-6 col-sm-12 col-12">
              <div className="card">
                <h4 className="card-header">{this.props.cardTitle}</h4>
                <div className="card-body p-0">
                  <div className="container-fluid">
                    <AddSettingItem
                      addRecord={this.props.addRecord}
                      title={this.props.title}
                    />
                    <EditableCustomTable
                      style={{
                        marginLeft: '70px',
                        width: '250px',
                      }}
                      pageCount={this.state.totalPageNum}
                      currentPageNumber={this.state.pageIndex}
                      isLoading={this.state.isLoading}
                      title={this.props.title}
                      onInputChange={this.onInputChange}
                      applyChanges={this.applyChanges}
                      handlePageChange={this.handlePageChange}
                      records={this.state.currentRecords}
                      columnLabels={this.props.columnLabels}
                      recordItemNames={this.props.recordItemNames}
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
