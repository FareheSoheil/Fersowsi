import React from 'react';
import Select from 'react-select';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { toastr } from 'react-redux-toastr';
import 'react-datepicker/dist/react-datepicker.css';
import PageHeader from '../../../../components/Admin/PageHeader';
import Spinner from '../../../../components/Admin/Spinner';
import CustomerInvoiceItem from '../../../../components/Admin/CustomerInvoice/CustomerInvoiceItem';
import {
  CUSTOMER_ORDER_STATUS_ARRAY,
  CUSTOMER_ORDER_STATUS,
} from '../../../../constants/constantData';
import { SERVER } from '../../../../constants';
import { PRICE_SIGNS, PRICES } from '../../../../constants/constantData';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import history from '../../../../history';
import adminPriceTrimmer from '../../../../adminPriceTrimmer';
import dateTrimmer from '../../../../dateTrimmer';
import { pdfMaker } from '../customerInvoicePdfHelper';
import s from './CustomerInvoiceDetail.css';

class CustomerInvoiceDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      id: this.props.context.params.id,
      isDisabled: false,
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
        status: '', //
        userOrderNo: 10001, //
        customerId: 60044, //
        currency: '', //
        currencyId: 3,
        deliveryAddress: {}, //
        publisherOrders: [],
      },
    };
    this.fetchcustomerOrder = this.fetchcustomerOrder.bind(this);
    this.fetchAllInfo = this.fetchAllInfo.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.gotoUser = this.gotoUser.bind(this);
    this.onPublisherOrderClick = this.onPublisherOrderClick.bind(this);
    this.print = this.print.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.onInvoiceEdit = this.onInvoiceEdit.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.changePrice = this.changePrice.bind(this);
  }
  gotoUser() {
    history.push(`/admin/accounts/${this.state.customerOrder.customerId}`);
  }
  onPublisherOrderClick(id) {
    history.push(`/admin/publisherOrder/${id}`);
  }

  uploadImage() {
    let inp = document.getElementById('imageUploader');
    let imgContainer = document.getElementById('paymentImg');
    let reader = new FileReader();
    let that = this;
    if (inp.files && inp.files[0]) {
      reader.onload = function(e) {
        imgContainer.src = e.target.result;
        let pres = { ...that.state.customerOrder };
        pres.paymentImage = e.target.result;
        that.setState({
          customerOrder: pres,
        });
      };
      let imgt = reader.readAsDataURL(inp.files[0]);
    }
  }

  componentDidMount() {
    // this.fetchAllInfo();
    this.fetchcustomerOrder();
  }
  fetchcustomerOrder() {
    const url = `${SERVER}/getCustomerInvoice`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      customerInvoiceId: this.state.id,
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
        that.setState(
          {
            customerOrder: response.customerInvoice,
            isLoading: false,
            isDisabled:
              response.customerInvoice.InvoiceStatus.value ==
              CUSTOMER_ORDER_STATUS.Done.value
                ? true
                : false,
          },
          () => {
            console.log('order : ', response.customerInvoice);
          },
        );
      },
      error => {
        console.log(error);
      },
    );
  }
  sendEmail() {
    const url = `${SERVER}/sendInvoiceToCustomerMail`;
    let prices = {
      totalPrice: this.state.customerOrder.totalPrice,
      totalDiscount: this.state.customerOrder.totalDiscount,
      totalDeliveryCost: this.state.customerOrder.totalDeliveryCost,
      totalTaxSixPrecent: this.state.customerOrder.totalTaxSixPrecent,
      totalTax: this.state.customerOrder.totalTax,
    };
    const html = pdfMaker(
      this.state.customerOrder.orders,
      this.state.customerOrder.Currency.value,
      prices,
    );
    const cred = {
      customerInvoiceId: this.state.id,
      htmlContent: html,
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(cred),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const that = this;
    console.log('cred : ', cred);
    fetchWithTimeOut(
      url,
      options,
      response => {
        if (response.error == undefined) {
          toastr.success('Cusomer Invoice', 'Invoices were EMailed');
        }
      },
      error => {
        console.log(error);
      },
    );
  }
  fetchAllInfo() {
    const url = `${SERVER}/getAuxInfoForAll`;
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
          allDeliveryAddresess: response.Address,
          allCurrencies: response.Currency,
          // isLoading: false,
        });
      },
      error => {
        console.log(error);
      },
    );
  }

  changePrice(event) {
    // rft ya payment note
    const value = event.target.value;
    const state = event.target.name;
    let customerOrder = { ...this.state.customerOrder };

    if (value != '') {
      if (value == '.')
        customerOrder[state][
          this.state.customerOrder.Currency.value - 1
        ] = value;
      else
        // window.alert(event.valueAsNumber);
        customerOrder[state][
          this.state.customerOrder.Currency.value - 1
        ] = value;
    } else
      customerOrder[state][this.state.customerOrder.Currency.value - 1] = 0;
    this.setState({ customerOrder });
  }
  onChangeInput(event) {
    // rft ya payment note
    const value = event.target.value;
    const state = event.target.name;
    let customerOrder = { ...this.state.customerOrder };
    customerOrder[state] = value;
    this.setState({ customerOrder });
  }
  handleSelectChange = (selectedOption, op) => {
    // status
    let customerOrder = { ...this.state.customerOrder };
    customerOrder[op] = selectedOption;
    this.setState({ customerOrder });
  };
  onInvoiceEdit() {
    const url = `${SERVER}/editCustomerInvoice`;
    // this.setState({
    //   isLoading: true,
    // });
    const credentials = {
      id: this.state.id,
      fdtRefCode: this.state.customerOrder.fdtRefCode,
      paymentImage: this.state.customerOrder.paymentImage,
      paymentNote: this.state.customerOrder.paymentNote,
      statusId: this.state.customerOrder.InvoiceStatus.value,
      // totalTaxCost: 16,
      // totalDeliveryCost: 222,
      // totalCost:223.4,
      // cancelPrice: 11.3,
      // discount: 0.2,
      // "spacialFair": 155
    };
    console.log('edit : ', credentials);
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
        console.log('edit response : ', response);
        if (response.error == undefined) {
          toastr.success(
            'Customer Invoice',
            'Customer Invoice Updated Successfully!',
          );
          history.push('/admin/customerInvoice/all');
        } else toastr.error('Customer Invoice', "Couldn't Update Invoice");
      },
      error => {
        toastr.error('Customer Invoice', "Couldn't Update Invoice");
      },
    );
  }
  onExportProduct() {
    window.alert('send delete ajax with user id');
  }
  onImportProduct() {
    window.alert('send delete ajax with user id');
  }
  onProductEdit() {
    window.alert('send edi ajax with all user info');
  }
  print() {
    let frog = window.open(
      '',
      'wildebeast',
      'width=800,height=700,scrollbars=1,resizable=1',
    );
    frog.document.open();
    frog.document.write(pdfMaker(this.state.customerOrder));
    frog.document.close();
  }
  render() {
    let invoices;
    const subOrders = this.state.customerOrder.orders;
    console.log('publisherOrders : ', subOrders);
    if (subOrders != undefined && subOrders.length != 0)
      invoices = subOrders.map(
        (order, i) =>
          (invoices = (
            <CustomerInvoiceItem
              invoice={order}
              currencyId={this.state.customerOrder.Currency.value}
            />
          )),
      );
    else invoices = <div className={s.warning}>No Products Available</div>;
    return (
      <div>
        {!this.state.isLoading ? (
          <div className={` container-fluid dashboard-content`}>
            <PageHeader
              title="Customer Order Details"
              breadCrumbs={[
                {
                  link: '/admin/customerOrder',
                  label: 'Customer Invoice List',
                },
                { link: '', label: 'Customer Orders Detail' },
              ]}
            />
            <div className={`${s.container} container-fluid`}>
              <div className="row pl-1">
                <div
                  className="col-xl-4 col-lg-4 col-md-5 col-sm-6 col-6"
                  style={{
                    border: '1px solid #4fb9ae',
                    padding: '0px 0px 10px 0px',
                  }}
                >
                  <div className="row">
                    <div className="col-12">
                      <h5>Invoice Details:</h5>
                      <div style={{ padding: '6px' }}>
                        <div className="row mb-1">
                          <div className="col-5">
                            <label>Invoice No:</label>
                          </div>
                          <div className="col-6">
                            {this.state.customerOrder.id}
                          </div>
                        </div>
                        <div className="row mb-1">
                          <div className="col-5">
                            <label>Customer Id:</label>
                          </div>
                          <div className="col-4">
                            {this.state.customerOrder.customerId}{' '}
                          </div>
                        </div>
                        <div className="row mb-1">
                          <div className="col-5">
                            <label>Date:</label>{' '}
                          </div>
                          <div className="col-6">
                            {dateTrimmer(this.state.customerOrder.createdAt)}{' '}
                          </div>
                        </div>
                        <div className="row mb-1">
                          <div className="col-5">
                            <label>Invoice Status : </label>
                          </div>
                          <div className="col-6">
                            @{this.state.customerOrder.InvoiceStatus.label}{' '}
                          </div>
                        </div>
                        <div className="row mb-1">
                          <div className="col-5">
                            <label>Terms of Payment:</label>
                          </div>
                          <div className="col-4">
                            {this.state.customerOrder.paymentMethod}
                          </div>
                        </div>
                        <div className="row mb-1">
                          <div className="col-5">
                            <label>FDT Ref Code:</label>
                          </div>
                          <div className="col-4">
                            <input
                              value={this.state.customerOrder.fdtRefCode}
                              name="fdtRefCode"
                              onChange={this.onChangeInput}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`row mt-2 ${s.userInfo}`}>
                    <div className="col-12">
                      <h5>Customer Information</h5>{' '}
                    </div>
                    <div className="col-12 pl-4">
                      {this.state.customerOrder.customer.label}
                    </div>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-7 col-sm-6 col-6 ">
                  <div className="row mb-3">
                    <div className="col-4">
                      <button onClick={this.print}>Print User Invoices</button>
                    </div>
                    <div className="col-4">
                      <button onClick={this.sendEmail}>
                        Send Invoices To Cutomer
                      </button>
                    </div>
                  </div>
                  <div style={{ border: '1px solid #4fb9ae' }} className="mb-3">
                    <h5> Manipulate Invoice</h5>
                    <div className="row pl-1">
                      <div className="col-12">
                        In the following area you can write note about the
                        invoice.
                      </div>
                    </div>
                    <div className="row mt-1 pl-1">
                      <div className="col-12">
                        <textarea
                          rows="5"
                          value={this.state.customerOrder.paymentNote}
                          name="paymentNote"
                          onChange={this.onChangeInput}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-2 mb-2">
                    <div className="col-3">
                      <label>Upload Payment file : </label>
                    </div>
                    <div className="col-4">
                      <input
                        type="file"
                        id="imageUploader"
                        className={s.imageUploader}
                        onChange={this.uploadImage}
                      />
                    </div>
                    <div className="col-4">
                      <img
                        style={{ maxWidth: '180px', border: '1px solid black' }}
                        id="paymentImg"
                        src={
                          this.state.customerOrder.paymentImage == ''
                            ? 'http://placehold.it/180'
                            : this.state.customerOrder.paymentImage
                        }
                        alt="your image"
                      />
                    </div>
                  </div>
                  <hr />
                  {this.state.customerOrder.InvoiceStatus.label !=
                  CUSTOMER_ORDER_STATUS.Done ? (
                    <div className="row mt-1">
                      <div className="col-12">
                        <label>Order Status </label>
                      </div>
                      <div className="col-xl-4">
                        <Select
                          isDisabled={this.state.isDisabled}
                          name="status"
                          options={CUSTOMER_ORDER_STATUS_ARRAY}
                          value={this.state.customerOrder.InvoiceStatus}
                          onChange={so =>
                            this.handleSelectChange(so, 'InvoiceStatus')
                          }
                        />
                      </div>

                      <div className="col-2 mt-2">
                        <button onClick={this.onInvoiceEdit}>Apply</button>
                      </div>
                      <div className="col-2 mt-2">
                        <button onClick={this.print}>Print</button>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              <hr />
              <div className="row mb-2">
                <div className="col-2 pl-4">
                  <label>Select Currency</label>
                  <Select
                    value={this.state.customerOrder.Currency}
                    onChange={so => this.handleSelectChange(so, 'Currency')}
                    options={PRICES}
                  />
                </div>
              </div>
              <div id="invoicescol-5">{invoices}</div>
              <hr />
              <div className="container-fluid">
                <div className={`row ${s.total}`}>
                  <div
                    className="offset-xl-8 offset-lg-5 offset-md-4 col-xl-4 col-lg-4 col-md-5 col-sm-6 col-6 mr-4"
                    style={{ border: '1px solid #4fb9ae', padding: '0px' }}
                  >
                    <h5>Total Details:</h5>
                    <div style={{ padding: '6px' }}>
                      <div className="row mb-1">
                        <div className="col-5">
                          <label>Total Price:</label>
                        </div>
                        <div className="col-4">
                          <input
                            disabled
                            // {this.state.isDisabled}
                            value={
                              this.state.customerOrder.totalPrice[
                                this.state.customerOrder.Currency.value - 1
                              ]
                            }
                            name="totalPrice"
                            onChange={this.changePrice}
                          />
                        </div>
                        {PRICE_SIGNS[this.state.customerOrder.Currency.value]}
                      </div>
                      <div className={`row mb-1 `}>
                        <div className="col-5">
                          <label>Total Delivery Cost:</label>
                        </div>
                        <div className="col-4">
                          <input
                            disabled
                            // {this.state.isDisabled}
                            value={
                              this.state.customerOrder.totalDeliveryCost[
                                this.state.customerOrder.Currency.value - 1
                              ]
                            }
                            name="totalDeliveryCost"
                            onChange={this.changePrice}
                          />
                        </div>
                        {PRICE_SIGNS[this.state.customerOrder.Currency.value]}
                      </div>
                      <div className="row mb-1">
                        <div className="col-5">
                          <label>Total Tax:</label>{' '}
                        </div>
                        <div className="col-4">
                          <input
                            disabled
                            // {this.state.isDisabled}
                            value={
                              this.state.customerOrder.totalTax[
                                this.state.customerOrder.Currency.value - 1
                              ]
                            }
                            name="totalTax"
                            onChange={this.changePrice}
                          />
                        </div>
                        {PRICE_SIGNS[this.state.customerOrder.Currency.value]}
                      </div>
                      <div className="row mb-1">
                        <div className="col-5">
                          <label>Total Discount : </label>
                        </div>
                        <div className="col-4">
                          <input
                            disabled
                            // {this.state.isDisabled}
                            value={
                              this.state.customerOrder.totalDiscount[
                                this.state.customerOrder.Currency.value - 1
                              ]
                            }
                            name="totalDiscount"
                            onChange={this.changePrice}
                          />{' '}
                        </div>
                        {PRICE_SIGNS[this.state.customerOrder.Currency.value]}
                      </div>
                      <div className="row mb-1">
                        <div className="col-5">
                          <label>Total</label>
                        </div>
                        <div className="col-4">
                          {adminPriceTrimmer(
                            parseFloat(
                              this.state.customerOrder.totalPrice[
                                this.state.customerOrder.Currency.value - 1
                              ],
                            ) +
                              parseFloat(
                                this.state.customerOrder.totalDeliveryCost[
                                  this.state.customerOrder.Currency.value - 1
                                ],
                              ) +
                              parseFloat(
                                this.state.customerOrder.totalTaxSixPrecent[
                                  this.state.customerOrder.Currency.value - 1
                                ],
                              ) +
                              parseFloat(
                                this.state.customerOrder.totalTax[
                                  this.state.customerOrder.Currency.value - 1
                                ],
                              ),
                            'price',
                          )}
                        </div>
                        {PRICE_SIGNS[this.state.customerOrder.Currency.value]}
                      </div>
                      <div className="row mb-1">
                        <div className="col-5">
                          <label>Total to Be Paid : </label>
                        </div>
                        <div className="col-4">
                          {adminPriceTrimmer(
                            parseFloat(
                              this.state.customerOrder.totalPrice[
                                this.state.customerOrder.Currency.value - 1
                              ],
                            ) +
                              parseFloat(
                                this.state.customerOrder.totalDeliveryCost[
                                  this.state.customerOrder.Currency.value - 1
                                ],
                              ) +
                              parseFloat(
                                this.state.customerOrder.totalTaxSixPrecent[
                                  this.state.customerOrder.Currency.value - 1
                                ],
                              ) +
                              parseFloat(
                                this.state.customerOrder.totalTax[
                                  this.state.customerOrder.Currency.value - 1
                                ],
                              ) -
                              parseFloat(
                                this.state.customerOrder.totalDiscount[
                                  this.state.customerOrder.Currency.value - 1
                                ],
                              ),
                            'price',
                          )}
                        </div>
                        {PRICE_SIGNS[this.state.customerOrder.Currency.value]}
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
export default withStyles(s)(CustomerInvoiceDetail);
