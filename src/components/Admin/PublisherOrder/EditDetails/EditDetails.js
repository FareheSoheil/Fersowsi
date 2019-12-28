import React from 'react';
import Select from 'react-select';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditDetails.css';
import DatePicker from 'react-datepicker';

import dateTrimmer from '../../../../dateTrimmer';
import { PRICE_SIGNS } from '../../../../constants/constantData';

class EditDetails extends React.Component {
  render() {
    return (
      <div className={`${s.container} container-fluid`}>
        {/* Reciever Details */}

        <div className={`row `} style={{ padding: '10px' }}>
          <div className={`col-sm-3 ${s.editSubContainer}`}>
            <h5>Reciever</h5>
            <div className="row  mt-2">
              <div className="col-5">
                <label>Name : </label>
              </div>
              <div className="col-6">
                <input
                  name="recieptName"
                  onChange={this.props.onRecieverInputChange}
                  value={this.props.publisherOrder.recieptName}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-5">
                <label>C/O : </label>
              </div>
              <div className="col-6">
                <input
                  onChange={this.props.onRecieverInputChange}
                  name="contactPerson"
                  value={this.props.publisherOrder.contactPerson}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-5">
                <label>Address :</label>{' '}
              </div>
              <div className="col-6">
                <input
                  onChange={this.props.onRecieverInputChange}
                  name="detailAddress"
                  value={this.props.publisherOrder.address.detailAddress}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-5">
                <label>City :</label>{' '}
              </div>
              <div className="col-6">
                <input
                  onChange={this.props.onRecieverInputChange}
                  name="city"
                  value={this.props.publisherOrder.address.city}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-5">
                <label>Zip Code : </label>
              </div>
              <div className="col-6">
                <input
                  onChange={this.props.onRecieverInputChange}
                  name="zipCode"
                  value={this.props.publisherOrder.address.zipCode}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-5">
                <label>State:</label>{' '}
              </div>
              <div className="col-6">
                <input
                  onChange={this.props.onRecieverInputChange}
                  name="province"
                  value={this.props.publisherOrder.address.province}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-5">
                <label>Country : </label>
              </div>
              <div className="col-7">
                <Select
                  name="Country"
                  options={this.props.allCountries}
                  value={this.props.publisherOrder.address.Country}
                  onChange={so => this.props.handleSelectChange(so, 'Country')}
                />
              </div>
            </div>
          </div>
          <div className={`col-sm-4 ${s.editSubContainer}`}>
            <h5>Order Details</h5>
            <div className="row ">
              <div className="col-6">
                <label>Our Order No : </label>
              </div>
              <div className="col-6">{this.props.publisherOrder.id}</div>
            </div>
            <div className="row mt-1">
              <div className="col-6">
                <label>User Order No : </label>
              </div>
              <div className="col-6">
                <input
                  name="userOrderNo"
                  onChange={this.props.onOrderInputChange}
                  value={this.props.publisherOrder.userOrderNo}
                />
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-6">
                <label># of Copies: </label>
              </div>
              <div className="col-6">
                <input
                  onChange={this.props.onOrderInputChange}
                  name="count"
                  value={this.props.publisherOrder.count}
                />
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-6">
                <label>Terms of Delivery : </label>
              </div>
              <div className="col-5">
                <Select
                  name="deliveryType"
                  options={this.props.allDeliveryTypes}
                  value={this.props.publisherOrder.deliveryType}
                  onChange={so =>
                    this.props.handleSelectChange(so, 'deliveryType')
                  }
                />
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-6">
                <label>Start Date:</label>{' '}
              </div>
              <div className="col-6">
                <DatePicker
                  name="startDate"
                  selected={new Date(this.props.publisherOrder.startDate)}
                  onChange={date =>
                    this.props.handleDateChange(date, 'startDate')
                  }
                />
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-6">
                <label>End Date:</label>{' '}
              </div>
              <div className="col-6">
                <DatePicker
                  name="endtDate"
                  selected={new Date(this.props.publisherOrder.endDate)}
                  onChange={date =>
                    this.props.handleDateChange(date, 'endDate')
                  }
                />
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-6">
                <label>Price:</label>{' '}
              </div>
              <div className="col-6">
                <input
                  onChange={this.props.onOrderInputChange}
                  name="price"
                  value={
                    this.props.publisherOrder.price[
                      this.props.publisherOrder.currencyId - 1
                    ]
                  }
                />
                {` ${PRICE_SIGNS[this.props.publisherOrder.currencyId]}`}
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-6">
                <label>Postal Cost:</label>{' '}
              </div>
              <div className="col-6">
                <input
                  onChange={this.props.onOrderInputChange}
                  name="totalDeliveryCost"
                  value={
                    this.props.publisherOrder.totalDeliveryCost[
                      this.props.publisherOrder.currencyId - 1
                    ]
                  }
                />
                {` ${PRICE_SIGNS[this.props.publisherOrder.currencyId]}`}
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-6">
                <label>Tax:</label>{' '}
              </div>
              <div className="col-6">
                <input
                  onChange={this.props.onOrderInputChange}
                  name="tax"
                  value={
                    this.props.publisherOrder.tax[
                      this.props.publisherOrder.currencyId - 1
                    ]
                  }
                />
                {` ${PRICE_SIGNS[this.props.publisherOrder.currencyId]}`}
              </div>
            </div>
          </div>
          <div className={`col-sm-4 ${s.subContainer}`}>
            {/* <div className="row"> */}
            <h5 className="col-12">Publisher Order</h5>
            {/* </div> */}

            <div className="row mt-1 mb-1 ">
              <div className="col-6">
                <label>Payment Ammount : </label>
              </div>
              <div className="col-6">
                <input
                  value={this.props.publisherOrder.OrderForPublisher.totalPrice}
                  name="totalPrice"
                  onChange={this.props.onOrderForPublisherChange}
                />{' '}
                {PRICE_SIGNS[this.props.publisherOrder.currencyId - 1]}
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label>Date of Order :</label>{' '}
              </div>
              <div className="col-6">
                <DatePicker
                  name="createdAt"
                  selected={
                    new Date(
                      this.props.publisherOrder.OrderForPublisher.createdAt,
                    )
                  }
                  onChange={date =>
                    this.props.handleDateChange(date, 'createdAt')
                  }
                />

                {/* {this.props.publisherOrder.customerCode} */}
              </div>
            </div>
            <div className="row mt-1 mb-1">
              <div className="col-6">
                <label>Payment Method: </label>
              </div>
              <div className="col-6">
                <input
                  value={
                    this.props.publisherOrder.OrderForPublisher.paymentMethod
                  }
                  onChange={this.props.onOrderForPublisherChange}
                  name="paymentMethod"
                />
              </div>
            </div>
            <div className="row mb-2  ">
              <div className="col-6">
                <label>Status:</label>{' '}
              </div>
              <div className="col-6">
                <Select
                  name="isActive"
                  options={[
                    { value: 0, label: 'Cancelled' },
                    { value: 1, label: 'Active' },
                  ]}
                  value={
                    this.props.publisherOrder.isActive == 0
                      ? { value: 0, label: 'Cancelled' }
                      : { value: 1, label: 'Active' }
                  }
                  onChange={so => {
                    this.props.handleSelectChange(so, 'isActive');
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`row `} style={{ padding: '10px' }}>
          <div className={`col-sm-11 ${s.subContainer}`}>
            <h5>Upload File </h5>
            <div className="row pb-3">
              <div className="col-4">
                <input
                  type="file"
                  id="imageUploader"
                  className={s.imageUploader}
                  onChange={this.props.uploadImage}
                />
              </div>
              <div className="col-4">
                <img
                  style={{ maxWidth: '180px', border: '1px solid black' }}
                  id="paymentImg"
                  src={
                    this.props.publisherOrder.paymentImage == ''
                      ? 'http://placehold.it/180'
                      : this.props.publisherOrder.paymentImage
                  }
                  alt="your image"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-2" style={{ padding: '10px' }}>
          <div className={`col-sm-4 ${s.subContainer2}`}>
            <h5>Administrator Note About the Invoice</h5>
            {/* <div className="row"> */}
            <div className="col-12">
              <textarea
                name="paymentNote"
                onChange={this.props.onOrderInputChange}
                value={this.props.publisherOrder.paymentNote}
                rows="6"
              />
            </div>
            {/* </div> */}
          </div>
          <div
            className={`col-sm-7 ${s.subContainer2}`}
            style={{ width: '100%' }}
          >
            <h5>Note to Publisher</h5>
            {/* <div className="row"> */}
            <div className="col-12">
              <textarea
                onChange={this.props.onOrderInputChange}
                name="publicationNote"
                value={this.props.publisherOrder.publicationNote}
                rows="6"
              />
            </div>
            {/* </div> */}
          </div>
        </div>
        <div className={`row `} style={{ padding: '10px' }}>
          <div className={`col-sm-11 ${s.subContainer}`}>
            <h5>Comment </h5>
            <div className="col-12">
              <textarea
                name="desc"
                onChange={this.props.onOrderInputChange}
                value={this.props.publisherOrder.desc}
                rows="3"
              />
            </div>
          </div>
        </div>
        <div
          className={`row `}
          style={{ padding: '10px', textAlign: 'center' }}
        >
          <div className="offset-xl-6 offset-lg-5 offset-md-4 offset-3 col-1">
            <button onClick={this.props.save}> Save</button>
          </div>
          <div className="col-2">
            <button onClick={this.props.back}>Back to Order</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(EditDetails);
