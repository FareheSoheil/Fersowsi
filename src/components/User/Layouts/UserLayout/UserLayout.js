/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './UserLayout.css';
import Header from '../Header';
import SideBar from '../SideBar';
// import Feedback from '../Feedback';
import Footer from '../Footer';

// by connecting input.text component will update everytime input.text change
// const mapStateToProps = ({ input }) => ({ text: input.text });
const mapStateToProps = state => {
  return { currency: state.changeCurrency.currency };
};
// function mapDispatchToProps(dispatch) {
//   return({
//       sendTheAlert: () => {dispatch(ALERT_ACTION)}
//   })
// }
// const mapDispatchToPros = dispatch =>
//   bindActionCreators({ changeCurrency }, dispatch);

class UserLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    context: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      currency: '',
    };
  }

  render() {
    // window.alert('rerendering');
    return (
      <div
        style={{
          backgroundColor: 'white',
          height: '100%',
          width: '100%',
        }}
      >
        {/* {this.props.context} */}
        <Header
          context={this.props.context}
          changeCurrency={this.props.changeCurrency}
        />
        <div
          style={{
            backgroundColor: 'white',
            paddingTop: '30px',
            // paddingRight: '10px',
            // position: 'fixed',
            // minHeight: '100px',
            // height: '100%',
            // width: '100%',
          }}
        >
          <SideBar />
          <div className={`${s.userContentContainer}`}>
            {' '}
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default withStyles(normalizeCss, s)(
  connect(mapStateToProps, null)(UserLayout),
);
