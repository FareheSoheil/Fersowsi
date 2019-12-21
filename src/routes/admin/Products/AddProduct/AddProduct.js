import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AddProduct.css';
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
  applyRatios() {
    const pre = this.state.applyRatios;
    this.setState({
      applyRatios: !pre,
    });
  }
  isNumber(string) {
    if (/^[0-9]+$/.test(string) || /^\\s+$/.test(string)) return true;
    else return true;
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
        that.setState({
          product: { coverImage: e.target.result },
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
      state.tax[this.state.product.currencyId] = value;
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
    product.productPriceAndCost.unshift(newPrice);
    this.setState({ product: product });
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
    product.translations.unshift(newTranslation);
    this.setState({ product: product });
  }
  onDeleteTranslation(index) {
    let product = { ...this.state.product };
    product.translations.splice(index, 1);
    this.setState({ product: product });
  }
  // subproducts controllers
  onAddSubproduct(newSub) {
    let product = { ...this.state.product };
    let nsp = { ...this.state.allProducts };
    product.subProducts.unshift(nsp[newSub.index]);
    window.alert(newSub);
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
      window.alert(JSON.stringify(selectedOption));
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
  onProductAdd() {
    const url = `${SERVER}/addProduct`;
    this.setState({
      isLoading: true,
    });

    const options = {
      method: 'POST',
      body: JSON.stringify(this.state.product),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const that = this;
    fetchWithTimeOut(
      url,
      options,
      response => {
        window.alert('Product Updated Successfully');
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
                            applyRatios={this.state.applyRatios}
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
