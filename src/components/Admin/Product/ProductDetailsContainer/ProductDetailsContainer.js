import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import s from './ProductDetailsContainer.css';
import {
  PRODUCT_TYPES,
  PRODUCT_TYPE_ARRAY,
  SINGLE_PRODUCT_TYPE_ARRAY,
  PRODUCT_STATUS_ARRAY,
} from '../../../../constants/constantData';
class ProductDetailsLeftContainer extends React.Component {
  static propTypes = {
    hasType: PropTypes.bool.isRequired,
    product: PropTypes.object.isRequired,
    allLanguages: PropTypes.array.isRequired,
    allContentCategories: PropTypes.array.isRequired,
    allAgeGroups: PropTypes.array.isRequired,
    allPublishers: PropTypes.array.isRequired,
    uploadImage: PropTypes.func.isRequired,
    handleDateChange: PropTypes.func.isRequired,
    handleSelectChange: PropTypes.func.isRequired,
    handleUploadedImage: PropTypes.func.isRequired,
    onChangeInput: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.uploadImage = this.uploadImage.bind(this);
    this.handleUploadedImage = this.handleUploadedImage.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  uploadImage() {
    this.props.uploadImage();
  }
  handleUploadedImage() {
    this.props.handleUploadedImage();
  }
  onChangeInput() {
    this.props.onChangeInput();
  }
  handleSelectChange(so, name) {
    this.props.handleSelectChange(so, name);
  }
  handleDateChange(date, name) {
    this.props.handleDateChange(date, name);
  }
  render() {
    return (
      <div className="row">
        <div
          className={`col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pr-xl-0 pr-lg-0 pr-md-0  m-b-30 ${
            s.productImgContainer
          }`}
        >
          <img
            className="d-block"
            height="330"
            width="350"
            id="productCoverImg"
            src={this.props.product.coverImage}
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
          <div
            className={`product-description offset-xl-1 col-10 ${
              s.advancedContainer
            }`}
          >
            <h4 className="mb-1">Original Title </h4>
            <form className={s.dropDownContainer}>
              <div className="form-group">
                <input
                  name="originalTitle"
                  type="text"
                  className="form-control form-control-lg "
                  value={this.props.product.originalTitle}
                  onChange={this.onChangeInput}
                />
              </div>
              <div>
                <label>Product Language </label>
                <br />
                <Select
                  name="productLanguage"
                  options={this.props.allLanguages}
                  value={this.props.product.productLanguage}
                  onChange={so =>
                    this.handleSelectChange(so, 'productLanguage')
                  }
                />
              </div>
              {this.props.hasType ? (
                <div>
                  <label>Product Type </label>
                  <br />
                  <Select
                    name="productType"
                    options={PRODUCT_TYPE_ARRAY}
                    value={this.props.product.productType}
                    onChange={so => this.handleSelectChange(so, 'productType')}
                  />
                </div>
              ) : (
                ''
              )}
              {this.props.product.productType.value === PRODUCT_TYPES.Single ? (
                <div>
                  <label>Single Product Type </label>
                  <br />
                  <Select
                    name="singlProductType"
                    options={SINGLE_PRODUCT_TYPE_ARRAY}
                    value={this.props.product.singleProductType}
                    onChange={so =>
                      this.handleSelectChange(so, 'singleProductType')
                    }
                  />
                </div>
              ) : (
                ''
              )}

              <div>
                <label>Product Content Category </label>
                <br />
                <Select
                  name="contentCategory"
                  options={this.props.allContentCategories}
                  value={this.props.product.contentCategory}
                  isMulti
                  onChange={so =>
                    this.handleSelectChange(so, 'contentCategory')
                  }
                />
              </div>

              <div>
                <label>Product Age Group </label>
                <br />
                <Select
                  name="ageGroup"
                  options={this.props.allAgeGroups}
                  value={this.props.product.ageGroup}
                  onChange={so => this.handleSelectChange(so, 'ageGroup')}
                />
              </div>

              <div>
                <label>Product Status </label>
                <br />
                <Select
                  name="productStatus"
                  options={PRODUCT_STATUS_ARRAY}
                  value={this.props.product.productStatus}
                  onChange={so => this.handleSelectChange(so, 'productStatus')}
                />
              </div>
              <div>
                <label>Publisher </label>
                <br />
                <Select
                  name="publisher"
                  options={this.props.allPublishers}
                  value={this.props.product.publisher}
                  onChange={so => this.handleSelectChange(so, 'publisher')}
                />
              </div>
            </form>
          </div>
        </div>
        <div
          className={`${
            s.noPaddR
          } col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pl-xl-0 pl-lg-0 pl-md-0 border-left m-b-30`}
        >
          <div className="product-details">
            <div className="border-bottom pb-3 mb-3">
              <form className={s.productsmallInfoContainer}>
                <div className="form-group">
                  <label className="mb-0">Discount</label>
                  <br />
                  <input
                    name="discount"
                    type="text"
                    className="form-control form-control-sm"
                    value={this.props.product.discount}
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
                    value={this.props.product.tax}
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
                    value={this.props.product.issn}
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
                    value={this.props.product.dewey}
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
                    value={this.props.product.asb}
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
                    value={this.props.product.weight}
                    onChange={this.onChangeInput}
                  />
                </div>
                <div className="form-group">
                  <label className="mb-0">Created At </label>
                  <br />
                  <DatePicker
                    name="creationDate"
                    selected={
                      this.props.product.creationDate !== ''
                        ? new Date(this.props.product.creationDate)
                        : new Date()
                    }
                    onChange={date =>
                      this.handleDateChange(date, 'creationDate')
                    }
                  />
                </div>
                <div className="form-group">
                  <label className="mb-0">Price Updated At </label>
                  <br />
                  <DatePicker
                    name="publisherPriceUpdatedAt"
                    selected={
                      this.props.product.publisherPriceUpdatedAt !== ''
                        ? new Date(this.props.product.publisherPriceUpdatedAt)
                        : new Date()
                    }
                    onChange={date =>
                      this.handleDateChange(date, 'publisherPriceUpdatedAt')
                    }
                  />
                </div>
                <div className={`product-description ${s.productDescription}`}>
                  <label className="mb-1">Descriptions</label>
                  <textarea
                    onChange={this.onChangeInput}
                    value={this.props.product.originalDesc}
                    name="originalDesc"
                    rows="12"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProductDetailsLeftContainer);
