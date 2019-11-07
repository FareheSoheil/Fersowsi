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
import RowAdder from '../../../../../components/moreTableRowSelector';
import CustomTabel from '../../../../../components/CustomTabel';
import AdvancedSearch from '../../../../../components/Admin/Product/AdvancedSearch';
import Spinner from '../../../../../components/Admin/Spinner';
import { fetchWithTimeOut } from '../../../../../fetchWithTimeout';
import { SERVER } from '../../../../../constants';
import {
  OPCODES,
  PRODUCT_COLUMNS_LABELS_ARRAY,
  PRODUCT_RECORD_ITEM_NAMES_ARRAY,
  PRODUCT_STATUS,
} from '../../../../../constants/constantData';

import s from './Ready.css';

class Ready extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      firstRender: true,
      pageIndex: 0,
      pageSize: 100,
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
        productStatus: [PRODUCT_STATUS.Ready],
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
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.showMore = this.showMore.bind(this);
    this.search = this.search.bind(this);
  }
  componentDidMount() {
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
    console.log('searchBy : ,', this.state.productsSearchFilter);
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
            totalPageNum: response.totalPageNum,
            firstRender: false,
          },
          // () => window.scroll(10, 20),
          () => {
            const auxUrl = `${SERVER}/getAllAuxInfoForProducts`;

            const auxOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            };
            const thatthat = that;
            fetchWithTimeOut(
              auxUrl,
              auxOptions,
              response => {
                thatthat.setState({
                  allPublishers: response.Publishers,
                  allPeriods: response.Periods,
                  allProductContentTypes: response.ProductContentTypes,
                  allLanguages: response.Languages,
                  allAgeGroups: response.AgeGroups,
                  allCountries: response.Countries,
                  isLoading: false,
                });
              },
              error => {
                console.log(error);
              },
            );
          },
        );
      },
      error => {
        console.log(error);
      },
    );
  }

  handleInputChange(opcode, stateName, event) {
    let value,
      productsSearchFilter,
      searchClear = false;
    if (opcode === OPCODES.checkbox) value = event.target.checked;
    else if (opcode === OPCODES.simple) value = event.target.value;
    else value = event;
    productsSearchFilter = { ...this.state.productsSearchFilter };
    productsSearchFilter[stateName] = value;
    if (stateName === 'issn' || stateName === 'originalTitle') {
      searchClear = true;
    }
    this.setState({ productsSearchFilter, searchClear: searchClear });
  }
  handleSelectChange = (selectedOption, op) => {
    // window.alert(op);
    let productsSearchFilter = { ...this.state.productsSearchFilter },
      searchClear = false;
    if (
      op == 'publishers' ||
      op == 'periods' ||
      op == 'countries' ||
      op == 'productLanguages'
    ) {
      searchClear = true;
    }
    productsSearchFilter[op] = selectedOption;
    this.setState({ productsSearchFilter, searchClear: searchClear });
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
    this.setState(
      {
        productsSearchFilter: {
          publishers: '',
          countries: '',
          singlProductTypes: '',
          productType: '', //remove s
          productContentTypes: '',
          productStatus: PRODUCT_STATUS.Ready,
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
      },
      () => {
        this.fetchProducts();
      },
    );
  }
  showMore(num) {
    this.setState(
      {
        pageSize: num,
      },
      () => {
        this.fetchProducts();
      },
    );
  }
  render() {
    return (
      <div className="container-fluid dashboard-content">
        {/* <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="page-header">
                <h2 class="pageheader-title">Products List</h2>
                <hr />
              </div>
            </div>
          </div> */}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card">
              <h5 className="card-header">Ready Products</h5>
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
                    allCountries={this.state.allCountries}
                    searchFilter={this.state.productsSearchFilter}
                    handleInputChange={this.handleInputChange}
                    handleSelectChange={this.handleSelectChange}
                    fetchProducts={this.search}
                    clearFilters={this.clearFilters}
                    showMore={this.showMore}
                    pageSize={this.state.pageSize}
                    currentPageNumber={this.state.pageIndex}
                  />
                  <div className={`${s.btnContainer} row`}>
                    <div className="col-xl-1 col-md-1 col-sm-2">
                      <RowAdder
                        showMore={this.showMore}
                        pageSize={this.state.pageSize}
                      />
                    </div>
                  </div>
                  <CustomTabel
                    pageCount={this.state.totalPageNum}
                    currentPageNumber={this.state.pageIndex}
                    records={this.state.currentproducts}
                    columnLabels={PRODUCT_COLUMNS_LABELS_ARRAY}
                    recordItemNames={PRODUCT_RECORD_ITEM_NAMES_ARRAY}
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

export default withStyles(s)(Ready);
