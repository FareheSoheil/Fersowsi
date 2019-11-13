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
} from '../../../../constants/constantData';
import s from './ProductSideFilter.css';
class ProductSideFilter extends React.Component {
  static propTypes = {
    allPublishers: PropTypes.array.isRequired,
    allLanguages: PropTypes.array.isRequired,
    allAgeGroups: PropTypes.array.isRequired,
    hasChoiceForStatus: PropTypes.bool.isRequired,
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

  render() {
    return (
      <div class="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-12">
        <div class="product-sidebar">
          <div class="product-sidebar-widget">
            <h3 class="mb-0"> Filter</h3>
          </div>
          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">
              Search By{' '}
              <span
                class="float-right slider collapsed"
                data-toggle="collapse"
                data-target="#searchCollapse"
                aria-expanded="false"
                aria-controls="searchCollapse"
              >
                <i class="fa" aria-hidden="true" />
              </span>
            </div>
            <form id="searchCollapse" className="collapse">
              <div className="form-group">
                <label>Product Name</label>
                <br />
                <input
                  name="productName"
                  type="text"
                  className="form-control form-control-sm"
                  value={this.props.filters.productName}
                  onChange={e =>
                    this.props.handleInputChange(
                      OPCODES.simple,
                      'productName',
                      e,
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label>Product ISSN </label>
                <br />
                <input
                  name="issn"
                  type="text"
                  className="form-control form-control-sm"
                  value={this.props.filters.issn}
                  onChange={e =>
                    this.props.handleInputChange(OPCODES.simple, 'issn', e)
                  }
                />
              </div>
              <div className="form-group">
                <label>Product DEWEY </label>
                <br />
                <input
                  name="dewey"
                  type="text"
                  className="form-control form-control-sm"
                  value={this.props.filters.dewey}
                  onChange={e =>
                    this.props.handleInputChange(OPCODES.simple, 'dewey', e)
                  }
                />
              </div>
              <div className="form-group">
                <label>Product SAB </label>
                <br />
                <input
                  name="asb"
                  type="text"
                  className="form-control form-control-sm"
                  value={this.props.filters.asb}
                  onChange={e =>
                    this.props.handleInputChange(OPCODES.simple, 'asb', e)
                  }
                />
              </div>
            </form>
          </div>
          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">
              Sort By{' '}
              <span
                class="float-right slider collapsed"
                data-toggle="collapse"
                data-target="#sortCollapse"
                aria-expanded="false"
                aria-controls="searcNamesCollapse"
              >
                <i class="fa" aria-hidden="true" />
              </span>
            </div>
            <div id="sortCollapse" class="collapse">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  onChange={e =>
                    this.props.handleInputChange(
                      OPCODES.checkbox,
                      'sortPrice',
                      e,
                    )
                  }
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
                  onChange={e =>
                    this.props.handleInputChange(
                      OPCODES.checkbox,
                      'sortWeight',
                      e,
                    )
                  }
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
                  onChange={e =>
                    this.props.handleInputChange(
                      OPCODES.checkbox,
                      'sortDate',
                      e,
                    )
                  }
                  name="sortDate"
                  id="date"
                  checked={this.props.filters.sortDate}
                />
                <label class="custom-control-label" for="date">
                  Date
                </label>
              </div>
            </div>
          </div>

          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">
              Publisher{' '}
              <span
                class="float-right slider collapsed"
                data-toggle="collapse"
                data-target="#PublisherCollapse"
                aria-expanded="false"
                aria-controls="searcNamesCollapse"
              >
                <i class="fa" aria-hidden="true" />
              </span>
            </div>
            <Select
              id="PublisherCollapse"
              className="collapse"
              isMulti
              isSearchable
              options={this.props.allPublishers}
              value={this.props.filters.publishers}
              onChange={so => this.props.handleSelectChange(so, 'publishers')}
            />
          </div>

          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">
              Product Content Type{' '}
              <span
                class="float-right slider collapsed"
                data-toggle="collapse"
                data-target="#pctCollapse"
                aria-expanded="false"
                aria-controls="searcNamesCollapse"
              >
                <i class="fa" aria-hidden="true" />
              </span>
            </div>
            <Select
              id="pctCollapse"
              className="collapse"
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
            <div class="product-sidebar-widget-title">
              Product Types{' '}
              <span
                class="float-right slider collapsed"
                data-toggle="collapse"
                data-target="#ptCollapse"
                aria-expanded="false"
                aria-controls="searcNamesCollapse"
              >
                <i class="fa" aria-hidden="true" />
              </span>
            </div>
            <Select
              id="ptCollapse"
              className="collapse"
              isMulti
              isSearchable
              options={PRODUCT_TYPE_ARRAY}
              value={this.props.filters.productTypes}
              onChange={so => this.props.handleSelectChange(so, 'productTypes')}
            />
          </div>
          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">
              Single Product Types<span
                class="float-right slider collapsed"
                data-toggle="collapse"
                data-target="#sptCollapse"
                aria-expanded="false"
                aria-controls="searcNamesCollapse"
              >
                <i class="fa" aria-hidden="true" />
              </span>
            </div>
            <Select
              id="sptCollapse"
              className="collapse"
              isMulti
              isSearchable
              options={SINGLE_PRODUCT_TYPE_ARRAY}
              value={this.props.filters.singlProductTypes}
              onChange={so =>
                this.props.handleSelectChange(so, 'singlProductTypes')
              }
            />
          </div>
          {this.props.hasChoiceForStatus ? (
            <div class="product-sidebar-widget">
              <div class="product-sidebar-widget-title">
                Status{' '}
                <span
                  class="float-right slider collapsed"
                  data-toggle="collapse"
                  data-target="#statCollapse"
                  aria-expanded="false"
                  aria-controls="searcNamesCollapse"
                >
                  <i class="fa" aria-hidden="true" />
                </span>
              </div>
              <Select
                id="statCollapse"
                className="collapse"
                isMulti
                isSearchable
                options={PRODUCT_STATUS_ARRAY}
                value={this.props.filters.status}
                onChange={so => this.props.handleSelectChange(so, 'status')}
              />
            </div>
          ) : (
            ''
          )}
          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">
              Language<span
                class="float-right slider collapsed"
                data-toggle="collapse"
                data-target="#langCollapse"
                aria-expanded="false"
                aria-controls="searcNamesCollapse"
              >
                <i class="fa" aria-hidden="true" />
              </span>
            </div>
            <Select
              id="langCollapse"
              className="collapse"
              isMulti
              isSearchable
              options={this.props.allLanguages}
              value={this.props.filters.languages}
              onChange={so => this.props.handleSelectChange(so, 'languages')}
            />
          </div>

          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">
              Age Group{' '}
              <span
                class="float-right slider collapsed"
                data-toggle="collapse"
                data-target="#agCollapse"
                aria-expanded="false"
                aria-controls="searcNamesCollapse"
              >
                <i class="fa" aria-hidden="true" />
              </span>
            </div>
            <Select
              id="agCollapse"
              className="collapse"
              isMulti
              isSearchable
              options={this.props.allAgeGroups}
              value={this.props.filters.ageGroups}
              onChange={so => this.props.handleSelectChange(so, 'ageGroups')}
            />
          </div>

          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">
              Period{' '}
              <span
                class="float-right slider collapsed"
                data-toggle="collapse"
                data-target="#perCollapse"
                aria-expanded="false"
                aria-controls="searcNamesCollapse"
              >
                <i class="fa" aria-hidden="true" />
              </span>
            </div>
            <Select
              id="perCollapse"
              className="collapse"
              isMulti
              isSearchable
              options={PRODUCT_PERIOD_ARRAY}
              onChange={so => this.props.handleSelectChange(so, 'periods')}
              value={this.props.filters.periods}
            />
          </div>
          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">Price</div>
            <InputRange
              maxValue={100}
              minValue={1}
              formatLabel={value => `${value}$`}
              value={this.props.filters.priceRange}
              onChange={price =>
                this.props.handleInputChange(OPCODES.range, 'priceRange', price)
              }
            />
          </div>
          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">Weight</div>
            <InputRange
              maxValue={2000}
              minValue={10}
              formatLabel={value => `${value}g`}
              value={this.props.filters.weightRange}
              onChange={weight =>
                this.props.handleInputChange(
                  OPCODES.range,
                  'weightRange',
                  weight,
                )
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
