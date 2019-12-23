import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Select from 'react-select';
import cookie from 'react-cookies';
import DatePicker from 'react-datepicker';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import AddAddress from '../../../components/User/AddAddress';
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
      startDate: new Date(),
      count: '',
      endDate: '',
      allAddresses: '',
    };
    this.gotoProductDetails = this.gotoProductDetails.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    // this.fetchAddresses();
    if (this.props.wish.product.selectedProductPriceAndCost[0] != undefined)
      this.setState(
        {
          selectedPrice: {
            value: this.props.wish.product.selectedProductPriceAndCost[0].id,
            label: `${
              this.props.wish.product.selectedProductPriceAndCost[0].zoneName
            } with ${
              this.props.wish.product.selectedProductPriceAndCost[0]
                .deliveryTypeName
            } ${
              this.props.wish.product.selectedProductPriceAndCost[0]
                .ProductSubscriptionTypeName
            }`,
            index: this.props.index,
            period: this.props.wish.product.selectedProductPriceAndCost[0]
              .ProductSubscriptionTypeName,
            instPrice: this.props.wish.product.selectedProductPriceAndCost[0]
              .institutionalCustomerPrice,
            privatePrice: this.props.wish.product.selectedProductPriceAndCost[0]
              .privateCustomerPrice,
          },
          startDate: this.startDateCalculator(),
          endDate: this.endDateCalculator(
            this.props.wish.product.selectedProductPriceAndCost[0],
          ),
        },
        () => {
          // this.props.setShoppingDetails(this.props.index, op, so.value);
          this.props.setShoppingDetails(
            this.props.index,
            'startDate',
            this.state.startDate,
          );
          this.props.setShoppingDetails(
            this.props.index,
            'endDate',
            this.state.endDate,
          );
        },
      );
    // if()
  }
  startDateCalculator() {
    let tomorrow = new Date(new Date());
    tomorrow.setDate(tomorrow.getDate() + 1);

    return tomorrow;
  }
  endDateCalculator(so) {
    // let tomorrow = new Date(new Date());
    let end = new Date(new Date());
    // tomorrow.setDate(tomorrow.getDate() + 1);
    if (so.ProductSubscriptionTypeName == '6-Month')
      end.setMonth(end.getMonth() + 6);
    else if (so.ProductSubscriptionTypeName == '12-Month')
      end.setMonth(end.getMonth() + 12);
    else end.setMonth(end.getMonth() + 12);
    return end;
  }
  dateCalculator(so) {
    let tomorrow = new Date(new Date());
    let end = new Date(new Date());
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (so.period == '6-Month') end.setMonth(end.getMonth() + 6);
    else if (so.period == '12-Month') end.setMonth(end.getMonth() + 12);
    else end.setMonth(end.getMonth() + 12);
    return { tomorrow: tomorrow, end: end };
  }
  onSelectChange(so, op) {
    if (op == 'selectedPrice') {
      let preState = { ...this.state };
      let tomorrow = this.dateCalculator(so).tomorrow;
      let end = this.dateCalculator(so).end;

      preState.startDate = tomorrow;

      preState.endDate = end;
      preState.selectedPrice = so;
      this.setState(preState, () => {
        this.props.setShoppingDetails(this.props.index, op, so.value);
        this.props.setShoppingDetails(this.props.index, 'startDate', tomorrow);
        this.props.setShoppingDetails(this.props.index, 'endDate', end);
      });
    } else {
      this.setState(
        {
          [op]: so,
        },
        () => {
          this.props.setShoppingDetails(this.props.index, op, so.value);
        },
      );
    }
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
    if (name == 'startDate') {
      // let tomorrow = new Date(new Date());
      let end = new Date(date);
      // tomorrow.setDate(tomorrow.getDate() + 1);
      if (this.state.selectedPrice.period == '6-Month') {
        end.setMonth(end.getMonth() + 6);
      } else if (this.state.selectedPrice.period == '12-Month')
        end.setMonth(end.getMonth() + 12);
      else end.setMonth(end.getMonth() + 12);

      this.setState(
        {
          startDate: date,
          endDate: end,
        },
        () => {
          this.props.setShoppingDetails(this.props.index, 'startDate', date);
          this.props.setShoppingDetails(this.props.index, 'endDate', end);
        },
      );
    } else
      this.setState(
        {
          [name]: date,
        },
        () => {
          this.props.setShoppingDetails(this.props.index, name, date);
        },
      );
  }
  addAddress() {
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
    history.push(`/user/products/${this.props.wish.product.id}`);
  }
  render() {
    // console.log('WishS : ', this.props.wish.product.;
    let prices = this.props.wish.product.productPriceAndCost;
    let categories = this.props.wish.product.contentCategory;
    let manCategories = '';
    let manPrices = [];
    const sign = parseInt(localStorage.getItem('currency'));

    if (prices.length > 0) {
      prices.map((price, i) => {
        manPrices.push({
          label: `${price.zoneName} with ${price.deliveryTypeName} ${
            price.ProductSubscriptionTypeName
          }`,
          index: i,
          period: price.ProductSubscriptionTypeName,
          instPrice: price.institutionalCustomerPrice[sign],
          privatePrice: price.privateCustomerPrice[sign],
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
    // if (window != undefined) window.alert('rendering');

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
            <div className="col-xl-2 col-lg-3 col-md-12 col-sm-12">
              {' '}
              <div className={s.imgContainer}>
                {' '}
                <img
                  onClick={this.gotoProductDetails}
                  src={this.props.wish.product.coverImage}
                />
              </div>
            </div>
            <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12">
              <div className="row mb-3">
                <div className="col-xl-4 pl-3">
                  <div className="row mb-2">
                    <div className={`${s.title} col-12`}>
                      <u>{this.props.wish.product.originalTitle}</u>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 ">
                      <div className={s.categories}>
                        <label>
                          {this.props.wish.product.productLanguage.label}
                        </label>{' '}
                        &nbsp; | &nbsp; {manCategories}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-10">
                      <div className={s.details}>
                        <label>Periodical : </label>
                        {this.props.wish.product.productPeriod.label}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-10">
                      <div className={s.details}>
                        <label>ISSN :</label> {this.props.wish.product.issn}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-8">
                  <div className="row">
                    <div className="col-xl-4 col-lg-2 col-md-3 col-sm-3">
                      <div className={s.count}>
                        <label>Count :</label>
                        <br />
                        <input
                          min="1"
                          name="count"
                          type="number"
                          value={this.state.count}
                          onChange={e => {
                            this.onInputChange(e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-6">
                      <div className={s.details}>
                        <label>Start Date : &nbsp;</label> <br />
                        <DatePicker
                          name="startDate"
                          selected={
                            this.state.startDate !== ''
                              ? new Date(this.state.startDate)
                              : ''
                          }
                          onChange={date =>
                            this.handleDateChange(date, 'startDate')
                          }
                        />{' '}
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-6">
                      <div className={s.details}>
                        <label>End Date : &nbsp;&nbsp; </label> <br />
                        <DatePicker
                          name="endDate"
                          selected={
                            this.state.endDate !== ''
                              ? new Date(this.state.endDate)
                              : ''
                          }
                          onChange={date =>
                            this.handleDateChange(date, 'endDate')
                          }
                        />{' '}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-xl-4 col-lg-2 col-md-3 col-sm-3">
                      <div className={s.count}>
                        <label>Customer Name :</label>
                        <br />
                        <input
                          name="reciverName"
                          type="text"
                          value={this.state.reciverName}
                          onChange={e => {
                            this.onInputChange(e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-6">
                      <div className={s.count}>
                        <label>Contract Person : &nbsp;</label> <br />
                        <input
                          name="contactPerson"
                          type="text"
                          value={this.state.contactPerson}
                          onChange={e => {
                            this.onInputChange(e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-6">
                      <div className={s.count}>
                        <label>User Order Number </label> <br />
                        <input
                          name="userOrderNumber"
                          type="text"
                          value={this.state.userOrderNumber}
                          onChange={e => {
                            this.onInputChange(e);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${s.price} row mb-2 pl-0`}>
                {cookie.load('userSubCategory') !== USER_SUBCATEGORY.Single ? (
                  <div
                    className="col-xl-2"
                    // style={{ border: '1px solid yellow' }}
                  >
                    <label>Institutional Price </label>
                  </div>
                ) : (
                  <label>Private Price </label>
                )}
                <div className="col-xl-6 col-lg-6 col-md-8 col-sm-8 mb-2">
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
                  // <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12">
                  manPrices[this.state.selectedPrice.index] != undefined ? (
                    <span className={s.priceSpan}>
                      {`= ${zeroTrimmer(
                        manPrices[this.state.selectedPrice.index].privatePrice,
                        'price',
                      )}`}
                    </span>
                  ) : (
                    <span className={s.priceSpan}>
                      {` = ${zeroTrimmer(
                        this.state.selectedPrice.privatePrice,
                        'price',
                      )}`}
                    </span>
                  )
                ) : manPrices[this.state.selectedPrice.index] != undefined ? (
                  <span className={s.priceSpan}>
                    {`= ${zeroTrimmer(
                      manPrices[this.state.selectedPrice.index].instPrice,
                      'price',
                    )}`}
                  </span>
                ) : (
                  <span className={s.priceSpan}>
                    {`= ${zeroTrimmer(
                      this.state.selectedPrice.instPrice,
                      'price',
                    )}`}
                  </span>
                )

                // </div>
                }
              </div>

              {/* <div
                className={`${s.countContainer} row mb-3`}
              >
                <div className={` offset-xl-2 col-xl-3`}>
                  <div className={s.count}>
                    <label>Count :</label>
                    <br />
                    <input
                      min="1"
                      name="count"
                      type="number"
                      value={this.state.count}
                      onChange={e => {
                        this.onInputChange(e);
                      }}
                    />
                  </div>
                </div>
                <div className="col-xl-3 mb-2">
                  <div className={s.details}>
                    <label>Start Date : &nbsp;</label> <br />
                    <DatePicker
                      name="startDate"
                      selected={
                        this.state.startDate !== ''
                          ? new Date(this.state.startDate)
                          : ''
                      }
                      onChange={date =>
                        this.handleDateChange(date, 'startDate')
                      }
                    />{' '}
                  </div>
                </div>

                <div className="col-xl-3 mb-2">
                  <div className={s.details}>
                    <label>End Date : &nbsp;&nbsp; </label> <br />
                    <DatePicker
                      name="endDate"
                      selected={
                        this.state.endDate !== ''
                          ? new Date(this.state.endDate)
                          : ''
                      }
                      onChange={date => this.handleDateChange(date, 'endDate')}
                    />{' '}
                  </div>
                </div>
              </div> */}

              <div className={` row mb-3 ${s.select} pl-0`}>
                <div className="col-xl-2 col-lg-4 ">
                  <label>Address : </label>
                </div>
                <div className="col-xl-8 col-lg-6 col-md-8  col-sm-10 col-10">
                  <Select
                    options={this.props.allAddresses}
                    value={this.state.selectedAddress}
                    onClick={e => e.stopPropagation()}
                    onChange={so => {
                      this.onSelectChange(so, 'selectedAddress');
                    }}
                  />
                </div>
                <div
                  className={`col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 ${
                    s.addBtnContainer
                  }`}
                >
                  <i
                    data-toggle="modal"
                    data-target="#addressModal"
                    // className={`btn ${s.addBtn}`}
                  >
                    <i class="fas fa-plus-circle" />
                  </i>
                </div>
              </div>
              <div className={`row mb-2 ${s.select} pl-0`}>
                <div className="col-xl-2">
                  <label>description: </label>
                </div>
                <div className="col-10">
                  <div className={s.description}>
                    <textarea
                      value={this.props.wish.product.originalDesc}
                      rows="7"
                    />
                  </div>
                </div>
              </div>
              <div className={`row mb-2 ${s.select} pl-0`}>
                <div className="col-xl-2">
                  <label>Customer Note: </label>
                </div>
                <div className="col-10">
                  <div className={s.description}>
                    <textarea
                      value={this.props.wish.product.customerNote}
                      name="customerNote"
                      rows="7"
                      onChange={e => {
                        this.onInputChange(e);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-2">
                <div className="offset-xl-6 offset-lg-5 offset-md-4 offset-sm-3 offset-4 col-xl-2 col-4">
                  <div className={s.deleteBtnContainer}>
                    <button
                      onClick={() =>
                        this.props.handleOnDelete(this.props.wish.basketId)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="col-xl-2 col-3">
                  <div className={s.selectBtnContainer}>
                    <button
                      className={this.props.isWished ? s.isWished : s.notWished}
                      onClick={() =>
                        this.props.handleWishItemSelect(
                          this.props.wish.basketId,
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
        {/* <div className="row">
          <div className="col-12"> */}
        <AddAddress
          countries={this.props.allCountries}
          callBack={this.props.fetchAddresses}
        />
        {/* </div>
        </div> */}
      </div>
    );
  }
}

export default withStyles(s)(WishItem);
