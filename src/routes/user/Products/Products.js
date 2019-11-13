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
      isLoading: true,
      pageIndex: 0,
      pageSize: 10,
      totalPageNum: '',
      sortBy: '',
      searchClear: true,
      allPublishers: '',
      allProductContentTypes: '',
      allLanguages: '',
      allAgeGroups: '',
      allCountries: [],
      currentproducts: [],
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
        issn: '',
        asb: '',
        dewey: '',
        hasDiscount: '',
        priceRange: { min: 1, max: 10000 },
        weightRange: { min: 10, max: 2000 },
        sortDate: false,
        sortPrice: false,
        sortWeight: false,
      },
    };
    this.fetchProducts = this.fetchProducts.bind(this);
    this.fetchAllInfo = this.fetchAllInfo.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleOnWish = this.handleOnWish.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
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
    console.log('product search : ', this.state.productsSearchFilter);
    const url = `${SERVER}/getAllProducts`;
    this.setState({
      isLoading: true,
    });
    let creCopy = { ...this.state.productsSearchFilter };
    if (localStorage.getItem('category') != null) {
      // window.alert(localStorage.getItem('category'));
      creCopy.productContentTypes = [
        { value: localStorage.getItem('category') },
      ];
    }

    const credentials = {
      sortBy: this.state.sortBy,
      searchBy: creCopy,
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize,
    };
    console.log('credentials : ', credentials);
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
        console.log('products : ', response);
        that.setState(
          {
            currentproducts: response.currentRecords,
            totalPageNum: response.totalPageNum,
            isLoading: false,
            firstRender: false,
          },
          () => {
            localStorage.removeItem('category');
            // window.alert(localStorage.getItem('category'));
            window.scroll(10, 20);
          },
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
          allCountries: response.Countries,
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
    let preState = { ...this.state.productsSearchFilter };
    if (selectedOption.label == 'Weight') preState.sortWeight = true;
    else if (selectedOption.label == 'Date') preState.sortDate = true;
    else preState.sortPrice = true;
    this.setState(
      {
        productsSearchFilter: preState,
        sortBy: selectedOption,
        searchClear: false,
      },
      () => {
        this.fetchProducts();
      },
    );
  };
  handlePageChange(pageIndex) {
    this.setState({ pageIndex: pageIndex.selected }, () => {
      this.fetchProducts();
    });
  }
  search() {
    // console.log('search filters : ', this.state.productsSearchFilter);
    this.fetchProducts();
  }
  clearFilters() {
    this.setState(
      {
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
          issn: '',
          asb: '',
          dewey: '',
          hasDiscount: '',
          priceRange: { min: 5, max: 10 },
          weightRange: { min: 30, max: 400 },
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
  handleOnWish(id) {
    const url = `${SERVER}/addToBasket`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      productId: id,
      productPriceAndCostId: price,
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
    let products;
    const receivedProducts = this.state.currentproducts;
    if (
      !this.props.isLoading &&
      receivedProducts !== undefined &&
      receivedProducts.length !== 0
    ) {
      products = receivedProducts.map(
        (product, i) =>
          (products = <ProductItem hasWish={true} product={product} />),
      );
      console.log('productsSS : ', products);
    } else if (this.props.isLoading && receivedProducts == undefined)
      products = (
        <div className="col-12">
          <div className={s.warning}>No Products Found :-(</div>
        </div>
      );
    return (
      <div>
        {' '}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div className="container-fluid">
            <div className="row mb-3">
              <div className={`col-12 `}>
                <div className={`${s.largeSearch} form-group`}>
                  <input
                    placeholder="Search Here"
                    onChange={e => {
                      this.handleInputChange(
                        OPCODES.simple,
                        'originalTitle',
                        e,
                      );
                    }}
                    className="form-control form-control-sm"
                  />
                  <button
                    onClick={this.search}
                    className={`${s.searchBtn} btn`}
                  >
                    {' '}
                    Find
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <ProductSideFilter
                search={this.search}
                filters={this.state.productsSearchFilter}
                allPublishers={this.state.allPublishers}
                allProductContentTypes={this.state.allProductContentTypes}
                allLanguages={this.state.allLanguages}
                allAgeGroups={this.state.allAgeGroups}
                allCountries={this.state.allCountries}
                handleSelectChange={this.handleSelectChange}
                handleInputChange={this.handleInputChange}
                handleClearSearch={this.clearFilters}
                handleSearch={this.search}
              />
              <AdvancedListContainer
                sortBy={this.state.sortBy}
                handleSelectChange={this.handleSortChange}
              >
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
