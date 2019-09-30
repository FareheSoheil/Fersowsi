import express from 'express';
// import userState from './userState';
// import generalState from './generalState';
import authentication from './authentication';
import country from './country';
// import timezone from './timezone';
import currency from './currency';
import ageGroup from './ageGroup';
import job from './job';
import zone from './zone';
import productContentType from './productContentType';
import productPeriod from './productPeriod';
import singleProductType from './singleProductType';
import customerOrderStatus from './customerOrderStatus';
import publisherOrderStatus from './publisherOrderStatus';
import messageStatus from './messageStatus';
import deliveryType from './deliveryType';
import productLanguage from './productLanguage';
import siteLanguage from './siteLanguage';
import userSubCategory from './userSubCategory';
import address from './address';
import claim from './claim';
import comment from './comment';
import contactUs from './contactUs';
import basket from './basket';
import customerOrder from './customerOrder';
import invoice from './invoice';
import publisherOrder from './publisherOrder';
import deliveryPrice from './deliveryPrice';
import landingPage from './landingPage';
import product from './product';
import productContentCategory from './productContentCategory';
import productContentTranslation from './productContentTranslation';

import productPeriodPrice from './productPeriodPrice';
import userActivity from './userActivity';















// import token from './token';
// import pair from './pair';
// import wallet from './wallet';
// import trade from './trade';
// import transaction from './transaction';
// import favouritePairs from './favouritePairs';
// import favouriteCharts from './favouriteCharts';
// import price from './price';
// import order from './order';
// import payment from './payment';
import user from './user';
// import ticker from './ticker';

import { jwtVerify, jwtErrorHandle } from '../middleware';
// import { Job, Address, Basket } from '../models';
// import { comment } from 'postcss';
// import getOrderBook from '../controllers/order/getOrderBook';

// TODO: make all status codes correct

const app = express();

// app.use('/userState', jwtVerify(false), jwtErrorHandle, userState);
// app.use('/generalState', jwtVerify(false), jwtErrorHandle, generalState);

// app.use('/orderbook', jwtVerify(false), jwtErrorHandle, getOrderBook);


app.use('', authentication); // TODO: change auth to user

// app.use('/country', jwtVerify(false), jwtErrorHandle, country);
// app.use('/timezone', jwtVerify(false), jwtErrorHandle, timezone);

// app.use('/token', jwtVerify(false), jwtErrorHandle, token);
// app.use('/pair', jwtVerify(false), jwtErrorHandle, pair);
// app.use('/ticker', jwtVerify(false), jwtErrorHandle, ticker);

// app.use('/price', jwtVerify(false), jwtErrorHandle, price);

// app.use('/wallet', jwtVerify(true), jwtErrorHandle, wallet);
// app.use('/trade', jwtVerify(true), jwtErrorHandle, trade);
// app.use('/favouritePairs', jwtVerify(true), jwtErrorHandle, favouritePairs);
// app.use('/favouriteCharts', jwtVerify(true), jwtErrorHandle, favouriteCharts);
// app.use('/order', jwtVerify(true), jwtErrorHandle, order);
// app.use('/payment', jwtVerify(true), jwtErrorHandle, payment);
app.use('', user);
app.use('', jwtVerify(true), jwtErrorHandle, currency);
app.use('', jwtVerify(true), jwtErrorHandle, country);
app.use('', jwtVerify(true), jwtErrorHandle, ageGroup);

app.use('', jwtVerify(true), jwtErrorHandle, job);
app.use('', jwtVerify(true), jwtErrorHandle, zone);
app.use('', jwtVerify(true), jwtErrorHandle, productContentType);
app.use('', jwtVerify(true), jwtErrorHandle, productPeriod);
app.use('', jwtVerify(true), jwtErrorHandle, singleProductType);
app.use('', jwtVerify(true), jwtErrorHandle, customerOrderStatus);
app.use('', jwtVerify(true), jwtErrorHandle, publisherOrderStatus);
app.use('', jwtVerify(true), jwtErrorHandle, messageStatus);
app.use('', jwtVerify(true), jwtErrorHandle, deliveryType);
app.use('', jwtVerify(true), jwtErrorHandle, productLanguage);
app.use('', jwtVerify(true), jwtErrorHandle, siteLanguage);
app.use('', jwtVerify(true), jwtErrorHandle, userSubCategory);
app.use('', jwtVerify(true), jwtErrorHandle, address);
app.use('', jwtVerify(true), jwtErrorHandle, claim);
app.use('', jwtVerify(true), jwtErrorHandle, comment);
app.use('', jwtVerify(true), jwtErrorHandle, contactUs);
app.use('', jwtVerify(true), jwtErrorHandle, basket);
app.use('', jwtVerify(true), jwtErrorHandle, customerOrder);
app.use('', jwtVerify(true), jwtErrorHandle, invoice);
app.use('', jwtVerify(true), jwtErrorHandle, publisherOrder);
app.use('', jwtVerify(true), jwtErrorHandle, deliveryPrice);
app.use('', jwtVerify(true), jwtErrorHandle, landingPage);
app.use('', jwtVerify(true), jwtErrorHandle, product);
app.use('', jwtVerify(true), jwtErrorHandle, productContentCategory);
app.use('', jwtVerify(true), jwtErrorHandle, productContentTranslation);
app.use('', jwtVerify(true), jwtErrorHandle, productPeriodPrice);
app.use('', jwtVerify(true), jwtErrorHandle, userActivity);



// app.use('/transaction', jwtVerify(true), jwtErrorHandle, transaction);
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    console.log("token invalid!");
  } else {
    next();
  }
});
export default app;
