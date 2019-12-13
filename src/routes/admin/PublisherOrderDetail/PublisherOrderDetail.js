import React from 'react';
import Select from 'react-select';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PageHeader from '../../../components/Admin/PageHeader';
import Spinner from '../../../components/Admin/Spinner';
import {
  PAYMENT_STATUS_ARRAY,
  CUSTOMER_ORDER_STATUS_ARRAY,
} from '../../../constants/constantData';
import { SERVER, SSRSERVER } from '../../../constants';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import history from '../../../history';
import zeroTrimmer from '../../../zeroTrimmer';
import s from './PublisherOrderDetail.css';
class PublisherOrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      id: this.props.context.params.id,
      publisherOrder: {
        id: 22012,
        count: 3,
        startDate: '',
        endDate: '2011-12-31 00:00:00',
        deliveryType: { value: 2, label: 'Air Mail' },
        status: { value: 1, label: 'Wait For Admin Response ' },
        paymentStatus: { value: 2, label: 'half Paid ' },
        productPeriod: { value: 1, label: 'Daily' },
        productionSubscription: { value: 3, label: '6-Monthly' },
        currency: { value: 5, label: 'Euro' },
        address: { value: 2662, label: 'alkjsdhaskjdnasdjkasndasjdlasnd' },
        totalCost: 476.0,
        deliveryCost: 539.0,
        customerPrice: 600.0,
        cancelPrice: 0.0,
        publisherPrice: 600.0,
        tax: 0.0,
        discount: 0.0,
        paymentImage: '',
        publicationNote: '',
        paymentNote: '',
        createdAt: '2011-03-01 12:17:40',
        updatedAt: '2019-10-16 01:56:52',
        customerOrderId: 10001,
        productId: 6004,
      },
      allPeriods: '', //
      allAddresses: '', //
      allSubscriptions: '',
      allDeliveryTypes: '', //
      allCurrencies: '', //
    };
    this.fetchpublisherOrder = this.fetchpublisherOrder.bind(this);
    this.fetchAllInfo = this.fetchAllInfo.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.gotoCustomerOrder = this.gotoCustomerOrder.bind(this);
    this.gotoProduct = this.gotoProduct.bind(this);
  }
  gotoProduct(id) {
    history.push(`/admin/products/${this.state.publisherOrder.productId}`);
  }
  gotoCustomerOrder() {
    history.push(
      `/admin/customerOrder/${this.state.publisherOrder.customerOrderId}`,
    );
  }
  uploadImage() {
    let inp = document.getElementById('imageUploader');
    if (inp.files && inp.files[0]) {
      var reader = new FileReader();
      const that = this;
      reader.onload = function(e) {
        let img = document.getElementById('imgHolder');
        img.src = e.target.result;
        let publisherOrder = { ...that.state.publisherOrder };
        publisherOrder.paymentImage = e.target.result;
        that.setState({
          publisherOrder: publisherOrder,
        });
      };

      reader.readAsDataURL(inp.files[0]);
    }
  }
  componentDidMount() {
    this.fetchAllInfo();
    this.fetchpublisherOrder();
  }
  fetchpublisherOrder() {
    const url = `${SERVER}/getPublisherOrder`;
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
      url,
      options,
      response => {
        that.setState({
          publisherOrder: response,
          isLoading: false,
        });
      },
      error => {
        console.log(error);
      },
    );
  }
  fetchAllInfo() {
    const url = `${SERVER}/getAllAuxInfoForOnePulisherOrder`;
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
        // const  thatThat = that;
        that.setState({
          allPeriods: response.ProductPeriod,
          allCurrencies: response.Currency,
          allSubscriptions: response.ProductSubscriptionType,
          allDeliveryTypes: response.DeliveryType,
          allAddresses: response.Address,
          isLoading: false,
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
        {!this.state.isLoading && this.state.publisherOrder.startDate !== '' ? (
          <div className={` container-fluid dashboard-content`}>
            <PageHeader
              title="Publisher Order Details"
              breadCrumbs={[
                {
                  link: '/admin/publisherOrder',
                  label: 'Publisher Orders List',
                },
                { link: '', label: 'Publisher Orders Detail' },
              ]}
            />
            <div className={`${s.container} container-fluid`}>
              {/* <div className="row">
                <div
                  className={`${
                    s.container
                  }   col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12`}
                > */}
              <div className="row">
                <div
                  className={`col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pr-xl-0 pr-lg-0 pr-md-0  m-b-30 ${
                    s.publisherOrderDetailContainer
                  }`}
                >
                  <div>
                    <div className="border-bottom pb-2 mb-3">
                      <form className={s.orderSmallInfoContainer}>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-xl-3 col-lg-5 col-md-6 col-sm-12">
                              <div className="row ">
                                {' '}
                                <div className="col-12">
                                  {' '}
                                  <label className="mb-0">
                                    Customer Price :{' '}
                                  </label>
                                  <input
                                    name="customerPrice"
                                    type="text"
                                    className="form-control form-control-sm numberInput"
                                    value={zeroTrimmer(
                                      this.state.publisherOrder
                                        .customerPrice[0],
                                      'price',
                                    )}
                                    onChange={this.onChangeInput}
                                  />
                                </div>
                              </div>

                              <div className="row mt-3">
                                {' '}
                                <div className="col-12">
                                  {' '}
                                  <label className="mr-1">
                                    Publisher Price :{' '}
                                  </label>
                                  <input
                                    name="publisherPrice"
                                    type="text"
                                    className="form-control form-control-sm numberInput"
                                    value={zeroTrimmer(
                                      this.state.publisherOrder
                                        .publisherPrice[0],
                                      'price',
                                    )}
                                    onChange={this.onChangeInput}
                                  />
                                </div>
                              </div>

                              <div className="row mt-3">
                                {' '}
                                <div className="col-12">
                                  {' '}
                                  <label className="mr-2">
                                    Cancel Price : &nbsp;&nbsp;&nbsp;
                                  </label>
                                  <input
                                    name="cancelPrice"
                                    type="text"
                                    className="form-control form-control-sm numberInput"
                                    value={
                                      this.state.publisherOrder.cancelPrice[0]
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
                                    Delivery Cost : &nbsp;
                                  </label>
                                  <input
                                    name="deliveryCost"
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={
                                      this.state.publisherOrder.deliveryCost[0]
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
                                    value={zeroTrimmer(
                                      this.state.publisherOrder.totalCost[0],
                                      'price',
                                    )}
                                    onChange={this.onChangeInput}
                                  />
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-xl-12 col-lg-12 col-md-12">
                                  <label>
                                    Start Date : &nbsp; &nbsp; &nbsp; &nbsp;
                                    &nbsp;{' '}
                                  </label>
                                  <DatePicker
                                    name="startDate"
                                    selected={
                                      new Date(
                                        this.state.publisherOrder.startDate,
                                      )
                                    }
                                    onChange={date =>
                                      this.handleDateChange(date, 'startDate')
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-3 col-lg-5 col-md-6 col-sm-12">
                              <div className="row">
                                <div className="col-12">
                                  <label className="mb-0">
                                    Customer Order Id : &nbsp;
                                  </label>
                                  <span
                                    className={s.link}
                                    onClick={this.gotoCustomerOrder}
                                  >
                                    <u>
                                      <i>
                                        {
                                          this.state.publisherOrder
                                            .customerOrderId
                                        }{' '}
                                      </i>{' '}
                                    </u>
                                  </span>
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-12">
                                  <label className="mr-5">
                                    Product Id : &nbsp;&nbsp;&nbsp;
                                  </label>
                                  <span
                                    className={s.link}
                                    onClick={this.gotoProduct}
                                  >
                                    <u>
                                      <i>
                                        {this.state.publisherOrder.productId}
                                      </i>
                                    </u>
                                  </span>
                                  {/* <input
                                      name="productId"
                                      type="text"
                                      className="form-control form-control-sm numberInput"
                                      value={
                                        this.state.publisherOrder.productId
                                      }
                                      disabled
                                    /> */}
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
                                    value={zeroTrimmer(
                                      this.state.publisherOrder.discount,
                                      'price',
                                    )}
                                    onChange={this.onChangeInput}
                                  />
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-12">
                                  <label className="mr-5">
                                    Count :
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </label>
                                  <input
                                    name="count"
                                    type="text"
                                    className="form-control form-control-sm numberInput"
                                    value={this.state.publisherOrder.count}
                                    onChange={this.onChangeInput}
                                  />
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-12">
                                  <label className="mr-5">
                                    Tax :
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </label>
                                  <input
                                    name="tax"
                                    type="text"
                                    className="form-control form-control-sm numberInput"
                                    value={this.state.publisherOrder.tax[0]}
                                    onChange={this.onChangeInput}
                                  />
                                </div>
                              </div>

                              <div className="row mt-3">
                                <div className="col-xl-12 col-lg-12 col-md-12">
                                  <label>
                                    End Date : &nbsp; &nbsp; &nbsp; &nbsp;
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{' '}
                                  </label>
                                  <DatePicker
                                    name="endDate"
                                    selected={
                                      new Date(
                                        this.state.publisherOrder.endDate,
                                      )
                                    }
                                    onChange={date =>
                                      this.handleDateChange(date, 'endDate')
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="ml-xl-4 col-xl-5 col-lg-12 col-md-12 col-sm-12">
                              <div className="row mb-4">
                                <div className="col-xl-6 col-lg-6 col-md-6 ">
                                  <label>Payment Status </label>
                                  <Select
                                    name="paymentStatus"
                                    options={PAYMENT_STATUS_ARRAY}
                                    value={
                                      this.state.publisherOrder.paymentStatus
                                    }
                                    onChange={so =>
                                      this.handleSelectChange(
                                        so,
                                        'paymentStatus',
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 ">
                                  <label>Order Status </label>
                                  <br />
                                  <Select
                                    name="starus"
                                    options={CUSTOMER_ORDER_STATUS_ARRAY}
                                    value={this.state.publisherOrder.status}
                                    onChange={so =>
                                      this.handleSelectChange(so, 'starus')
                                    }
                                  />
                                </div>
                              </div>

                              <div className="row mb-4">
                                <div className="col-xl-6">
                                  <label>Delivery Type</label>
                                  <Select
                                    name="deliveyType"
                                    options={this.state.allDeliveryTypes}
                                    value={
                                      this.state.publisherOrder.deliveryType
                                    }
                                    onChange={so =>
                                      this.handleSelectChange(so, 'deliveyType')
                                    }
                                  />
                                </div>
                                <div className="col-xl-6">
                                  <label>Product Subscription </label>
                                  <br />
                                  <Select
                                    name="productionSubscription"
                                    options={this.state.allSubscriptions}
                                    value={
                                      this.state.publisherOrder
                                        .productionSubscription
                                    }
                                    onChange={so =>
                                      this.handleSelectChange(
                                        so,
                                        'productionSubscription',
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-xl-4">
                                  <label>Currency</label>
                                  <Select
                                    name="currency"
                                    options={this.state.allCurrencies}
                                    value={this.state.publisherOrder.currency}
                                    onChange={so =>
                                      this.handleSelectChange(so, 'currency')
                                    }
                                  />
                                </div>
                                <div className="col-xl-8 ">
                                  <label>Address </label>
                                  <br />
                                  <Select
                                    name="address"
                                    options={this.state.allAddresses}
                                    value={this.state.publisherOrder.address}
                                    onChange={so =>
                                      this.handleSelectChange(so, 'address')
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div
                      className={`${s.paymentContainer} container pb-2 mb-3`}
                    >
                      <div className={`${s.imageContainer} row mb-3 mt-3`}>
                        <div
                          className="col-xl-4 mb-2"
                          // style={{ border: '1px solid red' }}
                        >
                          {/* <div className="row">
                            <label>
                              Payment Photo <br /> <br />
                            </label>
                          </div> */}
                          <div className="row mb-4">
                            <div className="col-12">
                              <img
                                alt=" No Payment Photo Uploaded"
                                height="250"
                                // width="400"
                                id="imgHolder"
                                className={s.imgContainer}
                                src={this.state.publisherOrder.paymentImage}
                              />{' '}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <input
                                type="file"
                                id="imageUploader"
                                className={s.imageUploader}
                                onChange={() => this.uploadImage(this)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 mb-2">
                          <div className="row">
                            <div className="col-12">
                              {' '}
                              <label className="mb-2">
                                Payment Note <br />
                              </label>
                              <textarea
                                name="paymentNote"
                                rows="4"
                                cols="10"
                                type="text"
                                className="form-control form-control-sm numberInput"
                                value={this.state.publisherOrder.paymentNote}
                                onChange={this.onChangeInput}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 mb-2">
                          {' '}
                          <div className="row">
                            <div className="col-12">
                              <label className="mb-2 ">Publication Note</label>
                              <textarea
                                name="publicationNote"
                                rows="4"
                                cols="10"
                                type="text"
                                className="form-control form-control-sm numberInput"
                                value={
                                  this.state.publisherOrder.publicationNote
                                }
                                onChange={this.onChangeInput}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
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
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}
export default withStyles(s)(PublisherOrderDetail);
