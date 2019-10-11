import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Select from 'react-select';
import CustomTable from '../../../../components/CustomTabel';
import ContentHeader from '../../../../components/User/ContentHeader';
import Spinner from '../../../../components/User/Spinner';
import s from './OrderDetails.css';
import {
  SERVER,
  PUBLISHER_ORDER_TABLE_LABELS,
  PUBLISHER_ORDER_RECORD_ITEMS,
} from '../../constants';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import history from '../../../../history';
class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.context.params.id,
      isLoading: false,
      publisherOrders: [
        {
          id: 1,
          price: 23,
          createdAt: '23/5/65',
          status: 'accepted',
          count: 23,
        },
        {
          id: 1,
          price: 23,
          createdAt: '23/5/65',
          status: 'accepted',
          count: 23,
        },
        {
          id: 1,
          price: 23,
          createdAt: '23/5/65',
          status: 'accepted',
          count: 23,
        },
        {
          id: 1,
          price: 23,
          createdAt: '23/5/65',
          status: 'accepted',
          count: 23,
        },
        {
          id: 1,
          price: 23,
          createdAt: '23/5/65',
          status: 'accepted',
          count: 23,
        },
        {
          id: 1,
          price: 23,
          createdAt: '23/5/65',
          status: 'accepted',
          count: 23,
        },
        {
          id: 1,
          price: 23,
          createdAt: '23/5/65',
          status: 'accepted',
          count: 23,
        },
      ],
    };
    this.fetchOrders = this.fetchOrders.bind(this);
  }
  componentDidMount() {
    // this.fetchOrders();
  }

  onOrderClick(id) {
    history.push(`/user/publisherOrder/${id}`);
  }
  fetchOrders() {
    const url = `${SERVER}/getPublisherOrders`;
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
          that.setState({
            publisherOrders: response.publisherOrders,
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
            <ContentHeader title="Order List" hasSort={false} />
            <div className={`${s.addressContainer} container-fluid`}>
              <div className="row">
                <div className="col-xl-12 col-lg-12 addInputContainer">
                  {/* <div className="row mb-3 ">
                    <div className="col-xl-2 ">
                      <span>Address1* :</span>{' '}
                    </div>
                    <div className="col-xl-7">
                      <input
                        name="address1"
                        value={this.state.address.address1}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div> */}

                  <CustomTable
                    pageCount={0}
                    hasPagination={false}
                    records={this.state.publisherOrders}
                    columnLabels={PUBLISHER_ORDER_TABLE_LABELS}
                    recordItemNames={PUBLISHER_ORDER_RECORD_ITEMS}
                    onRecordClick={this.onOrderClick}
                  />
                  {/* <div className="row mb-3">
                    <div className="col-xl-2">
                      <span>Address2 :</span>{' '}
                    </div>
                    <div className="col-xl-4">
                      <input
                        name="address2"
                        value={this.state.address.address2}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xl-2">
                      <span>Zip Code* :</span>{' '}
                    </div>
                    <div className="col-xl-4">
                      <input
                        name="zipCode"
                        value={this.state.address.zipCode}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xl-2">
                      <span>City* :</span>{' '}
                    </div>
                    <div className="col-xl-4">
                      <input
                        name="city"
                        value={this.state.address.city}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xl-2">
                      <span>State :</span>{' '}
                    </div>
                    <div className="col-xl-4">
                      <input
                        name="state"
                        value={this.state.address.state}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-xl-2">
                      <span>Country :</span>{' '}
                    </div>
                    <div className="col-xl-4">
                      <Select
                        options={this.state.allCountries}
                        onChange={so => this.handleSelectChange(so, 'country')}
                        value={this.state.address.country}
                      />
                    </div>
                  </div>
                 */}
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
