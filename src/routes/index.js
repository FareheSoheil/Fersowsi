/* eslint-disable global-require */

// The top-level (parent) route
const routes = {
  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '',
      load: () => import(/* webpackChunkName: 'landing' */ './landing'),
    },
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
                import(/* webpackChunkName: 'adminClaims' */ './admin/Claims/ClaimsTable'),
            },
            {
              path: '/:id',

              // query: '?id=:cid&orderId=:oid',
              load: () =>
                import(/* webpackChunkName: 'adminClaimDetails' */ './admin/Claims/ClaimDetails'),
            },
          ],
        },
        {
          path: '/accounts',
          children: [
            {
              path: '/all',
              load: () =>
                import(/* webpackChunkName: 'adminAccounts' */ './admin/AccountsTable'),
            },
            {
              path: '/customers',
              load: () =>
                import(/* webpackChunkName: 'adminCustomers' */ './admin/AccountsTable/Customers'),
            },
            {
              path: '/publishers',
              load: () =>
                import(/* webpackChunkName: 'adminPublishers' */ './admin/AccountsTable/Publishers'),
            },
            {
              path: '/operators',
              load: () =>
                import(/* webpackChunkName: 'adminOperators' */ './admin/AccountsTable/Operators'),
            },
            {
              path: '/waitForApproval',
              load: () =>
                import(/* webpackChunkName: 'adminWaitForApproval' */ './admin/AccountsTable/WaitForApproval'),
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
              path: '/all',
              load: () =>
                import(/* webpackChunkName: 'adminProducts' */ './admin/Products/ProductsList'),
            },
            {
              path: '/pending',
              load: () =>
                import(/* webpackChunkName: 'adminPendingProducts' */ './admin/Products/ProductsList/Pending'),
            },
            {
              path: '/ready',
              load: () =>
                import(/* webpackChunkName: 'adminReadyProducts' */ './admin/Products/ProductsList/Ready'),
            },
            {
              path: '/notAvailable',
              load: () =>
                import(/* webpackChunkName: 'adminNotAvailableProducts' */ './admin/Products/ProductsList/NotAvailable'),
            },
            {
              path: '/add',
              load: () =>
                import(/* webpackChunkName: 'adminAddProduct' */ './admin/Products/AddProduct'),
            },
            {
              path: '/:id',
              load: () =>
                import(/* webpackChunkName: 'adminProductDetails' */ './admin/Products/ProductDetail'),
            },
          ],
        },
        {
          path: '/ordersForPublisher',
          children: [
            {
              path: '',
              load: () =>
                import(/* webpackChunkName: 'adminOrdersForPublishers' */ './admin/OrdersForPubisher/OrdersForPubisherList'),
            },
            {
              path: '/:id',
              load: () =>
                import(/* webpackChunkName: 'adminOrdersForPublishersDetails' */ './admin/OrdersForPubisher/OrdersForPubisherDetails'),
            },
          ],
        },
        {
          path: '/publisherOrder',
          children: [
            {
              path: '/all',
              load: () =>
                import(/* webpackChunkName: 'adminPublisherOrderTable' */ './admin/Orders/PublisherOrderList'),
            },
            {
              path: '/accepted',
              load: () =>
                import(/* webpackChunkName: 'adminOrdersForPublishersDetails' */ './admin/Orders/PublisherOrderList/Accepted'),
            },
            {
              path: '/cancelled',
              load: () =>
                import(/* webpackChunkName: 'adminCancelledPublisherOrders' */ './admin/Orders/PublisherOrderList/Cancelled'),
            },
            {
              path: '/add',
              load: () =>
                import(/* webpackChunkName: 'adminAddPublisherOrder' */ './admin/AddPublisherOrder'),
            },
            {
              path: '/:id',
              load: () =>
                import(/* webpackChunkName: 'adminPublisherOrderDetail' */ './admin/Orders/PublisherOrderDetail'),
            },
          ],
        },
        {
          path: '/customerOrder',
          children: [
            {
              path: '/all',
              load: () =>
                import(/* webpackChunkName: 'adminCustomerOrderTable' */ './admin/CustomerOrder/CustomerOrderTable'),
            },
            {
              path: '/new',
              load: () =>
                import(/* webpackChunkName: 'adminNewCustomerOrders' */ './admin/CustomerOrder/CustomerOrderTable/New'),
            },
            {
              path: '/ignored',
              load: () =>
                import(/* webpackChunkName: 'adminIgnoredCustomerOrders' */ './admin/CustomerOrder/CustomerOrderTable/Ignored'),
            },
            {
              path: '/cancelled',
              load: () =>
                import(/* webpackChunkName: 'adminCancelledCustomerOrders' */ './admin/CustomerOrder/CustomerOrderTable/Cancelled'),
            },
            {
              path: '/delayed',
              load: () =>
                import(/* webpackChunkName: 'adminDelayedCustomerOrders' */ './admin/CustomerOrder/CustomerOrderTable/Delayed'),
            },
            {
              path: '/inProgress',
              load: () =>
                import(/* webpackChunkName: 'adminInProgressCustomerOrders */ './admin/CustomerOrder/CustomerOrderTable/InProgress'),
            },
            {
              path: '/done',
              load: () =>
                import(/* webpackChunkName: 'adminDoneCustomerOrders' */ './admin/CustomerOrder/CustomerOrderTable/Done'),
            },
            {
              path: '/add',
              load: () =>
                import(/* webpackChunkName: 'adminAddCustomerOrder' */ './admin/AddCustomerOrder'),
            },
            {
              path: '/:id',
              load: () =>
                import(/* webpackChunkName: 'adminCustomerOrderDetail' */ './admin/CustomerOrder/CustomerOrderDetail'),
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
        {
          path: '/addresses',
          children: [
            {
              path: '',
              load: () =>
                import(/* webpackChunkName: 'adminAddressTable' */ './admin/Address/AddressList'),
            },
            {
              path: '/:id',
              load: () =>
                import(/* webpackChunkName: 'adminDeliveryTypes' */ './admin/Settings/DeliveryTypes'),
            },
          ],
        },
      ],
    },
    {
      path: '/user',
      children: [
        // {
        //   path: '',
        //   load: () =>
        //     import(/* webpackChunkName: 'userHome' */ './user/userHome'),
        // },
        {
          path: '/products',
          children: [
            {
              path: '',
              load: () =>
                import(/* webpackChunkName: 'userProducts' */ './user/Products'),
            },
            {
              path: '/:id',
              load: () =>
                import(/* webpackChunkName: 'userProductDetails' */ './user/Products/ProductDetails'),
            },
          ],
        },
        {
          path: '/wishlist',
          load: () =>
            import(/* webpackChunkName: 'userWishlist' */ './user/Wishlist'),
        },
        {
          path: '/myAccount',
          load: () =>
            import(/* webpackChunkName: 'userProfile' */ './user/Profile'),
        },
        {
          path: '/address',
          children: [
            {
              path: '',
              load: () =>
                import(/* webpackChunkName: 'userAddressBook' */ './user/Address/AddressBook'),
            },
            {
              path: '/:id',
              load: () =>
                import(/* webpackChunkName: 'userAddressDetail' */ './user/Address/AddressDetail'),
            },
          ],
        },
        {
          path: '/request',
          children: [
            {
              path: '',
              load: () =>
                import(/* webpackChunkName: 'userRequestTable' */ './user/Requests/Request'),
            },
            {
              path: '/:id',
              load: () =>
                import(/* webpackChunkName: 'userRequestDetail' */ './user/Requests/RequestDetail'),
            },
          ],
        },
        {
          path: '/advancedSearch',
          load: () =>
            import(/* webpackChunkName: 'userAdvancedSearch' */ './user/AdvancedSearch'),
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
        {
          path: '/newClaims',
          load: () =>
            import(/* webpackChunkName: 'newClaims' */ './user/Claim/newClaims'),
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
