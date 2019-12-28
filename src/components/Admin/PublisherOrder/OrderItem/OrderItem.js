import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './OrderItem.css';
import dateTrimmer from '../../../../dateTrimmer';
import adminPriceTrimmer from '../../../../adminPriceTrimmer';
import { PRICE_SIGNS } from '../../../../constants/constantData';
class OrderItem extends React.Component {
  render() {
    return (
      <div className={`row mt-3 ${s.mainContainer}`}>
        <h5 className={`col-12 ${s.title}`}>
          {' '}
          Publication Title :{this.props.publisherOrder.Product.label}{' '}
        </h5>
        <div className={`col-xl-3 col-lg-5 col-md-6 ${s.reciever}`}>
          <b>Reciever : </b> <br />
          {this.props.publisherOrder.recieptName}
          {' , '}
          {this.props.publisherOrder.contactPerson}
          {' , '}
          {this.props.publisherOrder.address.city}
          {' , '}
          {this.props.publisherOrder.address.detailAddress}
          {' , '}
          {this.props.publisherOrder.address.zipCode}
          {' , '}
          {this.props.publisherOrder.address.countryId}
          {' , '}
        </div>
        <div className="col-xl-4 col-lg-5 col-md-6 ">
          <div>
            <label>Order No: &nbsp;</label>
            {this.props.publisherOrder.id}
          </div>
          <div>
            <label>User Order No: &nbsp;</label>
            {this.props.publisherOrder.CustomerInvoice.id}
          </div>
          <div>
            <label>Number Of Copies: &nbsp;</label>
            {this.props.publisherOrder.count}
          </div>
          <div>
            <label>Terms Of Delivery No:&nbsp;</label>
            {this.props.publisherOrder.deliveryType.label}
          </div>
          <div>
            <label>Start Date : &nbsp;</label>
            {dateTrimmer(this.props.publisherOrder.startDate)}
          </div>
          <div>
            <label>Enda Date :&nbsp; </label>
            {dateTrimmer(this.props.publisherOrder.endDate)}
          </div>
        </div>
        <div className="col-xl-4 col-lg-5 col-md-6 ">
          <div>
            <label>Price: &nbsp;</label>
            {
              this.props.publisherOrder.price[
                this.props.publisherOrder.currencyId - 1
              ]
            }{' '}
            {PRICE_SIGNS[this.props.publisherOrder.currencyId]}
          </div>
          <div>
            <label>Mail Cost: &nbsp;</label>
            {adminPriceTrimmer(
              this.props.publisherOrder.totalDeliveryCost[
                this.props.publisherOrder.currencyId - 1
              ],
            )}{' '}
            {PRICE_SIGNS[this.props.publisherOrder.currencyId]}
          </div>
          <div>
            <label>Tax: &nbsp;</label>
            {adminPriceTrimmer(
              this.props.publisherOrder.tax[
                this.props.publisherOrder.currencyId - 1
              ],
              'price',
            )}{' '}
            {PRICE_SIGNS[this.props.publisherOrder.currencyId]}
          </div>
          <div>
            <label>Discount: &nbsp;</label>
            {adminPriceTrimmer(
              this.props.publisherOrder.discount[
                this.props.publisherOrder.currencyId - 1
              ],
              'price',
            )}{' '}
            {PRICE_SIGNS[this.props.publisherOrder.currencyId]}
          </div>
          <div>
            <label>To be Paid: &nbsp;</label>
            {adminPriceTrimmer(
              this.props.publisherOrder.totalToBePaid[
                this.props.publisherOrder.currencyId - 1
              ],
              'price',
            )}{' '}
            {PRICE_SIGNS[this.props.publisherOrder.currencyId]}
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(OrderItem);
