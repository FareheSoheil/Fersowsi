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

    // console.log('Body : ', JSON.parse(options.body));
    // --------------------------------------------------- START of fetching data
    fetch(url, options)
      // fetch was successful
      .then(response => response.json())
      .then(data => {
        clearTimeout(timeOut);
        // console.log('data is fetched: ', url, ' ', data);
        resolve(data);
      })
      .catch(error => {
        console.log('error : unsuccessful error', error);
        if (isTimedOut) {
          // console.log('timedOut : unsuccessful fetch');
          return;
        }

        // TODO: check the response Header and handle Errors
        reject(error);
      });
    // ---------------------------------------------------- END of fetching data
  })
    .then(data => {
      // this happens on data being fetched
      // console.log(' resolveCallback promise', data);
      resolveCallback(data);
    })
    .catch(error => {
      // this happens on TIME_OUT
      // console.log(' rejectCallback(error) promise', error);
      rejectCallback(error);
    });
};

export { fetchWithTimeOut };
