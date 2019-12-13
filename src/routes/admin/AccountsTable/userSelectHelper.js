import { SERVER, SSRSERVER, COOKIE_EXPIRATION } from '../../../constants';
import cookie from 'react-cookies';
import history from '../../../history';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';

const onAct = function(parent, id) {
  const url = `${SERVER}/loginInsteadACustomer`;
  const cred = {
    userId: id,
  };
  const options = {
    method: 'POST',
    body: JSON.stringify(cred),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const that = parent;
  fetchWithTimeOut(
    url,
    options,
    response => {
      if (response.error === undefined) {
        const setStateURL = `${SSRSERVER}/state/setState`;
        const setStateOptions = {
          method: 'POST',
          body: JSON.stringify(response),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        fetchWithTimeOut(setStateURL, setStateOptions, () => {
          const expires = new Date();
          const now = new Date();
          expires.setDate(now.getDate() + COOKIE_EXPIRATION);

          cookie.save('role', response.role.value, {
            path: '/',
            expires,
          });
          cookie.save('TokenId', response.TokenId, {
            path: '/',
            expires,
          });

          cookie.save('userSubCategory', response.userSubCategory.value, {
            path: '/',
            expires,
          });
          localStorage.setItem('TokenId', response.TokenId);
          localStorage.setItem('id', response.id);
          localStorage.setItem('role', response.role.value);
          history.push('/user/products');
        });
      } else {
        toastr.error(response.error.title, response.error.description);
        console.log('login error : ', error);
      }
    },
    error => {
      console.log(error);
    },
  );
};
export { onAct };
