import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Select from 'react-select';
import cookie from 'react-cookies';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import history from '../../../history';
import zeroTrimmer from '../../../zeroTrimmer';
import { SSRSERVER, SERVER } from '../../../constants';
import { USER_SUBCATEGORY } from '../../../constants/constantData';

import { PRODUCT_STATUS } from '../../../constants/constantData';
import s from './ProductItem.css';
class ProductItem extends React.Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    hasWish: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedPrice: '',
    };
    this.onPriceChange = this.onPriceChange.bind(this);
    this.addToWishList = this.addToWishList.bind(this);
    this.gotoProductDetails = this.gotoProductDetails.bind(this);
  }
  onPriceChange(so) {
    // e.stopPropagation();
    this.setState({
      selectedPrice: so,
    });
  }
  addToWishList(e) {
    e.stopPropagation();
    if (this.state.selectedPrice === '') window.alert('please choose a price');
    else {
      const url = `${SERVER}/addToBasket`;
      this.setState({
        isLoading: true,
      });
      const credential = {
        productId: this.props.product.id,
        productPriceAndCostId: this.state.selectedPrice.value,
      };
      window.alert(JSON.stringify(credential));
      const options = {
        method: 'POST',
        body: JSON.stringify(credential),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const that = this;
      fetchWithTimeOut(
        url,
        options,
        response => {
          window.alert('added successfully');
          that.setState({
            selectedPrice: '',
            isLoading: false,
          });
        },
        error => {
          console.log(error);
        },
      );
    }
  }
  gotoProductDetails() {
    history.push(`/user/products/${this.props.product.id}`);
  }
  render() {
    let prices = this.props.product.productPriceAndCost;
    let categories = this.props.product.contentCategory;
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
        class={`${s.container} col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 `}
      >
        <div class="container-fluid ">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
              {' '}
              <div className={s.imgContainer}>
                {' '}
                <img
                  onClick={this.gotoProductDetails}
                  src={this.props.product.coverImage}
                />
              </div>
            </div>
            <div className="col-xl-8 col-lg-9 col-md-12">
              <div
                className={`${s.title} row`}
                onClick={this.gotoProductDetails}
              >
                <div className="col-12">
                  <u>{this.props.product.originalTitle}</u>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  {this.props.product.ageGroup.label} |{' '}
                  {this.props.product.productLanguage.label}
                </div>
              </div>
              <div className="row mt-1">
                <div
                  className={
                    this.props.product.productStatus.value ===
                    PRODUCT_STATUS.Ready.value
                      ? `${s.green} col-12`
                      : this.props.product.productStatus.value ===
                        PRODUCT_STATUS.NotAvailable.value
                        ? `${s.yellow} col-12`
                        : `${s.red} col-12`
                  }
                >
                  {this.props.product.productStatus.label}
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <div className={s.categories}>
                    <label>Categories :</label> {manCategories}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className={s.description}>
                    {this.props.product.originalDesc}
                  </div>
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
                      this.onPriceChange(so);
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
            </div>

            {this.props.hasWish ? (
              <div className="col-xl-1">
                <div className={s.wishContainer}>
                  <i
                    onClick={e => this.addToWishList(e)}
                    class={
                      this.props.isWished
                        ? `${s.isWished} fas fa-heart`
                        : 'fas fa-heart'
                    }
                  />
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProductItem);
