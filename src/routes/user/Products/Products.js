import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ReactPaginate from 'react-paginate';

import Spinner from '../../../components/User/Spinner';
import s from './Products.css';
import ProductSideFilter from '../../../components/User/ProductSideFilter';
import AdvancedListContainer from '../../../components/User/AdvancedListContainer';
import ProductItem from '../../../components/User/ProductItem';
import { SERVER, OPCODES } from '../constants';

import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import history from '../../../history';
class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      pageIndex: 2,
      pageSize: 15,
      totalPageNum: 15,
      sortBy: '',
      searchClear: true,
      allPublishers: '',
      allProductContentTypes: '',
      allLanguages: '',
      allAgeGroups: '',
      currentproducts: ['a', 'b', 'c', 'd'],
      productsSearchFilter: {
        productName: '',
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

      allCountries: [],
    };
    this.fetchProducts = this.fetchProducts.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleOnWish = this.handleOnWish.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
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
      sortBy: this.state.sortBy,
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
          isLoading: false,
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
  handleSortChange = selectedOption => {
    window.alert('hi');
    this.setState({ sortBy: selectedOption, searchClear: false }, () => {
      window.alert('hi');
      this.fetchProducts();
    });
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
        productName: '',
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
  handleOnWish(id) {
    const url = `${SERVER}/addToFavorite`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      productId: id,
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
          isLoading: false,
        });
      },
      error => {
        console.log(error);
      },
    );
  }
  render() {
    let products = <div className={s.warning}>No Products Available</div>;
    const receivedProducts = this.state.currentproducts;
    if (receivedProducts !== undefined && receivedProducts.length !== 0)
      products = this.state.currentproducts.map(
        (product, i) =>
          (products = (
            <ProductItem
              product={product}
              //  isWished
              handleOnWish={this.handleOnWish}
            />
          )),
      );
    return (
      <div>
        {' '}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div className="container-fluid">
            <div className="row">
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
              <AdvancedListContainer handleSelectChange={this.handleSortChange}>
                {products}
              </AdvancedListContainer>
            </div>
            <div className="row">
              <div className="offset-xl-7 col-5 ">
                <ReactPaginate
                  previousLabel="<"
                  nextLabel=">"
                  pageCount={this.state.totalPageNum}
                  pageRangeDisplayed={3}
                  onPageChange={this.handlePageChange}
                  containerClassName="user-paginate"
                  subContainerClassName="user-pages user-paginate"
                  activeClassName="user-active-page"
                  breakClassName="break-me"
                  initialPage={this.state.pageIndex}
                  disableInitialCallback
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withStyles(s)(Products);
