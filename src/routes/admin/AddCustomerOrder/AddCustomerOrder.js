import React from 'react';

import Select from 'react-select';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AddCustomerOrder.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PageHeader from '../../../components/Admin/PageHeader';
import {
  PAYMENT_STATUS_ARRAY,
  CUSTOMER_ORDER_STATUS_ARRAY,
} from '../../../constants/constantData';
class AddCustomerOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerOrder: {
        totalTaxCost: '',
        deliveryCost: '',
        totalCost: '',
        totalPrice: '',
        seenByCustomerThisStatusChange: '',
        seenByAdminThisStatusChange: '',
        paymentvalueByCustomer: '',
        username: '',
        actionUserName: '',
        deliveryAddress: '',
        paymentStatus: '',
      },
      allproductContentTypes: '',
      allPublishers: '',
      allLanguages: '',
      allAgeGroups: '',
      allAddresses: '',
    };
    this.addCustomerOrder = this.addCustomerOrder.bind(this);
    this.fetchAllInfo = this.fetchAllInfo.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  addCustomerOrder() {
    const url = fetchURL;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      customerOrder: this.state.customerOrder,
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
      'http://localhost:3000/getUserDetails',
      options,
      response => {
        that.setState({
          customerOrder: response.customerOrder,
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
    let value;
    if (event.target.type === 'checkbox') value = event.target.checked;
    else value = event.target.value;
    const state = event.target.name;
    let customerOrder = { ...this.state.customerOrder };
    customerOrder[state] = value;
    this.setState({ customerOrder });
  }
  handleDateChange(date, stateName) {
    let customerOrder = { ...this.state.customerOrder };
    customerOrder[stateName] = date;
    this.setState({ customerOrder });
  }
  handleSelectChange = (selectedOption, op) => {
    let customerOrder = { ...this.state.customerOrder };
    customerOrder[op] = selectedOption;
    this.setState({ customerOrder });
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
            title="Add Customer Order"
            breadCrumbs={[
              { link: '/admin/customerOrder', label: 'Customer Orders List' },
              { link: '', label: 'Add Customer Order' },
            ]}
          />
          <div className="row">
            <div className="offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="row">
                <div
                  className={`col-xl-11 col-lg-11 col-md-11 col-sm-12 col-12 pr-xl-0 pr-lg-0 pr-md-0  m-b-30 ${
                    s.customerOrderDetailContainer
                  }`}
                >
                  <div className="product-details">
                    <div className="border-bottom pb-3 mb-3">
                      <form className={s.orderSmallInfoContainer}>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                              <label className="mb-0">
                                Customer Payment :{' '}
                              </label>
                              <input
                                name="paymentvalueByCustomer"
                                type="text"
                                className="form-control form-control-sm numberInput"
                                value={
                                  this.state.customerOrder
                                    .paymentvalueByCustomer
                                }
                                onChange={this.onChangeInput}
                              />
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                              <label className="mb-0">
                                Total Cost : &nbsp;
                              </label>
                              <input
                                name="totalCost"
                                type="text"
                                className="form-control form-control-sm numberInput"
                                value={this.state.customerOrder.totalCost}
                                onChange={this.onChangeInput}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                              <label className="mb-0">
                                Total Delivery Cost :{' '}
                              </label>
                              <input
                                name="totalDeliveryCost"
                                type="text"
                                className="form-control form-control-sm numberInput"
                                value={
                                  this.state.customerOrder.totalDeliveryCost
                                }
                                onChange={this.onChangeInput}
                              />
                            </div>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-12">
                              <label className="mb-0">
                                Total Price :&nbsp;&nbsp;{' '}
                              </label>
                              <input
                                name="totalPrice"
                                type="text"
                                className="form-control form-control-sm"
                                value={this.state.customerOrder.totalPrice}
                                onChange={this.onChangeInput}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                              <label className="mb-0">
                                Total Tax Cost :
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              </label>
                              <input
                                name="totalTaxCost"
                                type="text"
                                className="form-control form-control-sm numberInput"
                                value={this.state.customerOrder.totalTaxCost}
                                onChange={this.onChangeInput}
                              />
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                              <label className="mb-0">
                                Customer :&nbsp;&nbsp;&nbsp;
                              </label>
                              <input
                                name="username"
                                type="text"
                                className="form-control form-control-sm numberInput"
                                value={this.state.customerOrder.username}
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
                                      this.state.customerOrder.startDate
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
                                    selected={this.state.customerOrder.endDate}
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
                                      name="seenByCustomerThisStatusChange"
                                      checked={
                                        this.state.customerOrder
                                          .seenByCustomerThisStatusChange
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
                                        this.state.customerOrder
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
                                      this.state.customerOrder
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
                                    value={this.state.customerOrder.orderStatus}
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
                            value={this.state.customerOrder.deliveryAddress}
                            onChange={so =>
                              this.handleSelectChange(so, 'deliveryAddress')
                            }
                          />
                        </div>
                      </form>
                    </div>
                    <div className="row">
                      <div className="col-3">
                        <button
                          onClick={this.addCustomerOrder}
                          className="btn btn-rounded btn-success"
                        >
                          Add Order &nbsp;&nbsp; <i className="fas fa-plus" />
                        </button>
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
export default withStyles(s)(AddCustomerOrder);
