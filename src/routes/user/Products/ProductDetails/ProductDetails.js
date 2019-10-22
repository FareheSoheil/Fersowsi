import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ReactPaginate from 'react-paginate';

import Spinner from '../../../../components/User/Spinner';
import s from './ProductDetails.css';
import ProductDetails from '../../../../components/User/ProductDetails';
import ProductItem from '../../../../components/User/ProductItem';
import { SERVER } from '../../constants';

import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import history from '../../../../history';
class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      id: this.props.context.params.id,
      product: {},
    };
    this.fetchProduct = this.fetchProduct.bind(this);
  }
  componentDidMount() {
    // this.fetchAllInfo();
    this.fetchProduct();
  }

  fetchProduct() {
    const url = `${SERVER}/getProduct`;
    this.setState({
      isLoading: true,
    });
    const credentials = {
      productId: this.state.id,
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
        console.log('recieved produvt ', response.product);
        that.setState(
          {
            product: response.product,
            isLoading: false,
          },
          () => {
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
    const url = `${SERVER}/getAuxInfoForAllProducts`;
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
    let subProducts = this.state.product.subProducts;
    let list = '';
    // console.log('lsit length', subProducts === undefined);
    if (!this.state.isLoading && subProducts.length > 0) {
      subProducts.map(
        (product, i) =>
          (list = (
            <ProductItem isDisabled={true} hasWish={false} product={product} />
          )),
      );
    }

    return (
      <div className="container-fluid">
        {' '}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div className={s.main}>
            <div className="row">
              <div className={`${s.header} col-12`}>
                {' '}
                <h1>Product Details</h1>
              </div>
              <div className="offset-xl-1 col-10">
                <ProductDetails product={this.state.product} />
              </div>
            </div>

            {list !== '' ? (
              <div className={`${s.subproductContainer} row`}>
                <div className="offset-xl-1 col-9">
                  {' '}
                  {/* <h3 className="offset-xl-4 mt-4">
                    Subproducts of this package{' '}
                  </h3> */}
                  <br />
                  <br />
                  {list}
                </div>
              </div>
            ) : (
              ''
            )}
            {/* </div> */}
          </div>
        )}
      </div>
    );
  }
}
export default withStyles(s)(Products);
