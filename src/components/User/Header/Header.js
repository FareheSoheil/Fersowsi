import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../../Link';

class Header extends React.Component {
  render() {
    return (
      <nav
        class={` navbar navbar-expand-lg navbar-fixed-top bg-dark navbar-dark ${
          s.userHeaderContainer
        }`}
      >
        <a class={`${s.UserNavBrand} navbar-brand`} href="#">
          FERDOSI
        </a>
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
              <a class="nav-link" href="#">
                Category <span class="sr-only">(current)</span>
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
            <i class="fas fa-search" />
            <i class="fa fa-globe" aria-hidden="true" />
            <i class="far fa-user" />
          </div>
        </div>
      </nav>
    );
  }
}

export default withStyles(s)(Header);
