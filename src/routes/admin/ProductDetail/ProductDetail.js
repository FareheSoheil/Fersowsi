import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProductDetail.css';

class ProductDetail extends React.Component {
  static propTypes = {
    // id: PropTypes.string.isRequired,
    // imgSrc: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired,
    // descrption: PropTypes.string.isRequired,
    // price: PropTypes.number.isRequired,
    // discount: PropTypes.number.isRequired,
    // weight: PropTypes.number.isRequired,
    // onProductClick: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.context,
    };
  }
  render() {
    return (
      <div class="dashboard-ecommerce">
        <div class="container-fluid dashboard-content ">
          {/* pageheader   */}
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="page-header">
                <h2 class="pageheader-title">Product Detail </h2>

                <div class="page-breadcrumb">
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item">
                        <a href="/admin/products" class="breadcrumb-link">
                          Products
                        </a>
                      </li>
                      <li class="breadcrumb-item active" aria-current="page">
                        Product Detail
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="row">
                <div
                  class={`col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pr-xl-0 pr-lg-0 pr-md-0  m-b-30 ${
                    s.productImgContainer
                  }`}
                >
                  <img
                    class="d-block"
                    src="/assets/images/eco-slider-img-1.png"
                    alt="First slide"
                  />
                  <div class={`product-description ${s.productDescription}`}>
                    <h4 class="mb-1">Descriptions</h4>
                    <textarea rows="15">
                      Praesent et cursus quam. Etiam vulputate est et metus
                      pellentesque iaculis. Suspendisse nec urna augue.
                      Vestibulum ante ipsum primis in faucibus orci luctus et
                      ultrices posuere cubilia Curae; Praesent et cursus quam.
                      Etiam vulputate est et metus pellentesque iaculis.
                      Suspendisse nec urna augue. Vestibulum ante ipsum primis
                      in faucibus orci luctus et ultrices posuere cubilia Curae;
                      Praesent et cursus quam. Etiam vulputate est et metus
                      pellentesque iaculis. Suspendisse nec urna augue.
                      Vestibulum ante ipsum primis in faucibus orci luctus et
                      ultrices posuere cubilia Curae;
                    </textarea>
                    <a href="#" class="btn btn-primary btn-block btn-lg">
                      Add to Cart
                    </a>
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pl-xl-0 pl-lg-0 pl-md-0 border-left m-b-30">
                  <div class="product-details">
                    <div class="border-bottom pb-3 mb-3">
                      <h2 class="mb-3">
                        <form>
                          <div class="form-group">
                            <input
                              id="inputSmall"
                              type="text"
                              class={`form-control form-control-lg ${
                                s.productTitle
                              }`}
                              value="T-Shirt Product Title"
                            />
                          </div>
                        </form>
                      </h2>

                      <form>
                        <div class="form-group">
                          <span class="mb-0 text-primary">
                            Price : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          </span>

                          <input
                            id="inputSmall"
                            type="text"
                            class={`form-control form-control-sm ${
                              s.productPrice
                            }`}
                            value=" Product Price"
                          />
                        </div>
                        <div class="form-group">
                          <span class="mb-0 text-primary">
                            Discount : &nbsp;&nbsp;
                          </span>

                          <input
                            id="inputSmall"
                            type="text"
                            class={`form-control form-control-sm ${
                              s.productPrice
                            }`}
                            value=" Product Discount"
                          />
                        </div>
                      </form>
                    </div>
                    <div class="product-colors border-bottom">
                      <h4>Select Colors</h4>
                      <input
                        type="radio"
                        class="radio"
                        id="radio-1"
                        name="group"
                      />
                      <label for="radio-1" />
                      <input
                        type="radio"
                        class="radio"
                        id="radio-2"
                        name="group"
                      />
                      <label for="radio-2" />
                      <input
                        type="radio"
                        class="radio"
                        id="radio-3"
                        name="group"
                      />
                      <label for="radio-3" />
                    </div>
                    <div class="product-size border-bottom">
                      <h4>Size</h4>
                      <div
                        class="btn-group"
                        role="group"
                        aria-label="First group"
                      >
                        <button type="button" class="btn btn-outline-light">
                          SM
                        </button>
                        <button type="button" class="btn btn-outline-light">
                          L
                        </button>
                        <button type="button" class="btn btn-outline-light">
                          XL
                        </button>
                        <button type="button" class="btn btn-outline-light">
                          XXl
                        </button>
                      </div>
                      <div class="product-qty">
                        <h4>Quantity</h4>
                        <div class="quantity">
                          <input
                            type="number"
                            min="1"
                            max="9"
                            step="1"
                            value="1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 m-b-60">
                  <div class="simple-card">
                    <ul class="nav nav-tabs" id="myTab5" role="tablist">
                      <li class="nav-item">
                        <a
                          class="nav-link active border-left-0"
                          id="product-tab-1"
                          data-toggle="tab"
                          href="#tab-1"
                          role="tab"
                          aria-controls="product-tab-1"
                          aria-selected="true"
                        >
                          Descriptions
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          id="product-tab-2"
                          data-toggle="tab"
                          href="#tab-2"
                          role="tab"
                          aria-controls="product-tab-2"
                          aria-selected="false"
                        >
                          Reviews
                        </a>
                      </li>
                    </ul>
                    <div class="tab-content" id="myTabContent5">
                      <div
                        class="tab-pane fade show active"
                        id="tab-1"
                        role="tabpanel"
                        aria-labelledby="product-tab-1"
                      >
                        <p>
                          Praesent et cursus quam. Etiam vulputate est et metus
                          pellentesque iaculis. Suspendisse nec urna augue.
                          Vestibulum ante ipsum primis in faucibus orci luctus
                          et ultrices posuere cubiliaurae.
                        </p>
                        <p>
                          Nam condimentum erat aliquet rutrum fringilla.
                          Suspendisse potenti. Vestibulum placerat elementum
                          sollicitudin. Aliquam consequat molestie tortor, et
                          dignissim quam blandit nec. Donec tincidunt dui
                          libero, ac convallis urna dapibus eu. Praesent
                          volutpat mi eget diam efficitur, a mollis quam
                          ultricies. Morbi eu turpis odio.
                        </p>
                        <ul class="list-unstyled arrow">
                          <li>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.
                          </li>
                          <li>
                            Donec ut elit sodales, dignissim elit et,
                            sollicitudin nulla.
                          </li>
                          <li>Donec at leo sed nisl vestibulum fermentum.</li>
                        </ul>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="tab-2"
                        role="tabpanel"
                        aria-labelledby="product-tab-2"
                      >
                        <div class="review-block">
                          <p class="review-text font-italic m-0">
                            “Vestibulum cursus felis vel arcu convallis, viverra
                            commodo felis bibendum. Orci varius natoque
                            penatibus et magnis dis parturient montes, nascetur
                            ridiculus mus. Proin non auctor est, sed lacinia
                            velit. Orci varius natoque penatibus et magnis dis
                            parturient montes nascetur ridiculus mus.”
                          </p>
                          <div class="rating-star mb-4">
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                          </div>
                          <span class="text-dark font-weight-bold">
                            Virgina G. Lightfoot
                          </span>
                          <small class="text-mute"> (Company name)</small>
                        </div>
                        <div class="review-block border-top mt-3 pt-3">
                          <p class="review-text font-italic m-0">
                            “Integer pretium laoreet mi ultrices tincidunt.
                            Suspendisse eget risus nec sapien malesuada
                            ullamcorper eu ac sapien. Maecenas nulla orci,
                            varius ac tincidunt non, ornare a sem. Aliquam sed
                            massa volutpat, aliquet nibh sit amet, tincidunt ex.
                            Donec interdum pharetra dignissim.”
                          </p>
                          <div class="rating-star mb-4">
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                          </div>
                          <span class="text-dark font-weight-bold">
                            Ruby B. Matheny
                          </span>
                          <small class="text-mute"> (Company name)</small>
                        </div>
                        <div class="review-block  border-top mt-3 pt-3">
                          <p class="review-text font-italic m-0">
                            “ Cras non rutrum neque. Sed lacinia ex elit, vel
                            viverra nisl faucibus eu. Aenean faucibus neque
                            vestibulum condimentum maximus. In id porttitor
                            nisi. Quisque sit amet commodo arcu, cursus pharetra
                            elit. Nam tincidunt lobortis augueat euismod ante
                            sodales non. ”
                          </p>
                          <div class="rating-star mb-4">
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                          </div>
                          <span class="text-dark font-weight-bold">
                            Gloria S. Castillo
                          </span>
                          <small class="text-mute"> (Company name)</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-3">
                  <a class="btn btn-rounded btn-danger">
                    <i className="fas fa-trash-alt" />&nbsp;&nbsp;Delete Product
                  </a>
                </div>
                <div class="col-3">
                  <a class="btn btn-rounded btn-success">
                    {' '}
                    <i className="far fa-edit" />&nbsp;&nbsp;Apply Changes
                  </a>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 m-b-10">
                  <h3> Related Products</h3>
                </div>
                <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div class="product-thumbnail">
                    <div class="product-img-head">
                      <div class="product-img">
                        <img
                          src="assets/images/eco-product-img-1.png"
                          alt=""
                          class="img-fluid"
                        />
                      </div>
                      <div class="ribbons">New</div>
                      <div class="">
                        <a href="#" class="product-wishlist-btn">
                          <i class="fas fa-heart" />
                        </a>
                      </div>
                    </div>
                    <div class="product-content">
                      <div class="product-content-head">
                        <h3 class="product-title">T-Shirt Product Title</h3>
                        <div class="product-rating d-inline-block">
                          <i class="fa fa-fw fa-star" />
                          <i class="fa fa-fw fa-star" />
                          <i class="fa fa-fw fa-star" />
                          <i class="fa fa-fw fa-star" />
                          <i class="fa fa-fw fa-star" />
                        </div>
                        <div class="product-price">$49.00</div>
                      </div>
                      <div class="product-btn">
                        <a href="#" class="btn btn-primary">
                          Add to Cart
                        </a>
                        <a href="#" class="btn btn-outline-light">
                          Details
                        </a>
                        <a href="#" class="btn btn-outline-light">
                          <i class="fas fa-exchange-alt" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div class="product-thumbnail">
                    <div class="product-img-head">
                      <div class="product-img">
                        <img
                          src="assets/images/eco-product-img-2.png"
                          alt=""
                          class="img-fluid"
                        />
                      </div>
                      <div class="ribbons bg-danger">Sold</div>
                      <div class="">
                        <a href="#" class="product-wishlist-btn">
                          <i class="fas fa-heart" />
                        </a>
                      </div>
                    </div>
                    <div class="product-content">
                      <div class="product-content-head">
                        <h3 class="product-title">T-Shirt Product Title</h3>
                        <div class="product-rating d-inline-block">
                          <i class="fa fa-fw fa-star" />
                          <i class="fa fa-fw fa-star" />
                          <i class="fa fa-fw fa-star" />
                          <i class="fa fa-fw fa-star" />
                          <i class="fa fa-fw fa-star" />
                        </div>
                        <div class="product-price">$49.00</div>
                      </div>
                      <div class="product-btn">
                        <a href="#" class="btn btn-primary">
                          Add to Cart
                        </a>
                        <a href="#" class="btn btn-outline-light">
                          Details
                        </a>
                        <a href="#" class="btn btn-outline-light">
                          <i class="fas fa-exchange-alt" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div class="product-thumbnail">
                    <div class="product-img-head">
                      <div class="product-img">
                        <img
                          src="assets/images/eco-product-img-3.png"
                          alt=""
                          class="img-fluid"
                        />
                      </div>
                      <div class="ribbons bg-brand">Offer</div>
                      <div class="">
                        <a href="#" class="product-wishlist-btn active">
                          <i class="fas fa-heart" />
                        </a>
                      </div>
                    </div>
                    <div class="product-content">
                      <div class="product-content-head">
                        <h3 class="product-title">T-Shirt Product Title</h3>
                        <div class="product-rating d-inline-block">
                          <i class="fa fa-fw fa-star" />
                          <i class="fa fa-fw fa-star" />
                          <i class="fa fa-fw fa-star" />
                          <i class="fa fa-fw fa-star" />
                          <i class="fa fa-fw fa-star" />
                        </div>
                        <div class="product-price">
                          $49.00
                          <del class="product-del">$69.00</del>
                        </div>
                      </div>
                      <div class="product-btn">
                        <a href="#" class="btn btn-primary">
                          Add to Cart
                        </a>
                        <a href="#" class="btn btn-outline-light">
                          Details
                        </a>
                        <a href="#" class="btn btn-outline-light">
                          <i class="fas fa-exchange-alt" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(ProductDetail);
