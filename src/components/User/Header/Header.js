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
let categories = [{ label: 'Fancy' }];

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
      if (!event.target.matches('.languagedropbtn')) {
        var dropdowns = document.getElementsByClassName(
          'languagedropdown-content',
        );
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];

          if (openDropdown.classList.contains('languageshow')) {
            openDropdown.classList.remove('languageshow');
          }
        }
      }
    };
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
        cookie.remove('TokenId', { path: '/' });
        cookie.remove('role', { path: '/' });
        history.push('/login');
      },
      () => {},
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
      () => {},
    );
  }
  render() {
    if (this.state.isFetched) {
      if (categories.length == 1)
        categories = categories.concat(this.state.categories);
      // window.alert(categories.length);
      links = [];
      // categories.push();

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
                  <label className={`${s.label} hidden`}>
                    {categories[i].label}
                  </label>
                </div>
              </div>
              <div className="row mb-2 hidden">
                <div className="hidden col-xl-12">
                  <label className={`${s.label} hidden`}>
                    {categories[i + 1].label}
                  </label>
                </div>
              </div>
              <div className="row mb-2 hidden">
                <div className="col-xl-12 hidden">
                  <label className={`${s.label} hidden`}>
                    {categories[i + 2].label}
                  </label>
                </div>
              </div>
              <div className="row mb-2 hidden">
                <div className="col-xl-12 hidden">
                  <label className={`${s.label} hidden`}>
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
              <img height="50" width="80" src="/assets/images/dropbox.png" />
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
                  class="navbar-nav"
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
                      Services
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
                <div className={s.headerIconContainer}>
                  {' '}
                  <input type="text" />
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
                        <a onClick={() => this.goTo('/user')}>My Account</a>
                      ) : (
                        ''
                      )}
                      {cookie.load('TokenId') !== undefined ? (
                        <a onClick={() => this.goTo('/')}>logOut</a>
                      ) : (
                        <a onClick={() => this.goTo('/login')}>login</a>
                      )}
                    </div>
                  </div>
                  <div class="languagedropdown">
                    <button class="languagedropbtn">
                      <i
                        onClick={() => {
                          this.drop('globeDropDown', 'languageshow');
                        }}
                        class="fa fa-globe languagedropbtn"
                      />
                    </button>
                    <div id="globeDropDown" class="languagedropdown-content">
                      <a href="#about">About</a>
                      <a href="#contact">Contact</a>
                    </div>
                  </div>
                  <i
                    onClick={() => {
                      window.alert('hi');
                    }}
                    class={`${s.searchBtn} fas fa-search`}
                  />
                </div>
              </div>
            </nav>
            <div className={`${s.con} container-fluid`}>
              <div id="productDiv" className={s.salam}>
                product SubMenue
              </div>

              <div id="categoryDiv" className={`${s.salam} hidden`}>
                <div className="container-fluid hidden">
                  <div className="row hidden" id="categorySubDiv1">
                    {this.state.isFetched ? links : ''}
                  </div>
                </div>
              </div>
              <div id="serviceDiv" className={`${s.salam} hidden`}>
                services SubMenue
              </div>
              <div id="customerDiv" className={`${s.salam} hidden`}>
                customer SubMenue
              </div>
              <div id="publisherPartnerDiv" className={`${s.salam} hidden`}>
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
