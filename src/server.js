/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
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
import config from './config';
import { InitializeSQLite, readTokenIdFromDB } from './sqliteManager';
import stateController from './stateController';
import { ROLES } from './constants';

const statePat = new RegExp('/state/*');
const forgetPat = new RegExp('/forget');
const changePat = new RegExp('/changePass/*');
const congrats = new RegExp('/congrats');
const registerPat = new RegExp('/register');
const loginPat = new RegExp('/login');
const userPaths = new RegExp('/user/*');
const publisherPaths = new RegExp('/publisher/*');
const adminPaths = new RegExp('/admin/*');
const newPassPat = new RegExp('/newpass');
const homePat = new RegExp('^/$');

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
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
function otherPathResolver(path) {
  if (
    loginPat.test(path) ||
    forgetPat.test(path) ||
    newPassPat.test(path) ||
    registerPat.test(path) ||
    changePat.test(path) ||
    congrats.test(path)
  )
    return 2;
  else if (
    adminPaths.test(path) ||
    publisherPaths.test(path) ||
    userPaths.test(path)
  )
    return 1;
  return 3;
}
async function Authorize(req, res, next) {
  if (statePat.test(req.path) && req.method == 'POST') {
    console.log('in state ', req.path);
    return next();
  }

  // user not logged in
  if (req.cookies.TokenId === undefined) {
    console.log('in not logged in');
    // ----------------------------if other pages than main
    if (otherPathResolver(req.path)) {
      //  => allowed to go
      return next();
    }
    if ('/' === req.path) {
      return next();
    } else {
      return next();
    }
  } else if (req.cookies.TokenId !== undefined) {
    // ********************** End of User not logged in process

    // ********************** User Has Logged in
    // ********** checking if User is Valid
    const fetchedState = await readTokenIdFromDB(req.cookies.TokenId);
    if (fetchedState === undefined) {
      res.clearCookie('TokenId');
      res.clearCookie('role');
      res.redirect('/login');
    } else {
      // *********************** User is Valid
      // ********************** if user wants other pages
      console.log('url requeste : ', req.path);
      if (otherPathResolver(req.path) == 2) {
        if (req.cookies.role == ROLES.customer.value) {
          res.redirect('/user/myAccount');
        } else if (req.cookies.role == ROLES.publisher.value)
          res.redirect('/publisher');
        else res.redirect('/admin');
        // --------------------------------if any where else than main pages
      } else if (otherPathResolver(req.path) == 3) return next();
      else {
        // ********************** if user wants main pages
        // ************************ if it is customer or admin Customer
        if (
          req.cookies.role == ROLES.customer.value ||
          req.cookies.role == ROLES.adminCustomer.value
        ) {
          if (homePat.test(req.path)) {
            console.log('im fixing redirections : ', req.path);
            return next();
            // res.redirect('/user/advancedSearch');
          } else if (!userPaths.test(req.path)) {
            if (req.cookies.role == ROLES.adminCustomer.value) return next();

            res.redirect('/user/products');
          } else {
            console.log('User wants user pages');
            return next();
          }
        } else if (req.cookies.role != ROLES.customer.value) {
          // ******************** if it is not customer
          // ******************* End Of Customer Validation
          console.log('Heeereeeeeeeeeee');
          // if Admin or publisher want user pages
          if (userPaths.test(req.path) || homePat.test(req.path)) {
            if (req.cookies.role == ROLES.adminCustomer.value) {
              console.log('in admin cusromer and customer if');
              return next();
            } else if (req.cookies.role == ROLES.publisher.value) {
              console.log('in Publisher if');
              res.redirect('/publisher');
            } else {
              console.log('in else ');
              res.redirect('/admin');
            }
          } else {
            // They want their own page
            if (publisherPaths.test(req.path) || homePat.test(req.path)) {
              if (req.cookies.role == ROLES.admin.value) {
                console.log('in admin wants publisher pages ');
                res.redirect('/admin');
              }
              return next();
            } else if (adminPaths.test(req.path) || homePat.test(req.path)) {
              if (req.cookies.role == ROLES.publisher.value) {
                console.log('in publisher wants admin pages ');
                res.redirect('/publisher');
              }
              return next();
            }
            if (req.cookies.role == ROLES.publisher.value)
              console.log('in last else ');
            return next();
          }
        }
      }
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
      console.info(
        `The server is running at http://45.89.139.182:${config.port}/`,
      );
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

export default app;
