import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Select from 'react-select';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import history from '../../../history';
import zeroTrimmer from '../../../zeroTrimmer';
import { SSRSERVER, SERVER } from '../../../constants';
// import { PRODUCT_STATUS } from '../../../constants/constantData';
import s from './WishItem.css';
class WishItem extends React.Component {
  static propTypes = {
    wish: PropTypes.object.isRequired,
    handleOnDelete: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.gotoProductDetails = this.gotoProductDetails.bind(this);
  }
  gotoProductDetails() {
    history.push(`/user/products/${this.props.wish.id}`);
  }
  render() {
    let categories = this.props.wish.contentCategory;
    let manCategories = '';
    if (categories.length > 0) {
      categories.map(
        (category, i) =>
          (manCategories = `${category.label} ,${manCategories}`),
      );
    }
    return (
      <div
        className={
          this.props.isWished
            ? `${s.container} ${
                s.wishedItem
              } col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 `
            : `${s.container} col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 `
        }
      >
        <div class="container-fluid ">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
              {' '}
              <div className={s.imgContainer}>
                {' '}
                <img
                  onClick={this.gotoProductDetails}
                  // width="180"
                  // height="200"
                  src={this.props.wish.coverImage}
                />
              </div>
            </div>
            <div className="col-xl-7 col-lg-9 col-md-12">
              <div className={`${s.title} row`}>
                <div className="col-12">
                  <u>{this.props.wish.originalTitle}</u>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  {this.props.wish.productLanguage.label} &nbsp; | &nbsp;{' '}
                  {manCategories}
                </div>
              </div>
              {/* <div className="row mt-1">
                <div
                  className={
                    this.props.wish.productStatus.value ===
                    PRODUCT_STATUS.Ready.value
                      ? `${s.green} col-12`
                      : this.props.wish.productStatus.value ===
                        PRODUCT_STATUS.NotAvailable.value
                        ? `${s.yellow} col-12`
                        : `${s.red} col-12`
                  }
                >
                  {this.props.wish.productStatus.label}
                </div>
              </div>
             */}
              <div className="row">
                <div className="col-10">
                  <div className={s.categories}>
                    <label>Periodical :</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <div className={s.categories}>
                    <label>ISSN :</label> {this.props.wish.issn}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <div className={s.categories}>
                    <label>Price :</label> {this.props.wish.privatePrice}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className={s.description}>
                    <textarea value={this.props.wish.originalDesc} rows="7" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-2">
              <div className="row">
                <div className="col-xl-12">
                  <div className={s.deleteBtnContainer}>
                    <button
                      onClick={() =>
                        this.props.handleOnDelete(this.props.wish.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <div className={s.selectBtnContainer}>
                    <button
                      className={this.props.isWished ? s.isWished : s.notWished}
                      onClick={() =>
                        this.props.handleWighItemSelect(
                          this.props.wish.id,
                          this.props.index,
                        )
                      }
                    >
                      {this.props.isWished ? 'Unselect' : 'Select'}
                    </button>
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

export default withStyles(s)(WishItem);
