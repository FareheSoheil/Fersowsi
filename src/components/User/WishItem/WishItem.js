import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Select from 'react-select';
import cookie from 'react-cookies';
import DatePicker from 'react-datepicker';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import history from '../../../history';
import zeroTrimmer from '../../../zeroTrimmer';
import arrayResolver from '../../../arrayResolver';
import { SERVER } from '../../../constants';
import { USER_SUBCATEGORY } from '../../../constants/constantData';
// import { PRODUCT_STATUS } from '../../../constants/constantData';
import s from './WishItem.css';
class WishItem extends React.Component {
  static propTypes = {
    wish: PropTypes.object.isRequired,
    handleOnDelete: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedPrice: '',
      selectedAddress: '',
      startDate: '',
      count: '',
      endDate: '',
      allAddresses: '',
    };
    this.gotoProductDetails = this.gotoProductDetails.bind(this);
    this.fetchAddresses = this.fetchAddresses.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    this.fetchAddresses();
    this.setState({
      selectedPrice: {
        value: this.props.wish.selectedProductPriceAndCost[0].id,
        label: `${
          this.props.wish.selectedProductPriceAndCost[0].zoneName
        } with ${
          this.props.wish.selectedProductPriceAndCost[0].deliveryTypeName
        } ${
          this.props.wish.selectedProductPriceAndCost[0]
            .ProductSubscriptionTypeName
        }`,
        instPrice: this.props.wish.selectedProductPriceAndCost[0]
          .institutionalCustomerPrice,
        privatePrice: this.props.wish.selectedProductPriceAndCost[0]
          .privateCustomerPrice,
      },
    });
  }
  onSelectChange(so, op) {
    this.setState(
      {
        [op]: so,
      },
      () => {
        this.props.setShoppingDetails(this.props.index, op, so.value);
      },
    );
  }
  onInputChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.props.setShoppingDetails(this.props.index, name, value);
      },
    );
  }
  handleDateChange(date, name) {
    this.setState(
      {
        [name]: date,
      },
      () => {
        this.props.setShoppingDetails(this.props.index, name, date);
      },
    );
  }
  fetchAddresses() {
    const url = `${SERVER}/getAllAddressesOfSpecificUser`;
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
          allAddresses: arrayResolver(response, 'id', [
            'countryName',
            'province',
            'city',
            'detailAddress',
          ]),

          isLoading: false,
        });
      },
      error => {
        console.log(error);
      },
    );
  }
  gotoProductDetails() {
    history.push(`/user/products/${this.props.wish.id}`);
  }
  render() {
    // console.log('WishS : ', this.props.wish);
    let prices = this.props.wish.productPriceAndCost;
    let categories = this.props.wish.contentCategory;
    let manCategories = '';
    let manPrices = [];

    if (prices.length > 0) {
      prices.map((price, i) => {
        manPrices.push({
          label: `${price.zoneName} with ${price.deliveryTypeName} ${
            price.ProductSubscriptionTypeName
          }`,
          instPrice: price.institutionalCustomerPrice,
          privatePrice: price.privateCustomerPrice,
          value: price.id,
        });
      });
    }
    if (categories.length > 0) {
      categories.map(
        (category, i) =>
          (manCategories = `${category.label} ,${manCategories}`),
      );
    }
    return (
      <div
        className={
          this.props.isWished
            ? `${s.container} ${
                s.wishedItem
              } col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 `
            : `${s.container} col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 `
        }
      >
        <div class="container-fluid ">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
              {' '}
              <div className={s.imgContainer}>
                {' '}
                <img
                  onClick={this.gotoProductDetails}
                  // width="180"
                  // height="200"
                  src={this.props.wish.coverImage}
                />
              </div>
            </div>
            <div className="col-xl-7 col-lg-9 col-md-12">
              <div className={`${s.title} row`}>
                <div className="col-12">
                  <u>{this.props.wish.originalTitle}</u>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  {this.props.wish.productLanguage.label} &nbsp; | &nbsp;{' '}
                  {manCategories}
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <div className={s.categories}>
                    <label>Periodical :</label>
                    {this.props.wish.productPeriod.label}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <div className={s.categories}>
                    <label>ISSN :</label> {this.props.wish.issn}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-10">
                  <div className={s.categories}>
                    <label>Price :</label> {this.props.wish.privatePrice}
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-7">
                  <div className={s.count}>
                    <label>Count :</label>{' '}
                    <input
                      name="count"
                      type="number"
                      value={this.state.count}
                      onChange={e => {
                        this.onInputChange(e);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-xl-7">
                  <label>Start Date : </label>{' '}
                  <DatePicker
                    name="startDate"
                    selected={
                      this.state.startDate !== ''
                        ? new Date(this.state.startDate)
                        : new Date()
                    }
                    onChange={date => this.handleDateChange(date, 'startDate')}
                  />{' '}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-xl-7">
                  <label>End Date : </label>{' '}
                  <DatePicker
                    name="endDate"
                    selected={
                      this.state.endDate !== ''
                        ? new Date(this.state.endDate)
                        : new Date()
                    }
                    onChange={date => this.handleDateChange(date, 'endDate')}
                  />{' '}
                </div>
              </div>

              <div className={`${s.select} row`}>
                <div className="col-xl-7 col-lg-6 col-md-8 col-sm-12 mb-2">
                  <Select
                    isDisabled={this.props.isDisabled}
                    options={manPrices}
                    value={this.state.selectedPrice}
                    onClick={e => e.stopPropagation()}
                    onChange={so => {
                      this.onSelectChange(so, 'selectedPrice');
                    }}
                  />
                </div>
                {cookie.load('userSubCategory') !== USER_SUBCATEGORY.Single ? (
                  <div className="col-xl-3 col-lg-2 col-md-2 col-sm-12">
                    Institutional Price <br />
                    <span>
                      {zeroTrimmer(this.state.selectedPrice.privatePrice)}
                    </span>
                  </div>
                ) : (
                  <div className="col-xl-3 col-lg-2 col-md-2 col-sm-12">
                    Private Price <br />
                    <span>
                      {zeroTrimmer(this.state.selectedPrice.instPrice)}
                    </span>
                  </div>
                )}
              </div>
              <div className={`${s.select} row`}>
                <div className="col-xl-10 col-lg-6 col-md-8 col-sm-12 mb-2">
                  <Select
                    options={this.state.allAddresses}
                    value={this.state.selectedAddress}
                    onClick={e => e.stopPropagation()}
                    onChange={so => {
                      this.onSelectChange(so, 'selectedAddress');
                    }}
                  />
                </div>
                {/* {cookie.load('userSubCategory') !== USER_SUBCATEGORY.Single ? (
                  <div className="col-xl-3 col-lg-2 col-md-2 col-sm-12">
                    Institutional Price <br />
                    <span>
                      {zeroTrimmer(this.state.selectedPrice.privatePrice)}
                    </span>
                  </div>
                ) : (
                  <div className="col-xl-3 col-lg-2 col-md-2 col-sm-12">
                    Private Price <br />
                    <span>
                      {zeroTrimmer(this.state.selectedPrice.instPrice)}
                    </span>
                  </div>
                )} */}
              </div>

              <div className="row">
                <div className="col-12">
                  <div className={s.description}>
                    <textarea value={this.props.wish.originalDesc} rows="7" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-2">
              <div className="row">
                <div className="col-xl-12">
                  <div className={s.deleteBtnContainer}>
                    <button
                      onClick={() =>
                        this.props.handleOnDelete(this.props.wish.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <div className={s.selectBtnContainer}>
                    <button
                      className={this.props.isWished ? s.isWished : s.notWished}
                      onClick={() =>
                        this.props.handleWighItemSelect(
                          this.props.wish.id,
                          this.props.index,
                        )
                      }
                    >
                      {this.props.isWished ? 'Unselect' : 'Select'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(WishItem);
