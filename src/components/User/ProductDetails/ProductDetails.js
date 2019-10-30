import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Select from 'react-select';
import cookie from 'react-cookies';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import history from '../../../history';
import zeroTrimmer from '../../../zeroTrimmer';
import { USER_SUBCATEGORY, SERVER } from '../../../constants/constantData';
import s from './ProductDetails.css';
class ProductDetails extends React.Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedPrice: '',
    };
    this.onPriceChange = this.onPriceChange.bind(this);
    this.addToWishList = this.addToWishList.bind(this);
  }
  onPriceChange(so) {
    this.setState({
      selectedPrice: so,
    });
  }
  addToWishList() {
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
          history.push('/user/products');
        },
        error => {
          console.log(error);
        },
      );
    }
  }

  render() {
    let prices = this.props.product.productPriceAndCost;
    let categories = this.props.product.contentCategory;
    let manCategories = '';
    let manPrices = [];
    if (prices.length > 0) {
      prices.map((price, i) => {
        manPrices.some(
          item =>
            item.id ===
            `${price.productSubscriptionTypeId} # ${price.productPeriodId}`,
        )
          ? ''
          : manPrices.push({
              label: `${price.ProductSubscriptionTypeName} with ${
                price.productPeriodName
              } period`,
              value: i,
              id: `${price.productSubscriptionTypeId} # ${
                price.productPeriodId
              }`,
              privatePrice: price.privateCustomerPrice,
              instPrice: price.institutionalCustomerPrice,
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
            <div className="col-xl-2 col-lg-2 col-md-12">
              {' '}
              <div className={s.imgContainer}>
                {' '}
                <img
                  width="140"
                  height="180"
                  src={this.props.product.coverImage}
                />
              </div>
            </div>
            <div
              className="col-xl-9 col-lg-9 col-md-11"
              style={{ paddingLeft: '20px' }}
            >
              <div className={`${s.title} row`}>
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

              <div className="row">
                <div className="col-10">
                  <div className={s.details}>
                    <label>Categories :</label> {manCategories}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <div className={s.details}>
                    <label>asb :</label> {this.props.product.asb}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <div className={s.details}>
                    <label>issn :</label> {this.props.product.issn}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <div className={s.details}>
                    <label>dewey :</label> {this.props.product.dewey}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <div className={s.details}>
                    <label>Product Type :</label>{' '}
                    {this.props.product.productType.label}
                  </div>
                </div>
              </div>
              {this.props.product.productType.value === 1 ? (
                <div className="row">
                  <div className="col-10">
                    <div className={s.SingleType}>
                      <label>Single Product Type :</label>{' '}
                      {this.props.product.singleProductType.label}
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
              <div className="row">
                <div className="col-12">
                  <div className={s.description}>
                    {this.props.product.originalDesc}
                  </div>
                </div>
              </div>
              <div className={`${s.select} row`}>
                {cookie.load('userSubCategory') !== USER_SUBCATEGORY.Single ? (
                  <div className="col-xl-3 col-lg-2 col-md-2 col-sm-12">
                    <label> Institutional Price </label>
                  </div>
                ) : (
                  <div className="col-xl-3 col-lg-2 col-md-2 col-sm-12">
                    <label>Private Price</label>
                  </div>
                )}
                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-12">
                  <Select
                    options={manPrices}
                    value={this.state.selectedPrice}
                    onChange={this.onPriceChange}
                  />
                </div>
                {cookie.load('userSubCategory') !== USER_SUBCATEGORY.Single ? (
                  <div className="col-xl-1 col-lg-2 col-md-2 col-sm-12">
                    <span>
                      {zeroTrimmer(this.state.selectedPrice.privatePrice)}
                    </span>
                  </div>
                ) : (
                  <div className="col-xl-1 col-lg-2 col-md-2 col-sm-12">
                    <span>
                      {zeroTrimmer(this.state.selectedPrice.instPrice)}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="col-xl-1">
              <div className={s.wishContainer}>
                <i
                  onClick={this.addToWishList}
                  class={
                    this.props.isWished
                      ? `${s.isWished} fas fa-heart`
                      : 'fas fa-heart'
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProductDetails);
