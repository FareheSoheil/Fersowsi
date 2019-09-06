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

import history from '../../../history';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ProductCard from '../../../components/Admin/ProductCard';
import CustomerOrderSideFilter from '../../../components/Admin/CustomerOrderSideFilter';

import s from './CustomerOrderTable.css';
class CustomerOrderTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: '',
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
              <h2 className="pageheader-title">Products List</h2>
              <hr />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12 col-12">
            <div className="row">
              <ProductCard
                id="id for teste"
                title="abbas"
                price="666"
                discount="55"
                description="sladjas;ldkjas;ldkans;lkdjas;dlkajsdlkasjalskdjasldkjasdlkajs44"
                imgSrc="/assets/images/eco-product-img-1.png"
                onProductClick={this.onProductClick}
              />

              {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <ReactPaginate
              previousLabel="<"
              nextLabel=">"
              pageCount={this.state.tot}.jpg
              pageRangeDisplayed={3}
              onPageChange={this.props.handlePageChange}
              marginPagesDisplayed={1}
              containerClassName="paginate"
              subContainerClassName="pages paginate"
              activeClassName="active-page"
              breakClassName="break-me"
              initialPage={this.props.currentPageNumber}
              disableInitialCallback
            />
              </div> */}
            </div>
          </div>

          <CustomerOrderSideFilter />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CustomerOrderTable);
