import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProductCard.css';

class ProductCard extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    descrption: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    onProductClick: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12 product-card">
        <div
          onClick={() => this.props.onProductClick(this.props.id)}
          class="product-thumbnail"
        >
          <div class="product-img-head">
            <div class="product-img">
              <img src={this.props.imgSrc} alt="" class="img-fluid" />
            </div>
            <div class="ribbons" />
            <div class="ribbons-text">New</div>
            <div class="">
              <a class="product-wishlist-btn">
                <i class="fas fa-heart" />
              </a>
            </div>
          </div>
          <div class="product-content">
            <div class="product-content-head">
              <h3 class="product-title">{this.props.title}</h3>
              <hr />
              {/* <div class="product-rating d-inline-block">
                <i class="fa fa-fw fa-star" />
                <i class="fa fa-fw fa-star" />
                <i class="fa fa-fw fa-star" />
                <i class="fa fa-fw fa-star" />
                <i class="fa fa-fw fa-star" />
              </div> */}
              <div class="product-price">
                Price :
                <label>
                  {' '}
                  &nbsp;
                  {this.props.price}
                </label>
              </div>
              <div class="product-price">
                Discount :
                <label>
                  {' '}
                  &nbsp;
                  {this.props.discount}
                </label>
              </div>
              <div class="product-price">
                Weight :
                <label>
                  {' '}
                  &nbsp;
                  {this.props.weight}
                </label>
              </div>
              <div class={s.productDescription}>
                {this.props.descrption}
                sdkllllllllllllllllllllllllllllllllgkja;smlcaxmzxc,mnqoei;ruoweyt249873842009
              </div>
            </div>
            <div class="product-btn">
              <a class="btn btn-primary">Add to Cart</a> &nbsp;
              <a
                onClick={this.props.onProductClick}
                class="btn btn-outline-light"
              >
                Details
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(ProductCard);
