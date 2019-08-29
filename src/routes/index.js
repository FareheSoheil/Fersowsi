/* eslint-disable global-require */

// The top-level (parent) route
const routes = {
  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '/admin',
      children: [
        {
          path: '',
          load: () =>
            import(/* webpackChunkName: 'adminHome' */ './admin/adminHome'),
        },

        {
          path: '/claims',
          children: [
            {
              path: '',
              load: () =>
                import(/* webpackChunkName: 'adminClaims' */ './admin/ClaimsTable'),
            },
            {
              path: '/:id',
              load: () =>
                import(/* webpackChunkName: 'adminClaimDetails' */ './admin/ClaimDetails'),
            },
          ],
        },
        {
          path: '/accounts',
          children: [
            {
              path: '',
              load: () =>
                import(/* webpackChunkName: 'adminAccounts' */ './admin/AccountsTable'),
            },
            {
              path: '/:id',
              load: () =>
                import(/* webpackChunkName: 'adminProfileDetails' */ './admin/ProfileDetail'),
            },
          ],
        },
        {
          path: '/comments',
          load: () =>
            import(/* webpackChunkName: 'adminComments' */ './admin/CommentsTable'),
        },
        {
          path: '/products',
          load: () =>
            import(/* webpackChunkName: 'adminProducts' */ './admin/ProductsTable'),
        },
      ],
    },

    {
      path: '/login',
      load: () => import(/* webpackChunkName: 'login' */ './login'),
    },
    {
      path: '/register',
      load: () => import(/* webpackChunkName: 'register' */ './register'),
    },
    {
      path: '/about',
      load: () => import(/* webpackChunkName: 'about' */ './about'),
    },
    {
      path: '/privacy',
      load: () => import(/* webpackChunkName: 'privacy' */ './privacy'),
    },

    // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
    },
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'} - www.reactstarterkit.com`;
    route.description = route.description || '';

    return route;
  },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;
