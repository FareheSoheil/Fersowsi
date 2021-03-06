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
          path: '/currencies',
          load: () =>
            import(/* webpackChunkName: 'adminCurrencies' */ './admin/Currencies'),
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
              path: '/claim',

              // query: '?id=:cid&orderId=:oid',
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
              path: '/add',
              load: () =>
                import(/* webpackChunkName: 'adminAddUser' */ './admin/AddUser'),
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
              path: '/add',
              load: () =>
                import(/* webpackChunkName: 'adminAddProduct' */ './admin/AddProduct'),
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
              path: '/add',
              load: () =>
                import(/* webpackChunkName: 'adminAddPublisherOrder' */ './admin/AddPublisherOrder'),
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
              path: '/add',
              load: () =>
                import(/* webpackChunkName: 'adminAddCustomerOrder' */ './admin/AddCustomerOrder'),
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
            {
              path: '/deliveryTypes',
              load: () =>
                import(/* webpackChunkName: 'adminDeliveryTypes' */ './admin/Settings/DeliveryTypes'),
            },
            {
              path: '/poductLanguages',
              load: () =>
                import(/* webpackChunkName: 'adminProductLanguages' */ './admin/Settings/ProductLanguages'),
            },
            {
              path: '/siteLanguages',
              load: () =>
                import(/* webpackChunkName: 'adminSiteLanguages' */ './admin/Settings/SiteLanguages'),
            },
            {
              path: '/productContentTypes',
              load: () =>
                import(/* webpackChunkName: 'adminProductContentTypes' */ './admin/Settings/ProductContentTypes'),
            },
            {
              path: '/currencies',
              load: () =>
                import(/* webpackChunkName: 'adminCurrencies' */ './admin/Currencies'),
            },
            {
              path: '/jobs',
              load: () =>
                import(/* webpackChunkName: 'adminJobs' */ './admin/Settings/Jobs'),
            },
            {
              path: '/zones',
              load: () =>
                import(/* webpackChunkName: 'adminZones' */ './admin/Settings/Zones'),
            },
            {
              path: '/countries',
              load: () =>
                import(/* webpackChunkName: 'adminCountries' */ './admin/Settings/Countries'),
            },
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
        {
          path: '/products',
          load: () =>
            import(/* webpackChunkName: 'userProducts' */ './user/Products'),
        },
        {
          path: '/wishlist',
          load: () =>
            import(/* webpackChunkName: 'userWishlist' */ './user/Wishlist'),
        },
        {
          path: '/address',
          children: [
            {
              path: '',
              load: () =>
                import(/* webpackChunkName: 'userAddressBook' */ './user/AddressBook'),
            },
            {
              path: '/:id',
              load: () =>
                import(/* webpackChunkName: 'userAddressDetail' */ './user/AddressDetail'),
            },
          ],
        },
        {
          path: '/order',
          children: [
            {
              path: '',
              load: () =>
                import(/* webpackChunkName: 'userOrder' */ './user/Order'),
            },
            {
              path: '/:id',
              load: () =>
                import(/* webpackChunkName: 'userOrderDetails' */ './user/Order/OrderDetails'),
            },
          ],
        },
        {
          path: '/claim',
          children: [
            {
              path: '',
              load: () =>
                import(/* webpackChunkName: 'userClaim' */ './user/Claim'),
            },
            {
              path: '/:id',
              load: () =>
                import(/* webpackChunkName: 'userClaimDetails' */ './user/Claim/ClaimDetails'),
            },
          ],
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
      path: '/forget',
      load: () => import(/* webpackChunkName: 'forget' */ './forget'),
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
    route.title = `${route.title || 'Untitled Page'} - Ferdosi`;
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
