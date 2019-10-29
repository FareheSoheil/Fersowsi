import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ReactPaginate from 'react-paginate';
import ContentHeader from '../../../components/User/ContentHeader';
import WishItem from '../../../components/User/WishItem';
import Spinner from '../../../components/User/Spinner';
import s from './Wishlist.css';
import { SERVER } from '../constants';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import history from '../../../history';
class Wishlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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
      currentWishes: [
        { id: 1, originalTitle: 'sdlkasmdalksd', period: '3 weekly' },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
      ],
      selectedIndices: [],
      selectedIds: [],
    };
    this.fetchWishes = this.fetchWishes.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.deleteWish = this.deleteWish.bind(this);
    this.handleWighItemSelect = this.handleWighItemSelect.bind(this);
  }
  componentDidMount() {
    this.fetchWishes();
  }
  deleteWish(id) {
    window.alert('daaaa');
    const url = `${SERVER}/deleteWishForUser`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      wishId: id,
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
          that.setState({
            currentWishes: response.currentRecords,
            totalPageNum: response.totalPageNum,
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
  handlePageChange(pageIndex) {
    this.setState({ pageIndex: pageIndex.selected }, () => {
      this.fetchWishes();
    });
  }
  // onClaimCollectionClick(id) {
  //   history.push(`/user/claim/${id}`);
  // }
  checkOut() {}
  fetchWishes() {
    const url = `${SERVER}/getAllProducts`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      searchBy: this.state.productsSearchFilter,
      pageIndex: 0,
      pageSize: 10,
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
          let selectedIndicesArray = [];
          const l = response.currentRecords.length;
          selectedIndicesArray.length = l;
          selectedIndicesArray.fill(false, 0, l - 1);
          that.setState({
            currentWishes: response.currentRecords,
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
  handleWighItemSelect(id, index) {
    let selectedIds = [],
      selectedIndices;
    selectedIds.push(id);
    selectedIndices = { ...this.state.selectedIndices };
    selectedIndices[index] = !selectedIndices[index];
    this.setState({
      selectedIndices: selectedIndices,
      selectedIds: selectedIds,
    });
  }
  render() {
    let wishes = <div className={s.warning}>No Products Available</div>;
    const receivedWishes = this.state.currentWishes;
    if (receivedWishes !== undefined && receivedWishes.length !== 0)
      wishes = this.state.currentWishes.map(
        (wish, i) =>
          (wishes = (
            <WishItem
              wish={wish}
              index={i}
              handleWighItemSelect={this.handleWighItemSelect}
              isWished={this.state.selectedIndices[i]}
              handleOnDelete={this.deleteWish}
            />
          )),
      );
    return (
      <div>
        {' '}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
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
        )}
      </div>
    );
  }
}
export default withStyles(s)(Wishlist);
