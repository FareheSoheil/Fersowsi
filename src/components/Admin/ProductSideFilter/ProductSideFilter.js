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
} from '../../../constants/constantData';
import s from './ProductSideFilter.css';
class ProductSideFilter extends React.Component {
  static propTypes = {
    allPublishers: PropTypes.array.isRequired,
    allLanguages: PropTypes.array.isRequired,
    allAgeGroups: PropTypes.array.isRequired,

    filters: {
      publishers: PropTypes.array.isRequired,
      singlProductTypes: PropTypes.array.isRequired,
      productTypes: PropTypes.array.isRequired,
      status: PropTypes.array.isRequired,
      languages: PropTypes.array.isRequired,
      ageGroups: PropTypes.array.isRequired,
      periods: PropTypes.array.isRequired,
      priceRange: PropTypes.object.isRequired,
      weightRange: PropTypes.object.isRequired,
    },
    handleInputChange: PropTypes.func.isRequired,
    handleSelectChange: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      price: { min: 5, max: 10 },
      weight: { min: 30, max: 400 },
    };
  }
  onChange(e) {
    console.log(e.target.checked);
  }
  render() {
    console.log(this.props.filters.priceRange);
    console.log(this.props.filters.weightRange);
    return (
      <div class="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-12">
        <div class="product-sidebar">
          <div class="product-sidebar-widget">
            <h4 class="mb-0">Products Filter</h4>
          </div>
          <div class="product-sidebar-widget">
            <h4 class="product-sidebar-widget-title">Sort By</h4>
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                onChange={e => this.props.handleInputChange('sortPrice', e)}
                class="custom-control-input"
                name="sortPrice"
                checked={this.props.filters.sortPrice}
                id="price"
              />
              <label class="custom-control-label" for="price">
                Price
              </label>
            </div>
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                name="sortWeight"
                onChange={e => this.props.handleInputChange('sortWeight', e)}
                id="weight"
                checked={this.props.filters.sortWeight}
              />
              <label class="custom-control-label" for="weight">
                Weight
              </label>
            </div>
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                onChange={e => this.props.handleInputChange('sortDate', e)}
                name="sortDate"
                id="date"
                checked={this.props.filters.sortDate}
              />
              <label class="custom-control-label" for="date">
                Date
              </label>
            </div>
          </div>

          <div class="product-sidebar-widget">
            <h4 class="product-sidebar-widget-title">Publisher</h4>
            <Select
              isMulti
              isSearchable
              options={this.props.allPublishers}
              value={this.props.filters.publishers}
              onChange={so => this.props.handleSelectChange(so, 'publishers')}
            />
          </div>

          <div class="product-sidebar-widget">
            <h4 class="product-sidebar-widget-title">Product Content Type</h4>
            <Select
              isMulti
              isSearchable
              options={this.props.allProductContentTypes}
              value={this.props.filters.productContentTypes}
              onChange={so =>
                this.props.handleSelectChange(so, 'productContentTypes')
              }
            />
          </div>

          <div class="product-sidebar-widget">
            <h4 class="product-sidebar-widget-title">Product Types</h4>
            <Select
              isMulti
              isSearchable
              options={PRODUCT_TYPE_ARRAY}
              value={this.props.filters.productTypes}
              onChange={so => this.props.handleSelectChange(so, 'productTypes')}
            />
          </div>
          <div class="product-sidebar-widget">
            <h4 class="product-sidebar-widget-title">Single Product Types</h4>
            <Select
              isMulti
              isSearchable
              options={SINGLE_PRODUCT_TYPE_ARRAY}
              value={this.props.filters.singlProductTypes}
              onChange={so =>
                this.props.handleSelectChange(so, 'singlProductTypes')
              }
            />
          </div>
          <div class="product-sidebar-widget">
            <h4 class="product-sidebar-widget-title">Status</h4>
            <Select
              isMulti
              isSearchable
              options={PRODUCT_STATUS_ARRAY}
              value={this.props.filters.status}
              onChange={so => this.props.handleSelectChange(so, 'status')}
            />
          </div>

          <div class="product-sidebar-widget">
            <h4 class="product-sidebar-widget-title">Language</h4>
            <Select
              isMulti
              isSearchable
              options={this.props.allLanguages}
              value={this.props.filters.languages}
              onChange={so => this.props.handleSelectChange(so, 'languages')}
            />
          </div>

          <div class="product-sidebar-widget">
            <h4 class="product-sidebar-widget-title">Age Group</h4>
            <Select
              isMulti
              isSearchable
              options={this.props.allAgeGroups}
              value={this.props.filters.ageGroups}
              onChange={so => this.props.handleSelectChange(so, 'ageGroups')}
            />
          </div>

          <div class="product-sidebar-widget">
            <h4 class="product-sidebar-widget-title">Period</h4>
            <Select
              isMulti
              isSearchable
              options={PRODUCT_PERIOD_ARRAY}
              onChange={so => this.props.handleSelectChange(so, 'periods')}
              value={this.props.filters.periods}
            />
          </div>
          <div class="product-sidebar-widget">
            <h4 class="product-sidebar-widget-title">Price</h4>
            <InputRange
              maxValue={50}
              minValue={1}
              formatLabel={value => `${value}$`}
              value={this.props.filters.priceRange}
              onChange={price =>
                this.props.handleInputChange('priceRange', price)
              }
            />
          </div>
          <div class="product-sidebar-widget">
            <h4 class="product-sidebar-widget-title">Weight</h4>
            <InputRange
              maxValue={2000}
              minValue={20}
              formatLabel={value => `${value}g`}
              value={this.props.filters.weightRange}
              onChange={weight =>
                this.props.handleInputChange('weightRange', weight)
              }
              onChangeComplete={value => console.log(weight)}
            />
          </div>
          <div class="product-sidebar-widget">
            <a
              class="btn btn-outline-light"
              onClick={this.props.handleClearSearch}
            >
              Clear
            </a>
            &nbsp;&nbsp;
            <a class="btn btn-outline-light" onClick={this.props.handleSearch}>
              Search
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProductSideFilter);
