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
                    <label className="mb-0">Customer Price : </label>
                    <input
                      name="customerPrice"
                      type="text"
                      className="form-control form-control-sm numberInput"
                      value={zeroTrimmer(
                        this.state.publisherOrder.customerPrice[0],
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
                    <label className="mr-1">Publisher Price : </label>
                    <input
                      name="publisherPrice"
                      type="text"
                      className="form-control form-control-sm numberInput"
                      value={zeroTrimmer(
                        this.state.publisherOrder.publisherPrice[0],
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
                      value={this.state.publisherOrder.cancelPrice[0]}
                      onChange={this.onChangeInput}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  {' '}
                  <div className="col-12">
                    {' '}
                    <label className="mr-2">Delivery Cost : &nbsp;</label>
                    <input
                      name="deliveryCost"
                      type="text"
                      className="form-control form-control-sm"
                      value={this.state.publisherOrder.deliveryCost[0]}
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
                      Start Date : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{' '}
                    </label>
                    <DatePicker
                      name="startDate"
                      selected={new Date(this.state.publisherOrder.startDate)}
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
                    <label className="mb-0">Customer Order Id : &nbsp;</label>
                    <span className={s.link} onClick={this.gotoCustomerOrder}>
                      <u>
                        <i>{this.state.publisherOrder.customerOrderId} </i>{' '}
                      </u>
                    </span>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <label className="mr-5">
                      Product Id : &nbsp;&nbsp;&nbsp;
                    </label>
                    <span className={s.link} onClick={this.gotoProduct}>
                      <u>
                        <i>{this.state.publisherOrder.productId}</i>
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
                      End Date : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      &nbsp; &nbsp; &nbsp; &nbsp;{' '}
                    </label>
                    <DatePicker
                      name="endDate"
                      selected={new Date(this.state.publisherOrder.endDate)}
                      onChange={date => this.handleDateChange(date, 'endDate')}
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
                      value={this.state.publisherOrder.paymentStatus}
                      onChange={so =>
                        this.handleSelectChange(so, 'paymentStatus')
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
                      onChange={so => this.handleSelectChange(so, 'starus')}
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-xl-6">
                    <label>Delivery Type</label>
                    <Select
                      name="deliveyType"
                      options={this.state.allDeliveryTypes}
                      value={this.state.publisherOrder.deliveryType}
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
                      value={this.state.publisherOrder.productionSubscription}
                      onChange={so =>
                        this.handleSelectChange(so, 'productionSubscription')
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
                      onChange={so => this.handleSelectChange(so, 'currency')}
                    />
                  </div>
                  <div className="col-xl-8 ">
                    <label>Address </label>
                    <br />
                    <Select
                      name="address"
                      options={this.state.allAddresses}
                      value={this.state.publisherOrder.address}
                      onChange={so => this.handleSelectChange(so, 'address')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className={`${s.paymentContainer} container pb-2 mb-3`}>
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
                  value={this.state.publisherOrder.publicationNote}
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
            <i className="fas fa-trash-alt" />&nbsp;&nbsp;Delete Order
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
</div>;
