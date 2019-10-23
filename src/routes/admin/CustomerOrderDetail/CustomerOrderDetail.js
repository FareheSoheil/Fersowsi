import React from 'react';
import Select from 'react-select';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CustomerOrderDetail.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PageHeader from '../../../components/Admin/PageHeader';
import Spinner from '../../../components/Admin/Spinner';
import CustomTable from '../../../components/CustomTabel';
import {
  PUBLISHER_ORDERS_COLUMNS_LABELS_ARRAY,
  PUBLISHER_ORDERS_RECORDE_ITEM_NAMES_ARRAY,
  CUSTOMER_ORDER_STATUS_ARRAY,
} from '../../../constants/constantData';
import { SERVER, SSRSERVER } from '../../../constants';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import history from '../../../history';
class CustomerOrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      id: this.props.context.params.id,
      customerOrder: {
        id: 22031,
        vatNo: 6300.0, //
        totalPrice: 476.0, //
        totalTaxCost: 32.0, //
        totalCost: 554.25,
        totalDeliveryCost: 539.0, //
        discount: 30.0, //
        cancelPrice: 0.0, //
        description: '', //
        createdAt: '2011-03-01 12:17:40', //
        updatedAt: '2019-10-16 01:56:52', //
        status: { value: 1, label: 'Wait For Admin Response ' }, //
        userOrderNo: 10001, //
        customerId: 60044, //
        currency: { value: 5, label: 'dollsr' }, //
        deliveryAddress: {
          value: 2662,
          label: 'alkjsdhaskjdnasdjkasndasjdlasnd',
        }, //
      },
      allPeriods: '', //
      allAddresses: '', //
      allSubscriptions: '',
      allDeliveryTypes: '', //
      allCurrencies: '', //
    };
    this.fetchcustomerOrder = this.fetchcustomerOrder.bind(this);
    this.fetchAllInfo = this.fetchAllInfo.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.gotoUser = this.gotoUser.bind(this);
    this.onPublisherOrderClick = this.onPublisherOrderClick.bind(this);
  }
  gotoUser() {
    history.push(`/admin/accounts/${this.state.customerOrder.customerId}`);
  }
  onPublisherOrderClick(id) {
    history.push(`/admin/publisherOrder/${id}`);
  }
  uploadImage() {
    let inp = document.getElementById('imageUploader');
    if (inp.files && inp.files[0]) {
      var reader = new FileReader();
      const that = this;
      reader.onload = function(e) {
        let img = document.getElementById('imgHolder');
        img.src = e.target.result;
        let customerOrder = { ...that.state.customerOrder };
        customerOrder.paymentImage = e.target.result;
        that.setState({
          customerOrder: customerOrder,
        });
      };

      reader.readAsDataURL(inp.files[0]);
    }
  }
  componentDidMount() {
    // this.fetchAllInfo();
    this.fetchcustomerOrder();
  }
  fetchcustomerOrder() {
    const url = `${SSRSERVER}/getCustomerOrder`;
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

    const options = {
      method: 'POST',
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
          allPeriods: response.periods,
          allCurrencies: response.currencies,
          allSubscriptions: response.subscriptions,
          allDeliveryTypes: response.deliveryTypes,
          allAddresses: response.addresses,
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
        {!this.state.isLoading ? (
          <div className={` container-fluid dashboard-content`}>
            <PageHeader
              title="Customer Order Details"
              breadCrumbs={[
                {
                  link: '/admin/customerOrder',
                  label: 'Customer Orders List',
                },
                { link: '', label: 'Customer Orders Detail' },
              ]}
            />
            <div className="row">
              <div
                className={`${
                  s.container
                }  offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12`}
              >
                <div className="row">
                  <div
                    className={`col-xl-11 col-lg-11 col-md-11 col-sm-12 col-12 pr-xl-0 pr-lg-0 pr-md-0  m-b-30 ${
                      s.CustomerOrderDetailContainer
                    }`}
                  >
                    <div className="product-details">
                      <div className="border-bottom pb-3 mb-3">
                        <form className={s.orderSmallInfoContainer}>
                          <div className="form-group">
                            <div className="row">
                              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                <div className="row ">
                                  {' '}
                                  <div className="col-12">
                                    {' '}
                                    <label className="mb-0">
                                      Total Price :
                                    </label>
                                    <br />
                                    <input
                                      name="totalPrice"
                                      type="text"
                                      className="form-control form-control-sm numberInput"
                                      value={
                                        this.state.customerOrder.totalPrice
                                      }
                                      onChange={this.onChangeInput}
                                    />
                                  </div>
                                </div>

                                <div className="row mt-3">
                                  {' '}
                                  <div className="col-12">
                                    {' '}
                                    <label className="mr-2">
                                      Cancel Price : &nbsp;&nbsp;
                                    </label>
                                    <input
                                      name="cancelPrice"
                                      type="text"
                                      className="form-control form-control-sm numberInput"
                                      value={
                                        this.state.customerOrder.cancelPrice
                                      }
                                      onChange={this.onChangeInput}
                                    />
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  {' '}
                                  <div className="col-12">
                                    {' '}
                                    <label className="mr-2">
                                      Total Delivery Cost : &nbsp;
                                    </label>
                                    <input
                                      name="totalDeliveryCost"
                                      type="text"
                                      className="form-control form-control-sm"
                                      value={
                                        this.state.customerOrder
                                          .totalDeliveryCost
                                      }
                                      onChange={this.onChangeInput}
                                    />
                                  </div>
                                </div>

                                <div className="row mt-3">
                                  {' '}
                                  <div className="col-12">
                                    {' '}
                                    <label className="mr-4">
                                      Total Cost :&nbsp;&nbsp;&nbsp;&nbsp;
                                    </label>
                                    <input
                                      name="totalCost"
                                      type="text"
                                      className="form-control form-control-sm"
                                      value={this.state.customerOrder.totalCost}
                                      onChange={this.onChangeInput}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                <div className="row">
                                  <div className="col-12">
                                    <label className="mb-0">
                                      Customer Id : &nbsp;
                                    </label>
                                    <span
                                      className={s.link}
                                      onClick={this.gotoUser}
                                    >
                                      {this.state.customerOrder.customerId}{' '}
                                    </span>
                                    {/* <input
                                      name="customerOrderId"
                                      type="text"
                                      className="form-control form-control-sm numberInput"
                                      value={
                                        this.state.customerOrder
                                          .customerOrderId
                                      }
                                      onChange={this.onChangeInput}
                                      disabled
                                    /> */}
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col-12">
                                    <label>User Order No :</label>
                                    <span className={s.orderNo}>
                                      {this.state.customerOrder.userOrderNo}
                                    </span>
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col-12">
                                    <label className="mr-5">
                                      Discount : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </label>
                                    <input
                                      name="discount"
                                      type="text"
                                      className="form-control form-control-sm numberInput"
                                      value={this.state.customerOrder.discount}
                                      onChange={this.onChangeInput}
                                    />
                                  </div>
                                </div>

                                <div className="row mt-3">
                                  <div className="col-12">
                                    <label className="mr-5">
                                      Total Tax Cost:
                                    </label>
                                    <input
                                      name="totalTaxCost"
                                      type="text"
                                      className="form-control form-control-sm numberInput"
                                      value={
                                        this.state.customerOrder.totalTaxCost
                                      }
                                      onChange={this.onChangeInput}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row mt-3">
                            {' '}
                            {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                              <div className="row">
                                <div className="col-xl-4 col-lg-5 col-md-5 col-sm-12 mr-2">
                                  <label>Start Date </label>
                                </div>
                                <div className="col-xl-5 col-lg-5 col-md-5">
                                  <DatePicker
                                    name="startDate"
                                    selected={
                                      new Date(
                                        this.state.customerOrder.startDate,
                                      )
                                    }
                                    onChange={date =>
                                      this.handleDateChange(date, 'startDate')
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                              <div className="row">
                                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 mr-2">
                                  <label>End Date </label>
                                </div>
                                <div className="col-xl-5 col-lg-5 col-md-5">
                                  <DatePicker
                                    name="endDate"
                                    selected={
                                      new Date(this.state.customerOrder.endDate)
                                    }
                                    onChange={date =>
                                      this.handleDateChange(date, 'endDate')
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                         */}
                          </div>
                          <br />
                          <hr />
                          <br />
                          <div className="form-group">
                            <div className="row mt-2">
                              <div className="col-xl-6 col-lg-6 col-md-6">
                                <div className="row">
                                  <div className="col-xl-12">
                                    <label>Currency</label>
                                    <Select
                                      name="currency"
                                      options={this.state.allCurrencies}
                                      value={this.state.customerOrder.currency}
                                      onChange={so =>
                                        this.handleSelectChange(so, 'currency')
                                      }
                                    />
                                  </div>
                                </div>
                                <br />
                              </div>
                              <div className="col-6">
                                <div className="row">
                                  <div className="col-xl-12">
                                    <label>Order Status </label>
                                    <br />
                                    <Select
                                      name="status"
                                      options={CUSTOMER_ORDER_STATUS_ARRAY}
                                      value={this.state.customerOrder.status}
                                      onChange={so =>
                                        this.handleSelectChange(so, 'status')
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mt-2">
                              <div className="col-xl-12 col-lg-12 col-md-12">
                                <div className="col-xl-12">
                                  <label>Delivery Address </label>
                                  <br />
                                  <Select
                                    name="deliveryAddress"
                                    options={this.state.allAddresses}
                                    value={
                                      this.state.customerOrder.deliveryAddress
                                    }
                                    onChange={so =>
                                      this.handleSelectChange(
                                        so,
                                        'deliveryAddress',
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>

                      <div className="form-group">
                        <div className="row">
                          <div className="col-12">
                            {' '}
                            <label className="mb-2">
                              Description <br />
                            </label>
                            <textarea
                              name="description"
                              rows="4"
                              cols="10"
                              type="text"
                              className="form-control form-control-sm numberInput"
                              value={this.state.customerOrder.description}
                              onChange={this.onChangeInput}
                            />
                          </div>
                        </div>
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
                            <i className="far fa-edit" />&nbsp;&nbsp;Apply
                            Changes
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-5">
              <div className="offset-xl-1 col-xl-10 col-lg-8 col-md-8 col-sm-12 col-12">
                <div className="card">
                  <h4 className="card-header">
                    Publisher Orders Of This Order
                  </h4>
                  <div className="card-body p-0">
                    <div className="container-fluid">
                      <CustomTable
                        hasPagination={false}
                        records={this.state.customerOrder.publisherOrders}
                        columnLabels={PUBLISHER_ORDERS_COLUMNS_LABELS_ARRAY}
                        recordItemNames={
                          PUBLISHER_ORDERS_RECORDE_ITEM_NAMES_ARRAY
                        }
                        onRecordClick={this.onPublisherOrderClick}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}
export default withStyles(s)(CustomerOrderDetail);
