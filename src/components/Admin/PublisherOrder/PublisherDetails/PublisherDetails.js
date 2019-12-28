import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PublisherDetails.css';
class PublisherDetails extends React.Component {
  render() {
    return (
      <div className={`col-sm ${s.subContainer}`}>
        <h5>Publisher Details</h5>
        <div className="row">
          <div className="col-6">
            <label>Name : </label>
          </div>
          <div className="col-6">
            {this.props.publisherOrder.OrderForPublisher.User.companyName}
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label>Contact Person : </label>
          </div>
          <div className="col-6">
            {this.props.publisherOrder.OrderForPublisher.User.contractName}
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label>Phone :</label>{' '}
          </div>
          <div className="col-6">
            {this.props.publisherOrder.OrderForPublisher.User.phoneNumber}
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label>Fax : </label>
          </div>
          <div className="col-6">
            {this.props.publisherOrder.OrderForPublisher.User.faxNumber}
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label>Email:</label>{' '}
          </div>
          <div className="col-6">
            {this.props.publisherOrder.OrderForPublisher.User.email}
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <label>Preferred Contact Method :</label>{' '}
          </div>
          <div className="col-6">
            {this.props.publisherOrder.OrderForPublisher.paymentMethod}
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label>Website:</label>{' '}
          </div>
          <div className="col-6">
            {this.props.publisherOrder.OrderForPublisher.User.homePage}
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(PublisherDetails);
