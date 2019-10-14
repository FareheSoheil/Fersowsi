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
import s from './WishItem.css';
class WishItem extends React.Component {
  static propTypes = {
    wish: PropTypes.object.isRequired,
    handleOnDelete: PropTypes.func.isRequired,
  };

  render() {
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
                  src="/assets/images/blank_avatar.png"
                />
              </div>
            </div>
            <div
              className="col-xl-9 col-lg-9 col-md-11"
              style={{ paddingLeft: '20px' }}
            >
              <div className={`${s.title} row`}>
                <div className="col-12">
                  <u>Title</u>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div>
                    <span>{this.props.wish.language}language</span> |{' '}
                    <span>{this.props.wish.category} category </span>
                  </div>
                  <br />
                  <div>
                    <span>Periodical : </span>{' '}
                    <span>{this.props.wish.period}2 weekly</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className={s.description}>
                    {this.props.wish.description}description
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-1">
              <div className={s.deleteBtnContainer}>
                <button
                  onClick={() => this.props.handleOnDelete(this.props.wish.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(WishItem);
