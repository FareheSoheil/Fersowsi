import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import s from './ProductDetailsContainer.css';
import zeroTrimmer from '../../../../zeroTrimmer';
import {
  PRODUCT_TYPES,
  PRODUCT_TYPE_ARRAY,
  SINGLE_PRODUCT_TYPE_ARRAY,
  PRODUCT_STATUS_ARRAY,
  PRODUCT_STATUS,
} from '../../../../constants/constantData';
class ProductDetailsLeftContainer extends React.Component {
  static propTypes = {
    hasType: PropTypes.bool.isRequired,
    product: PropTypes.object.isRequired,
    allPeriods: PropTypes.array.isRequired,
    allLanguages: PropTypes.array.isRequired,
    allContentCategories: PropTypes.array.isRequired,
    allAgeGroups: PropTypes.array.isRequired,
    allPublishers: PropTypes.array.isRequired,
    uploadImage: PropTypes.func.isRequired,
    handleDateChange: PropTypes.func.isRequired,
    handleSelectChange: PropTypes.func.isRequired,
    handleUploadedImage: PropTypes.func.isRequired,
    onChangeInput: PropTypes.func.isRequired,
    changeStatus: PropTypes.func.isRequired,
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
  onChangeInput(e, type) {
    this.props.onChangeInput(e, type);
  }
  handleSelectChange(so, name) {
    this.props.handleSelectChange(so, name);
  }
  handleDateChange(date, name) {
    this.props.handleDateChange(date, name);
  }
  render() {
    return (
      <div className={s.mainContainer}>
        <div className="row">
          <div className={`col-xl-9 col-lg-6 col-md-6 col-sm-12 col-12  pr-3`}>
            <div
              className={`product-description col-12 ${s.advancedContainer}`}
            >
              <form className={s.dropDownContainer}>
                <div className="row">
                  <div className="col-xl-4">
                    <div className="form-group">
                      <label className="mb-1"> Title </label>
                      <input
                        name="originalTitle"
                        type="text"
                        className="form-control form-control-lg "
                        value={this.props.product.originalTitle}
                        onChange={e => this.onChangeInput(e, 'txt')}
                      />
                    </div>
                  </div>
                  <div className="col-xl-4">
                    <div className="form-group">
                      <label>Publisher </label>
                      <br />
                      <Select
                        name="publisher"
                        options={this.props.allPublishers}
                        value={this.props.product.publisher}
                        onChange={so =>
                          this.handleSelectChange(so, 'publisher')
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-2">
                    <div className="form-group">
                      <label className="mb-1">ISSN</label>
                      <input
                        name="issn"
                        type="text"
                        className="form-control form-control-sm"
                        value={this.props.product.issn}
                        onChange={e => this.onChangeInput(e, 'num')}
                      />
                    </div>
                  </div>
                  <div className="col-xl-2">
                    <div className="form-group">
                      <label className="mb-1">Dewey</label>
                      <input
                        name="dewey"
                        type="text"
                        className="form-control form-control-sm"
                        value={this.props.product.dewey}
                        onChange={e => this.onChangeInput(e, 'num')}
                      />
                    </div>
                  </div>
                </div>
                <div className="row border-top pt-3">
                  <div className="col-xl-4">
                    <div className="form-group">
                      <label>Product Period </label>
                      <br />
                      <Select
                        name="productPeriod"
                        options={this.props.allPeriods}
                        value={this.props.product.productPeriod}
                        onChange={so =>
                          this.handleSelectChange(so, 'productPeriod')
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-4">
                    <div className="form-group">
                      <label>Product Type </label>
                      <br />
                      <Select
                        name="productType"
                        options={PRODUCT_TYPE_ARRAY}
                        value={this.props.product.productType}
                        onChange={so =>
                          this.handleSelectChange(so, 'productType')
                        }
                      />
                    </div>{' '}
                  </div>
                  <div className="col-xl-4">
                    <div className="form-group">
                      <label>Single Product Type </label>

                      <Select
                        name="singlProductType"
                        options={SINGLE_PRODUCT_TYPE_ARRAY}
                        value={this.props.product.singleProductType}
                        onChange={so =>
                          this.handleSelectChange(so, 'singleProductType')
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row border-top pt-3">
                  <div className="col-xl-6">
                    <div className="form-group">
                      <label>Content Category </label>

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
                  </div>
                  <div className="col-xl-3">
                    <div className="form-group">
                      <label>Age Group </label>
                      <Select
                        name="ageGroup"
                        options={this.props.allAgeGroups}
                        value={this.props.product.ageGroup}
                        onChange={so => this.handleSelectChange(so, 'ageGroup')}
                      />
                    </div>
                  </div>
                  <div className="col-xl-2">
                    <div className="form-group">
                      <label className="mb-1">Discount</label>
                      <br />
                      <input
                        name="discount"
                        type="text"
                        className="form-control form-control-sm"
                        value={zeroTrimmer(
                          this.props.product.discount,
                          'price',
                        )}
                        onChange={e => this.onChangeInput(e, 'num')}
                      />
                    </div>{' '}
                  </div>
                </div>
                <div className="row border-top pt-3">
                  <div className="col-xl-2">
                    <div className="form-group">
                      <label className="mb-1">ASB</label>
                      <input
                        name="asb"
                        type="text"
                        className="form-control form-control-sm"
                        value={this.props.product.asb}
                        onChange={e => this.onChangeInput(e, 'num')}
                      />
                    </div>
                  </div>
                  <div className="col-xl-2">
                    <div className="form-group">
                      <label className="mb-1">Tax</label>
                      <input
                        name="tax"
                        type="text"
                        className="form-control form-control-sm"
                        value={zeroTrimmer(this.props.product.tax, 'price')}
                        onChange={e => this.onChangeInput(e, 'num')}
                      />
                    </div>
                  </div>
                  <div className="col-xl-2">
                    <div className="form-group">
                      <label className="mb-1">Weight (g)</label>
                      <input
                        name="weight"
                        type="text"
                        className="form-control form-control-sm"
                        value={zeroTrimmer(this.props.product.weight)}
                        onChange={e => this.onChangeInput(e, 'num')}
                      />
                    </div>
                  </div>
                  <div className="col-xl-2">
                    <div className="form-group">
                      <label className="mb-1">Created At </label>
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
                  </div>
                  <div className="col-xl-3">
                    <div className="form-group">
                      <label className="mb-1">Price Updated At </label>
                      <DatePicker
                        name="publisherPriceUpdatedAt"
                        selected={
                          this.props.product.publisherPriceUpdatedAt !== ''
                            ? new Date(
                                this.props.product.publisherPriceUpdatedAt,
                              )
                            : new Date()
                        }
                        onChange={date =>
                          this.handleDateChange(date, 'publisherPriceUpdatedAt')
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className={`${s.statusBtns} row border-top pt-4 pl-2`}>
                  <div className="col-xl-2">
                    <label>Product Status </label>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12">
                    {' '}
                    <button
                      className="btn btn-success"
                      disabled={
                        this.props.product.productStatus.value ===
                        PRODUCT_STATUS.Ready.value
                      }
                      onClick={() => {
                        this.props.changeStatus(PRODUCT_STATUS.Ready);
                      }}
                    >
                      Ready
                    </button>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12">
                    {' '}
                    <button
                      className="btn btn-warning"
                      disabled={
                        this.props.product.productStatus.value ===
                        PRODUCT_STATUS.Pending.value
                      }
                      onClick={() => {
                        this.props.changeStatus(PRODUCT_STATUS.Pending);
                      }}
                    >
                      Pending
                    </button>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12">
                    {' '}
                    <button
                      className="btn btn-danger"
                      disabled={
                        this.props.product.productStatus.value ===
                        PRODUCT_STATUS.NotAvailable.value
                      }
                      onClick={() => {
                        this.props.changeStatus(PRODUCT_STATUS.NotAvailable);
                      }}
                    >
                      Not Available
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div
            className={`${
              s.noPaddR
            } col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12`}
          >
            {/* <div className="product-detailss"> */}
            <div className="pb-3 mb-3">
              <form className={s.productsmallInfoContainer}>
                <div className="row">
                  <div
                    className={
                      this.props.product.productStatus.value ==
                      PRODUCT_STATUS.NotAvailable.value
                        ? `${s.notAvailable} col-xl-12 `
                        : this.props.product.productStatus.value ===
                          PRODUCT_STATUS.Ready.value
                          ? `${s.ready} col-xl-12`
                          : `${s.pending} col-xl-12`
                    }
                  >
                    <img
                      height="250"
                      // width="270"
                      className={s.productCover}
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
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-xl-12">
                    <div className="form-group">
                      <label className="mb-1"> Title </label>
                      <input
                        name="originalTitle"
                        type="text"
                        className="form-control form-control-lg "
                        value={this.props.product.originalTitle}
                        onChange={e => this.onChangeInput(e, 'txt')}
                      />
                    </div>
                  </div>
                </div> */}

                {/* <div className="form-group">
                  <label>weight</label>
                  <br />
                  <input
                    name="weight"
                    type="text"
                    className="form-control form-control-sm"
                    value={zeroTrimmer(this.props.product.weight)}
                    onChange={e => this.onChangeInput(e, 'num')}
                  />
                </div> */}

                <div
                  className={`mt-3 product-description ${s.productDescription}`}
                >
                  <label className="mb-1">Descriptions</label>
                  <textarea
                    onChange={e => this.onChangeInput(e, 'txt')}
                    value={this.props.product.originalDesc}
                    name="originalDesc"
                    rows="8"
                  />
                </div>
              </form>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProductDetailsLeftContainer);
