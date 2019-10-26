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
import history from '../../../../history';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CustomTabel from '../../../../components/CustomTabel';
import AdvancedSearch from '../../../../components/Admin/Product/AdvancedSearch';
import Spinner from '../../../../components/Admin/Spinner';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import { SERVER } from '../../../../constants';
import {
  OPCODES,
  PRODUCT_COLUMNS_LABELS_ARRAY,
  PRODUCT_RECORD_ITEM_NAMES_ARRAY,
} from '../../../../constants/constantData';

import s from './ProductsTable.css';

class ProductsTable extends React.Component {
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
      allPeriods: '',
      productsSearchFilter: {
        publishers: '',
        singlProductTypes: '',
        productType: '', //remove s
        productContentTypes: '',
        productStatus: '',
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
        priceRange: { min: 1, max: 2000 },
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
    this.fetchAllInfo();
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
    const url = `${SERVER}/getAllAuxInfoForProducts`;
    this.setState({
      isLoading: true,
    });
    const options = {
      method: 'POST',
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
          allPublishers: response.Publishers,
          allPeriods: response.Periods,
          allProductContentTypes: response.ProductContentTypes,
          allLanguages: response.Languages,
          allAgeGroups: response.AgeGroups,
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
    console.log('FILTER ** : ', this.state.productsSearchFilter);
    this.fetchProducts();
  }
  clearFilters() {
    this.setState({
      productsSearchFilter: {
        publishers: '',
        singlProductTypes: '',
        productType: '', //remove s
        productContentTypes: '',
        productStatus: '',
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
        priceRange: { min: 1, max: 2000 },
        weightRange: { min: 10, max: 2000 },
        sortDate: false,
        sortPrice: false,
        sortWeight: false,
      },
      searchClear: true,
    });
  }
  render() {
    // let products = <div className={s.warning}>No Products Available</div>;
    // const receivedProducts = this.state.currentproducts;
    // if (receivedProducts !== undefined && receivedProducts.length !== 0)
    //   products = this.state.currentproducts.map(
    //     (product, i) =>
    //       (products = (
    //         <ProductCard
    //           product={product}
    //           onProductClick={this.onProductClick}
    //         />
    //       )),
    //   );
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
          <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
            <div className="card">
              <h4 className="card-header">Accounts</h4>
              <div className="card-body p-0">
                <div className="container-fluid">
                  <AdvancedSearch
                    hasChoiceForStatus={true}
                    searchClear={this.state.searchClear}
                    allPublishers={this.state.allPublishers}
                    allProductContentTypes={this.state.allProductContentTypes}
                    allLanguages={this.state.allLanguages}
                    allAgeGroups={this.state.allAgeGroups}
                    allPeriods={this.state.allPeriods}
                    searchFilter={this.state.productsSearchFilter}
                    handleInputChange={this.handleInputChange}
                    handleSelectChange={this.handleSelectChange}
                    fetchProducts={this.search}
                    clearFilters={this.clearFilters}
                    currentPageNumber={this.state.pageIndex}
                  />
                  <hr />

                  <CustomTabel
                    pageCount={this.state.totalPageNum}
                    currentPageNumber={this.state.pageIndex}
                    records={this.state.currentproducts}
                    columnLabels={PRODUCT_COLUMNS_LABELS_ARRAY}
                    recordItemNames={PRODUCT_RECORD_ITEM_NAMES_ARRAY}
                    allPublishers={this.state.allPublishers}
                    allProductContentTypes={this.state.allProductContentTypes}
                    allLanguages={this.state.allLanguages}
                    allAgeGroups={this.state.allAgeGroups}
                    handlePageChange={this.handlePageChange}
                    onRecordClick={this.onProductClick}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(s)(ProductsTable);
