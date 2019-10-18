import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Select from 'react-select';
import InputRange from 'react-input-range';
import {
  PRODUCT_PERIOD_ARRAY,
  SINGLE_PRODUCT_TYPE_ARRAY,
  PRODUCT_STATUS_ARRAY,
  PRODUCT_TYPE_ARRAY,
  OPCODES,
} from '../../../constants/constantData';
import s from './ProductItem.css';
class ProductItem extends React.Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    isWished: PropTypes.bool.isRequired,
    handleOnWish: PropTypes.func.isRequired,
  };

  render() {
    // console.log('lael : ', );
    return (
      <div
        class={`${s.container} col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 `}
      >
        <div class="container-fluid ">
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-12">
              {' '}
              <div className={s.imgContainer}>
                {' '}
                <img
                  width="140"
                  height="180"
                  src={this.props.product.coverImage}
                />
              </div>
            </div>
            <div
              className="col-xl-9 col-lg-9 col-md-11"
              style={{ paddingLeft: '20px' }}
            >
              <div className={`${s.title} row`}>
                <div className="col-12">
                  <u>{this.props.product.originalTitle}</u>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  {this.props.product.ageGroup.label} |{' '}
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className={s.description}>
                    {this.props.product.originalDesc}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-1">
              <div className={s.wishContainer}>
                <i
                  class={
                    this.props.isWished
                      ? `${s.isWished} fas fa-heart`
                      : 'fas fa-heart'
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProductItem);
