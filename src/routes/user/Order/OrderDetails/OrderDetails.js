import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import toastr from 'react-redux-toastr';
import AddressDetails from '../../../../components/User/AddressDetails';
import PublisherOrderTable from '../../../../components/User/Tables/PublisherOrderTable';
import ContentHeader from '../../../../components/User/ContentHeader';
import Spinner from '../../../../components/User/Spinner';
import s from './OrderDetails.css';
import {
  SERVER,
  CUSTOMER_ORDERS_RECORDE_ITEM_NAMES_ARRAY,
  CUSTOMER_ORDERS_COLUMNS_LABELS_ARRAY,
} from '../../../../constants/constantData';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import history from '../../../../history';
class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.context.params.id,
      isLoading: true,
      isAddressFetched: false,
      publisherOrders: [],
      fetchedAddress: '',
    };
    this.fetchOrders = this.fetchOrders.bind(this);
    this.onAddressClick = this.onAddressClick.bind(this);
  }
  componentDidMount() {
    this.fetchOrders();
  }
  onAddressClick(id) {
    const url = `${SERVER}/getAddress`;
    this.setState({
      isAddressFetched: false,
    });
    const credentials = {
      addressId: id,
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
        if (response.error == undefined) {
          that.setState(
            {
              fetchedAddress: response,
              isAddressFetched: true,
            },
            () => {
              let x = document.getElementById('addressDetailModal');
              x.classList.add('show');
              x.style.display = 'block';
            },
          );
        } else {
          // toastr.error(response.error.title, response.error.description);
        }
      },
      error => {
        // toastr.error('shit');
        // toastr.error('sala', ERRORS.REPEATED_USER);
      },
    );
  }
  renew(id) {
    const url = `${SERVER}/addToBasket`;
    const credentials = {
      productId: id,
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetchWithTimeOut(
      url,
      options,
      response => {
        if (response.error == undefined) {
          window.alert(response.message);
          history.push('/user/wishlist');
        } else {
          console.log(' error : ', response.error);
          // toastr.error(response.error.title, response.error.description);
        }
      },
      error => {
        // toastr.error('shit');
        // toastr.error('sala', ERRORS.REPEATED_USER);
        console.log('login e rror : ', error);
      },
    );
  }
  cancel(id) {
    if (confirm('Are you sure you want to cancel this order?')) {
      const url = `${SERVER}/cancelActiveOrder`;
      const credentials = {
        publisherOrderId: id,
      };
      const options = {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      fetchWithTimeOut(
        url,
        options,
        response => {
          if (response.error == undefined) {
            window.alert(response.message);
          } else {
            console.log(' error : ', response.error);
            // toastr.error(response.error.title, response.error.description);
          }
        },
        error => {
          // toastr.error('shit');
          // toastr.error('sala', ERRORS.REPEATED_USER);
          console.log('login e rror : ', error);
        },
      );
    }
  }
  onOrderClick(id1, id2, productId) {
    history.push(`/user/products/${productId}`);
  }
  fetchOrders() {
    const url = `${SERVER}/getCustomerOrder`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      customerOrderId: this.state.id,
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
            publisherOrders: response.publisherOrders,
            isLoading: false,
          });
        } else {
          console.log(' error : ', response.error);
          // toastr.error(response.error.title, response.error.description);
        }
      },
      error => {
        // toastr.error('shit');
        // toastr.error('sala', ERRORS.REPEATED_USER);
        console.log('login e rror : ', error);
      },
    );
  }
  goToClaimsofThisOrder(id) {
    history.push(`/user/claim/${id}`);
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
              title={`Sub Orders of Order ${this.state.id}`}
              hasSort={false}
            />
            <div className={`${s.addressContainer} container-fluid`}>
              <div className="row">
                <div className="col-xl-12 col-lg-12 addInputContainer">
                  <PublisherOrderTable
                    renew={this.renew}
                    cancel={this.cancel}
                    onAddressClick={this.onAddressClick}
                    hasPagination={false}
                    records={this.state.publisherOrders}
                    goToClaimsofThisOrder={this.goToClaimsofThisOrder}
                    onRecordClick={this.onOrderClick}
                  />
                  {this.state.isAddressFetched ? (
                    <div className="row">
                      <div className="col-12">
                        <AddressDetails
                          address={this.state.fetchedAddress}
                          isAddressFetched={this.state.isAddressFetched}
                        />
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withStyles(s)(OrderDetails);
