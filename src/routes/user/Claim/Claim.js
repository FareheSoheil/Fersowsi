import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ReactPaginate from 'react-paginate';
import ContentHeader from '../../../components/User/ContentHeader';
import Table from '../../../components/User/Table';
import Spinner from '../../../components/User/Spinner';
import s from './Claim.css';
import { CLAIMS_TABLE_LABELS, CLAIMS_RECORD_ITEMS, SERVER } from '../constants';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import history from '../../../history';
class Claim extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      pageIndex: 0,
      pageSize: 15,
      totalPageNum: 15,
      // sortBy: { value: 1, label: 'Country' },
      claimCollections: [
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
      ],
    };
    this.fetchClaimCollections = this.fetchClaimCollections.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentDidMount() {
    // this.fetchorders();
  }
  handlePageChange(pageIndex) {
    this.setState({ pageIndex: pageIndex.selected }, () => {
      this.fetchClaimCollections();
    });
  }
  onClaimCollectionClick(id) {
    history.push(`/user/claim/${id}`);
  }

  fetchClaimCollections() {
    const url = `${SERVER}/getAllClaims`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      pageIndex: this.state.name,
      pageSize: this.state.password,
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
            claimCollections: response.currentRecords,
            totalPageNum: response.totalPageNum,
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
              title="Claim List"
              hasSort={false}
              onSortFunc={this.handleSelectChange}
            />
            <Table
              onRecordClick={this.onClaimCollectionClick}
              columnLabels={CLAIMS_TABLE_LABELS}
              records={this.state.claimCollections}
              recordItemNames={CLAIMS_RECORD_ITEMS}
            />

            <div className="row">
              <div className="offset-xl-7 col-5 ">
                <ReactPaginate
                  previousLabel="<"
                  nextLabel=">"
                  pageCount={this.state.totalPageNum}
                  pageRangeDisplayed={3}
                  onPageChange={this.handlePageChange}
                  containerClassName="user-paginate"
                  subContainerClassName="user-pages user-paginate"
                  activeClassName="user-active-page"
                  breakClassName="break-me"
                  initialPage={this.state.pageIndex}
                  disableInitialCallback
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withStyles(s)(Claim);
