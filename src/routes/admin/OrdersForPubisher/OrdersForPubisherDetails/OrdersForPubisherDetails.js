import React from 'react';
import jsPDF from 'jspdf';
import ReactDOM from 'react-dom/server';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import 'react-datepicker/dist/react-datepicker.css';
import PageHeader from '../../../../components/Admin/PageHeader';
import Spinner from '../../../../components/Admin/Spinner';
import Order from '../../../../components/Admin/OrderForPublisher/Order';
import {} from '../../../../constants/constantData';
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
      isLoading: false,
      id: this.props.context.params.id,
      isPrepare: false,
      sentOrder: {
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
        publisherOrders: [
          { a: 1, currencyId: 2, deliveryType: { id: 2, label: 'Air Mail' } },
          { a: 1, currencyId: 2, deliveryType: { id: 2, label: 'Air Mail' } },
          { a: 1, currencyId: 2, deliveryType: { id: 2, label: 'Air Mail' } },
          { a: 1, currencyId: 2, deliveryType: { id: 2, label: 'Air Mail' } },
          { a: 1, currencyId: 2, deliveryType: { id: 2, label: 'Air Mail' } },
        ],
      },
    };
    // this.fetchcustomerOrder = this.fetchcustomerOrder.bind(this);
    // this.fetchAllInfo = this.fetchAllInfo.bind(this);
    // this.onChangeInput = this.onChangeInput.bind(this);
    // this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onPrepare = this.onPrepare.bind(this);
    // this.onPublisherOrderClick = this.onPublisherOrderClick.bind(this);
  }
  onPrepare() {
    this.setState({
      isPrepare: true,
    });
  }

  render() {
    let invoices;
    const subOrders = this.state.sentOrder.publisherOrders;
    if (subOrders != undefined && subOrders.length != 0)
      invoices = subOrders.map(
        (order, i) => (invoices = <Order invoice={order} />),
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
            {/* <button onClick={() => this.print(<div>{invoices}</div>)}>
              print
            </button> */}
            {this.state.isPrepare ? (
              <div className={`${s.prepareContainer} container-fluid`}>
                <div className="row">
                  <div className="col-xl-8">
                    <h5>Payment Data</h5>
                    <div className="row">
                      <div className="col-sm">
                        <label>Amount</label>
                        <input />
                      </div>
                      <div className="col-sm">
                        <label>Amount</label>
                        <input />
                      </div>
                      <div className="col-sm">
                        <label>Amount</label>
                        <input />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4">
                    <div className="row mb-3">
                      <div className="col-6">
                        <h5>Publisher Order No</h5>
                        <br />
                        aaaaaaaaaa
                      </div>
                      <div className="col-6">
                        <h5> Publisher Order Date</h5>
                        <br />
                        aaaaaaaaaa
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <h5> Publisher Order Date</h5>
                        <br />
                        aaaaaaaaaa
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`${s.container} container-fluid`}>
                <div className="row" style={{ margin: '1px 13px 1px 6px' }}>
                  <div className="offset-xl-2 col-xl-7 offset-lg-3 col-lg-6 offset-md-2 col-md-7">
                    <div className={`row ${s.publisher}`}>
                      <div className="col-12">
                        <h5>Publisher:</h5>
                      </div>
                    </div>
                    <div className="row pt-1">
                      <div className="col-5">
                        <label>Contact Person:</label>
                      </div>
                      <div className="col-4">
                        {this.state.sentOrder.customerId}{' '}
                      </div>
                    </div>
                    <div className="row pt-1">
                      <div className="col-5">
                        <label>Phone: </label>
                      </div>
                      <div className="col-6">
                        {this.state.sentOrder.invoiceNo}
                      </div>
                    </div>
                    <div className="row pt-1">
                      <div className="col-5">
                        <label>Fax: </label>
                      </div>
                      <div className="col-6">
                        {this.state.sentOrder.invoiceNo}
                      </div>
                    </div>
                    <div className="row pt-1">
                      <div className="col-5">
                        <label>Email: </label>
                      </div>
                      <div className="col-6">
                        {this.state.sentOrder.invoiceNo}
                      </div>
                    </div>
                    <div className="row pt-1">
                      <div className="col-5">
                        <label>Prederred Contact Method: </label>
                      </div>
                      <div className="col-6">
                        {this.state.sentOrder.invoiceNo}
                      </div>
                    </div>
                    <div className="row pt-1">
                      <div className="col-5">
                        <label>Currency: </label>
                      </div>
                      <div className="col-6">
                        {this.state.sentOrder.invoiceNo}
                      </div>
                    </div>
                    <div className="row pt-1">
                      <div className="col-5">
                        <label>Home Page: </label>
                      </div>
                      <div className="col-6">
                        {this.state.sentOrder.invoiceNo}
                      </div>
                    </div>

                    <div className="row pt-1">
                      <div className="col-5">
                        <label>Expected Payment Condtion:</label>{' '}
                      </div>
                      <div className="col-6">
                        {this.state.sentOrder.createdAt}{' '}
                      </div>
                    </div>
                    <div className="row pt-1">
                      <div className="col-5">
                        <label>Address : </label>
                      </div>
                      <div className="col-6">
                        {this.state.sentOrder.status.label}{' '}
                      </div>
                    </div>
                    <div className="row pt-1">
                      <div className="col-5">
                        <label>Note:</label>
                      </div>
                      <div className="col-4">
                        {this.state.sentOrder.paymentMethod}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="offset-xl-3 col-xl-3 offset-lg-3 col-lg-4 offset-md-2 col-md-5">
                    <button onClick={this.onPrepare}>
                      Prepare Publisher Order
                    </button>
                  </div>
                </div>
                <hr />
                <div id="invoices">{invoices}</div>
                <hr />
                <div className={`row ${s.total}`}>
                  <div className="offset-1 col-xl-4 col-lg-4 col-md-5 col-sm-6 col-6 ">
                    <button onClick={this.onPrepare}>
                      Prepare Publisher Order
                    </button>
                  </div>
                  <div className="offset-xl-8 offset-lg-5 offset-md-4 col-xl-4 col-lg-4 col-md-5 col-sm-6 col-6 ">
                    <h5>Total Cost:</h5>
                    <div>
                      asldka'sd{' '}
                      {PRICE_SIGNS[this.state.sentOrder.currencyId - 1]}
                    </div>
                  </div>
                </div>
              </div>
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
