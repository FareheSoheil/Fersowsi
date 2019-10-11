import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SideBar.css';
import history from '../../../history';

class SideBar extends React.Component {
  goTo(addr) {
    history.push(addr);
  }
  render() {
    return (
      <div class={s.usersidebar}>
        <a onClick={() => this.goTo('/user/myAccount')}>My Account</a>
        <a onClick={() => this.goTo('/user/myAccount')}>Your Profile</a>
        <a onClick={() => this.goTo('/user/order')}>Order</a>
        <a onClick={() => this.goTo('/user/address')}>Address Book</a>
        <a onClick={() => this.goTo('/user/wishlist')}>Wishlist</a>
        <a onClick={() => this.goTo('/user/claim')}>Claim</a>
        {/* <a onClick={() => this.goTo('/user/myAccount')}>Request</a>
        <a onClick={() => this.goTo('/user/myAccount')}>Reviews</a>
        <a onClick={() => this.goTo('/user/myAccount')}>Prefrences</a> */}
      </div>
    );
  }
}

export default withStyles(s)(SideBar);
