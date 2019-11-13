import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cookie from 'react-cookies';
import s from './Header.css';
import history from '../../../history';
import { SSRSERVER, SERVER } from '../../../constants';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
const tabNames = [
  // 'productTab',
  'categoryTab',
  'serviceTab',
  'customerTab',
  'publisherPartnerTab',
];

const divNames = [
  // 'productDiv',
  'categoryDiv',
  'serviceDiv',
  'customerDiv',
  'publisherPartnerDiv',
];
let categories = [];

let links;
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isFetched: false,
      categories: [],
    };
    this.logOut = this.logOut.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.drop = this.drop.bind(this);
  }
  searchProducts(value) {
    localStorage.setItem('category', value);
    window.location.replace('/user/products');
  }
  eventListenerAssigner(trigger, i) {
    trigger.addEventListener(
      'mouseover',
      function() {
        let div = document.getElementById(divNames[i]);
        div.style.display = 'block';
        divNames.forEach((div, j) => {
          if (j !== i) {
            document.getElementById(divNames[j]).style.display = 'none';
          }
        });
      },
      false,
    );
  }
  subMenuHandler() {
    tabNames.forEach((tabName, i) => {
      let tab = document.getElementById(tabName);
      this.eventListenerAssigner(tab, i);
    });
    window.onmouseover = function(event) {
      if (!event.target.classList.contains('hidden')) {
        divNames.forEach((div, j) => {
          if (document.getElementById(divNames[j]) !== null)
            document.getElementById(divNames[j]).style.display = 'none';
        });
      }
    };
  }
  dropDownHandlers() {
    window.onclick = function(event) {
      if (!event.target.matches('.userdropbtn')) {
        var dropdowns = document.getElementsByClassName('userdropdown-content');
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('usershow')) {
            openDropdown.classList.remove('usershow');
          }
        }
      }
      if (!event.target.matches('.moneydropbtn')) {
        var dropdowns = document.getElementsByClassName(
          'moneydropdown-content',
        );
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];

          if (openDropdown.classList.contains('moneyshow')) {
            openDropdown.classList.remove('moneyshow');
          }
        }
      }
    };
  }
  changeLang() {
    localStorage.setItem('locale', 'en');

    document.location.reload(true);
  }
  changeCurrency(id) {
    localStorage.setItem('currency', id);

    document.location.reload(true);
  }
  componentDidMount() {
    this.fetchCategories();
    this.dropDownHandlers();
    this.subMenuHandler();
  }
  goTo(url) {
    history.push(url);
  }
  drop(id, className) {
    document.getElementById(id).classList.toggle(className);
  }
  logOut() {
    const token = cookie.load('TokenId');
    const removeStateURL = `${SSRSERVER}/state/removeState`;
    const removeStateOptions = {
      tokenId: token,
    };
    const logoutOptions = {
      method: 'POST',
      body: JSON.stringify(removeStateOptions),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetchWithTimeOut(
      removeStateURL,
      logoutOptions,
      () => {
        console.log('deleting cookie');
        cookie.remove('TokenId', { path: '/' });
        cookie.remove('role', { path: '/' });
        history.push('/login');
      },
      er => {
        console.log(er);
      },
    );
  }
  fetchCategories() {
    this.setState({ isFetched: false });
    const url = `${SERVER}/getAuxInfoForLandingPage`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetchWithTimeOut(
      url,
      options,
      response => {
        this.setState({
          categories: response.ProductContentType,
          isFetched: true,
        });
      },
      () => {
        window.alert(this.state.isFetched);
      },
    );
  }
  render() {
    if (this.state.isFetched) {
      if (categories.length == 0) {
        categories = categories.concat(this.state.categories);
      }
      links = [];
      categories.map((cat, i) => {
        if (
          i % 4 == 0 &&
          categories.length == 20 &&
          i < categories.length - 1
        ) {
          links.push(
            <div className="col-xl-2 hidden">
              <div className="row mb-2 hidden">
                <div className="hidden col-xl-12">
                  <label
                    className={`${s.label} hidden`}
                    onClick={() => {
                      this.searchProducts(categories[i].value);
                    }}
                  >
                    {categories[i].label}
                  </label>
                </div>
              </div>
              <div className="row mb-2 hidden">
                <div className="hidden col-xl-12">
                  <label
                    className={`${s.label} hidden`}
                    onClick={() => {
                      this.searchProducts(categories[i + 1].value);
                    }}
                  >
                    {categories[i + 1].label}
                  </label>
                </div>
              </div>
              <div className="row mb-2 hidden">
                <div className="col-xl-12 hidden">
                  <label
                    className={`${s.label} hidden`}
                    onClick={() => {
                      this.searchProducts(categories[i + 2].value);
                    }}
                  >
                    {categories[i + 2].label}
                  </label>
                </div>
              </div>
              <div className="row mb-2 hidden">
                <div className="col-xl-12 hidden">
                  <label
                    className={`${s.label} hidden`}
                    onClick={() => {
                      this.searchProducts(categories[i + 3].value);
                    }}
                  >
                    {categories[i + 3].label}
                  </label>
                </div>
              </div>
            </div>,
          );
        }
      });
      console.log('linksSs : ', links);
    }
    return (
      <div>
        {this.state.isLoading ? (
          ''
        ) : (
          <div className={s.mainContainer}>
            {' '}
            <nav
              class={` navbar navbar-expand-lg navbar-fixed-top bg-dark navbar-dark ${
                s.userHeaderContainer
              }`}
            >
              <img
                height="30"
                width="80"
                src="/assets/images/logo.png"
                // style={{ border: '1px solid red' }}
              />
              {/* <a class={`${s.UserNavBrand} navbar-brand`} href="#">
          FERDOSI
        </a> */}
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon" />
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul
                  id="hoverMenueHolder"
                  class={`${s.leftSide} navbar-nav`}
                  style={{ paddingTop: '5px', height: '55px' }}
                >
                  {/* <li id="productTab" class={`${s.dropdown}nav-item`}>
                <a
                  id="productLink"
                  class="nav-link"
                  onClick={() => this.goTo('/user/products')}
                >
                  Productss   
                </a>
              </li> */}
                  <li class="nav-item hidden" id="categoryTab">
                    <a class="nav-link hidden" id="categoryLink">
                      Category
                    </a>
                  </li>

                  <li class="nav-item hidden" id="serviceTab">
                    <a id="serviceLink hidden" class="nav-link hidden" href="#">
                      Our Services
                    </a>
                  </li>
                  <li class="nav-item hidden" id="customerTab">
                    <a id="customerLink" class="nav-link hidden" href="#">
                      Customers
                    </a>
                  </li>
                  <li class="nav-item hidden" id="publisherPartnerTab">
                    <a
                      id="publisherPartnerLink"
                      class="nav-link hidden"
                      href="#"
                    >
                      Publishers&amp;Partners
                    </a>
                  </li>
                </ul>
              </div>
              <div className={s.headerIconContainer}>
                {' '}
                <img
                  height="25"
                  width="25"
                  src="/assets/images/sweden_flag.png"
                />
                <img
                  height="25"
                  width="25"
                  src="/assets/images/british_flag.png"
                />
                {/* <input type="text" /> */}
                <div class="userdropdown">
                  <button class="userdropbtn">
                    <i
                      onClick={() => {
                        this.drop('userDropDown', 'usershow');
                      }}
                      class="far fa-user userdropbtn"
                    />
                  </button>
                  <div id="userDropDown" class="userdropdown-content">
                    {cookie.load('TokenId') !== undefined ? (
                      <a onClick={() => this.goTo('/user/myAccount')}>
                        My Account
                      </a>
                    ) : (
                      ''
                    )}
                    {cookie.load('TokenId') != undefined ? (
                      <a onClick={() => this.logOut()}>logOut</a>
                    ) : (
                      <a onClick={() => this.goTo('/login')}>login</a>
                    )}
                  </div>
                  <div id="userDropDown" class="userdropdown-content">
                    <a>Euro</a>
                    <a>US Dollar</a>
                    <a>GB Pound</a>
                    <a>Iran Rial</a>
                    <a>Swedish Krona</a>
                  </div>
                </div>
                <div class="moneydropdown">
                  <button class="moneydropbtn">
                    <i
                      onClick={() => {
                        this.drop('moneyDown', 'moneyshow');
                      }}
                      class="fa fa-money moneydropbtn"
                    />
                  </button>
                  <div id="moneyDown" class="moneydropdown-content">
                    <a onClick={() => this.changeCurrency(0)}>Euro</a>
                    <a onClick={() => this.changeCurrency(1)}>US Dollar</a>
                    <a onClick={() => this.changeCurrency(2)}>GB Pound</a>
                    <a onClick={() => this.changeCurrency(3)}>Iran Rial</a>
                    <a onClick={() => this.changeCurrency(4)}>Swedish Krona</a>
                  </div>
                </div>
                <i onClick={() => {}} class={`${s.searchBtn} fas fa-search`} />
                <i class="fas fa-home" onClick={() => this.goTo('/')} />
              </div>
            </nav>
            <div className={`${s.submenuContainer} container-fluid`}>
              <div id="productDiv" className={s.subMenuContainer}>
                product SubMenue
              </div>

              <div id="categoryDiv" className={`${s.subMenuContainer} hidden`}>
                <div className="container-fluid hidden">
                  <div className="row hidden" id="categorySubDiv">
                    {this.state.isFetched ? links : ''}
                  </div>
                </div>
              </div>
              <div id="serviceDiv" className={`${s.subMenuContainer} hidden`}>
                <div className="container-fluid hidden">
                  <div className="row hidden" id="servicesSubDiv">
                    <div className="col-xl-2 hidden">Subscription Services</div>
                    <div className="col-xl-3 hidden">
                      Electronic Resource Management
                    </div>
                    <div className="col-xl-2 hidden">Digitization Services</div>
                    <div className="col-xl-2 hidden">Research Services</div>
                  </div>
                </div>
              </div>
              <div id="customerDiv" className={`${s.subMenuContainer} hidden`}>
                <div className="container-fluid hidden">
                  <div className="row hidden" id="servicesSubDiv">
                    <div className="col-xl-2 hidden">Corporations</div>
                    <div className="col-xl-2 hidden">Academic</div>
                    <div className="col-xl-2 hidden">Libraries</div>
                    <div className="col-xl-2 hidden">Agent/Resellers</div>
                  </div>
                </div>
              </div>
              <div
                id="publisherPartnerDiv"
                className={`${s.subMenuContainer} hidden`}
              >
                publisherPartnerDiv
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(s)(Header);
