/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import Promise from 'bluebird';
//
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressGraphQL from 'express-graphql';
import nodeFetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './createFetch';
import router from './router';
import models from './data/models';
import schema from './data/schema';
import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
import { userIsLoggedIn } from './actions/userLoggin';
import config from './config';
import { InitializeSQLite, readTokenIdFromDB } from './sqliteManager';
import stateController from './stateController';
import { ROLES } from './constants';

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

const app = express();

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', config.trustProxy);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/state', stateController);
app.all('*', Authorize);

InitializeSQLite();

async function Authorize(req, res, next) {
  const statePat = new RegExp('/state/');
  const forgetPat = new RegExp('/forget');
  const registerPat = new RegExp('/register');
  const loginPat = new RegExp('/login');
  const newPassPat = new RegExp('/newpass');
  // console.log(
  //   '*****************authorize***************',
  //   req.path,
  //   loginPat.test(req.path),
  // );
  if (statePat.test(req.path) && req.method === 'POST') {
    return next();
  }
  if (
    loginPat.test(req.path) ||
    forgetPat.test(req.path) ||
    newPassPat.test(req.path) ||
    registerPat.test(req.path)
  ) {
    if (req.cookies.TokenId === undefined) {
      // console.log('###### coockie undefined ######');
      return next();
    }
    // console.log('###### coockie defined ######');
    res.redirect('/admin');
  } else if (req.cookies.TokenId === undefined) {
    res.redirect('/login');
  } else if (req.cookies.TokenId !== undefined) {
    const fetchedState = await readTokenIdFromDB(req.cookies.TokenId);
    if (fetchedState === undefined) {
      console.log(
        'cookie is defined : ',
        req.cookies.TokenId,
        ' but no state found',
      );
      res.clearCookie('TokenId');
      res.redirect('/login');
    } else {
      next();
    }
  }
}

// // Register API middleware
// // -----------------------------------------------------------------------------
app.use(
  '/graphql',
  expressGraphQL(req => ({
    schema,
    graphiql: __DEV__,
    rootValue: { request: req },
    pretty: __DEV__,
  })),
);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const css = new Set();

    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    const insertCss = (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()));
    };

    // Universal HTTP client
    const fetch = createFetch(nodeFetch, {
      baseUrl: config.api.serverUrl,
      cookie: req.headers.cookie,
      schema,
      // graphql,
    });

    const initialState = {
      user: req.user || null,
    };

    const store = configureStore(initialState, {
      fetch,
      role: '',
      // I should not use `history` on server.. but how I do redirection? follow universal-router
    });

    console.log('store : ', store.getState());
    store.dispatch(
      setRuntimeVariable({
        name: 'initialNow',
        value: Date.now(),
      }),
    );

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      insertCss,
      fetch,
      // The twins below are wild, be careful!
      pathname: req.path,
      query: req.query,
      role: req.cookies.role,
      // You can access redux through react-redux connect
      store,
      storeSubscription: null,
    };

    const route = await router.resolve(context);

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(
      <App context={context}>{route.component}</App>,
    );
    data.styles = [{ id: 'css', cssText: [...css].join('') }];

    const scripts = new Set();
    const addChunk = chunk => {
      if (chunks[chunk]) {
        chunks[chunk].forEach(asset => scripts.add(asset));
      } else if (__DEV__) {
        throw new Error(`Chunk with name '${chunk}' cannot be found`);
      }
    };
    addChunk('client');
    if (route.chunk) addChunk(route.chunk);
    if (route.chunks) route.chunks.forEach(addChunk);

    data.scripts = Array.from(scripts);
    data.app = {
      apiUrl: config.api.clientUrl,
      state: context.store.getState(),
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
    // match routes
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
const promise = models.sync().catch(err => console.error(err.stack));
if (!module.hot) {
  promise.then(() => {
    app.listen(config.port, () => {
      console.info(`The server is running at http://localhost:${config.port}/`);
    });
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

// Server mimic controllers :
app.post('/login', (req, res, next) => {
  console.log('###### in login controller######', req.body.username);

  const user = req.body.username;
  const data = {
    TokenId: 'inAlakieAzizam',
    role: 'Admin',
    name: 'فارهه',
    lastName: 'سهیل',
  };

  res.send(data);
});
let comments = [
  {
    id: 'Product1',
    senderUserName: 'id22222',
    receiverUserName: 'farehe1',
    repliedMSGId: '3000',
    msgStatus: 'sd',
    status: 'pending',
  },
  {
    id: 'Product2',
    senderUserName: 'id22222',
    receiverUserName: 'farehe2',
    repliedMsgId: '300tt',
    msgStatus: 'ef',
    status: 'rej',
  },
  {
    id: 'Product3',
    senderUserName: 'id22222',
    receiverUserName: 'farehe3',
    repliedMSGId: '7ujfh65',
    msgStatus: 'e',
    status: 'acc',
  },
];
app.post('/getComments', (req, res, next) => {
  console.log('--------------------- in getComments controller--------------');
  const role = req.cookies;
  if (role === ROLES.cusomer || role === ROLES.publisher) res.redirect('/');
  else {
    let data = {};
    const filter = req.body.searchBy;
    // console.log('^^^^^^^^^^^^^^^^^^ search By^^^^^^^^^ : ', filter);
    const pn = req.body.pageNumber;
    data = {
      currentRecords: comments,
      totalPageNumber: 20,
    };
    res.send(data);
  }
});
app.post('/modifyComments', (req, res, next) => {
  console
    .log
    // '--------------------- in modifyComments controller--------------',
    ();
  const role = req.cookies;
  if (role === ROLES.cusomer || role === ROLES.publisher) res.redirect('/');
  else {
    let data = {};
    const id = req.body.productId;
    const status = req.body.status;
    comments[0].status = status;
    data = {
      currentRecords: comments,
      totalPageNumber: 20,
    };
    res.send(data);
  }
});
let Users = [
  {
    id: 'Product1',
    profilePic: '/assets/images/card-img-1.jpg',
    firstName: 'id22222',
    lastName: 'farehe1',
    username: '3000',
    email: 'sd',
  },
  {
    firstName: 'id22222',
    id: 'Product2',
    profilePic: '/assets/images/card-img-1.jpg',

    lastName: 'farehe1',
    username: '3000',
    email: 'sd',
  },
  {
    profilePic: '/assets/images/card-img-1.jpg',
    firstName: 'id22222',
    lastName: 'farehe1',
    username: '3000',
    email: 'sd',
    id: 'Product3',
  },
];
app.post('/addToWishList', (req, res, next) => {
  const id = req.body.productId;
  data = {
    currentRecords: 'comments',
    totalPageNumber: 20,
  };
  res.send(data);
});
app.post('/getUsers', (req, res, next) => {
  console.log(
    // '--------------------- in req headres--------------',
    req.headers,
  );
  const role = req.cookies;
  if (role === ROLES.cusomer || role === ROLES.publisher) res.redirect('/');
  else {
    let data = {};
    const filter = req.body.searchBy;
    console.log('^^^^^^^^^^^^^^^^^^ search By^^^^^^^^^ : ', filter);
    const pn = req.body.pageNumber;
    data = {
      currentRecords: Users,
      totalPageNumber: 20,
    };
    res.send(data);
  }
});
export default app;
