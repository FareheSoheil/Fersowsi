import React from 'react';
import Select from 'react-select';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import html2canvas from 'html2canvas';
import 'react-datepicker/dist/react-datepicker.css';
import PageHeader from '../../../../components/Admin/PageHeader';
import Spinner from '../../../../components/Admin/Spinner';
import CustomerInvoice from '../../../../components/Admin/CustomerInvoice';
import {
  CUSTOMER_ORDER_STATUS_ARRAY,
  CUSTOMER_ORDER_STATUS,
} from '../../../../constants/constantData';
import { SERVER } from '../../../../constants';
import { PRICE_SIGNS } from '../../../../constants/constantData';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import history from '../../../../history';
import adminPriceTrimmer from '../../../../adminPriceTrimmer';
import dateTrimmer from '../../../../dateTrimmer';
import s from './CustomerOrderDetail.css';
const prices = [
  'totalPrice',
  'cancelPrice',
  'totalDeliveryCost',
  'totalCost',
  'totalTaxCost',
];
class CustomerOrderDetail extends React.Component {
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
        status: { value: 1, label: 'Wait For Admin Response ' }, //
        userOrderNo: 10001, //
        customerId: 60044, //
        currency: { value: 5, label: 'dollsr' }, //
        deliveryAddress: {
          value: 2662,
          label: 'alkjsdhaskjdnasdjkasndasjdlasnd',
        }, //
      },
    };
    this.fetchcustomerOrder = this.fetchcustomerOrder.bind(this);
    this.fetchAllInfo = this.fetchAllInfo.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
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

  componentDidMount() {
    this.fetchAllInfo();
    this.fetchcustomerOrder();
  }
  fetchcustomerOrder() {
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
        console.log('order : ', response);
        that.setState({
          customerOrder: response,
          isLoading: false,
          isDisabled:
            response.status.label == CUSTOMER_ORDER_STATUS.Done.label
              ? true
              : false,
        });
      },
      error => {
        console.log(error);
      },
    );
  }
  fetchAllInfo() {
    const url = `${SERVER}/getAllAuxInfoForAllCustomerOrders`;
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
          allDeliveryAddresess: response.Address,
          allCurrencies: response.Currency,
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
    let customerOrder = { ...this.state.customerOrder };
    if (prices.includes(state)) {
      customerOrder[state][this.state.customerOrder.currency.id - 1] = value;
    } else customerOrder[state] = value;
    this.setState({ customerOrder });
  }

  handleSelectChange = (selectedOption, op) => {
    let customerOrder = { ...this.state.customerOrder };
    if (op == 'currency')
      customerOrder[op] = {
        id: selectedOption.value,
        label: selectedOption.label,
      };
    else customerOrder[op] = selectedOption;
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
  print(i) {
    let frog = window.open(
      '',
      'wildebeast',
      'width=500,height=600,scrollbars=1,resizable=1',
    );

    //variable name of window must be included for all three of the following methods so that
    //javascript knows not to write the string to this window, but instead to the new window

    frog.document.open();
    frog.document.write(document.getElementById('userInvoices').outerHTML);
    frog.document.close();
    console.log(
      'to be printed',
      document.getElementById('userInvoices').outerHTML,
    );
  }
  render() {
    let invoices;
    const subOrders = this.state.customerOrder.publisherOrders;
    if (subOrders != undefined && subOrders.length != 0)
      invoices = subOrders.map(
        (order, i) => (invoices = <CustomerInvoice invoice={order} />),
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
            {/* invoice */}
            <div id="userInvoices" style={{ backgroundColor: 'white' }}>
              <div className="row">
                <div className="col-3">
                  <img src="/assets/images/printLogo.png" />
                </div>
                <div className="offset-4 col-4">
                  <h2>Invoice</h2>
                  <table>
                    <thead style={{ backgroundColor: 'lightGray' }}>
                      <th id="title" width="40%">
                        Customer No
                      </th>
                      <th width="40%">Order No</th>
                      <th width="60%">Print Date</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>{dateTrimmer(new Date())}</td>
                      </tr>
                      {/* <tr colspan="3">
                          sssssssssssssssssssssssssssssssssssssss
                        </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row">
                <table>
                  <thead style={{ backgroundColor: 'lightGray' }}>
                    <th id="title" width="40%">
                      Our Refrence
                    </th>
                    <th width="40%">Your Refrence</th>
                    <th width="60%">Order Date</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>2</td>
                      <td>{dateTrimmer(new Date())}</td>
                    </tr>
                    {/* <tr colspan="3">
                          sssssssssssssssssssssssssssssssssssssss
                        </tr> */}
                  </tbody>
                </table>
              </div>
              <div>{invoices}</div>
            </div>

            <div className={`${s.container} container-fluid`}>
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-5 col-sm-6 col-6 ">
                  <h5>Invoice Details:</h5>
                  <div className="row mb-1">
                    <div className="col-5">
                      <label>Invoice No:</label>
                    </div>
                    <div className="col-6">
                      {this.state.customerOrder.invoiceNo}
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
                      @{this.state.customerOrder.status.label}{' '}
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
                </div>
                <div className="col-xl-8 col-lg-8 col-md-7 col-sm-6 col-6 ">
                  <h5> Manipulate Invoice</h5>
                  <div className="row">
                    <div className="col-12">
                      In the following area you can write note about the
                      invoice.
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-12">
                      <textarea
                        rows="5"
                        vlaue={this.state.customerOrder.description}
                      />
                    </div>
                  </div>

                  {this.state.customerOrder.status.label !=
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
                          value={this.state.customerOrder.status}
                          onChange={so => this.handleSelectChange(so, 'status')}
                        />
                      </div>

                      <div className="col-2 mt-2">
                        <button>Apply</button>
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
              <div id="invoices">{invoices}</div>
              <hr />
              <div className={`row ${s.total}`}>
                <div className="offset-xl-8 offset-lg-5 offset-md-4 col-xl-4 col-lg-4 col-md-5 col-sm-6 col-6 ">
                  <h5>Total Details:</h5>
                  <div className="row mb-1">
                    <div className="col-5">
                      <label>Total Price:</label>
                    </div>
                    <div className="col-4">
                      <input
                        disabled={this.state.isDisabled}
                        vlaue={adminPriceTrimmer(
                          this.state.customerOrder.totalPrice[
                            this.state.customerOrder.currencyId - 1
                          ],
                          'price',
                        )}
                      />
                    </div>
                    {PRICE_SIGNS[this.state.customerOrder.currencyId]}
                  </div>
                  <div className={`row mb-1 `}>
                    <div className="col-5">
                      <label>Total Delivery Cost:</label>
                    </div>
                    <div className="col-4">
                      <input
                        disabled={this.state.isDisabled}
                        value={adminPriceTrimmer(
                          this.state.customerOrder.totalDeliveryCost[
                            this.state.customerOrder.currencyId - 1
                          ],
                          'price',
                        )}
                      />
                    </div>
                    {PRICE_SIGNS[this.state.customerOrder.currencyId]}
                  </div>
                  <div className="row mb-1">
                    <div className="col-5">
                      <label>Total Tax:</label>{' '}
                    </div>
                    <div className="col-6">
                      <input
                        disabled={this.state.isDisabled}
                        vlaue={adminPriceTrimmer(
                          this.state.customerOrder.totalTaxCost[
                            this.state.customerOrder.currencyId - 1
                          ],
                          'price',
                        )}
                      />
                    </div>
                  </div>
                  <div className="row mb-1">
                    <div className="col-5">
                      <label>Total Discount : </label>
                    </div>
                    <div className="col-6">
                      {adminPriceTrimmer(
                        this.state.customerOrder.discount,
                        'price',
                      )}{' '}
                    </div>
                  </div>
                  <div className="row mb-1">
                    <div className="col-5">
                      <label>Total</label>
                    </div>
                    <div className="col-4">{this.state.total}</div>
                    {PRICE_SIGNS[this.state.customerOrder.currencyId]}
                  </div>
                  <div className="row mb-1">
                    <div className="col-5">
                      <label>Total to Be Paid : </label>
                    </div>
                    <div className="col-4">{this.state.totalPaid}</div>
                    {PRICE_SIGNS[this.state.customerOrder.currencyId]}
                  </div>
                </div>
              </div>
              {/* <div className="row">
                <div
                  className={`col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 m-b-30 ${
                    s.CustomerOrderDetailContainer
                  }`}
                >
                  <div>
                    <div className="border-bottom pb-3 mb-3">
                      <form className={s.orderSmallInfoContainer}>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                              <div className="row ">
                                {' '}
                                <div className="col-12">
                                  {' '}
                                  <label className="mb-1">
                                    {`Total Price (${
                                      PRICE_SIGNS[
                                        this.state.customerOrder.currency.id
                                      ]
                                    }) :`}{' '}
                                    &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                                    &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                                  </label>
                                  <input
                                    name="totalPrice"
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={adminPriceTrimmer(
                                      this.state.customerOrder.totalPrice[
                                        this.state.customerOrder.currency.id - 1
                                      ],
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
                                    {`Cancel Price (${
                                      PRICE_SIGNS[
                                        this.state.customerOrder.currency.id
                                      ]
                                    }) :`}{' '}
                                    &nbsp;&nbsp; &nbsp; &nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </label>
                                  <input
                                    name="cancelPrice"
                                    type="text"
                                    className="form-control form-control-sm numberInput"
                                    value={this.state.customerOrder.cancelPrice}
                                    onChange={this.onChangeInput}
                                  />
                                </div>
                              </div>
                              <div className="row mt-3">
                                {' '}
                                <div className="col-12">
                                  {' '}
                                  <label className="mr-2">
                                    {`Total Delivery Cost (${
                                      PRICE_SIGNS[
                                        this.state.customerOrder.currency.id
                                      ]
                                    }) :`}
                                  </label>
                                  <input
                                    name="totalDeliveryCost"
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={adminPriceTrimmer(
                                      this.state.customerOrder
                                        .totalDeliveryCost[
                                        this.state.customerOrder.currency.id - 1
                                      ],
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
                                  <label className="mr-4">
                                    {`Total Cost (${
                                      PRICE_SIGNS[
                                        this.state.customerOrder.currency.id
                                      ]
                                    }) :`}&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;
                                    &nbsp; &nbsp;
                                  </label>
                                  <input
                                    name="totalCost"
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={adminPriceTrimmer(
                                      this.state.customerOrder.totalCost[
                                        this.state.customerOrder.currency.id - 1
                                      ],
                                      'price',
                                    )}
                                    onChange={this.onChangeInput}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
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
                                  <label>
                                    Discount (%): &nbsp; &nbsp; &nbsp; &nbsp;
                                    &nbsp; &nbsp; &nbsp; &nbsp;
                                  </label>
                                  <input
                                    name="discount"
                                    type="text"
                                    className="form-control form-control-sm numberInput"
                                    value={adminPriceTrimmer(
                                      this.state.customerOrder.discount,
                                      'price',
                                    )}
                                    onChange={this.onChangeInput}
                                  />
                                </div>
                              </div>

                              <div className="row mt-3">
                                <div className="col-12">
                                  <label>
                                    {`Total Tax Cost (${
                                      PRICE_SIGNS[
                                        this.state.customerOrder.currency.id
                                      ]
                                    }) :`}
                                    &nbsp; &nbsp; &nbsp; &nbsp;
                                  </label>
                                  <input
                                    name="totalTaxCost"
                                    type="text"
                                    className="form-control form-control-sm numberInput"
                                    value={adminPriceTrimmer(
                                      this.state.customerOrder.totalTaxCost[
                                        this.state.customerOrder.currency.id - 1
                                      ],
                                      'price',
                                    )}
                                    onChange={this.onChangeInput}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-4 col-md-6 col-sm-12">
                              <div className="row">
                                <div className="col-6">
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
                              <div className="row mt-3">
                                <div className="col-12">
                                  <label>Delivery Address </label>
                                  <br />
                                  <Select
                                    name="deliveryAddress"
                                    options={this.state.allDeliveryAddresess}
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
                        </div>
                      </form>
                    </div>

                    <div className="form-group">
                      <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-6">
                          {' '}
                          <label className="mb-2">
                            Description <br />
                          </label>
                          <textarea
                            name="description"
                            rows="7"
                            cols="10"
                            type="text"
                            className="form-control form-control-sm numberInput"
                            value={this.state.customerOrder.description}
                            onChange={this.onChangeInput}
                          />
                        </div>
                        <div className="col-xl-9 col-lg-8">
                          <h4 className="card-header">
                            Publisher Orders Of This Order
                          </h4>
                          <div className="card-body p-0">
                            <div className="container-fluid">
                              <CustomTable
                                hasPagination={false}
                                records={
                                  this.state.customerOrder.publisherOrders
                                }
                                columnLabels={
                                  PUBLISHER_ORDERS_COLUMNS_LABELS_ARRAY
                                }
                                recordItemNames={
                                  PUBLISHER_ORDERS_RECORDE_ITEM_NAMES_ARRAY
                                }
                                onRecordClick={this.onPublisherOrderClick}
                              />
                            </div>
                          </div>{' '}
                        </div>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="offset-6 col-2">
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
           */}
            </div>

            {/* <div className="row mt-3">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
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
            </div> */}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}
export default withStyles(s)(CustomerOrderDetail);