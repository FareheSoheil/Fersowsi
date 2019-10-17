import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProductDetail.css';
import Spinner from '../../../../components/Admin/Spinner';
import PageHeader from '../../../../components/Admin/PageHeader';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import SubproductTable from '../../../../components/Admin/Product/SubproductTable';
import ProductPriceTable from '../../../../components/Admin/Product/ProductPriceTable';
import ProductTranlationTable from '../../../../components/Admin/Product/ProductTranlationTable';
import ProductDetailsContainer from '../../../../components/Admin/Product/ProductDetailsContainer';
import 'react-datepicker/dist/react-datepicker.css';
import { PRODUCT_TYPES } from '../../../../constants/constantData';
import { SERVER } from '../../../../constants';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.context.params.id,
      isLoading: true,
      product: {
        id: '',
        publisherPrice: '',
        discount: '',
        tax: '',
        issn: '',
        dewey: '',
        asb: '',
        originalTitle: '',
        originalDesc: '',
        weight: '',
        coverImage: '',
        creationDate: '',
        publisherPriceUpdatedAt: '',
        isSingleAvailabel: '',
        createdAt: '',
        updatedAt: '',

        productType: '',
        singleProductType: '',
        ageGroup: '',
        publisher: '',
        productLanguage: '',
        productStatus: '',
        contentCategory: [],
        translations: [],
        productPriceAndCost: [],
        subProducts: [],
      },
      allContentCategories: '',
      allPublishers: '',
      allLanguages: '',
      allAgeGroups: '',
      allProducts: '',
    };
    this.fetchProduct = this.fetchProduct.bind(this);
    this.fetchAllInfo = this.fetchAllInfo.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
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
    this.fetchProduct();
  }
  fetchProduct() {
    const url = `${SERVER}/getProduct`;
    // const url = `http://localhost:3004/getProduct`;
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
        console.log('subs: ', response.product.subProducts[0]);
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
    const url = `${SERVER}/getAuxInfoForAllProducts`;
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
          allContentCategories: response.contentTypes,
          allPublishers: response.publishers,
          allLanguages: response.languages,
          allAgeGroups: response.ageGroups,
          allProducts: response.products,
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
  onChangeInput(event) {
    const value = event.target.value;
    const state = event.target.name;
    let product = { ...this.state.product };
    product[state] = value;
    this.setState({ product });
  }
  // price controllers
  onPriceInputChange(e, index) {
    const value = e.target.value;
    const state = e.target.name;
    let product = { ...this.state.product };
    product.productPriceAndCost[index][state] = value;
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
    } else {
      product.productPriceAndCost[index].productPeriodName = so.label;
      product.productPriceAndCost[index].productPeriodId = so.value;
    }

    this.setState({ product });
  }
  onAddPrice(newPrice) {
    let product = { ...this.state.product };
    product.productPriceAndCost.push(newPrice);
    this.setState({ product });
  }
  onDeletePrice(index) {
    let product = { ...this.state.product };
    product.productPriceAndCost.splice(index, 1);
    this.setState({ product });
  }
  // translation controllers
  onTranslationInputChange(e, index) {
    const value = e.target.value;
    const state = e.target.name;
    let product = { ...this.state.product };
    product.translations[index][state] = value;
    this.setState({ product });
  }
  onTranslationSelectChange(so, index) {
    let product = { ...this.state.product };

    product.translations[index].label = so.label;
    product.translations[index].value = so.value;

    this.setState({ product });
  }
  onAddTranslation(newTranslation) {
    let product = { ...this.state.product };
    product.translations.push(newTranslation);
    this.setState({ product });
  }
  onDeleteTranslation(index) {
    let product = { ...this.state.product };
    product.translations.splice(index, 1);
    this.setState({ product });
  }
  // subproducts controllers
  onAddSubproduct(newSub) {
    let product = { ...this.state.product };
    let nsp = { ...this.state.allProducts };
    product.subProducts.push(nsp[newSub.index]);
    window.alert(newSub);
    this.setState({ product });
  }
  onDeleteSubproduct(index) {
    let product = { ...this.state.product };
    product.subProducts.splice(index, 1);
    this.setState({ product });
  }
  handleDateChange(date, stateName) {
    let product = { ...this.state.product };
    product[stateName] = date;
    this.setState({ product });
  }
  handleSelectChange = (selectedOption, op) => {
    let product = { ...this.state.product };
    product[op] = selectedOption;
    this.setState({ product });
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

  render() {
    return (
      <div>
        {' '}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div className="dashboard-ecommerce">
            <div className="container-fluid dashboard-content ">
              {/* pageheader   */}
              <PageHeader
                title="Product Detail"
                breadCrumbs={[
                  { link: '/admin/products', label: 'Products' },
                  { label: 'Product Detail' },
                ]}
              />
              <div class="col-xl-12 col-lg-8 col-md-6 col-sm-12 col-12">
                <div className={`${s.btnContainer} row`}>
                  <div className="offset-xl-2 col-3">
                    <button className="btn  btn-secondary">
                      Import Product
                    </button>
                  </div>
                  <div className="col-3">
                    <button className="btn btn-info">Export Product</button>
                  </div>
                  <div className="col-3">
                    <a className="btn btn-success"> Apply Changes</a>
                  </div>
                </div>
              </div>
              <div class="col-xl-12 col-lg-8 col-md-6 col-sm-12 col-12">
                <div class="influence-profile-content pills-regular">
                  <ul
                    class="nav nav-pills mb-3 nav-justified"
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
                      <div class="card">
                        <h5 class="card-header">Product Subproducts</h5>
                        <div class="card-body">
                          <SubproductTable
                            productId={this.state.product.id}
                            subproducts={this.state.product.subProducts}
                            productOptions={this.state.allLanguages}
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
                        <h5 class="card-header">Product Translations</h5>
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
                        <h5 class="card-header">Product Prices and Costs</h5>
                        <div class="card-body">
                          <ProductPriceTable
                            productId={this.state.product.id}
                            prices={this.state.product.productPriceAndCost}
                            zoneOptions={this.state.allAgeGroups}
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
                        <h5 class="card-header">Product Details</h5>
                        <div class={`${s.cardContainer} card-body`}>
                          <ProductDetailsContainer
                            hasType={false}
                            product={this.state.product}
                            allAgeGroups={this.state.allAgeGroups}
                            allContentCategories={
                              this.state.allContentCategories
                            }
                            allLanguages={this.state.allLanguages}
                            allPublishers={this.state.allPublishers}
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
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withStyles(s)(ProductDetail);
