import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cookie from 'react-cookies';
import s from './Header.css';
import history from '../../../history';
const tabNames = [
  // 'productTab',
  'categoryTab',
  'serviceTab',
  'customerTab',
  'publisherPartnerTab',
];
const linkNames = [
  // 'productLink',
  'categoryLink',
  'serviceLink',
  'customerLink',
  'publisherPartnerLink',
];
const divNames = [
  // 'productDiv',
  'categoryDiv',
  'serviceDiv',
  'customerDiv',
  'publisherPartnerDiv',
];
class Header extends React.Component {
  constructor(props) {
    super(props);
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
  }
  dropDownHandlers() {
    let allIds = linkNames.concat(tabNames).concat(divNames);
    allIds.push('hoverMenueHolder');
    window.onmouseover = function(event) {
      if (!allIds.includes(event.target.id)) {
        divNames.forEach((div, j) => {
          if (document.getElementById(divNames[j]) !== null)
            document.getElementById(divNames[j]).style.display = 'none';
        });
      }
    };
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
    this.dropDownHandlers();
    this.subMenuHandler();
  }
  goTo(url) {
    history.push(url);
  }
  drop(id, className) {
    document.getElementById(id).classList.toggle(className);
  }
  render() {
    return (
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
              <li class="nav-item" id="categoryTab">
                <a class="nav-link" id="categoryLink">
                  Category
                </a>
              </li>

              <li class="nav-item" id="serviceTab">
                <a id="serviceLink" class="nav-link" href="#">
                  Services
                </a>
              </li>
              <li class="nav-item" id="customerTab">
                <a id="customerLink" class="nav-link" href="#">
                  Customers
                </a>
              </li>
              <li class="nav-item" id="publisherPartnerTab">
                <a id="publisherPartnerLink" class="nav-link " href="#">
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
        <div>
          <div id="productDiv" className={s.salam}>
            product SubMenue
          </div>
          <div id="categoryDiv" className={s.salam}>
            category SubMenue
          </div>
          <div id="serviceDiv" className={s.salam}>
            services SubMenue
          </div>
          <div id="customerDiv" className={s.salam}>
            customer SubMenue
          </div>
          <div id="publisherPartnerDiv" className={s.salam}>
            publisherPartnerDiv
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
