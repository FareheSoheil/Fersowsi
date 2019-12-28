import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './InvoiceDetails.css';
import dateTrimmer from '../../../../dateTrimmer';
class InvoiceDetails extends React.Component {
  render() {
    return (
      <div className={`col-sm ${s.subContainer}`}>
        <h5>Invoice Details</h5>
        <div className="row">
          <div className="col-6">
            <label>Order No : </label>
          </div>
          <div className="col-6">{this.props.publisherOrder.id}</div>
        </div>
        <div className="row">
          <div className="col-6">
            <label>Invoice No : </label>
          </div>
          <div className="col-6">
            <u
              onClick={() =>
                this.props.goTo(
                  `/admin/customerInvoice/${
                    this.props.publisherOrder.CustomerInvoice.id
                  }`,
                )
              }
            >
              <i>{this.props.publisherOrder.CustomerInvoice.id}</i>
            </u>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label>Customer Code :</label>{' '}
          </div>
          <div className="col-6">
            <u
              onClick={() =>
                this.props.goTo(
                  `/admin/acoounts/${
                    this.props.publisherOrder.CustomerInvoice.User.id
                  }`,
                )
              }
            >
              <i> {this.props.publisherOrder.CustomerInvoice.User.id}</i>
            </u>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label>Customer Name :</label>{' '}
          </div>
          <div className="col-6">
            {this.props.publisherOrder.CustomerInvoice.User.userSubCategoryId !=
            1
              ? this.props.publisherOrder.CustomerInvoice.User.companyName
              : `${this.props.publisherOrder.CustomerInvoice.User.firstName} ${
                  this.props.publisherOrder.CustomerInvoice.User.lastName
                }`}
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label>Date : </label>
          </div>
          <div className="col-6">
            {dateTrimmer(this.props.publisherOrder.createdAt)}
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label>Last Date Payment:</label>{' '}
          </div>
          <div className="col-6">
            {dateTrimmer(this.props.publisherOrder.updatedAt)}
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(InvoiceDetails);
