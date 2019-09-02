import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Select from 'react-select';
import InputRange from 'react-input-range';
import s from './CustomerOrderSideFilter.css';
class CustomerOrderSideFilter extends React.Component {
  static propTypes = {
    allPublishers: PropTypes.object.isRequired,
    allProductContentTypes: PropTypes.object.isRequired,
    allProductTypes: PropTypes.object.isRequired,
    allStatuZ: PropTypes.object.isRequired,
    allLanguages: PropTypes.object.isRequired,
    allAgeGroups: PropTypes.object.isRequired,
    allPeriods: PropTypes.object.isRequired,

    publishers: PropTypes.object.isRequired,
    productContentTypes: PropTypes.object.isRequired,
    productTypes: PropTypes.object.isRequired,
    status: PropTypes.object.isRequired,
    languages: PropTypes.object.isRequired,
    ageGroups: PropTypes.object.isRequired,
    periods: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      price: { min: 5, max: 8 },
      weight: { min: 5, max: 8 },
    };
  }
  render() {
    return (
      <div class="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-12">
        <div class="product-sidebar">
          <div class="product-sidebar-widget">
            <h4 class="mb-0">Products Filter</h4>
          </div>
          <div class="product-sidebar-widget">
            <h4 class="product-sidebar-widget-title">Sort By</h4>
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="price" />
              <label class="custom-control-label" for="price">
                Price
              </label>
            </div>
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="weight" />
              <label class="custom-control-label" for="weight">
                Weight
              </label>
            </div>
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="date" />
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
              value={this.props.publishers}
            />
          </div>

          <div class="product-sidebar-widget">
            <h4 class="product-sidebar-widget-title">Product Content Type</h4>
            <Select
              isMulti
              isSearchable
              options={this.props.allProductContentTypes}
              value={this.props.productTypes}
            />
          </div>

          <div class="product-sidebar-widget">
            <h4 class="product-sidebar-widget-title">Product Types</h4>
            <Select
              isMulti
              isSearchable
              options={this.props.allProductTypes}
              value={this.props.productTypes}
            />
          </div>

          <div class="product-sidebar-widget">
            <h4 class="product-sidebar-widget-title">Status</h4>
            <Select
              isMulti
              isSearchable
              options={this.props.allStatuZ}
              value={this.props.status}
            />
          </div>

          <div class="product-sidebar-widget">
            <h4 class="product-sidebar-widget-title">Language</h4>
            <Select
              isMulti
              isSearchable
              options={this.props.allLanguages}
              value={this.props.languages}
            />
          </div>

          <div class="product-sidebar-widget">
            <h4 class="product-sidebar-widget-title">Age Gropu</h4>
            <Select
              isMulti
              isSearchable
              options={this.props.allAgeGroups}
              value={this.props.ageGroups}
            />
          </div>

          <div class="product-sidebar-widget">
            <h4 class="product-sidebar-widget-title">Period</h4>
            <Select
              isMulti
              isSearchable
              options={this.props.allPeriods}
              value={this.props.periods}
            />
          </div>
          <div class="product-sidebar-widget">
            <h4 class="product-sidebar-widget-title">Price</h4>
            <InputRange
              maxValue={20}
              minValue={0}
              value={this.state.price}
              onChange={price => this.setState({ price })}
            />
          </div>
          <div class="product-sidebar-widget">
            <h4 class="product-sidebar-widget-title">Weight</h4>
            <InputRange
              maxValue={20}
              minValue={0}
              formatLabel={value => `${value} kg`}
              value={this.state.weight}
              onChange={weight => this.setState({ weight })}
              onChangeComplete={value => console.log(weight)}
            />
          </div>
          <div class="product-sidebar-widget">
            <a class="btn btn-outline-light">Reset Filterss</a>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CustomerOrderSideFilter);
