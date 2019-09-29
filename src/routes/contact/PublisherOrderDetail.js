import React from 'react';

import Select from 'react-select';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PublisherOrderDetail.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PageHeader from '../../../components/Admin/PageHeader';
import {
  PAYMENT_STATUS_ARRAY,
  CUSTOMER_ORDER_STATUS_ARRAY,
} from '../../../constants/constantData';
class PublisherOrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.context.params.id,
      publisherOrder: {
        count: '',
        availableCount: '',
        cancelPrice: '',
        totalPrice: '',
        seenByPublisherThisStatusChange: '',
        seenByAdminThisStatusChange: '',
        paymentvalueByPublisher: '',
        customerOrderId: '',
        productId: '',
        paymentToPublisherByAdminStatus: '',
      },
      allproductContentTypes: '',
      allPublishers: '',
      allLanguages: '',
      allAgeGroups: '',
      allAddresses: '',
    };
    this.fetchpublisherOrder = this.fetchpublisherOrder.bind(this);
    this.fetchAllInfo = this.fetchAllInfo.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  fetchpublisherOrder() {
    const url = fetchURL;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      publisherOrderId: this.state.id,
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
      'http://localhost:3004/getUserDetails',
      options,
      response => {
        that.setState({
          publisherOrder: response.publisherOrder,
          isLoading: false,
        });
      },
      error => {
        console.log(error);
      },
    );
  }
  fetchAllInfo() {
    const url = `${SERVER}/getAllInfo`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      // searchBy: this.state.productsSearchFilter,
      // pageNumber: this.state.currentPageNumber,
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
          allproductContentTypes: response.allproductContentTypes,
          allPublishers: response.publishers,
          allLanguages: response.languages,
          allAgeGroups: response.ageGroups,
        });
      },
      error => {
        console.log(error);
      },
    );
  }

  onChangeInput(event) {
    const value = event.target.value;
    const state = event.target.name;
    let publisherOrder = { ...this.state.publisherOrder };
    publisherOrder[state] = value;
    this.setState({ publisherOrder });
  }
  handleDateChange(date, stateName) {
    let publisherOrder = { ...this.state.publisherOrder };
    publisherOrder[stateName] = date;
    this.setState({ publisherOrder });
  }
  handleSelectChange = (selectedOption, op) => {
    let publisherOrder = { ...this.state.publisherOrder };
    publisherOrder[op] = selectedOption;
    this.setState({ publisherOrder });
  };
  onExportProduct() {
    window.alert('send delete ajax with user id');
  }
  onImportProduct() {
    window.alert('send delete ajax with user id');
  }
  onProductEdit() {
    window.alert('send edi ajax with all user info');
  }

  render() {
    return (
      <div className="dashboard-ecommerce">
        <div className="container-fluid dashboard-content ">
          <PageHeader
            title="Publisher Order Details"
            breadCrumbs={[
              { link: '/admin/publisherOrder', label: 'Publisher Orders List' },
              { link: '', label: 'Publisher Orders Detail' },
            ]}
          />
          <div className="row">
            <div className="offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="row">
                <div
                  className={`col-xl-11 col-lg-11 col-md-11 col-sm-12 col-12 pr-xl-0 pr-lg-0 pr-md-0  m-b-30 ${
                    s.publisherOrderDetailContainer
                  }`}
                >
                  <div className="product-details">
                    <div className="border-bottom pb-3 mb-3">
                      <form className={s.orderSmallInfoContainer}>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                              <label className="mb-0">
                                Publisher Payment :{' '}
                              </label>
                              <input
                                name="paymentvalueByPublisher"
                                type="text"
                                className="form-control form-control-sm numberInput"
                                value={
                                  this.state.publisherOrder
                                    .paymentvalueByPublisher
                                }
                                onChange={this.onChangeInput}
                              />
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                              <label className="mb-0">Count : </label>
                              <input
                                name="count"
                                type="text"
                                className="form-control form-control-sm numberInput"
                                value={this.state.publisherOrder.count}
                                onChange={this.onChangeInput}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                              <label className="mb-0">Available Count : </label>
                              <input
                                name="availableCount"
                                type="text"
                                className="form-control form-control-sm "
                                value={this.state.publisherOrder.availableCount}
                                onChange={this.onChangeInput}
                              />
                            </div>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-12">
                              <label className="mb-0">Cancle Price : </label>
                              <input
                                name="cancelPrice"
                                type="text"
                                className="form-control form-control-sm"
                                value={this.state.publisherOrder.cancelPrice}
                                onChange={this.onChangeInput}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row">
                            <div className="col-xl-6">
                              <div className="row">
                                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12">
                                  <label>Start Date : </label>
                                </div>
                                &nbsp;&nbsp;&nbsp;
                                <div className="col-xl-5 col-lg-5 col-md-5">
                                  <DatePicker
                                    name="startDate"
                                    selected={
                                      this.state.publisherOrder.startDate
                                    }
                                    onChange={date =>
                                      this.handleDateChange(date, 'startDate')
                                    }
                                  />
                                </div>
                              </div>
                              <br />
                              <div className="row">
                                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12">
                                  <label>End date : </label>
                                </div>
                                &nbsp;&nbsp;&nbsp;
                                <div className="col-xl-5 col-lg-5 col-md-5">
                                  <DatePicker
                                    name="endDate"
                                    selected={this.state.publisherOrder.endDate}
                                    onChange={date =>
                                      this.handleDateChange(date, 'endDate')
                                    }
                                  />
                                </div>
                              </div>
                              <br />
                              <div className="row">
                                <div className="col-8">
                                  <div class="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      onChange={e => this.onChangeInput(e)}
                                      class="custom-control-input"
                                      name="seenByPublisherThisStatusChange"
                                      checked={
                                        this.state.publisherOrder
                                          .seenByPublisherThisStatusChange
                                      }
                                      id="customerSeen"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customerSeen"
                                    >
                                      Seen By Customer
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-8">
                                  <div class="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      onChange={e => this.onChangeInput(e)}
                                      class="custom-control-input"
                                      name="seenByAdminThisStatusChange"
                                      checked={
                                        this.state.publisherOrder
                                          .seenByAdminThisStatusChange
                                      }
                                      id="adminSeen"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="adminSeen"
                                    >
                                      Seen By Admin
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6">
                              <div className="row">
                                <div className="col-xl-12">
                                  <label>Payment Status </label>
                                  <Select
                                    name="paymentToAdminByCustomerStatus"
                                    options={PAYMENT_STATUS_ARRAY}
                                    value={
                                      this.state.publisherOrder
                                        .paymentToAdminByCustomerStatus
                                    }
                                    onChange={so =>
                                      this.handleSelectChange(
                                        so,
                                        'paymentToAdminByCustomerStatusId',
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <br />
                              <div className="row">
                                <div className="col-xl-12">
                                  <label>Order Status </label>
                                  <br />
                                  <Select
                                    name="orderStatus"
                                    options={CUSTOMER_ORDER_STATUS_ARRAY}
                                    value={
                                      this.state.publisherOrder.orderStatus
                                    }
                                    onChange={so =>
                                      this.handleSelectChange(so, 'orderStatus')
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group" />
                      </form>
                      <form className={s.dropDownContainer}>
                        <div>
                          <label>Delivery Address </label>
                          <br />
                          <Select
                            name="deliveryAddress"
                            options={this.state.allAddresses}
                            value={this.state.publisherOrder.deliveryAddress}
                            onChange={so =>
                              this.handleSelectChange(so, 'deliveryAddress')
                            }
                          />
                        </div>
                      </form>
                    </div>
                    <div className="row">
                      <div className="col-3">
                        <a className="btn btn-rounded btn-danger">
                          <i className="fas fa-trash-alt" />&nbsp;&nbsp;Delete
                          Order
                        </a>
                      </div>
                      <div className="col-3">
                        <a className="btn btn-rounded btn-success">
                          {' '}
                          <i className="far fa-edit" />&nbsp;&nbsp;Apply Changes
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(PublisherOrderDetail);
