import { toastr } from 'react-redux-toastr';
import cookie from 'react-cookies';
import { REQUEST_TIMEOUT, ERRORS } from './constants';

const fetchWithTimeOut = (url, options, resolveCallback, rejectCallback) => {
  let isTimedOut = false;

  // this is for time out on fetch
  new Promise((resolve, reject) => {
    const timeOut = setTimeout(() => {
      isTimedOut = true;
      reject(ERRORS.TIME_OUT);
    }, REQUEST_TIMEOUT);
    console.log('this is options', options.headers);
    const headers = options.headers;
    options.headers.Authorization = cookie.load('TokenId');
    console.log('loadAll() : ', cookie.loadAll());

    // START of fetching data
    fetch(url, options)
      // fetch was successful
      .then(response => response.json())
      .then(data => {
        clearTimeout(timeOut);
        resolve(data);
      })
      .catch(error => {
        if (isTimedOut) return;
        // TODO: check the response Header and handle Errors
        console.log('this is error from fetchWithTime ', error);
        reject(error);
      });
    // END of fetching data
  })
    .then(data => {
      // this happens on data being fetched
      resolveCallback(data);
    })
    .catch(error => {
      toastr.error(ERRORS.TITLE, 'time out');
      // window.alert('--------------------time OUt ------------------------');
      // this happens on TIME_OUT
      rejectCallback(error);
    });
};

export { fetchWithTimeOut };
