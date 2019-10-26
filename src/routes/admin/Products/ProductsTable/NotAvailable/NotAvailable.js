/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import ReactPaginate from 'react-paginate';
import history from '../../../../../history';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ProductCard from '../../../../../components/Admin/Product/ProductCard';
import ProductSideFilter from '../../../../../components/Admin/Product/ProductSideFilter';
import Spinner from '../../../../../components/Admin/Spinner';
import { fetchWithTimeOut } from '../../../../../fetchWithTimeout';
import { SERVER } from '../../../../../constants';
import { OPCODES, PRODUCT_STATUS } from '../../../../../constants/constantData';

import s from './NotAvailable.css';

class NotAvailable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      firstRender: true,
      pageIndex: 0,
      pageSize: 9,
      totalPageNum: '',
      currentproducts: [{ a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }],
      searchClear: true,
      allPublishers: '',
      allProductContentTypes: '',
      allLanguages: '',
      allAgeGroups: '',
      productsSearchFilter: {
        publishers: '',
        singlProductTypes: '',
        productType: '', //remove s
        productContentTypes: '',
        productStatus: PRODUCT_STATUS.NotAvailable,
        productLanguages: '',
        ageGroups: '',
        originalTitle: '',
        originalDesc: '',
        periods: '',
        originalTitle: '',
        originalDesc: '',
        issn: '',
        asb: '',
        dewey: '',
        hasDiscount: '',
        priceRange: { min: 1, max: 100 },
        weightRange: { min: 10, max: 2000 },
        sortDate: false,
        sortPrice: false,
        sortWeight: false,
      },
    };
    this.fetchProducts = this.fetchProducts.bind(this);
    this.fetchAllInfo = this.fetchAllInfo.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    // this.fetchAllInfo();
    this.fetchProducts();
  }
  onProductClick(id) {
    history.push(`/admin/products/${id}`);
  }
  fetchProducts() {
    const url = `${SERVER}/getAllProducts`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      searchBy: this.state.productsSearchFilter,
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize,
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const that = this;
    fetchWithTimeOut(
      url,
      options,
      response => {
        that.setState(
          {
            currentproducts: response.currentRecords,
            totalPageNum: response.totalPageNumber,
            isLoading: false,
            firstRender: false,
          },
          () => window.scroll(10, 20),
        );
      },
      error => {
        console.log(error);
      },
    );
  }
  fetchAllInfo() {
    const url = `${SERVER}/getAllInfo`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      // searchBy: this.state.productsSearchFilter,
      // pageNumber: this.state.currentPageNumber,
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const that = this;
    fetchWithTimeOut(
      url,
      options,
      response => {
        that.setState({
          allPublishers: response.publishers,
          allProductContentTypes: response.contentTypes,
          allLanguages: response.productLanguages,
          allAgeGroups: response.ageGroups,
        });
      },
      error => {
        console.log(error);
      },
    );
  }
  handleInputChange(opcode, stateName, event) {
    let value;
    if (opcode === OPCODES.checkbox) value = event.target.checked;
    else if (opcode === OPCODES.simple) value = event.target.value;
    else value = event;
    let productsSearchFilter = { ...this.state.productsSearchFilter };
    productsSearchFilter[stateName] = value;
    this.setState({ productsSearchFilter, searchClear: false });
  }
  handleSelectChange = (selectedOption, op) => {
    let productsSearchFilter = { ...this.state.productsSearchFilter };
    productsSearchFilter[op] = selectedOption;
    this.setState({ productsSearchFilter, searchClear: false });
  };
  handlePageChange(pageIndex) {
    this.setState({ pageIndex: pageIndex.selected }, () =>
      this.fetchProducts(),
    );
  }
  search() {
    this.fetchProducts();
  }
  clearFilters() {
    this.setState({
      productsSearchFilter: {
        publishers: '',
        singlProductTypes: '',
        productType: '', //remove s
        productContentTypes: '',
        productStatus: PRODUCT_STATUS.NotAvailable,
        productLanguages: '',
        ageGroups: '',
        originalTitle: '',
        originalDesc: '',
        periods: '',
        originalTitle: '',
        originalDesc: '',
        issn: '',
        asb: '',
        dewey: '',
        hasDiscount: '',
        priceRange: { min: 1, max: 100 },
        weightRange: { min: 10, max: 2000 },
        sortDate: false,
        sortPrice: false,
        sortWeight: false,
      },
      searchClear: true,
    });
  }
  render() {
    let products = <div className={s.warning}>No Products Available</div>;
    const receivedProducts = this.state.currentproducts;
    if (receivedProducts !== undefined && receivedProducts.length !== 0)
      products = this.state.currentproducts.map(
        (product, i) =>
          (products = (
            <ProductCard
              product={product}
              onProductClick={this.onProductClick}
            />
          )),
      );
    return (
      <div className="container-fluid dashboard-content">
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="page-header">
              <h2 class="pageheader-title">Products List</h2>
              <hr />
            </div>
          </div>
        </div>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div class="row">
            <div class="col-xl-9 col-lg-8 col-md-8 col-sm-12 col-12">
              <div class="row">{products}</div>
              <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <ReactPaginate
                    previousLabel="<"
                    nextLabel=">"
                    pageCount={this.state.totalPageNum}
                    pageRangeDisplayed={3}
                    onPageChange={this.handlePageChange}
                    marginPagesDisplayed={1}
                    containerClassName="paginate"
                    subContainerClassName="pages paginate"
                    activeClassName="active-page"
                    breakClassName="break-me"
                    initialPage={this.state.pageIndex}
                    disableInitialCallback
                  />
                </div>
              </div>
            </div>

            <ProductSideFilter
              filters={this.state.productsSearchFilter}
              hasChoiceForStatus={false}
              allPublishers={[
                { value: 1, label: 'aa1' },
                { value: 2, label: 'aa2' },
                { value: 3, label: 'aa3' },
                { value: 4, label: 'aa4' },
              ]}
              allProductContentTypes={this.state.allProductContentTypes}
              allLanguages={this.state.allLanguages}
              allAgeGroups={this.state.allAgeGroups}
              handleSelectChange={this.handleSelectChange}
              handleInputChange={this.handleInputChange}
              handleClearSearch={this.clearFilters}
              handleSearch={this.search}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(s)(NotAvailable);
