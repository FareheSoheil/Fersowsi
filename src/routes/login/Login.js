import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import crypto from 'crypto';
import cookie from 'react-cookies';
import { toastr } from 'react-redux-toastr';
import history from '../../history';
// import { loginAction } from '../../actions/login_action';
import s from './Login.css';
import { fetchWithTimeOut } from '../../fetchWithTimeout';
import { COOKIE_EXPIRATION, SERVER, ERRORS } from '../../constants';

class Login extends React.Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log('context from login', this.props.context);
  }
  handleSubmit = event => {
    event.preventDefault();
    window.alert('logging in');
    // const errMsg = this.finalValidation();
    // if (errMsg) toastr.error(ERRORS.TITLE, errMsg);
    // else {
    const loginURL = `${SERVER}/login`;
    // const credentials = {
    //   username: this.state.username,
    //   password: crypto
    //     .createHash('sha256')
    //     .update(this.state.password)
    //     .digest('base64'),
    // };
    const credentials = {
      username: 'farehe',
      password: crypto
        .createHash('sha256')
        .update('sherlock74')
        .digest('base64'),
    };
    const loginOptions = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const that = this;
    fetchWithTimeOut(
      loginURL,
      loginOptions,
      data => {
        // that.props.loginProp(data);
        const setStateURL = `${SERVER}/state/setState`;
        const setStateOptions = {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const thatthat = that;
        fetchWithTimeOut(
          setStateURL,
          setStateOptions,
          () => {
            const expires = new Date();
            const now = new Date();
            expires.setDate(now.getDate() + COOKIE_EXPIRATION);
            cookie.save('TokenId', data.TokenId, {
              path: '/',
              expires,
            });
            cookie.save('role', data.role, {
              path: '/',
              expires,
            });
            localStorage.setItem('TokenId', data.TokenId);
            if (data.role === 'Admin') history.push('/admin/home');
            else history.push('/');
          },
          () => {},
        );
      },
      error => {
        toastr.error(ERRORS.TITLE, ERRORS.REPEATED_USER);
        console.log('login error : ', error);
      },
    );
    // }
  };
  render() {
    return (
      <div>
        <div class="card ">
          <div class="card-header text-center">
            <a href="../index.html">
              <img
                className="logo-img"
                src="../assets/images/logo.png"
                alt="logo"
              />
            </a>
            <span class="splash-description">
              Please enter your user information.
            </span>
          </div>
          <div class="card-body">
            <form>
              <div class="form-group">
                <input
                  class="form-control form-control-lg"
                  id="username"
                  type="text"
                  placeholder="Username"
                  autocomplete="off"
                />
              </div>
              <div class="form-group">
                <input
                  class="form-control form-control-lg"
                  id="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div class="form-group">
                <label class="custom-control custom-checkbox">
                  <input class="custom-control-input" type="checkbox" />
                  <span class="custom-control-label">Remember Me</span>
                </label>
              </div>
              <button
                onClick={this.handleSubmit}
                type="submit"
                class="btn btn-primary btn-lg btn-block"
              >
                log in
              </button>
            </form>
          </div>
          <div class="card-footer bg-white p-0  ">
            <div class="card-footer-item card-footer-item-bordered">
              <a href="#" class="footer-link">
                Create An Account
              </a>
            </div>
            <div class="card-footer-item card-footer-item-bordered">
              <a href="#" class="footer-link">
                Forgot Password
              </a>
            </div>
          </div>
        </div>
        hellow
      </div>
    );
  }
}
export default withStyles(s)(Login);
