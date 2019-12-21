import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { toastr } from 'react-redux-toastr';
import s from './AddProduct.css';
import history from '../../../../history';
import Spinner from '../../../../components/Admin/Spinner';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import SubproductTable from '../../../../components/Admin/Product/SubproductTable';
import ProductPriceTable from '../../../../components/Admin/Product/ProductPriceTable';
import ProductTranlationTable from '../../../../components/Admin/Product/ProductTranlationTable';
import ProductDetailsContainer from '../../../../components/Admin/Product/ProductDetailsContainer';
import 'react-datepicker/dist/react-datepicker.css';
import {
  PRODUCT_TYPES,
  PRODUCT_STATUS,
} from '../../../../constants/constantData';
import { SERVER } from '../../../../constants';

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      product: {
        publisherPrice: [0, 0, 0, 0, 0, 0],
        discount: 0,
        localDiscount: 0,
        tax: [0, 0, 0, 0, 0, 0],
        issn: '',
        dewey: '',
        asb: '',
        originalTitle: '',
        originalDesc: '',
        weight: 0,
        coverImage: '/assets/images/magazine.png',
        creationDate: '',
        publisherPriceUpdatedAt: '',
        productPeriod: '',
        country: '',
        isSingleAvailabel: '',
        createdAt: new Date(),
        updatedAt: '',
        currency: { value: 2, label: 'USD' },
        currencyId: 2,
        productType: PRODUCT_TYPES.Single,
        singleProductType: {},
        ageGroup: {},
        publisher: {},
        productLanguage: {},
        numberOfCopyPerPeriod: '',
        productStatus: PRODUCT_STATUS.Pending,
        contentCategory: [],
        translations: [],
        productPriceAndCost: [],
        subProducts: [],
        operatorNote: '',
      },

      privateRatio: '',
      instRatio: '',
      inPostalRatio: '',

      allContentCategories: [],
      allPublishers: [],
      allLanguages: [],
      allAgeGroups: [],
      allPeriods: [],
      allZones: [],
      allDeliveries: [],
      allSubscriptions: [],
      allCountries: [],
      allCurrencies: [],
      allProducts: [],
      applyRatios: true,
    };

    this.fetchAllInfo = this.fetchAllInfo.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleUploadedImage = this.handleUploadedImage.bind(this);
    this.onProductAdd = this.onProductAdd.bind(this);
    // price handlers
    this.onPriceInputChange = this.onPriceInputChange.bind(this);
    this.onPriceSelectChange = this.onPriceSelectChange.bind(this);
    this.onAddPrice = this.onAddPrice.bind(this);
    this.onDeletePrice = this.onDeletePrice.bind(this);
    // translation handlers
    this.onTranslationInputChange = this.onTranslationInputChange.bind(this);
    this.onTranslationSelectChange = this.onTranslationSelectChange.bind(this);
    this.onAddTranslation = this.onAddTranslation.bind(this);
    this.onDeleteTranslation = this.onDeleteTranslation.bind(this);
    // subproduct handlers
    this.onAddSubproduct = this.onAddSubproduct.bind(this);
    this.onDeleteSubproduct = this.onDeleteSubproduct.bind(this);
  }
  componentDidMount() {
    this.fetchAllInfo();
    // this.fetchProduct();
  }

  isNumber(string) {
    if (/^[0-9]+$/.test(string) || /^\\s+$/.test(string)) return true;
    else return true;
  }

  errorHanlder(obj) {
    console.log('obj.contentCategory : ', obj.contentCategory);
    let pass = true;
    if (obj.originalTitle == '') {
      toastr.error('Add Product Error', 'Title can not be empty');
      pass = false;
    } else if (Object.entries(obj.publisher).length === 0) {
      toastr.error('Add Product Error', 'Publisher can not be empty');
      pass = false;
    } else if (obj.issn == '') {
      toastr.error('Add Product Error', 'ISSN can not be empty');
      pass = false;
    } else if (Object.entries(obj.productType).length === 0) {
      toastr.error('Add Product Error', 'Product Type can not be empty');
      pass = false;
    } else if (obj.contentCategory.length == 0) {
      toastr.error('Add Product Error', 'Content Category can not be empty');
      pass = false;
    } else if (Object.entries(obj.ageGroup).length === 0) {
      toastr.error('Add Product Error', 'Age Group can not be empty');
      pass = false;
    } else if (Object.entries(obj.productLanguage).length === 0) {
      toastr.error('Add Product Error', 'Language can not be empty');
      pass = false;
    } else if (Object.entries(obj.productPeriod).length === 0) {
      toastr.error('Add Product Error', 'Period can not be empty');
      pass = false;
    } else if (obj.numberOfCopyPerPeriod == '') {
      toastr.error(
        'Add Product Error',
        'Number of Copies Per Period can not be empty',
      );
      pass = false;
    } else if (Object.entries(obj.singleProductType).length === 0) {
      toastr.error('Add Product Error', 'Single Product Type can not be empty');
      pass = false;
    } else if (Object.entries(obj.country).length === 0) {
      toastr.error('Add Product Error', 'Country can not be empty');
      pass = false;
    } else if (Object.entries(obj.currency).length === 0) {
      toastr.error('Add Product Error', 'Currency can not be empty');
      pass = false;
    } else if (obj.tax == '') {
      toastr.error('Add Product Error', 'tax can not be empty');
      pass = false;
    } else if (
      isNaN(parseFloat(obj.discount)) ||
      !isFinite(obj.discount) ||
      parseFloat(obj.discount) > 100
    ) {
      window.alert(obj.discount);
      toastr.error(
        'Add Product Error',
        'Product discount should be a number less than 100',
      );
      pass = false;
    } else if (
      isNaN(parseFloat(obj.localDiscount)) ||
      !isFinite(obj.localDiscount) ||
      parseFloat(obj.localDiscount) > 100
    ) {
      window.alert(obj.nonLocalDiscount);
      toastr.error(
        'Add Product Error',
        'Product Non Local Discount should be a number less than 100',
      );
      pass = false;
    } else if (obj.operatorNote == '') {
      toastr.error('Add Product Error', 'Operator Note can not be empty');
      pass = false;
    }
    // window.alert(pass);
    return pass;
  }
  onProductAdd() {
    const url = `${SERVER}/addProduct`;
    const cred = {
      ...this.state.product,
    };
    if (this.errorHanlder(cred)) {
      cred.isSingleAvailable = true;
      cred.currencyId = this.state.product.currency.value;
      cred.ageGroupId = this.state.product.ageGroup.value;
      cred.productPeriodId = this.state.product.productPeriod.value;
      cred.countryId = this.state.product.country.value;
      cred.publisherId = this.state.product.publisher.value;
      cred.singleProductTypeId = this.state.product.singleProductType.value;
      cred.productTypeId = this.state.product.productType.value;
      cred.productLanguageId = this.state.product.productLanguage.value;
      cred.productStatusId = this.state.product.productStatus.value;
      cred.tax = this.state.product.tax[this.state.product.currency.value - 1];
      cred.publisherPrice = this.state.product.publisherPrice[
        this.state.product.currency.value - 1
      ];
      cred.productPriceAndCost.forEach(ppc => {
        ppc.privateCustomerPrice =
          ppc.privateCustomerPrice[this.state.product.currency.value - 1];
        ppc.institutionalCustomerPrice =
          ppc.institutionalCustomerPrice[this.state.product.currency.value - 1];
        ppc.privatePublisherPrice =
          ppc.privatePublisherPrice[this.state.product.currency.value - 1];
        ppc.institutionalPublisherPrice =
          ppc.institutionalPublisherPrice[
            this.state.product.currency.value - 1
          ];
        ppc.inPostalCost =
          ppc.inPostalCost[this.state.product.currency.value - 1];
        ppc.outPostalCost =
          ppc.outPostalCost[this.state.product.currency.value - 1];
      });
      cred.contentCategory.forEach(cc => {
        cc.contentCategoryId = cc.value;
      });
      cred.translations.forEach(trans => {
        trans.languageId = trans.value;
      });
      cred.subProducts.forEach(spr => {
        spr.productId = spr.value;
      });
      console.log('cred : ', cred);
      const options = {
        method: 'POST',
        body: JSON.stringify(cred),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const that = this;
      fetchWithTimeOut(
        url,
        options,
        response => {
          if (response.error == undefined) {
            toastr.success('', 'Product Added Successfully');
            that.setState(
              {
                product: {
                  publisherPrice: '',
                  discount: 0,
                  tax: [0, 0, 0, 0, 0, 0],
                  issn: '',
                  dewey: '',
                  asb: '',
                  originalTitle: '',
                  originalDesc: '',
                  weight: '',
                  coverImage: '/assets/images/magazine.png',
                  creationDate: '',
                  publisherPriceUpdatedAt: '',
                  isSingleAvailabel: '',
                  createdAt: new Date(),
                  updatedAt: '',
                  currency: { value: 2, label: 'USD' },
                  currencyId: 2,
                  productType: PRODUCT_TYPES.Single,
                  singleProductType: '',
                  ageGroup: '',
                  publisher: '',
                  productLanguage: '',
                  productStatus: PRODUCT_STATUS.Pending,
                  contentCategory: [],
                  translations: [],
                  productPriceAndCost: [],
                  subProducts: [],
                },
                // isLoading: false,
              },
              () => {
                history.goBack();
              },
            );
          } else {
            toastr.error(response.error.title, response.error.description);
          }
        },
        error => {
          toastr.error(error.title, error.description);
          window.alert('error');
          console.log('an error occured', error);
        },
      );
    }
  }
  fetchProduct() {
    const url = `${SERVER}/getProduct`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      productId: this.state.id,
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
          product: response.product,
          isLoading: false,
        });
      },
      error => {
        window.alert('error');
        console.log('an error occured', error);
      },
    );
  }
  fetchAllInfo() {
    const url = `${SERVER}/getAllAuxInfoForProducts`;
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
          allContentCategories: response.ProductContentTypes,
          allPublishers: response.Publishers,
          allLanguages: response.Languages,
          allAgeGroups: response.AgeGroups,
          allPeriods: response.Periods,
          allZones: response.Zones,
          allDeliveries: response.DeliveryTypes,
          allSubscriptions: response.productSubscriptions,
          allCountries: response.Countries,
          allCurrencies: response.Currency,
          allProducts: response.Products,
          isLoading: false,
        });
      },
      error => {
        console.log(error);
      },
    );
  }

  uploadImage() {
    document.getElementById('fileInput').click();
  }
  handleUploadedImage() {
    let inp = document.getElementById('fileInput');
    let imgContainer = document.getElementById('productCoverImg');
    let reader = new FileReader();
    let that = this;
    if (inp.files && inp.files[0]) {
      reader.onload = function(e) {
        imgContainer.src = e.target.result;
        let pres = that.state.product;
        pres.coverImage = e.target.result;
        that.setState({
          product: pres,
        });
      };
      reader.readAsDataURL(inp.files[0]);
    }
  }
  changeStatus(status) {
    let state = { ...this.state.product };
    state.productStatus = status;
    this.setState({ product: state });
  }
  onChangeInput(event, type) {
    let value = event.target.value;
    const attr = event.target.name;
    let state = { ...this.state };

    if (
      attr == 'privateRatio' ||
      attr == 'instRatio' ||
      attr == 'inPostalRatio'
    ) {
      if (this.isNumber(value) || value == '') this.setState({ [attr]: value });
    } else if (attr == 'tax') {
      state = { ...this.state.product };
      state.tax[this.state.product.currency.value] = value;
      this.setState({ product: state });
    } else {
      state = { ...this.state.product };
      state[attr] = value;
      this.setState({ product: state });
    }
  }
  // price controllers
  onPriceInputChange(e, index) {
    const value = e.target.value;

    const state = e.target.name;
    let product = { ...this.state.product };
    product.productPriceAndCost[index][state][
      this.state.product.currencyId
    ] = value;
    this.setState({ product });
  }
  onPriceSelectChange(so, name, index) {
    let product = { ...this.state.product };

    if (name == 'zone') {
      product.productPriceAndCost[index].zoneName = so.label;
      product.productPriceAndCost[index].zoneId = so.value;
    } else if (name == 'deliveryType') {
      product.productPriceAndCost[index].deliveryTypeName = so.label;
      product.productPriceAndCost[index].deliveryTypeId = so.value;
    } else if (name == 'subscription') {
      product.productPriceAndCost[index].ProductSubscriptionTypeName = so.label;
      product.productPriceAndCost[index].productSubscriptionTypeId = so.value;
    } else {
      product.productPriceAndCost[index].productPeriodName = so.label;
      product.productPriceAndCost[index].productPeriodId = so.value;
    }

    this.setState({ product: product });
  }
  onAddPrice(newPrice) {
    let product = { ...this.state.product };
    if (
      newPrice.deliveryTypeId == '' ||
      newPrice.deliveryTypeName == '' ||
      newPrice.productSubscriptionTypeId == '' ||
      newPrice.ProductSubscriptionTypeName == '' ||
      newPrice.zoneId == '' ||
      newPrice.zoneName == ''
    )
      toastr.error('Please Fill out All Fields');
    else {
      product.productPriceAndCost.unshift(newPrice);
      this.setState({ product: product });
    }
  }
  onDeletePrice(index) {
    let product = { ...this.state.product };
    product.productPriceAndCost.splice(index, 1);
    this.setState({ product: product });
  }
  // translation controllers
  onTranslationInputChange(e, index) {
    const value = e.target.value;
    const state = e.target.name;
    let product = { ...this.state.product };
    product.translations[index][state] = value;
    this.setState({ product: product });
  }
  onTranslationSelectChange(so, index) {
    let product = { ...this.state.product };

    product.translations[index].label = so.label;
    product.translations[index].value = so.value;

    this.setState({ product });
  }
  onAddTranslation(newTranslation) {
    let product = { ...this.state.product };
    console.log(product);
    if (
      newTranslation.label == '' ||
      newTranslation.title == '' ||
      newTranslation.value == ''
    ) {
      toastr.error('Please Fill out All Fields');
    } else {
      product.translations.unshift(newTranslation);
      this.setState({ product: product });
    }
  }
  onDeleteTranslation(index) {
    let product = { ...this.state.product };
    product.translations.splice(index, 1);
    this.setState({ product: product });
  }
  // subproducts controllers
  onAddSubproduct(newSub) {
    let product = { ...this.state.product };
    product.subProducts.unshift(newSub);
    this.setState({ product: product });
  }
  onDeleteSubproduct(index, e) {
    e.stopPropagation();
    let product = { ...this.state.product };
    product.subProducts.splice(index, 1);
    this.setState({ product: product });
  }
  handleDateChange(date, stateName) {
    let product = { ...this.state.product };
    product[stateName] = date;
    this.setState({ product: product });
  }
  handleSelectChange = (selectedOption, op) => {
    let product = { ...this.state.product };
    if (op == 'publisher') {
      product.currencyId = selectedOption.currencyId;
    }
    product[op] = selectedOption;
    this.setState({ product: product });
  };
  onExportProduct() {
    window.alert('send delete ajax with user id');
  }
  onImportProduct() {
    window.alert('send delete ajax with user id');
  }

  render() {
    return (
      <div>
        {' '}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div className="dashboard-ecommerce">
            <div className={`container-fluid ${s.container}`}>
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="influence-profile-content pills-regular">
                  {/* tab headers */}
                  <ul
                    class={`${s.productPills} nav nav-pills mb-1 nav-justified`}
                    id="pills-tab"
                    role="tablist"
                  >
                    {/* detailstab */}
                    <li class="nav-item">
                      <a
                        class="nav-link active "
                        id="pills-details-tab"
                        data-toggle="pill"
                        href="#pills-details"
                        role="tab"
                        aria-controls="pills-details"
                        aria-selected="false"
                      >
                        Product Details
                      </a>
                    </li>
                    {/* prices  */}
                    <li class="nav-item ">
                      <a
                        class="nav-link "
                        id="pills-prices-tab"
                        data-toggle="pill"
                        href="#pills-prices"
                        role="tab"
                        aria-controls="pills-prices"
                        aria-selected="false"
                      >
                        Product Prices
                      </a>
                    </li>
                    {/* translations */}
                    <li class="nav-item ">
                      <a
                        class="nav-link "
                        id="pills-translation-tab"
                        data-toggle="pill"
                        href="#pills-translation"
                        role="tab"
                        aria-controls="pills-translation"
                        aria-selected="false"
                      >
                        Product Translations
                      </a>
                    </li>
                    {/* subproducts */}
                    {this.state.product.productType.value ===
                    PRODUCT_TYPES.Package ? (
                      <li class="nav-item">
                        <a
                          class="nav-link "
                          id="pills-subproducts-tab"
                          data-toggle="pill"
                          href="#pills-subproducts"
                          role="tab"
                          aria-controls="pills-subproducts"
                          aria-selected="false"
                        >
                          Product Subproducts
                        </a>
                      </li>
                    ) : (
                      ''
                    )}
                  </ul>
                  <div class="tab-content" id="pills-tabContent">
                    <div
                      class="tab-pane fade "
                      id="pills-subproducts"
                      role="tabpanel"
                      aria-labelledby="pills-subproducts-tab"
                    >
                      <div class="card ">
                        <h5
                          class={
                            this.state.product.productStatus.value ===
                            PRODUCT_STATUS.Pending.value
                              ? `${s.pending} card-header`
                              : this.state.product.productStatus.value ===
                                PRODUCT_STATUS.Ready.value
                                ? `${s.ready} card-header`
                                : this.state.product.productStatus.value ===
                                  PRODUCT_STATUS.NotAvailable.value
                                  ? `${s.notAvailable} card-header`
                                  : 'card-header'
                          }
                        >
                          Product Subproducts
                        </h5>
                        <div class="card-body">
                          <SubproductTable
                            productId={this.state.product.id}
                            subproducts={this.state.product.subProducts}
                            productOptions={this.state.allProducts}
                            onAddSubproduct={this.onAddSubproduct}
                            onDeleteSubproduct={this.onDeleteSubproduct}
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      class="tab-pane fade "
                      id="pills-translation"
                      role="tabpanel"
                      aria-labelledby="pills-translations-tab"
                    >
                      <div class="card">
                        <h5
                          class={
                            this.state.product.productStatus.value ===
                            PRODUCT_STATUS.Pending.value
                              ? `${s.pending} card-header`
                              : this.state.product.productStatus.value ===
                                PRODUCT_STATUS.Ready.value
                                ? `${s.ready} card-header`
                                : `${s.notAvailable} card-header`
                          }
                        >
                          Product Translations
                        </h5>
                        <div class="card-body">
                          <ProductTranlationTable
                            productId={this.state.product.id}
                            translations={this.state.product.translations}
                            languageOptions={this.state.allLanguages}
                            onAddTranslation={this.onAddTranslation}
                            onDeleteTranslation={this.onDeleteTranslation}
                            onTranslationInputChange={
                              this.onTranslationInputChange
                            }
                            onTranslationSelectChange={
                              this.onTranslationSelectChange
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      class="tab-pane fade "
                      id="pills-prices"
                      role="tabpanel"
                      aria-labelledby="pills-prices-tab"
                    >
                      <div class="card">
                        <h5
                          class={
                            this.state.product.productStatus.value ===
                            PRODUCT_STATUS.Pending.value
                              ? `${s.pending} card-header`
                              : this.state.product.productStatus.value ===
                                PRODUCT_STATUS.Ready.value
                                ? `${s.ready} card-header`
                                : `${s.notAvailable} card-header`
                          }
                        >
                          Product Prices and Costs
                        </h5>
                        <div class="card-body">
                          <div className="row mt-1 pl-4 mb-1">
                            <span>Private Price Ratio (%) : </span>
                            {/* <div className="col-xl-2" /> */}
                            <div className="col-xl-1">
                              {' '}
                              <div className="form-group">
                                <input
                                  name="privateRatio"
                                  // placeholder="Private Price Ratio"
                                  id="privateRatio"
                                  type="text"
                                  className="form-control form-control-sm "
                                  value={this.state.privateRatio}
                                  onChange={e => this.onChangeInput(e)}
                                />
                              </div>
                            </div>
                            {/* <div className="col-xl-2"> */}
                            <span className="offset-xl-1">
                              Instituitional Price Ratio (%) :
                            </span>
                            {/* </div> */}
                            <div className="col-xl-1">
                              {' '}
                              <div className="form-group">
                                <input
                                  name="instRatio"
                                  type="text"
                                  id="instRatio"
                                  className="form-control form-control-sm "
                                  value={this.state.instRatio}
                                  onChange={e => this.onChangeInput(e)}
                                />
                              </div>
                            </div>
                            <span className="offset-xl-1 mt-1">
                              In Postal Ratio (%) :
                            </span>
                            {/* </div> */}
                            <div className="col-xl-1">
                              {' '}
                              <div className="form-group">
                                <input
                                  name="inPostalRatio"
                                  type="text"
                                  id="inPostalRatio"
                                  className="form-control form-control-sm "
                                  value={this.state.inPostalRatio}
                                  onChange={e => this.onChangeInput(e)}
                                />
                              </div>
                            </div>
                          </div>

                          <ProductPriceTable
                            currencyId={this.state.product.currency.value}
                            privateRatio={this.state.privateRatio}
                            instRatio={this.state.instRatio}
                            inPostalRatio={this.state.inPostalRatio}
                            productId={this.state.product.id}
                            prices={this.state.product.productPriceAndCost}
                            zoneOptions={this.state.allZones}
                            periodOptions={this.state.allPeriods}
                            deliveryOptions={this.state.allDeliveries}
                            subscriptionOptions={this.state.allSubscriptions}
                            onPriceInputChange={this.onPriceInputChange}
                            onPriceSelectChange={this.onPriceSelectChange}
                            onAddPrice={this.onAddPrice}
                            onDeletePrice={this.onDeletePrice}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      class="tab-pane show fade active"
                      id="pills-details"
                      role="tabpanel"
                      aria-labelledby="pills-details-tab"
                    >
                      <div class="card">
                        <div class={`${s.cardContainer} card-body`}>
                          <ProductDetailsContainer
                            hasType={true}
                            changeStatus={this.changeStatus}
                            product={this.state.product}
                            allPublishers={this.state.allPublishers}
                            allContentCategories={
                              this.state.allContentCategories
                            }
                            allAgeGroups={this.state.allAgeGroups}
                            allLanguages={this.state.allLanguages}
                            allPeriods={this.state.allPeriods}
                            allCountries={this.state.allCountries}
                            allCurrencies={this.state.allCurrencies}
                            uploadImage={this.uploadImage}
                            handleDateChange={this.handleDateChange}
                            handleSelectChange={this.handleSelectChange}
                            handleUploadedImage={this.handleUploadedImage}
                            onChangeInput={this.onChangeInput}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className={`${s.btnContainer} row mt-3`}>
                  <div className="offset-xl-2 col-3">
                    <button className="btn  btn-secondary">
                      Import Product
                    </button>
                  </div>
                  <div className="col-3">
                    <button className="btn btn-info">Export Product</button>
                  </div>
                  <div className="col-3">
                    <a className="btn btn-success" onClick={this.onProductAdd}>
                      {' '}
                      Add Product
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withStyles(s)(AddProduct);
