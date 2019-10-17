import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import history from '../../../history';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.drop = this.drop.bind(this);
  }
  componentDidMount() {
    window.onclick = function(event) {
      console.log(event.target);
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
    };
  }
  goTo(url) {
    history.push(url);
  }
  drop(id) {
    document.getElementById(id).classList.toggle('usershow');
  }
  render() {
    return (
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
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" onClick={() => this.goTo('/user/products')}>
                Products
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Category
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#">
                Services
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Customers
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="#">
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
                    this.drop('userDropDown');
                  }}
                  class="far fa-user userdropbtn"
                />
              </button>
              <div id="userDropDown" class="userdropdown-content">
                <a onClick={() => this.goTo('/user')}>My Account</a>
                <a onClick={() => this.goTo('/')}>logOut</a>
              </div>
            </div>
            <div class="userdropdown">
              <button class="userdropbtn">
                <i
                  onClick={() => {
                    this.drop('globeDropDown');
                  }}
                  class="fa fa-globe userdropbtn"
                />
              </button>
              <div id="globeDropDown" class="userdropdown-content">
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
              </div>
            </div>
            <i
              onClick={() => {
                window.alert('hi');
              }}
              class="fas fa-search"
            />
            {/* <i class="fa fa-globe" aria-hidden="true" /> */}
          </div>
        </div>
      </nav>
    );
  }
}

export default withStyles(s)(Header);
