import React from 'react';
import Select from 'react-select';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PageHeader from '../../../../components/Admin/PageHeader';
import Spinner from '../../../../components/Admin/Spinner';
import { PAYMENT_STATUS_ARRAY } from '../../../../constants/constantData';
import { SERVER } from '../../../../constants';
import { PRICE_SIGNS } from '../../../../constants/constantData';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import history from '../../../../history';
import zeroTrimmer from '../../../../zeroTrimmer';
import adminPriceTrimmer from '../../../../adminPriceTrimmer';
import dateTrimmer from '../../../../dateTrimmer';
import s from './PublisherOrderDetail.css';
class PublisherOrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      id: this.props.context.params.id,
      publisherOrder: {
        id: 22012,
        count: 3,
        startDate: '',
        endDate: '2011-12-31 00:00:00',
        deliveryType: { value: 2, label: 'Air Mail' },
        status: { value: 1, label: 'Wait For Admin Response ' },
        paymentStatus: { value: 2, label: 'half Paid ' },
        productPeriod: { value: 1, label: 'Daily' },
        productionSubscription: { value: 3, label: '6-Monthly' },
        currency: { value: 5, label: 'Euro' },
        address: { value: 2662, label: 'alkjsdhaskjdnasdjkasndasjdlasnd' },
        totalCost: 476.0,
        deliveryCost: 539.0,
        customerPrice: 600.0,
        cancelPrice: 0.0,
        publisherPrice: 600.0,
        tax: 0.0,
        discount: 0.0,
        paymentImage: '',
        publicationNote: '',
        paymentNote: '',
        createdAt: '2011-03-01 12:17:40',
        updatedAt: '2019-10-16 01:56:52',
        customerOrderId: 10001,
        productId: 6004,
      },
      claim: false,
      orderSent: false,
      cancel: false,
      editOrder: false,
      editNote1: false,
      editNote2: false,
      editNote3: false,
      editDate: false,
      editPaymentAmount: false,
      editPaymentMethod: false,
      editStatus: false,
      allPeriods: '', //
      allAddresses: '', //
      allSubscriptions: '',
      allDeliveryTypes: '', //
      allCurrencies: '', //
    };
    this.fetchpublisherOrder = this.fetchpublisherOrder.bind(this);
    this.fetchAllInfo = this.fetchAllInfo.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.gotoCustomerOrder = this.gotoCustomerOrder.bind(this);
    this.gotoProduct = this.gotoProduct.bind(this);
    this.onClaim = this.onClaim.bind(this);
    this.onSent = this.onSent.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.back = this.back.bind(this);
  }
  printClaim() {}
  gotoProduct(id) {
    history.push(`/admin/products/${this.state.publisherOrder.productId}`);
  }
  gotoCustomerOrder() {
    history.push(
      `/admin/customerOrder/${this.state.publisherOrder.customerOrderId}`,
    );
  }
  uploadImage() {
    let inp = document.getElementById('imageUploader');
    if (inp.files && inp.files[0]) {
      var reader = new FileReader();
      const that = this;
      reader.onload = function(e) {
        let img = document.getElementById('imgHolder');
        img.src = e.target.result;
        let publisherOrder = { ...that.state.publisherOrder };
        publisherOrder.paymentImage = e.target.result;
        that.setState({
          publisherOrder: publisherOrder,
        });
      };

      reader.readAsDataURL(inp.files[0]);
    }
  }
  componentDidMount() {
    this.fetchAllInfo();
    this.fetchpublisherOrder();
  }
  fetchpublisherOrder() {
    const url = `${SERVER}/getPublisherOrder`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      publisherOrderId: this.state.id,
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
        that.setState({
          publisherOrder: response,
          isLoading: false,
        });
      },
      error => {
        console.log(error);
      },
    );
  }
  fetchAllInfo() {
    const url = `${SERVER}/getAllAuxInfoForOnePulisherOrder`;
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
        // const  thatThat = that;
        that.setState({
          allPeriods: response.ProductPeriod,
          allCurrencies: response.Currency,
          allSubscriptions: response.ProductSubscriptionType,
          allDeliveryTypes: response.DeliveryType,
          allAddresses: response.Address,
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
    let publisherOrder = { ...this.state.publisherOrder };
    publisherOrder[state] = value;
    this.setState({ publisherOrder });
  }
  handleDateChange(date, stateName) {
    let publisherOrder = { ...this.state.publisherOrder };
    publisherOrder[stateName] = date;
    this.setState({ publisherOrder });
  }
  handleSelectChange = (selectedOption, op) => {
    let publisherOrder = { ...this.state.publisherOrder };
    publisherOrder[op] = selectedOption;
    this.setState({ publisherOrder });
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
  back() {
    this.setState(
      {
        claim: false,
        orderSent: false,
        cancel: false,
        editNote1: false,
        editNote2: false,
        editNote3: false,
        editPaymentAmount: false,
        editPaymentMethod: false,
        editDate: false,
        editStatus: false,
        editOrder: false,
      },
      () => {
        window.scrollTo(0, 0);
      },
    );
  }
  onClaim() {
    this.setState(
      {
        claim: true,
        orderSent: false,
        cancel: false,
        editNote1: true,
        editNote2: true,
        editNote3: true,
        editPaymentAmount: true,
        editPaymentMethod: true,
        editDate: true,
        editStatus: false,
        editOrder: false,
      },
      () => {
        window.scrollTo(0, 0);
      },
    );
  }
  onSent() {
    this.setState(
      {
        claim: false,
        orderSent: true,
        cancel: false,
        editNote1: false,
        editNote2: true,
        editNote3: true,
        editPaymentAmount: true,
        editPaymentMethod: true,
        editDate: true,
        editStatus: false,
        editOrder: false,
      },
      () => {
        window.scrollTo(0, 0);
      },
    );
  }
  onCancel() {
    this.setState(
      {
        claim: false,
        orderSent: false,
        cancel: true,
        editNote1: false,
        editNote2: false,
        editNote3: true,
        editPaymentAmount: false,
        editPaymentMethod: false,
        editDate: false,
        editStatus: true,
        editOrder: false,
      },
      () => {
        window.scrollTo(0, 0);
      },
    );
  }
  onEdit() {
    this.setState(
      {
        editOrder: true,
        editNote1: false,
        editNote2: false,
        editNote3: false,
        editPaymentAmount: false,
        editPaymentMethod: false,
        editDate: false,
        editStatus: false,
      },
      () => {
        window.scrollTo(0, 0);
      },
    );
  }
  onPrintClaim(title) {
    let frog = window.open(
      '',
      'wildebeast',
      'width=500,height=600,scrollbars=1,resizable=1',
    );
    let printable = document.getElementById('printClaim');
    // .cloneNode(true);
    printable.querySelector('#title').innerHTML = title;
    printable.style.display = 'block';
    frog.document.open();
    frog.document.write(printable.outerHTML);
    frog.document.close();

    console.log('printable', printable);
  }
  render() {
    return (
      <div className="dashboard-ecommerce">
        {!this.state.isLoading && this.state.publisherOrder.startDate !== '' ? (
          <div className={` container-fluid dashboard-content`}>
            <PageHeader
              title="Publisher Order Details"
              breadCrumbs={[
                {
                  link: '/admin/ordersForPublisher',
                  label: 'Publisher Orders List',
                },
                { link: '', label: 'Publisher Orders Detail' },
              ]}
            />
            <div
              id="printClaim"
              style={{
                backgroundColor: 'white',
                padding: '3px',
              }}
            >
              {/* <table>
               <tbody>
                 <tr>
                   <td><img src="/assets/images/printLogo.png" /></td>
                 </tr>
               </tbody>
             </table> */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  marginRight: '-15px',
                  marginLeft: '-15px',
                  paddingRight: '6px',
                }}
              >
                <div className="col-3">
                  <img src="/assets/images/printLogo.png" />
                </div>
                <div
                  style={{
                    marginLeft: '40.666667%',
                    flex: '0 0 33.333333%',
                    maxWidth: '220px',
                  }}
                >
                  <h4>Claim</h4>
                  <table>
                    <thead style={{ backgroundColor: 'lightGray' }}>
                      <th id="title" width="80">
                        Publisher No
                      </th>
                      <th width="50">Order No</th>
                      <th width="50">Date</th>
                    </thead>
                    <tbody>
                      <td>1</td>
                      <td>2</td>
                      <td>{dateTrimmer(new Date())}</td>
                    </tbody>
                  </table>
                </div>
              </div>

              <h2 style={{ fontSize: '20px', textAlign: 'center' }}>Claim</h2>
              <div
                style={{
                  border: '1px solid #4fb9ae',
                  borderRadius: '3px',
                  margin: '6px',
                  marginLeft: '0px',
                  marginTop: '1rem!important',
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
              >
                <h5
                  style={{
                    backgroundColor: '#4fb9ae',
                    marginBottom: '0px',
                    marginTop: '0px',
                    flex: '0 0 100%',
                    maxWidth: '100%',
                    padding: '5px',
                    fontSize: '15px',
                  }}
                >
                  {' '}
                  Order Information :{' '}
                </h5>
                <div
                  // className={`col-xl-7 col-lg-5 col-md-6 `}
                  style={{
                    flex: '0 0 41.666667%',
                    maxWidth: '41.666667%',
                    borderRight: '1px solid #366e73',
                    paddingLeft: '5px',
                  }}
                >
                  <b>Subscriber Address: </b> <br />
                  {this.state.publisherOrder.reciever}
                </div>
                <div
                  style={{
                    paddingLeft: '5px',
                  }}
                >
                  <div>
                    <label>Publication Title: &nbsp;</label>
                    {this.state.publisherOrder.title}
                  </div>
                  <div>
                    <label>Our Order No: &nbsp;</label>
                    {this.state.publisherOrder.orderNo}
                  </div>

                  <div>
                    <label>Number Of Copies: &nbsp;</label>
                    {this.state.publisherOrder.count}
                  </div>
                  <div>
                    <label>Terms Of Delivery No:&nbsp;</label>
                    {/* {this.state.publisherOrder.deliveryType.label} */}
                  </div>
                  <div>
                    <label>Start Date : &nbsp;</label>
                    {dateTrimmer(this.state.publisherOrder.startDate)}
                  </div>
                  <div>
                    <label>Enda Date :&nbsp; </label>
                    {dateTrimmer(this.state.publisherOrder.endDate)}
                  </div>
                </div>
              </div>

              <div
                style={{
                  border: '1px solid #4fb9ae',
                  borderRadius: '3px',
                  margin: '6px',
                  marginLeft: '0px',
                  marginTop: '6px!important',
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
              >
                <h5
                  style={{
                    backgroundColor: '#4fb9ae',
                    marginBottom: '0px',
                    marginTop: '0px',
                    flex: '0 0 100%',
                    maxWidth: '100%',
                    padding: '5px',
                    fontSize: '15px',
                  }}
                >
                  {' '}
                  Payment Information :{' '}
                </h5>

                <div style={{ paddingLeft: '5px' }}>
                  <div>
                    <label>Amount: &nbsp;</label>
                    {this.state.publisherOrder.title}
                    {PRICE_SIGNS[this.state.publisherOrder.currencyId - 1]}
                  </div>
                  <div>
                    <label>Date: &nbsp;</label>
                    {this.state.publisherOrder.orderNo}
                  </div>

                  <div>
                    <label>Method: &nbsp;</label>
                    {this.state.publisherOrder.count}
                  </div>
                </div>
              </div>
            </div>

            {this.state.editOrder ? (
              <div className={`${s.container} container-fluid`}>
                <div className={`row `} style={{ padding: '10px' }}>
                  <div className={`col-sm-4 ${s.editSubContainer}`}>
                    <h5>Reciever</h5>
                    <div className="row  mt-2">
                      <div className="col-5">
                        <label>Name : </label>
                      </div>
                      <div className="col-6">
                        <input value={this.state.publisherOrder.orderNo} />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-5">
                        <label>C/O : </label>
                      </div>
                      <div className="col-6">
                        <input value={this.state.publisherOrder.orderNo} />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-5">
                        <label>Address :</label>{' '}
                      </div>
                      <div className="col-6">
                        <input value={this.state.publisherOrder.customerCode} />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-5">
                        <label>City :</label>{' '}
                      </div>
                      <div className="col-6">
                        <input value={this.state.publisherOrder.orderNo} />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-5">
                        <label>Zip Code : </label>
                      </div>
                      <div className="col-6">
                        <input value={this.state.publisherOrder.orderNo} />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-5">
                        <label>State:</label>{' '}
                      </div>
                      <div className="col-6">
                        <input value={this.state.publisherOrder.orderNo} />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-5">
                        <label>Country : </label>
                      </div>
                      <div className="col-5">
                        <Select
                          name="paymentStatus"
                          options={PAYMENT_STATUS_ARRAY}
                          value={this.state.publisherOrder.paymentStatus}
                          onChange={so =>
                            this.handleSelectChange(so, 'paymentStatus')
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`col-sm-7 ${s.editSubContainer}`}>
                    <h5>Publisher Details</h5>
                    <div className="row ">
                      <div className="col-6">
                        <label>Our Order No : </label>
                      </div>
                      <div className="col-6">Our Order No</div>
                    </div>
                    <div className="row mt-1">
                      <div className="col-6">
                        <label>User Order No : </label>
                      </div>
                      <div className="col-6">
                        <input value={this.state.publisherOrder.orderNo} />
                      </div>
                    </div>
                    <div className="row mt-1">
                      <div className="col-6">
                        <label># of Copies: </label>
                      </div>
                      <div className="col-6">
                        <input value={this.state.publisherOrder.orderNo} />
                      </div>
                    </div>
                    <div className="row mt-1">
                      <div className="col-6">
                        <label>Terms of Delivery : </label>
                      </div>
                      <div className="col-5">
                        <Select
                          name="paymentStatus"
                          options={PAYMENT_STATUS_ARRAY}
                          value={this.state.publisherOrder.paymentStatus}
                          onChange={so =>
                            this.handleSelectChange(so, 'paymentStatus')
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
                          selected={
                            new Date(this.state.publisherOrder.startDate)
                          }
                          onChange={date =>
                            this.handleDateChange(date, 'startDate')
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
                          name="startDate"
                          selected={
                            new Date(this.state.publisherOrder.startDate)
                          }
                          onChange={date =>
                            this.handleDateChange(date, 'startDate')
                          }
                        />
                      </div>
                    </div>
                    <div className="row mt-1">
                      <div className="col-6">
                        <label>Price:</label>{' '}
                      </div>
                      <div className="col-6">
                        <input value={this.state.publisherOrder.customerCode} />
                      </div>
                    </div>
                    <div className="row mt-1">
                      <div className="col-6">
                        <label>Postal Cost:</label>{' '}
                      </div>
                      <div className="col-6">
                        <input value={this.state.publisherOrder.customerCode} />
                      </div>
                    </div>
                    <div className="row mt-1">
                      <div className="col-6">
                        <label>Tax:</label>{' '}
                      </div>
                      <div className="col-6">
                        <input value={this.state.publisherOrder.customerCode} />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`row `}
                  style={{ padding: '10px', textAlign: 'center' }}
                >
                  <div className="offset-xl-6 offset-lg-5 offset-md-4 offset-3 col-1">
                    <button> Save</button>
                  </div>
                  <div className="col-2">
                    <button onClick={this.back}>Back to Order</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`${s.container} container-fluid`}>
                {/* Print Claim */}

                <div className={`row `} style={{ padding: '10px' }}>
                  <div className={`col-sm ${s.subContainer}`}>
                    <h5>Invoice Details</h5>
                    <div className="row">
                      <div className="col-6">
                        <label>Order No : </label>
                      </div>
                      <div className="col-6">
                        {this.state.publisherOrder.orderNo}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <label>Invoice No : </label>
                      </div>
                      <div className="col-6">
                        {this.state.publisherOrder.orderNo}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <label>Customer Code :</label>{' '}
                      </div>
                      <div className="col-6">
                        {this.state.publisherOrder.customerCode}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <label>Customer Name :</label>{' '}
                      </div>
                      <div className="col-6">
                        {this.state.publisherOrder.customerCode}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <label>Date : </label>
                      </div>
                      <div className="col-6">
                        {this.state.publisherOrder.customerCode}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <label>Last Date Payment:</label>{' '}
                      </div>
                      <div className="col-6">
                        {this.state.publisherOrder.customerCode}
                      </div>
                    </div>
                  </div>
                  <div className={`col-sm ${s.subContainer}`}>
                    <h5>Publisher Details</h5>
                    <div className="row">
                      <div className="col-6">
                        <label>Name : </label>
                      </div>
                      <div className="col-6">
                        {this.state.publisherOrder.orderNo}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <label>Contact Person : </label>
                      </div>
                      <div className="col-6">
                        {this.state.publisherOrder.orderNo}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <label>Phone :</label>{' '}
                      </div>
                      <div className="col-6">
                        {this.state.publisherOrder.customerCode}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <label>Fax : </label>
                      </div>
                      <div className="col-6">
                        {this.state.publisherOrder.customerCode}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <label>Email:</label>{' '}
                      </div>
                      <div className="col-6">
                        {this.state.publisherOrder.customerCode}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <label>Preferred Contact Method :</label>{' '}
                      </div>
                      <div className="col-6">
                        {this.state.publisherOrder.customerCode}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <label>Website:</label>{' '}
                      </div>
                      <div className="col-6">
                        {this.state.publisherOrder.customerCode}
                      </div>
                    </div>
                  </div>
                  <div className={`col-sm ${s.subContainer}`}>
                    {/* <div className="row"> */}
                    <h5 className="col-12">Publisher Order</h5>
                    {/* </div> */}
                    <div className="row">
                      <div className="col-6">
                        <label>Order No to Publisher : </label>
                      </div>
                      <div className="col-6">
                        {this.state.publisherOrder.orderNo}
                      </div>
                    </div>
                    <div className="row mt-1 mb-1 ">
                      <div className="col-6">
                        <label>Payment Ammount : </label>
                      </div>
                      <div className="col-6">
                        <input
                          value={this.state.publisherOrder.customerCode}
                          disabled={!this.state.editPaymentAmount}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <label>Date of Order :</label>{' '}
                      </div>
                      <div className="col-6">
                        <DatePicker
                          disabled={!this.state.editDate}
                          name="startDate"
                          selected={
                            new Date(this.state.publisherOrder.startDate)
                          }
                          onChange={date =>
                            this.handleDateChange(date, 'startDate')
                          }
                        />
                        {/* {this.state.publisherOrder.customerCode} */}
                      </div>
                    </div>
                    <div className="row mt-1 mb-1">
                      <div className="col-6">
                        <label>Payment Method: </label>
                      </div>
                      <div className="col-6">
                        <input
                          value={this.state.publisherOrder.customerCode}
                          disabled={!this.state.editPaymentMethod}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-5">
                        <label>Status:</label>{' '}
                      </div>
                      <div className="col-5">
                        <Select
                          isDisabled={!this.state.editStatus}
                          name="paymentStatus"
                          options={PAYMENT_STATUS_ARRAY}
                          value={this.state.publisherOrder.paymentStatus}
                          onChange={so =>
                            this.handleSelectChange(so, 'paymentStatus')
                          }
                        />
                        {this.state.publisherOrder.customerCode}
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
                        disabled={!this.state.editNote1}
                        value="note goes here"
                        rows="6"
                      />
                    </div>
                    {/* </div> */}
                  </div>
                  <div
                    className={`col-sm ${s.subContainer2}`}
                    style={{ width: '100%' }}
                  >
                    <h5>Note to Publisher</h5>
                    {/* <div className="row"> */}
                    <div className="col-12">
                      <textarea
                        disabled={!this.state.editNote2}
                        value="note goes here"
                        rows="6"
                      />
                    </div>
                    {/* </div> */}
                  </div>
                </div>
                <div className={`row mt-3 ${s.mainContainer}`}>
                  <h5 className={`col-12 ${s.title}`}> Publication Title : </h5>
                  <div className={`col-xl-3 col-lg-5 col-md-6 ${s.reciever}`}>
                    <b>Reciever : </b> <br />
                    {this.state.publisherOrder.reciever}
                  </div>
                  <div className="col-xl-4 col-lg-5 col-md-6 ">
                    <div>
                      <label>Order No: &nbsp;</label>
                      {this.state.publisherOrder.orderNo}
                    </div>
                    <div>
                      <label>User Order No: &nbsp;</label>
                      {this.state.publisherOrder.userOrderNo}
                    </div>
                    <div>
                      <label>Number Of Copies: &nbsp;</label>
                      {this.state.publisherOrder.count}
                    </div>
                    <div>
                      <label>Terms Of Delivery No:&nbsp;</label>
                      {/* {this.state.publisherOrder.deliveryType.label} */}
                    </div>
                    <div>
                      <label>Start Date : &nbsp;</label>
                      {dateTrimmer(this.state.publisherOrder.startDate)}
                    </div>
                    <div>
                      <label>Enda Date :&nbsp; </label>
                      {dateTrimmer(this.state.publisherOrder.endDate)}
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-5 col-md-6 ">
                    <div>
                      <label>Price: &nbsp;</label>
                      {this.state.publisherOrder.orderNo}
                    </div>
                    <div>
                      <label>Mail Cost: &nbsp;</label>
                      {adminPriceTrimmer(this.state.publisherOrder.discount)}
                    </div>
                    <div>
                      <label>Tax: &nbsp;</label>
                      {adminPriceTrimmer(
                        this.state.publisherOrder.deliveryCost[
                          this.state.publisherOrder.currencyId - 1
                        ],
                        'price',
                      )}{' '}
                      {PRICE_SIGNS[this.state.publisherOrder.currencyId]}
                    </div>
                    <div>
                      <label>Tob be Paid: &nbsp;</label>
                      {adminPriceTrimmer(
                        this.state.publisherOrder.deliveryCost[
                          this.state.publisherOrder.currencyId - 1
                        ],
                        'price',
                      )}{' '}
                      {PRICE_SIGNS[this.state.publisherOrder.currencyId]}
                    </div>
                  </div>
                </div>

                {this.state.editNote1 ||
                this.state.editNote2 ||
                this.state.editNote3 ? (
                  <div className={`row `} style={{ padding: '10px' }}>
                    <div className={`col-sm ${s.subContainer}`}>
                      <h5>Comment </h5>
                      <div className="col-12">
                        <textarea value="note goes here" rows="3" />
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {!this.state.claim &&
                !this.state.orderSent &&
                !this.state.cancel ? (
                  <div
                    className="row mt-5 mb-2"
                    style={{ textAlign: 'center' }}
                  >
                    <div className="col-2">
                      <button onClick={this.onEdit}>Edit Order</button>
                    </div>
                    <div className="col-2">
                      <button>Change Address</button>
                    </div>
                    <div className="col-1">
                      <button onClick={this.onClaim}>Claim</button>
                    </div>
                    <div className="col-2">
                      <button onClick={this.onSent}>Order Sent</button>
                    </div>

                    <div className="col-2">
                      <button onClick={this.onCancel}>Cancel Order</button>
                    </div>
                  </div>
                ) : this.state.claim ? (
                  <div className="row">
                    <div className="col-2">
                      <button>Apply Changes</button>
                    </div>
                    <div className="offset-1 col-2">
                      <button
                        onClick={() => this.onPrintClaim(' Publisher No')}
                      >
                        printable Claim
                      </button>
                    </div>
                    <div className="offset-1 col-2">
                      <button onClick={this.back}>back</button>
                    </div>
                  </div>
                ) : this.state.orderSent ? (
                  <div className="row">
                    <div className="col-2">
                      <button>Apply Changes</button>
                    </div>
                    <div className="offset-1 col-2">
                      <button onClick={() => this.onPrintClaim(' Customer No')}>
                        printable Order
                      </button>
                    </div>
                    <div className="offset-1 col-2">
                      <button onClick={this.back}>back</button>
                    </div>
                  </div>
                ) : this.state.cancel ? (
                  <div className="row">
                    <div className="col-2">
                      <button>Apply Changes</button>
                    </div>

                    <div className="offset-1 col-2">
                      <button onClick={this.back}>back</button>
                    </div>
                  </div>
                ) : (
                  ''
                )}
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
export default withStyles(s)(PublisherOrderDetail);
