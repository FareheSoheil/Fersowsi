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
      isLoading: false,
      pageIndex: 0,
      pageSize: 15,
      totalPageNum: 15,
      currentWishes: [
        { id: 1, originalTitle: 'sdlkasmdalksd', period: '3 weekly' },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
      ],
    };
    this.fetchWishes = this.fetchWishes.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.deleteWish = this.deleteWish.bind(this);
  }
  componentDidMount() {
    // this.fetchorders();
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

  fetchWishes() {
    const url = `${SERVER}/getUserWishes`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize,
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
  render() {
    let wishes = <div className={s.warning}>No Products Available</div>;
    const receivedWishes = this.state.currentWishes;
    if (receivedWishes !== undefined && receivedWishes.length !== 0)
      wishes = this.state.currentWishes.map(
        (wish, i) =>
          (wishes = (
            <WishItem
              wish={wish}
              //  isWished
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
                <ReactPaginate
                  previousLabel="<"
                  nextLabel=">"
                  pageCount={this.state.totalPageNum}
                  pageRangeDisplayed={3}
                  onPageChange={this.handlePageChange}
                  containerClassName="user-paginate"
                  subContainerClassName="user-pages user-paginate"
                  activeClassName="user-active-page"
                  breakClassName="break-me"
                  initialPage={this.state.pageIndex}
                  disableInitialCallback
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withStyles(s)(Wishlist);
