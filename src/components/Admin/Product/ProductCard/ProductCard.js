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
  delete(e) {
    e.stopPropagation();
    window.alert('delete');
  }
  render() {
    console.log(this.props.product);
    return (
      <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12 product-card">
        <div
          onClick={() => this.props.onProductClick(this.props.product.id)}
          class={`${s.card} product-thumbnail`}
        >
          <div class="product-img-head">
            <div class="product-img">
              <img src={this.props.product.coverImage} class={s.image} />
            </div>
          </div>
          <div class="product-content">
            <div class="product-content-head">
              <h3 class={`${s.title} product-title`}>
                {this.props.product.originalTitle}
              </h3>
              <hr />
              <div className="row">
                <div className="col-12">
                  <div class={`${s.publisher} `}>
                    <label> Publisher : &nbsp;&nbsp;</label>
                    {this.props.product.publisher.label}
                  </div>{' '}
                </div>
              </div>
              {/* <div class="product-rating d-inline-block">
                <i class="fa fa-fw fa-star" />
                <i class="fa fa-fw fa-star" />
                <i class="fa fa-fw fa-star" />
                <i class="fa fa-fw fa-star" />
                <i class="fa fa-fw fa-star" />
              </div> */}

              <div class={`${s.details} `}>
                <label>Discount : &nbsp;</label>
                {this.props.product.discount}
              </div>
              <div class={`${s.details} `}>
                <label>Language : &nbsp;</label>
                {this.props.product.productLanguage.label}
              </div>
              <div class={`${s.details} `}>
                <label>Age Group : &nbsp;</label>
                {this.props.product.ageGroup.label}
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
              <a onClick={this.delete} class="product-delete-btn float-right">
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
