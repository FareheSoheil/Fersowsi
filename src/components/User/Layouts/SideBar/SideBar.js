import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SideBar.css';
import history from '../..//../../history';

class SideBar extends React.Component {
  goTo(addr) {
    history.push(addr);
  }

  handleSubmenues() {
    let elements = document.getElementsByClassName(s.submenu);
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].classList.contains(s.hide))
        elements[i].classList.remove(s.hide);
      else elements[i].classList.add(s.hide);
    }
  }
  render() {
    return (
      <div class={s.usersidebar}>
        <a>My Account</a>
        <a onClick={() => this.goTo('/user/myAccount')}>Your Profile</a>
        <a onClick={() => this.goTo('/user/products')}>Products</a>
        <a onClick={() => this.goTo('/user/order')}>Order</a>
        <a onClick={() => this.goTo('/user/address')}>Address Book</a>
        <a onClick={() => this.goTo('/user/wishlist')}>Wishlist</a>
        <a onClick={this.handleSubmenues}>Claim</a>
        <a
          onClick={() => this.goTo('/user/claim')}
          className={`${s.submenu} ${s.hide}`}
          onClick={() => this.goTo('/user/newClaims')}
        >
          New Claims
        </a>
        <a
          className={`${s.hide} ${s.submenu} `}
          onClick={() => this.goTo('/user/claim')}
        >
          All Claim
        </a>
        {/* <a onClick={() => this.goTo('/user/myAccount')}>Request</a>
        <a onClick={() => this.goTo('/user/myAccount')}>Reviews</a>
        <a onClick={() => this.goTo('/user/myAccount')}>Prefrences</a> */}
      </div>
    );
  }
}

export default withStyles(s)(SideBar);
