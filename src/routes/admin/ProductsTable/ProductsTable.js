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
import history from '../../../history';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ProductCard from '../../../components/Admin/ProductCard';
import ProductSideFilter from '../../../components/Admin/ProductSideFilter';
import Spinner from '../../../components/Admin/Spinner';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import { SERVER } from '../../../constants';
import { OPCODES } from '../../../constants/constantData';

import s from './ProductsTable.css';

class ProductsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      firstRender: true,
      pageIndex: 1,
      pageSize: 9,
      totalPageNum: 20,
      currentproducts: [{ a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }],
      searchClear: true,
      allPublishers: '',
      allProductContentTypes: '',
      allLanguages: '',
      allAgeGroups: '',

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
    // this.fetchProducts();
  }
  onProductClick(id) {
    history.push(`/admin/products/${id}`);
  }
  fetchProducts() {
    const url = `${SERVER}/getProducts`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      searchBy: this.state.productsSearchFilter,
      pageNumber: this.state.pageIndex,
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
        that.setState({
          currentproducts: response.currentRecords,
          totalPageNum: response.totalPageNumber,
          isLoading: false,
          firstRender: false,
        });
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
          allLanguages: response.languages,
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
    this.setState({ pageIndex: pageIndex.selected });
    this.fetchProducts();
  }
  search() {
    this.fetchProducts();
  }
  clearFilters() {
    this.setState({
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
              id="id for teste"
              title="abbas"
              price="666"
              discount="55"
              description="sladjas;ldkjas;ldkans;lkdjas;dlkajsdlkasjalskdjasldkjasdlkajs44"
              imgSrc="/assets/images/eco-product-img-1.png"
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
                  initialPage={this.props.pageIndex}
                  disableInitialCallback
                />
              </div>
            </div>
          </div>

          <ProductSideFilter
            filters={this.state.productsSearchFilter}
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
      </div>
    );
  }
}

export default withStyles(s)(ProductsTable);
