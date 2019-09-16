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
          path: '/CMS',
          load: () => import(/* webpackChunkName: 'adminCMS' */ './admin/CMS'),
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
              path: '/id=:cid & orderId=:oid',
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
          children: [
            {
              path: '',
              load: () =>
                import(/* webpackChunkName: 'adminProducts' */ './admin/ProductsTable'),
            },
            {
              path: '/:id',
              load: () =>
                import(/* webpackChunkName: 'adminProductDetails' */ './admin/ProductDetail'),
            },
          ],
        },
        {
          path: '/publisherOrder',
          children: [
            {
              path: '',
              load: () =>
                import(/* webpackChunkName: 'adminPublisherOrderTable' */ './admin/PublisherOrderTable'),
            },
            {
              path: '/:id',
              load: () =>
                import(/* webpackChunkName: 'adminPublisherOrderDetail' */ './admin/PublisherOrderDetail'),
            },
          ],
        },
        {
          path: '/customerOrder',
          children: [
            {
              path: '',
              load: () =>
                import(/* webpackChunkName: 'adminCustomerOrderTable' */ './admin/CustomerOrderTable'),
            },
            {
              path: '/:id',
              load: () =>
                import(/* webpackChunkName: 'adminCustomerOrderDetail' */ './admin/CustomerOrderDetail'),
            },
          ],
        },
        {
          path: '/settings',
          children: [
            {
              path: '/ageGroups',
              load: () =>
                import(/* webpackChunkName: 'adminAgeGroups' */ './admin/Settings/AgeGroups'),
            },
            // {
            //   path: '/productLanguage',
            //   load: () =>
            //     import(/* webpackChunkName: 'adminProductLanguage' */ './admin/Settings/ProductLanguage'),
            // },
          ],
        },
      ],
    },
    {
      path: '/user',
      children: [
        {
          path: '',
          load: () =>
            import(/* webpackChunkName: 'userHome' */ './user/userHome'),
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
