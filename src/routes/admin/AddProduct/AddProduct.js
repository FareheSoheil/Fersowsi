import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AddProduct.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  PRODUCT_TYPE_ARRAY,
  PRODUCT_PERIOD_ARRAY,
  SINGLE_PRODUCT_TYPE_ARRAY,
  PRODUCT_STATUS_ARRAY,
} from '../../../constants/constantData';
class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        price: '',
        discount: '',
        tax: '',
        issn: '',
        dewey: '',
        asb: '',
        englishTitle: '',
        englishDesc: '',
        weight: '',
        coverImage: '',
        creationDate: '',
        priceUpdatedAt: '',
        language: '',
        publisher: '',
        publisherPeriod: '',
        singleProductType: '',
        productType: '',
        productContentType: '',
        productStatus: '',
        ageGroup: '',
        status: '',
      },
      allproductContentTypes: '',
      allPublishers: '',
      allLanguages: '',
      allAgeGroups: '',
    };
    this.AddProduct = this.AddProduct.bind(this);
    this.fetchAllInfo = this.fetchAllInfo.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleUploadedImage = this.handleUploadedImage.bind(this);
  }
  AddProduct() {
    const url = fetchURL;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      product: this.state.product,
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
      'http://localhost:3000/getUserDetails',
      options,
      response => {
        that.setState({
          // product: response.product,
          isLoading: false,
        });
      },
      error => {
        console.log(error);
      },
    );
  }
  fetchAllInfo() {
    const url = `${SERVER}/getAllInfo`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      // searchBy: this.state.productsSearchFilter,
      // pageNumber: this.state.currentPageNumber,
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
          allproductContentTypes: response.allproductContentTypes,
          allPublishers: response.publishers,
          allLanguages: response.languages,
          allAgeGroups: response.ageGroups,
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
      <div className="dashboard-ecommerce">
        <div className="container-fluid dashboard-content ">
          {/* pageheader   */}
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="page-header">
                <h2 className="pageheader-title">Product Detail </h2>

                <div className="page-breadcrumb">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="/admin/products" className="breadcrumb-link">
                          Products
                        </a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Product Detail
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="row">
                <div
                  className={`col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pr-xl-0 pr-lg-0 pr-md-0  m-b-30 ${
                    s.productImgContainer
                  }`}
                >
                  <img
                    className="d-block"
                    height="300"
                    width="280"
                    id="productCoverImg"
                    src={this.state.product.coverImage}
                    alt="First slide"
                    onClick={this.uploadImage}
                  />
                  <div>
                    <input
                      onChange={this.handleUploadedImage}
                      style={{ display: 'none' }}
                      type="file"
                      id="fileInput"
                      name="fileInput"
                    />
                  </div>
                  <div className={`product-description ${s.advancedContainer}`}>
                    <h4 className="mb-1">English Title </h4>
                    <form className={s.dropDownContainer}>
                      <div className="form-group">
                        <input
                          name="englishTitle"
                          type="text"
                          className="form-control form-control-lg "
                          value={this.state.product.englishTitle}
                          onChange={this.onChangeInput}
                        />
                      </div>
                      <div>
                        <label>Product Language </label>
                        <br />
                        <Select
                          name="language"
                          options={this.state.allLanguages}
                          value={this.state.product.language}
                          onChange={so =>
                            this.handleSelectChange(so, 'language')
                          }
                        />
                      </div>
                      <div>
                        <label>Single Product Type </label>
                        <br />
                        <Select
                          name="singlProductType"
                          options={SINGLE_PRODUCT_TYPE_ARRAY}
                          value={this.state.product.singleProductType}
                          onChange={so =>
                            this.handleSelectChange(so, 'singlProductType')
                          }
                        />
                      </div>

                      <div>
                        <label>Product Content Type </label>
                        <br />
                        <Select
                          name="productContentType"
                          options={this.state.allproductContentTypes}
                          value={this.state.product.productContentType}
                          onChange={so =>
                            this.handleSelectChange(so, 'productContentType')
                          }
                        />
                      </div>

                      <div>
                        <label>Product Age Group </label>
                        <br />
                        <Select
                          name="ageGroup"
                          options={this.state.allAgeGroups}
                          value={this.state.product.ageGroup}
                          onChange={so =>
                            this.handleSelectChange(so, 'ageGroup')
                          }
                        />
                      </div>

                      <div>
                        <label>Product Period </label>
                        <br />
                        <Select
                          name="publisherPeriod"
                          options={PRODUCT_PERIOD_ARRAY}
                          value={this.state.product.publisherPeriod}
                          onChange={so =>
                            this.handleSelectChange(so, 'publisherPeriod')
                          }
                        />
                      </div>

                      <div>
                        <label>Product Status </label>
                        <br />
                        <Select
                          name="status"
                          options={PRODUCT_STATUS_ARRAY}
                          value={this.state.product.status}
                          onChange={so => this.handleSelectChange(so, 'status')}
                        />
                      </div>
                      <div>
                        <label>Publisher </label>
                        <br />
                        <Select
                          name="publisher"
                          options={this.state.allPublishers}
                          value={this.state.product.publisher}
                          onChange={so =>
                            this.handleSelectChange(so, 'publisher')
                          }
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pl-xl-0 pl-lg-0 pl-md-0 border-left m-b-30">
                  <div className="product-details">
                    <div className="border-bottom pb-3 mb-3">
                      <form className={s.productsmallInfoContainer}>
                        <div className="form-group">
                          <label className="mb-0">Price </label>
                          <br />
                          <input
                            name="price"
                            type="text"
                            className="form-control form-control-sm "
                            value={this.state.product.price}
                            onChange={this.onChangeInput}
                          />
                        </div>
                        <div className="form-group">
                          <label className="mb-0">Discount</label>
                          <br />
                          <input
                            name="discount"
                            type="text"
                            className="form-control form-control-sm"
                            value={this.state.product.discount}
                            onChange={this.onChangeInput}
                          />
                        </div>
                        <div className="form-group">
                          <label className="mb-0">Tax</label>
                          <br />
                          <input
                            name="tax"
                            type="text"
                            className="form-control form-control-sm"
                            value={this.state.product.tax}
                            onChange={this.onChangeInput}
                          />
                        </div>
                        <div className="form-group">
                          <label className="mb-0">ISSN</label>
                          <br />
                          <input
                            name="issn"
                            type="text"
                            className="form-control form-control-sm"
                            value={this.state.product.issn}
                            onChange={this.onChangeInput}
                          />
                        </div>
                        <div className="form-group">
                          <label>Dewey</label>
                          <br />
                          <input
                            name="dewey"
                            type="text"
                            className="form-control form-control-sm"
                            value={this.state.product.dewey}
                            onChange={this.onChangeInput}
                          />
                        </div>
                        <div className="form-group">
                          <label>ASB</label>
                          <br />
                          <input
                            name="asb"
                            type="text"
                            className="form-control form-control-sm"
                            value={this.state.product.asb}
                            onChange={this.onChangeInput}
                          />
                        </div>
                        <div className="form-group">
                          <label>weight</label>
                          <br />
                          <input
                            name="weight"
                            type="text"
                            className="form-control form-control-sm"
                            value={this.state.product.weight}
                            onChange={this.onChangeInput}
                          />
                        </div>
                        <div className="form-group">
                          <label className="mb-0">Created At </label>
                          <br />
                          <DatePicker
                            name="creationDate"
                            selected={this.state.product.creationDate}
                            onChange={date =>
                              this.handleDateChange(date, 'creationDate')
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label className="mb-0">Price Updated At </label>
                          <br />
                          <DatePicker
                            name="priceUpdatedAt"
                            selected={this.state.product.priceUpdatedAt}
                            onChange={date =>
                              this.handleDateChange(date, 'priceUpdatedAt')
                            }
                          />
                        </div>
                        <div
                          className={`product-description ${
                            s.productDescription
                          }`}
                        >
                          <label className="mb-1">Descriptions</label>
                          <textarea
                            onChange={this.onChangeInput}
                            name=""
                            rows="15"
                          >
                            {this.state.product.englishDesc}
                          </textarea>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <a className="btn btn-rounded btn-danger">
                    <i className="fas fa-trash-alt" />&nbsp;&nbsp;Import Product
                  </a>
                </div>
                <div className="col-3">
                  <a className="btn btn-rounded btn-danger">
                    <i className="fas fa-trash-alt" />&nbsp;&nbsp;Export Product
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
        </div>
      </div>
    );
  }
}
export default withStyles(s)(AddProduct);
