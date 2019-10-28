import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import toastr from 'react-redux-toastr';
import CustomTable from '../../../../components/CustomTabel';
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
      publisherOrders: [],
    };
    this.fetchOrders = this.fetchOrders.bind(this);
  }
  componentDidMount() {
    this.fetchOrders();
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
          console.log(' response : ', response);
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
  render() {
    return (
      <div>
        {' '}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div>
            <ContentHeader title="Order List" hasSort={false} />
            <div className={`${s.addressContainer} container-fluid`}>
              <div className="row">
                <div className="col-xl-12 col-lg-12 addInputContainer">
                  <CustomTable
                    pageCount={0}
                    hasPagination={false}
                    records={this.state.publisherOrders}
                    columnLabels={CUSTOMER_ORDERS_RECORDE_ITEM_NAMES_ARRAY}
                    recordItemNames={CUSTOMER_ORDERS_COLUMNS_LABELS_ARRAYY}
                    onRecordClick={this.onOrderClick}
                  />
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
