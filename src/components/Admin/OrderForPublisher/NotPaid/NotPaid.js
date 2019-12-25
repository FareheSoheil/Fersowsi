import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import dateTrimmer from '../../../../dateTrimmer';
import OrderForPublisherItem from '../../OrderForPublisher/OrderForPublisherItem';
import { PRICE_SIGNS } from '../../../../constants/constantData';
import s from './NotPaid.css';

class NotPaid extends React.Component {
  render() {
    let invoices, subOrders;
    if (this.props.preparedOrder.orders != undefined)
      subOrders = this.props.preparedOrder.orders.orders;
    if (subOrders != undefined && subOrders.length != 0)
      invoices = subOrders.map(
        (order, i) =>
          (invoices = (
            <OrderForPublisherItem
              order={order}
              currencyId={this.props.preparedOrder.User.Currency.id}
            />
          )),
      );
    else invoices = <div className={s.warning}>No Products Available</div>;
    return (
      <div className={`${s.container} container-fluid`}>
        <div className="row" style={{ margin: '1px 13px 1px 6px' }}>
          <div className="offset-xl-2 col-xl-7 offset-lg-3 col-lg-6 offset-md-2 col-md-7">
            <div className={`row ${s.publisher}`}>
              <div className="col-12">
                <h5>Publisher: {this.props.preparedOrder.User.companyName}</h5>
              </div>
            </div>
            <div className="row pt-1">
              <div className="col-5">
                <label>Contact Person: </label>
              </div>
              <div className="col-6">
                {' '}
                {this.props.preparedOrder.User.contractName}{' '}
              </div>
            </div>
            <div className="row pt-1">
              <div className="col-5">
                <label>Phone:</label>
              </div>
              <div className="col-6">
                {this.props.preparedOrder.User.phoneNumber}
              </div>
            </div>
            <div className="row pt-1">
              <div className="col-5">
                <label>Fax:</label>
              </div>
              <div className="col-6">
                {this.props.preparedOrder.User.faxNumber}{' '}
              </div>
            </div>
            <div className="row pt-1">
              <div className="col-5">
                <label>Email:</label>
              </div>
              <div className="col-6">{this.props.preparedOrder.User.email}</div>
            </div>
            <div className="row pt-1">
              <div className="col-5">
                <label>Prederred Contact Method: </label>
              </div>
              <div className="col-6">
                {this.props.preparedOrder.paymentMethod}{' '}
              </div>
            </div>
            <div className="row pt-1">
              <div className="col-5">
                <label>Currency: </label>
              </div>
              <div className="col-6">
                {this.props.preparedOrder.User.Currency.name}
              </div>
            </div>
            <div className="row pt-1">
              <div className="col-5">
                <label>Home Page: </label>{' '}
              </div>
              <div className="col-6">
                {this.props.preparedOrder.User.homePage}{' '}
              </div>
            </div>

            <div className="row pt-1">
              <div className="col-5">
                <label>Expected Payment Condtion:</label>{' '}
              </div>
              <div className="col-6">
                {dateTrimmer(this.props.preparedOrder.createdAt)}{' '}
              </div>
            </div>
            <div className="row pt-1">
              <div className="col-5">
                <label>Address :</label>{' '}
              </div>
              <div className="col-6">
                {this.props.preparedOrder.User.Country.name}{' '}
                {this.props.preparedOrder.User.address.province}{' '}
                {this.props.preparedOrder.User.address.city}{' '}
                {this.props.preparedOrder.User.address.detailAddress}{' '}
                {this.props.preparedOrder.User.address.zipCode}{' '}
              </div>
            </div>
            <div className="row pt-1">
              <div className="col-5">
                <label>Note:</label>
              </div>
              <div className="col-4">
                {this.props.preparedOrder.paymentMethod}
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="offset-xl-3 col-xl-3 offset-lg-3 col-lg-4 offset-md-2 col-md-5">
            <button onClick={this.props.onPrepare}>
              Prepare Publisher Order
            </button>
          </div>
        </div>
        <hr />
        <div id="invoices">{invoices}</div>
        <hr />
        <div className={`row ${s.total}`}>
          <div className="offset-1 col-xl-4 col-lg-4 col-md-5 col-sm-6 col-6 ">
            <button onClick={this.props.onPrepare}>
              Prepare Publisher Order
            </button>
          </div>
          <div className="offset-xl-8 offset-lg-5 offset-md-4 col-xl-4 col-lg-4 col-md-5 col-sm-6 col-6 ">
            <h5>Total Cost:</h5>
            <div>
              {
                this.props.preparedOrder.orders.totalInPrice[
                  this.props.preparedOrder.User.Currency.id - 1
                ]
              }{' '}
              {PRICE_SIGNS[this.props.preparedOrder.User.Currency.id]}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(NotPaid);
