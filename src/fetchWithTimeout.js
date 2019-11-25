import { toastr } from 'react-redux-toastr';
import cookie from 'react-cookies';
import { REQUEST_TIMEOUT, ERRORS } from './constants';

const fetchWithTimeOut = (url, options, resolveCallback, rejectCallback) => {
  let isTimedOut = false;

  new Promise((resolve, reject) => {
    const timeOut = setTimeout(() => {
      isTimedOut = true;
      reject(ERRORS.TIME_OUT);
    }, REQUEST_TIMEOUT);
    options.headers.Authorization = cookie.load('TokenId');
    // --------------------------------------------------- START of fetching data
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        clearTimeout(timeOut);
        console.log('data : ', data);
        resolve(data);
      })
      .catch(error => {
        if (isTimedOut) {
          return;
        }
        console.log('isTimedOut  : ', error);
        // TODO: check the response Header and handle Errors
        reject(error);
      });
    // ---------------------------------------------------- END of fetching data
  })
    .then(data => {
      // this happens on data being fetched
      resolveCallback(data);
      console.log('data  : ', data);
    })
    .catch(error => {
      // this happens on TIME_OUT
      console.log('error in reject callback : ', error);
      rejectCallback(error);
    });
};

export { fetchWithTimeOut };
