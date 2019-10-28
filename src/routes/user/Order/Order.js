import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ReactPaginate from 'react-paginate';
import ContentHeader from '../../../components/User/ContentHeader';
import AddAddress from '../../../components/User/AddAddress';
import Table from '../../../components/User/Table';
import Spinner from '../../../components/User/Spinner';
import s from './Order.css';
import {
  ORDER_RECORD_ITEMS,
  ORDER_TABLE_LABELS,
  SERVER,
  ORDER_SORT_OPTION,
} from '../constants';
import {
  CUSTOMER_ORDERS_COLUMNS_LABELS_ARRAY,
  CUSTOMER_ORDERS_RECORDE_ITEM_NAMES_ARRAY,
} from '../../../constants/constantData';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import history from '../../../history';
class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pageIndex: 0,
      pageSize: 10,
      totalPageNum: '',
      sortBy: '',
      searchBy: {
        customerFirstName: '',
        customerLastName: '',
        customerEmail: '',
        publishers: [],
        productPeriods: '',
        paymentByCustomerStatus: '',
        newStatusNotSeenByAdmin: '',
        singlProductTypes: '',
        productType: '',
        productStatus: '',
        ageGroups: '',
        countRange: { min: '', max: '' },
        priceRange: { min: '', max: 999 },
        startDate: '',
        endDate: '',
        sortDate: false,
        sortPrice: false,
      },
      orders: [
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
      ],
      // allCountries: [],
    };
    this.fetchOrders = this.fetchOrders.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  componentDidMount() {
    this.fetchOrders();
  }
  handlePageChange(pageIndex) {
    this.setState({ pageIndex: pageIndex.selected }, () => {
      this.fetchOrders();
    });
  }
  onOrderClick(id) {
    history.push(`/user/order/${id}`);
  }
  handleSelectChange = (selectedOption, op) => {
    let searchBy = { ...searchBy };
    (searchBy[op] = selectedOption.value),
      this.setState(
        {
          searchBy: searchBy,
        },
        () => {
          this.fetchOrders();
        },
      );
  };
  fetchOrders() {
    const url = `${SERVER}/getAllCustomerOrdersOfSpecificUser`;
    this.setState({ isLoading: true });
    const credentials = {
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize,
      // sortBy: this.state.sortBy.value,
      // searchBy: this.state.searchBy,
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
        console.log('response : ', response.currentRecords);
        if (response.error === undefined) {
          that.setState({
            orders: response.currentRecords,
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
              title="Order List"
              hasSort={true}
              onSortFunc={this.handleSelectChange}
              sortOptions={ORDER_SORT_OPTION}
            />
            <Table
              onRecordClick={this.onOrderClick}
              columnLabels={CUSTOMER_ORDERS_COLUMNS_LABELS_ARRAY}
              records={this.state.orders}
              recordItemNames={CUSTOMER_ORDERS_RECORDE_ITEM_NAMES_ARRAY}
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
export default withStyles(s)(Order);
