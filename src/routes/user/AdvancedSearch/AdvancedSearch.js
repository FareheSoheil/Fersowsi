import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Spinner from '../../../components/User/Spinner';
import s from './AdvancedSearch.css';
import { SERVER } from '../constants';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import history from '../../../history';
class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      title: '',
      text: '',
      search: '',
    };
    this.onChange = this.onChange.bind(this);
    this.send = this.send.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
  }
  componentDidMount() {
    window.onclick = function(event) {
      console.log(event.target.classList);
      if (!event.target.classList.contains(s.menueIcon)) {
        // console.log();
        let dropdowns = document.getElementById('menueDropDown');

        if (dropdowns.classList.contains(s.show)) {
          dropdowns.classList.remove(s.show);
        }
      }
      if (
        !event.target.classList.contains(s.requestBtn) &&
        !event.target.classList.contains('reqInp') &&
        !event.target.classList.contains('reqTxt')
      ) {
        console.log(event.target.classList.contains('reqInp'));
        // console.log();
        let dropdowns = document.getElementById('requestDropDown');

        if (dropdowns.classList.contains(s.show)) {
          dropdowns.classList.remove(s.show);
        }
      }
    };
  }
  goTo(url) {
    history.push(url);
  }
  handleMenu() {
    document.getElementById('menueDropDown').classList.toggle(s.show);
  }
  handleRequest() {
    console.log('here');
    document.getElementById('requestDropDown').classList.toggle(s.show);
  }
  onChange(e) {
    let value = e.target.value;
    let state = e.target.name;
    this.setState({
      [state]: value,
    });
  }
  send() {
    // window.alert(this.state.title);
  }
  searchProducts() {
    localStorage.setItem('searchTxt', this.state.search);
    // window.location.replace('/user/products');
    history.push('/user/products');
  }
  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div className={`container-fluid ${s.mainContainer}`}>
            <div className="row mb-1">
              <div className="col-xl-1 col-lg-2 col-md-2 col-sm-3 pt-0">
                <i
                  onClick={this.handleMenu}
                  class={`fa fa-bars ${s.menueIcon}`}
                  style={{ fontSize: '35px', color: 'lightGray' }}
                />
                <img
                  className={s.avatar}
                  style={{ position: 'absolute' }}
                  src="/assets/images/blank_avatar.png"
                />{' '}
                <div
                  className={`container ${s.menuedropdownContainer}`}
                  id="menueDropDown"
                >
                  <div className="row">
                    <div
                      className="col-xl-4 col-md-4 col-sm-6 col-6"
                      onClick={() => this.goTo('/user/myAccount')}
                    >
                      {/* <i style={{ color: 'red' }} class="fas fa-dot-circle" /> */}
                      <i
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Profile"
                        class={`fa fa-user ${s.profile}`}
                      />
                    </div>
                    <div
                      className="col-xl-4 col-md-4 col-sm-6 col-6"
                      onClick={() => this.goTo('/user/products')}
                    >
                      <i
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Products"
                        class={`fa fa-book ${s.product}`}
                      />
                    </div>
                    <div
                      className="col-xl-4 col-md-4 col-sm-6 col-6"
                      onClick={() => this.goTo('/user/order')}
                    >
                      <i
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Orders"
                        class={`fa fa-archive ${s.order}`}
                      />
                    </div>

                    {/* <div className="row"> */}
                    <div
                      className="col-xl-4 col-md-4 col-sm-6 col-6"
                      onClick={() => this.goTo('/user/request')}
                    >
                      <i
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Requests"
                        class={`fa fa-file-text ${s.request}`}
                      />
                    </div>
                    <div
                      className="col-xl-4 col-md-4 col-sm-6 col-6"
                      onClick={() => this.goTo('/user/wishList')}
                    >
                      <i
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Address Book"
                        class={`fa fa-address-book ${s.address}`}
                      />
                    </div>
                    <div
                      className="col-xl-4 col-md-4 col-sm-6 col-6"
                      onClick={() => this.goTo('/user/claim')}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Claims"
                    >
                      <i class={`fa fa-envelope ${s.claim}`} />
                    </div>
                    {/* </div> */}
                    {/* <div className="row"> */}
                    <div
                      className="col-7"
                      onClick={() => this.goTo('/user/address')}
                    >
                      <i
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Wish list"
                        class={`fa fa-shopping-basket ${s.wishlist}`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-1 col-lg-1 col-md-2 col-sm-2"
                style={{ paddingTop: '10px' }}
              >
                {' '}
                Username
              </div>
              <div className="offset-xl-9 offset-lg-8 offset-md-7 offset-sm-6  col-1 ">
                <div className={s.requestBtn} onClick={this.handleRequest}>
                  Request
                </div>
                <div
                  className={`container ${s.requestdropdownContainer}`}
                  id="requestDropDown"
                >
                  <div className="row mb-2">
                    <div className="col-xl-12 ">
                      <input
                        onChange={this.onChange}
                        value={this.state.title}
                        name="title"
                        className="reqInp"
                        placeholder="Subject"
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-xl-12 ">
                      <textarea
                        name="text"
                        onChange={this.onChange}
                        rows="6"
                        className="reqTxt"
                        placeholder="Request"
                        value={this.state.text}
                      />
                    </div>
                  </div>
                  <div className="row mb-1">
                    <div className="offset-7 col-4">
                      {' '}
                      <button className={s.reqBtn} onClick={this.send}>
                        {' '}
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`row ${s.logoContainer}`}>
              <div className="offset-5 col-3">FERDOSI</div>
            </div>

            <div className={`row ${s.searchContainer}`}>
              <div className="offset-3 col-5">
                <input
                  name="search"
                  onChange={this.onChange}
                  placeholder="search here"
                />{' '}
              </div>
              <div className="col-1">
                <button className={s.searchBtn} onClick={this.searchProducts}>
                  Search
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withStyles(s)(AdvancedSearch);
