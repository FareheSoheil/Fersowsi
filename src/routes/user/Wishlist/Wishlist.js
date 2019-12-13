import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ReactPaginate from 'react-paginate';
import ContentHeader from '../../../components/User/ContentHeader';
import WishItem from '../../../components/User/WishItem';
import Spinner from '../../../components/User/Spinner';
import s from './Wishlist.css';
import { SERVER } from '../constants';
import arrayResolver from '../../../arrayResolver';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import history from '../../../history';
class Wishlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      countriesFetched: false,
      addressesFetched: false,
      productsSearchFilter: {
        publishers: '',
        singlProductTypes: '',
        productType: '', //remove s
        productContentTypes: '',
        productStatus: '',
        productLanguages: '',
        ageGroups: '',
        originalTitle: '',
        originalDesc: '',
        periods: '',
        issn: '',
        asb: '',
        dewey: '',
        hasDiscount: '',
        priceRange: { min: 1, max: 100 },
        weightRange: { min: 10, max: 2000 },
        sortDate: false,
        sortPrice: false,
        sortWeight: false,
      },
      allCountries: [],
      currentWishes: [],
      selectedIndices: [],
      selectedIds: [],
    };
    this.fetchAddresses = this.fetchAddresses.bind(this);
    this.fetchWishes = this.fetchWishes.bind(this);
    this.fetchCountries = this.fetchCountries.bind(this);
    this.deleteWish = this.deleteWish.bind(this);
    this.deleteAfterCheckout = this.deleteAfterCheckout.bind(this);
    this.checkOut = this.checkOut.bind(this);
    this.validator = this.validator.bind(this);
    this.handleWishItemSelect = this.handleWishItemSelect.bind(this);
    this.setShoppingDetails = this.setShoppingDetails.bind(this);
  }
  componentDidMount() {
    this.fetchWishes();
    this.fetchAddresses();
    this.fetchCountries();
  }
  fetchAddresses() {
    const url = `${SERVER}/getAllAddressesOfSpecificUser`;
    this.setState({
      addressesFetched: false,
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

          addressesFetched: true,
        });
      },
      error => {
        console.log(error);
      },
    );
  }
  deleteWish(id) {
    const url = `${SERVER}/deleteBasket`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      basketId: id,
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
        if (response.error === undefined) {
          that.fetchWishes();
        } else {
          toastr.error(response.error.title, response.error.description);
        }
      },
      () => {
        // toastr.error('sala', ERRORS.REPEATED_USER);
        // console.log('login e rror : ', error);
      },
    );
  }
  deleteAfterCheckout() {
    const url = `${SERVER}/deleteBaskets`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      basketIds: this.state.selectedIds,
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
        if (response.error === undefined) {
          that.fetchWishes();
        } else {
          toastr.error(response.error.title, response.error.description);
        }
      },
      () => {
        // toastr.error('sala', ERRORS.REPEATED_USER);
        // console.log('login e rror : ', error);
      },
    );
  }
  validator(index) {
    let res = 0;
    if (this.state.selectedIndices[index]) {
      if (this.state.currentWishes[index].count == undefined) {
        window.alert('Please Enter Count');
      } else if (this.state.currentWishes[index].startDate == undefined) {
        window.alert('Please Enter Start Date');
      } else if (this.state.currentWishes[index].endDate == undefined)
        window.alert('please enter end date');
      else if (this.state.currentWishes[index].selectedAddress == undefined)
        window.alert('please enter address');
      else if (this.state.currentWishes[index].selectedPrice == undefined)
        window.alert('please enter price');
      else res = 1;
    }
    return res;
  }
  checkOut() {
    let wishes = [];
    if (this.state.selectedIds.length == 0)
      window.alert('Please Choose at least one product before checkout');
    else {
      for (let index = 0; index < this.state.selectedIndices.length; index++) {
        if (this.validator(index)) {
          wishes.push({
            productId: this.state.currentWishes[index].product.id,
            count: this.state.currentWishes[index].count,
            startDate: this.state.currentWishes[index].startDate,
            endDate: this.state.currentWishes[index].endDate,
            productPriceAndCostId: this.state.currentWishes[index]
              .selectedPrice,
            addressId: this.state.currentWishes[index].selectedAddress,
          });
        }
      }
      if (wishes.length > 0) {
        const url = `${SERVER}/addCustomerOrder`;
        this.setState({
          isLoading: true,
        });
        const credentials = {
          publisherOrders: wishes,
        };
        // console.log('wishes : ', wishes);
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
            if (response.error === undefined) {
              window.alert(response.message);
              that.deleteAfterCheckout();
            } else {
              toastr.error(response.error.title, response.error.description);
            }
          },
          () => {
            // toastr.error('sala', ERRORS.REPEATED_USER);
            // console.log('login e rror : ', error);
          },
        );
      }
    }
  }
  fetchCountries() {
    const url = `${SERVER}/getAuxInfoForAllUsers`;
    this.setState({ countriesFetched: false });
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
        if (response.error === undefined) {
          that.setState({
            allCountries: response.countries,
            countriesFetched: true,
          });
        } else {
          toastr.error(response.error.title, response.error.description);
        }
      },
      () => {
        // toastr.error('sala', ERRORS.REPEATED_USER);
        // console.log('login e rror : ', error);
      },
    );
  }
  fetchWishes() {
    const url = `${SERVER}/getBasketOfSpecificUser`;
    this.setState({
      isLoading: true,
    });
    const options = {
      method: 'POST',
      // body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const that = this;

    fetchWithTimeOut(
      url,
      options,
      response => {
        if (response.error === undefined) {
          let selectedIndicesArray = [];
          const l = response.length;
          selectedIndicesArray.length = l;
          selectedIndicesArray.fill(false, 0, l - 1);
          response.forEach(wish => {
            if (wish.product.selectedProductPriceAndCost[0] != undefined)
              wish.selectedPrice =
                wish.product.selectedProductPriceAndCost[0].id;
          });
          that.setState({
            currentWishes: response,
            selectedIndices: selectedIndicesArray,

            isLoading: false,
          });
        } else {
          toastr.error(response.error.title, response.error.description);
        }
      },
      () => {
        // toastr.error('sala', ERRORS.REPEATED_USER);
        // console.log('login e rror : ', error);
      },
    );
  }

  setShoppingDetails(index, label, value) {
    let preWish = [...this.state.currentWishes];
    if (label == 'selectedPrice') preWish[index].selectedPrice = value;
    else if (label == 'selectedAddress') preWish[index].selectedAddress = value;
    else if (label == 'count') preWish[index].count = value;
    else if (label == 'startDate') preWish[index].startDate = value;
    else if (label == 'endDate') preWish[index].endDate = value;
    // console.log
    this.setState({
      currentWishes: preWish,
    });
  }
  handleWishItemSelect(id, index) {
    let selectedIds = [],
      selectedIndices;
    selectedIds.push(id);
    selectedIndices = [...this.state.selectedIndices];
    selectedIndices[index] = !selectedIndices[index];
    this.setState({
      selectedIndices: selectedIndices,
      selectedIds: selectedIds,
    });
  }
  render() {
    let wishes;
    const receivedWishes = this.state.currentWishes;
    if (receivedWishes != undefined && receivedWishes.length != 0)
      wishes = this.state.currentWishes.map(
        (wish, i) =>
          (wishes = (
            <WishItem
              wish={wish}
              allCountries={this.state.allCountries}
              allAddresses={this.state.allAddresses}
              index={i}
              handleWishItemSelect={this.handleWishItemSelect}
              isWished={this.state.selectedIndices[i]}
              handleOnDelete={this.deleteWish}
              setShoppingDetails={this.setShoppingDetails}
              fetchAddresses={this.fetchAddresses}
            />
          )),
      );
    else wishes = <div className={s.warning}>No Products Available</div>;
    return (
      <div>
        {' '}
        {!this.state.isLoading && this.state.countriesFetched ? (
          <div>
            <ContentHeader
              title="WishList"
              hasSort={false}
              onSortFunc={this.handleSelectChange}
            />
            <div className={`${s.wishContainer} row`}>{wishes}</div>
            <div className="row">
              <div className="offset-xl-7 col-5 ">
                <button onClick={this.checkOut} className="btn btn-info">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}
export default withStyles(s)(Wishlist);
