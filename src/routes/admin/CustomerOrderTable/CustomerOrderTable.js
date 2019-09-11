/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import Spinner from '../../../components/Admin/Spinner';
import CustomTable from '../../../components/CustomTabel';
import history from '../../../history';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ProductCard from '../../../components/Admin/ProductCard';
import CustomerOrderSideFilter from '../../../components/Admin/CustomerOrderSideFilter';

import s from './CustomerOrderTable.css';
class CustomerOrderTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      pageIndex: 0,
      totalPageNumber: '',
      pageSize: 15,
      currentCustomerOrders: [],
      searchClear: true,
      allPublishers: '',
      allContentTypes: '',
      allLanguages: '',
      allAgeGroups: '',
      sortDate: false,
      sortPrice: false,
      sortWeight: false,
      productsSearchFilter: {
        publishers: '',
        singlProductTypes: '',
        productTypes: '',
        productContentTypes: '',
        status: '',
        languages: '',
        ageGroups: '',
        periods: '',
        priceRange: { min: 5, max: 10 },
        weightRange: { min: 30, max: 400 },
      },
    };
  }

  onProductClick(id) {
    history.push(`/admin/products/${id}`);
  }

  render() {
    return (
      <div className="container-fluid dashboard-content">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="page-header">
              <h2 className="pageheader-title">Customer Order List</h2>
              <hr />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12 col-12">
            <div className="card">
              <h4 className="card-header">Accounts</h4>
              <div className="card-body p-0">
                <div className="container-fluid">
                  <CustomTable
                    pageCount={20}
                    pageIndex={this.state.pageIndex}
                    records={this.state.currentAccounts}
                    columnLabels={ACCOUNTS_COLUMNS_LABELS_ARRAY}
                    recordItemNames={ACCOUNTS_RECORDE_ITEM_NAMES_ARRAY}
                    handlePageChange={this.handlePageChange}
                    onRecordClick={this.onAccountClick}
                  />
                </div>
              </div>
            </div>
          </div>

          <CustomerOrderSideFilter />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CustomerOrderTable);
