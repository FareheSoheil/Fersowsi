import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProductCard.css';

class ProductCard extends React.Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    onProductClick: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.product);
    return (
      <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12 product-card">
        <div class={`${s.card} product-thumbnail`}>
          <div class="product-img-head">
            <div class="product-img">
              <img
                src={this.props.product.coverImage}
                // class="img-fluid"
                height="350"
                width="243"
              />
            </div>
          </div>
          <div class="product-content">
            <div class="product-content-head">
              <h3 class={`${s.title} product-title`}>
                {this.props.product.originalTitle}
              </h3>
              <hr />
              {/* <div class="product-rating d-inline-block">
                <i class="fa fa-fw fa-star" />
                <i class="fa fa-fw fa-star" />
                <i class="fa fa-fw fa-star" />
                <i class="fa fa-fw fa-star" />
                <i class="fa fa-fw fa-star" />
              </div> */}
              <div class={`${s.publisher} product-price`}>
                <label> Publisher : &nbsp;&nbsp;</label>
                {this.props.product.publisher.label}
              </div>
              <div class={`${s.details} product-price`}>
                <label>Discount : &nbsp;</label>
                {this.props.product.discount}
              </div>
              <div class={`${s.details} product-price`}>
                <label>Weight : &nbsp;</label>
                {this.props.product.weight}
              </div>
              <div class={s.productDescription}>
                {this.props.product.originalDesc}
              </div>
            </div>
            <div class="product-btn">
              <a
                onClick={() => this.props.onProductClick(this.props.product.id)}
                class="btn btn-outline-light"
              >
                Details
              </a>
              <a class="product-delete-btn float-right">
                {/* <i class="fas fa-heart" /> */}
                <i class="fas fa-trash" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(ProductCard);
