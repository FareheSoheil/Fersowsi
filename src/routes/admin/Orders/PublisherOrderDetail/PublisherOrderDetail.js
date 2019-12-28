import React from 'react';
import Select from 'react-select';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { toastr } from 'react-redux-toastr';
import PageHeader from '../../../../components/Admin/PageHeader';
import ChangeAddress from '../../../../components/Admin/PublisherOrder/ChangeAddress';
import EditDetails from '../../../../components/Admin/PublisherOrder/EditDetails';
import InvoiceDetails from '../../../../components/Admin/PublisherOrder/InvoiceDetails';
import PublisherDetails from '../../../../components/Admin/PublisherOrder/PublisherDetails';
import OrderForPublisherDetails from '../../../../components/Admin/PublisherOrder/OrderForPublisherDetails';
import OrderItem from '../../../../components/Admin/PublisherOrder/OrderItem';
import Spinner from '../../../../components/Admin/Spinner';
import { pdfMaker } from '../publisherOrderPdfHelper';
import { addressPdfMaker } from '../changeAddressPdfHelper';
import { SERVER } from '../../../../constants';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import dateTrimmer from '../../../../dateTrimmer';
import history from '../../../../history';
import s from './PublisherOrderDetail.css';
class PublisherOrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      id: this.props.context.params.id,
      publisherOrder: {},
      oldAddress: '',
      claim: false,
      orderSent: false,
      cancel: false,
      editOrder: false,
      editAddress: false,
      allPeriods: '', //
      allAddresses: '', //
      allSubscriptions: '',
      allDeliveryTypes: '', //
      allCurrencies: '', //
    };
    this.onRecieverInputChange = this.onRecieverInputChange.bind(this);
    this.onOrderInputChange = this.onOrderInputChange.bind(this);
    this.onOrderForPublisherChange = this.onOrderForPublisherChange.bind(this);
    this.fetchpublisherOrder = this.fetchpublisherOrder.bind(this);
    this.fetchAllInfo = this.fetchAllInfo.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.gotoCustomerOrder = this.gotoCustomerOrder.bind(this);
    this.gotoProduct = this.gotoProduct.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.back = this.back.bind(this);
    this.save = this.save.bind(this);
    this.send = this.send.bind(this);
    this.print = this.print.bind(this);
    this.printAddress = this.printAddress.bind(this);
    this.applySendAddressChange = this.applySendAddressChange.bind(this);
  }
  print(title, code) {
    let frog = window.open(
      '',
      'wildebeast',
      'width=800,height=700,scrollbars=1,resizable=1',
    );
    frog.document.open();
    frog.document.write(pdfMaker(this.state.publisherOrder, title, code));
    frog.document.close();
  }
  printAddress(newAddress, newCO, newRN) {
    let frog = window.open(
      '',
      'wildebeast',
      'width=800,height=700,scrollbars=1,resizable=1',
    );
    frog.document.open();
    frog.document.write(
      addressPdfMaker(this.state.publisherOrder, newAddress, newCO, newRN),
    );
    frog.document.close();
  }
  applySendAddressChange(newAddress, newCO, newRN, code) {
    const htmlContent = addressPdfMaker(
      this.state.publisherOrder,
      newAddress,
      newCO,
      newRN,
    );
    const url = `${SERVER}/sendAndSaveChangeAddressActionToPublisher`;

    const credentials = {
      orderId: this.state.id,
      htmlContent: htmlContent,
      onlySend: code == 1 ? false : true,
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
          code == 1
            ? toastr.success('Change Address', 'Address Changes Successfully')
            : toastr.success('Send Address', 'Address was Sent Successfully');
        else toastr.error('Address', 'Could not perform the action');
      },
      error => {
        toastr.error('Change Address', 'Could not perform the action');
        console.log(error);
      },
    );
  }
  send(title, code) {
    let url;
    if (code == 1) url = `${SERVER}/sendAndSaveClaimToPublisher`;
    else if (code == 2)
      url = `${SERVER}/sendAndSaveOrderSubscriptionToPublisher`;
    else url = `${SERVER}/sendAndSaveOrderCancellationToPublisher`;
    const htmlContent = pdfMaker(this.state.publisherOrder, title, code);
    const credentials = {
      orderId: this.state.id,
      htmlContent: htmlContent,
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetchWithTimeOut(
      url,
      options,
      response => {
        if (response.error == undefined)
          toastr.success('Send', 'Content was Sent Successfully');
        else toastr.error('Send', 'Could not send the content');
      },
      error => {
        toastr.error('Send', 'Could not send the content');
        console.log(error);
      },
    );
  }
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
    let imgContainer = document.getElementById('paymentImg');
    let reader = new FileReader();
    let that = this;
    if (inp.files && inp.files[0]) {
      reader.onload = function(e) {
        imgContainer.src = e.target.result;
        let pres = { ...that.state.publisherOrder };
        pres.paymentImage = e.target.result;
        that.setState({
          publisherOrder: pres,
        });
      };
      let imgt = reader.readAsDataURL(inp.files[0]);
    }
  }

  componentDidMount() {
    this.fetchAllInfo();
    this.fetchpublisherOrder();
  }
  fetchpublisherOrder() {
    const url = `${SERVER}/getOrder`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      orderId: this.state.id,
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
          oldAddress: response.address,
          isLoading: false,
        });
      },
      error => {
        console.log(error);
      },
    );
  }
  fetchAllInfo() {
    const url = `${SERVER}/getAuxInfoForAll`;
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
          allDeliveryTypes: response.DeliveryType,
          allCountries: response.Country,

          isLoading: false,
        });
      },
      error => {
        console.log(error);
      },
    );
  }
  save() {
    const url = `${SERVER}/editOrder`;

    const credentials = {
      id: this.state.id,
      isActive:
        this.state.publisherOrder.OrderForPublisher.isActive == 1
          ? true
          : false,
      count: this.state.publisherOrder.count,
      paymentNote: this.state.publisherOrder.paymentNote,
      publicationNote: this.state.publisherOrder.publicationNote,
      desc: this.state.publisherOrder.desc,
      userOrderNo: this.state.publisherOrder.userOrderNo,
      permanentOrderNumber: this.state.publisherOrder.permanentOrderNumber,
      contactPerson: this.state.publisherOrder.contactPerson,
      recieptName: this.state.publisherOrder.recieptName,
      statusId: this.state.publisherOrder.statusId,
      deliveryTypeId: this.state.publisherOrder.deliveryType.value,
      startDate: this.state.publisherOrder.startDate,
      endDate: this.state.publisherOrder.endDate,
      price: this.state.publisherOrder.price[
        this.state.publisherOrder.currencyId - 1
      ],
      postalCost: this.state.publisherOrder.totalDeliveryCost[
        this.state.publisherOrder.currencyId - 1
      ],
      tax: this.state.publisherOrder.tax[
        this.state.publisherOrder.currencyId - 1
      ],
      paymentImage: this.state.publisherOrder.paymentImage,
      address: {
        province: this.state.publisherOrder.address.province,
        city: this.state.publisherOrder.address.city,
        detailAddress: this.state.publisherOrder.detailAddress,
        zipCode: this.state.publisherOrder.zipCode,
        countryId: this.state.publisherOrder.address.Country.value,
      },
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
          toastr.success('Order', 'Order Edited Successfully');
        else toastr.error('Order', 'Could not Edit The Order');
      },
      error => {
        toastr.error('Order', 'Could not Edit The Order');
        console.log(error);
      },
    );
  }
  handleDateChange(date, stateName) {
    let publisherOrder = { ...this.state.publisherOrder };
    if (stateName == 'createdAt')
      publisherOrder.OrderForPublisher[stateName] = date;
    else publisherOrder[stateName] = date;
    this.setState({ publisherOrder });
  }
  handleSelectChange = (selectedOption, op) => {
    let publisherOrder = { ...this.state.publisherOrder };
    if (op == 'Country') publisherOrder.address.Country = selectedOption;
    else if (op == 'deliveryType') publisherOrder.deliveryType = selectedOption;
    else publisherOrder.OrderForPublisher.isActive = selectedOption.value;
    this.setState({ publisherOrder });
  };
  onRecieverInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    let pres = { ...this.state.publisherOrder };
    if (name == 'recieptName' || name == 'contactPerson') pres[name] = value;
    else pres.address[name] = value;
    this.setState({
      publisherOrder: pres,
    });
  }

  onOrderInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    let pres = { ...this.state.publisherOrder };
    if (
      name == 'count' ||
      name == 'paymentNote' ||
      name == 'publicationNote' ||
      name == 'userOrderNo'
    )
      pres[name] = value;
    else pres[name][this.state.publisherOrder.currencyId - 1] = value;
    this.setState({
      publisherOrder: pres,
    });
  }
  onOrderForPublisherChange() {
    const name = e.target.name;
    const value = e.target.value;
    let pres = { ...this.state.publisherOrder };

    pres.OrderForPublisher[name] = value;
    this.setState({
      publisherOrder: pres,
    });
  }
  back() {
    this.setState(
      {
        editAddress: false,
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
        editAddress: false,
      },
      () => {
        window.scrollTo(0, 0);
      },
    );
  }
  onAddressChange() {
    this.setState(
      {
        editOrder: false,
        editAddress: true,
      },
      () => {
        window.scrollTo(0, 0);
      },
    );
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

            {this.state.editOrder ? (
              <EditDetails
                publisherOrder={this.state.publisherOrder}
                back={this.back}
                onRecieverInputChange={this.onRecieverInputChange}
                handleSelectChange={this.handleSelectChange}
                onOrderInputChange={this.onOrderInputChange}
                handleDateChange={this.handleDateChange}
                allCountries={this.state.allCountries}
                allDeliveryTypes={this.state.allDeliveryTypes}
                uploadImage={this.uploadImage}
                save={this.save}
              />
            ) : this.state.editAddress ? (
              <ChangeAddress
                currentRecieverName={this.state.publisherOrder.recieptName}
                oldRecieverName={this.state.publisherOrder.recieptName}
                currentCO={this.state.publisherOrder.contactPerson}
                oldCO={this.state.publisherOrder.contactPerson}
                oldAddress={this.state.publisherOrder.address}
                currentAddress={this.state.publisherOrder.address}
                back={this.back}
                allCountries={this.state.allCountries}
                printAddress={this.printAddress}
                applySend={this.applySendAddressChange}
              />
            ) : (
              <div className={`${s.container} container-fluid`}>
                {/* Print Claim */}

                <div className={`row `} style={{ padding: '10px' }}>
                  <InvoiceDetails publisherOrder={this.state.publisherOrder} />
                  <PublisherDetails
                    publisherOrder={this.state.publisherOrder}
                  />
                  <OrderForPublisherDetails
                    publisherOrder={this.state.publisherOrder}
                  />
                </div>

                <div className="row mt-2" style={{ padding: '10px' }}>
                  <div className={`col-sm-4 ${s.subContainer2}`}>
                    <h5>Administrator Note About the Invoice</h5>
                    <div className="col-12">
                      <textarea
                        disabled
                        value={this.state.publisherOrder.paymentNote}
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
                    <div className="col-12">
                      <textarea
                        disabled
                        value={this.state.publisherOrder.publicationNote}
                        rows="6"
                      />
                    </div>
                  </div>
                </div>
                <OrderItem publisherOrder={this.state.publisherOrder} />

                <div className="row mt-4" style={{ textAlign: 'center' }}>
                  <div className="col-2">
                    <button onClick={this.onEdit}>Edit Order</button>
                  </div>
                  <div className="col-2">
                    <button onClick={this.onAddressChange}>
                      Change Address
                    </button>
                  </div>
                  <div className="col-2">
                    <button onClick={() => this.print('Claim', 1)}>
                      printable Claim
                    </button>
                  </div>
                  <div className=" col-2">
                    <button onClick={() => this.print('Subscription', 2)}>
                      printable Order
                    </button>
                  </div>
                  <div className=" col-3">
                    <button
                      onClick={() => this.print('Cancelation/Refound', 1)}
                    >
                      printable Cancellation Form
                    </button>
                  </div>
                </div>
                <div className="row mt-4" style={{ textAlign: 'center' }}>
                  <div className="offset-2 col-2">
                    <button onClick={() => this.send('Claim', 1)}>
                      send Claim To Publisher
                    </button>
                  </div>
                  <div className=" col-2">
                    <button onClick={() => this.send('Subscription', 2)}>
                      send Order To Publisher
                    </button>
                  </div>
                  <div className=" col-3">
                    <button onClick={() => this.send('Cancelation/Refound', 1)}>
                      printable Cancellation Form
                    </button>
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
export default withStyles(s)(PublisherOrderDetail);
