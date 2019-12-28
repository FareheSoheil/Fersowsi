import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DatePicker from 'react-datepicker';
import { toastr } from 'react-redux-toastr';
import { pdfMaker } from '../OrdersForPubisherPdfHelper';
import PageHeader from '../../../../components/Admin/PageHeader';
import Spinner from '../../../../components/Admin/Spinner';
import OrderForPublisherItem from '../../../../components/Admin/OrderForPublisher/OrderForPublisherItem';
import NotPaid from '../../../../components/Admin/OrderForPublisher/NotPaid';
import { SERVER } from '../../../../constants';
import { PRICE_SIGNS } from '../../../../constants/constantData';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import history from '../../../../history';
import adminPriceTrimmer from '../../../../adminPriceTrimmer';
import dateTrimmer from '../../../../dateTrimmer';
import s from './OrdersForPubisherDetails.css';

class OrdersForPubisherDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      id: this.props.context.params.id,
      isPrepare: false,

      preparedOrder: {
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
        currencyId: 3,
        currency: { value: 5, label: 'dollsr' }, //
        deliveryAddress: {
          value: 2662,
          label: 'alkjsdhaskjdnasdjkasndasjdlasnd',
        }, //
        orders: {
          orders: [],
          totalInPrice: '',
        },
      },
    };
    this.fetchOrderForPublisher = this.fetchOrderForPublisher.bind(this);
    this.findTitle = this.findTitle.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.onPrepare = this.onPrepare.bind(this);
    this.print = this.print.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSend = this.onSend.bind(this);
  }
  goTo(url) {
    history.push(url);
  }
  findTitle() {
    let titles = [];
    let res = ``;
    this.state.preparedOrder.orders.orders.forEach(order => {
      if (!titles.includes(order.Product.label))
        titles.push(order.Product.label);
    });
    titles.forEach(title => {
      res = res + ` ` + title;
    });
    return res;
  }
  onEdit() {
    console.log('details : ', this.state.preparedOrder);
    const url = `${SERVER}/editOrderForPublisher`;

    const credentials = {
      id: this.state.id,
      amount: this.state.preparedOrder.totalCost,
      paymentMethod: this.state.preparedOrder.paymentMethod,
      description: this.state.preparedOrder.description,
      paymentNote: this.state.preparedOrder.paymentNote,
      isActive: this.state.preparedOrder.isActive,
      paymentImage: this.state.preparedOrder.paymentImage,
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
        if (response.error == undefined)
          toastr.success('Order For Publisher', 'Changes Applied Successfully');
        else toastr.error('Order For Publisher', "Couldn'nt Apply Changes");
      },
      error => {
        toastr.error('Order For Publisher', "Couldn'nt Apply Changes");
      },
    );
  }
  onSend() {
    console.log('details : ', this.state.preparedOrder);
    const url = `${SERVER}/sendOrderForPublisherToPublisherMail`;
    const titles = this.findTitle();

    const credentials = {
      orderForPublisherId: this.state.id,
      text: this.state.preparedOrder.emailMsg,
      htmlContent: pdfMaker(this.state.preparedOrder, titles),
    };
    console.log('email : ', credentials);
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
        if (response.error == undefined)
          toastr.success('Order For Publisher', 'Email Sent');
        else toastr.error('Order For Publisher', "Couldn't Send Email");
      },
      error => {
        console.log(error);
        toastr.error('Order For Publisher', 'er');
      },
    );
  }
  componentDidMount() {
    this.fetchOrderForPublisher();
  }
  print() {
    let frog = window.open(
      '',
      'wildebeast',
      'width=800,height=700,scrollbars=1,resizable=1',
    );
    const titles = this.findTitle();
    frog.document.open();
    frog.document.write(pdfMaker(this.state.preparedOrder, titles));
    frog.document.close();
  }
  fetchOrderForPublisher() {
    const url = `${SERVER}/getOrderForPublisher`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      orderForPublisherId: this.state.id,
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
            preparedOrder: response.orderForPublisher,
            isLoading: false,
            // isDisabled:
            //   response.customerInvoice.InvoiceStatus.value ==
            //   CUSTOMER_ORDER_STATUS.Done.value
            //     ? true
            //     : false,
          },
          () => {
            console.log('order : ', response.orderForPublisher);
          },
        );
      },
      error => {
        console.log(error);
      },
    );
  }
  onPrepare() {
    window.alert('hi');
    let pres = { ...this.state.preparedOrder };
    pres.isPaid = true;
    this.setState({
      preparedOrder: pres,
    });
  }
  onInputChange(e) {
    const value = e.target.value;
    const state = e.target.name;
    console.log(state);
    let pres = this.state.preparedOrder;
    pres[state] = value;
    this.setState({
      preparedOrder: pres,
    });
  }
  onDateChange(se) {
    console.log(se);
    let pres = this.state.preparedOrder;
    pres.createdAt = se;
    this.setState({
      preparedOrder: pres,
    });
  }
  uploadImage() {
    let inp = document.getElementById('imageUploader');
    let imgContainer = document.getElementById('paymentImg');
    let reader = new FileReader();
    let that = this;
    if (inp.files && inp.files[0]) {
      reader.onload = function(e) {
        imgContainer.src = e.target.result;
        let pres = { ...that.state.preparedOrder };
        pres.paymentImage = e.target.result;
        that.setState({
          preparedOrder: pres,
        });
      };
      let imgt = reader.readAsDataURL(inp.files[0]);
    }
  }
  changeStatus(e) {
    let pres = { ...this.state.preparedOrder };
    pres[e.target.name] = e.target.value == 'true';
    console.log('pres : ', pres);
    this.setState({
      preparedOrder: pres,
    });
  }
  render() {
    let invoices, subOrders;
    if (this.state.preparedOrder.orders != undefined)
      subOrders = this.state.preparedOrder.orders.orders;
    if (subOrders != undefined && subOrders.length != 0)
      invoices = subOrders.map(
        (order, i) =>
          (invoices = (
            <OrderForPublisherItem
              goTo={this.goTo}
              order={order}
              currencyId={this.state.preparedOrder.User.Currency.id}
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
                  link: '/admin/ordersForPublisher',
                  label: 'Orders For Publishers',
                },
                { link: '', label: 'Sent Publishers Orders' },
              ]}
            />

            {this.state.preparedOrder.isPaid ? (
              <div className={`${s.prepareContainer} container-fluid`}>
                <div className="container-fluid">
                  <div className="row mb-3">
                    <div className={`col-xl-8 mr-3 ${s.editableDataContainer}`}>
                      <h5 className="mb-2 pl-2">Payment Data</h5>
                      <div className="row pl-2">
                        <div className="col-sm">
                          <label>
                            Amount:{' '}
                            <input
                              value={this.state.preparedOrder.totalCost}
                              name="totalCost"
                              onChange={this.onInputChange}
                            />
                            &nbsp;
                            {
                              PRICE_SIGNS[
                                this.state.preparedOrder.User.currencyId
                              ]
                            }
                          </label>
                        </div>
                        <div className="col-sm">
                          <label>
                            Date{' '}
                            <DatePicker
                              name="createdAt"
                              onChange={this.onDateChange}
                              selected={
                                new Date(this.state.preparedOrder.createdAt)
                              }
                            />
                          </label>
                        </div>
                        <div className="col-sm">
                          <label>
                            Method{' '}
                            <input
                              onChange={this.onInputChange}
                              name="paymentMethod"
                              value={this.state.preparedOrder.paymentMethod}
                            />
                          </label>
                        </div>
                      </div>
                      <div className="row pl-2 pr-1">
                        <div className="col-12">
                          <label>Information :</label> <br />
                          <textarea
                            rows="6"
                            onChange={this.onInputChange}
                            value={this.state.preparedOrder.description}
                            name="description"
                          />
                        </div>
                      </div>
                      <h5 className="mt-1 mb-2 pl-2">File Upload</h5>
                      <div className="row pl-2 pr-1 pb-1">
                        <div className="col-6">
                          <input
                            type="file"
                            id="imageUploader"
                            className={s.imageUploader}
                            onChange={this.uploadImage}
                          />
                          <br />

                          <img
                            style={{
                              maxWidth: '180px',
                              border: '1px solid black',
                            }}
                            id="paymentImg"
                            src={
                              this.state.preparedOrder.paymentImage == ''
                                ? 'http://placehold.it/180'
                                : this.state.preparedOrder.paymentImage
                            }
                            alt="payment image"
                          />
                        </div>
                        <div className="col-6">
                          <label>Payment Note </label>
                          <textarea
                            onChange={this.onInputChange}
                            name="paymentNote"
                            rows="6"
                            value={this.state.preparedOrder.paymentNote}
                          />
                        </div>
                      </div>
                      <h5 className="mt-1 mb-2 pl-2">
                        Mailing Publisher Order
                      </h5>
                      <div className="row pl-2 pr-1 pb-1">
                        <div className="col-12">
                          <label>Message</label>
                          <textarea
                            onChange={this.onInputChange}
                            name="emailMsg"
                            rows="8"
                            value={this.state.emailMsg}
                          />
                        </div>
                        <div className="offset-5 col-3">
                          <button onClick={this.onSend}>Send</button>{' '}
                        </div>
                      </div>
                      <h5 className="mt-1 mb-2 pl-2">status</h5>
                      <div className="row pl-2 pr-1 pb-1">
                        <div className="col-3">
                          <label className="custom-color-theme custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              name="isActive"
                              className="custom-control-input"
                              value={this.state.preparedOrder.isActive}
                              onChange={this.changeStatus}
                              checked={this.state.preparedOrder.isActive}
                            />
                            <span className="custom-control-label">Active</span>
                          </label>
                        </div>
                        <div className="col-3">
                          <label className="custom-color-theme custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              name="isActive"
                              className="custom-control-input"
                              value={!this.state.preparedOrder.isActive}
                              onChange={this.changeStatus}
                              checked={!this.state.preparedOrder.isActive}
                            />
                            <span className="custom-control-label">
                              Cancelled
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="row pl-2 pr-1 pb-1">
                        <div className="col-3">
                          <label className="custom-color-theme custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              name="isPaid"
                              className="custom-control-input"
                              value={this.state.preparedOrder.isPaid}
                              onChange={this.changeStatus}
                              checked={this.state.preparedOrder.isPaid}
                            />
                            <span className="custom-control-label">Paid</span>
                          </label>
                        </div>
                        <div className="col-3">
                          <label className="custom-color-theme custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              name="isPaid"
                              className="custom-control-input"
                              value={!this.state.preparedOrder.isPaid}
                              onChange={this.changeStatus}
                              checked={!this.state.preparedOrder.isPaid}
                            />
                            <span className="custom-control-label">
                              Not Paid
                            </span>
                          </label>
                        </div>
                      </div>
                      <hr />
                      <div className="row mb-2">
                        <div className="offset-4 col-3">
                          <button onClick={this.onEdit}>Apply Changes</button>
                        </div>
                        <div className=" col-3">
                          <button onClick={this.print}>Print Page</button>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3">
                      <div className="row mb-3">
                        <table className={s.orderTable}>
                          <thead>
                            <th>Publisher Order NO</th>
                            <th>Publisher Order Date</th>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{this.state.preparedOrder.id}</td>
                              <td>
                                {dateTrimmer(
                                  this.state.preparedOrder.createdAt,
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="row">
                        <table className={s.publisherTable}>
                          <thead>
                            <th>Publisher</th>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                {this.findTitle()}
                                <br />
                                <b>Attn: </b>
                                {this.state.preparedOrder.User.companyName}
                                <br />
                                {this.state.preparedOrder.User.hompage}
                                <br />
                                {
                                  this.state.preparedOrder.User.Country.name
                                }{' '}
                                {this.state.preparedOrder.User.address.province}{' '}
                                {this.state.preparedOrder.User.address.city}{' '}
                                {
                                  this.state.preparedOrder.User.address
                                    .detailAddress
                                }{' '}
                                {this.state.preparedOrder.User.address.zipCode}{' '}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div>{invoices}</div>
                  <hr />
                  <div className={`row ${s.total}`}>
                    <div className="offset-xl-8 offset-lg-5 offset-md-4 col-xl-4 col-lg-4 col-md-5 col-sm-6 col-6 ">
                      <h5>Total Cost:</h5>
                      <div>
                        {
                          this.state.preparedOrder.orders.totalInPrice[
                            this.state.preparedOrder.User.Currency.id - 1
                          ]
                        }{' '}
                        {PRICE_SIGNS[this.state.preparedOrder.User.Currency.id]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <NotPaid
                preparedOrder={this.state.preparedOrder}
                onPrepare={this.onPrepare}
              />
            )}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default withStyles(s)(OrdersForPubisherDetails);
