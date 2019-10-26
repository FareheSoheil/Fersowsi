/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Select from 'react-select';
import InputRange from 'react-input-range';
// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import history from '../../../../history';
import s from './AdvancedSearch.css';
import {
  PRODUCT_STATUS_ARRAY,
  SINGLE_PRODUCT_TYPE_ARRAY,
  PRODUCT_TYPE_ARRAY,
  OPCODES,
  USER_NUMBER_ARRAY,
} from '../../../../constants/constantData';

class AdvancedSearch extends React.Component {
  static propTypes = {
    hasChoiceForRole: PropTypes.bool.isRequired,
    searchClear: PropTypes.bool.isRequired,
    allPublishers: PropTypes.array.isRequired,
    allProductContentTypes: PropTypes.array.isRequired,
    allLanguages: PropTypes.array.isRequired,
    allAgeGroups: PropTypes.array.isRequired,
    allPeriods: PropTypes.array.isRequired,
    searchFilter: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleSelectChange: PropTypes.func.isRequired,
    fetchProducts: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
  };
  onAddUser() {
    history.push('/admin/accounts/add');
  }
  render() {
    return (
      <div className="row advancedSearchContainer">
        <div className="col-12">
          <div className="row">
            <div className="offset-xl-1 col-xl-8">
              <div className="row mt-2">
                <div className="col-md-4 col-sm-4 form-group">
                  <input
                    id="fn"
                    name="originalTitle"
                    type="text"
                    placeholder="Product Name"
                    value={this.props.searchFilter.originalTitle}
                    className="form-control"
                    onChange={e =>
                      this.props.handleInputChange(
                        OPCODES.simple,
                        'originalTitle',
                        e,
                      )
                    }
                  />
                </div>
                <div className="col-md-4 col-sm-4 form-group">
                  <input
                    id="ln"
                    name="issn"
                    type="text"
                    placeholder="Issn"
                    value={this.props.searchFilter.issn}
                    className="form-control"
                    onChange={e =>
                      this.props.handleInputChange(OPCODES.simple, 'issn', e)
                    }
                  />
                </div>
                <div className="col-md-4 col-sm-4 form-group">
                  <div className="form-group">
                    <Select
                      value={this.props.searchFilter.productLanguages}
                      onChange={so =>
                        this.props.handleSelectChange(so, 'productLanguages')
                      }
                      options={this.props.allLanguages}
                      placeholder="Language ..."
                      isSearchable
                      isMulti
                      className="reactSelect"
                      classNamePrefix="innerSelect"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-sm-4 form-group">
                  <div className="form-group">
                    <Select
                      value={this.props.searchFilter.publishers}
                      onChange={so =>
                        this.props.handleSelectChange(so, 'publishers')
                      }
                      options={this.props.allPublishers}
                      placeholder="Publisher ..."
                      isSearchable
                      isMulti
                      className="reactSelect"
                      classNamePrefix="innerSelect"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4 form-group">
                  <div className="form-group">
                    <Select
                      value={this.props.searchFilter.periods}
                      onChange={so =>
                        this.props.handleSelectChange(so, 'periods')
                      }
                      options={this.props.allPeriods}
                      placeholder="Periods ..."
                      isSearchable
                      isMulti
                      className="reactSelect"
                      classNamePrefix="innerSelect"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4 form-group">
                  <div className="form-group">
                    <Select
                      value={this.props.searchFilter.countries}
                      onChange={so =>
                        this.props.handleSelectChange(so, 'country')
                      }
                      options={this.props.allCountries}
                      placeholder="Country ..."
                      isSearchable
                      isMulti
                      className="reactSelect"
                      classNamePrefix="innerSelect"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-1 col-lg-1 col-md-2 col-sm-12">
              <button className="btn btn-primary mt-5" type="button">
                Search
              </button>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12">
              <button
                className="btn btn-primary mt-5"
                type="button"
                data-toggle="collapse"
                data-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Advanced Search
              </button>
            </div>{' '}
          </div>

          <div
            className={this.props.searchClear ? 'collapse' : 'collapse show'}
            id="collapseExample"
          >
            <div className="card card-body">
              <div className="row reactSelectContainer">
                {/* <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 reactSelectLabel">
                    User Role :
                  </div> */}
                <div className="col-xl-4 col-lg-6 col-md-8 col-sm-8 col-7">
                  <Select
                    value={this.props.searchFilter.productType}
                    onChange={so =>
                      this.props.handleSelectChange(so, 'productType')
                    }
                    options={PRODUCT_TYPE_ARRAY}
                    placeholder="Product Type"
                    isMulti
                    isSearchable
                    className="reactSelect"
                    classNamePrefix="innerSelect"
                  />
                </div>
                <div className="col-xl-4 col-lg-6 col-md-8 col-sm-8 col-7">
                  <Select
                    value={this.props.searchFilter.singlProductTypes}
                    onChange={so =>
                      this.props.handleSelectChange(so, 'singlProductTypes')
                    }
                    options={SINGLE_PRODUCT_TYPE_ARRAY}
                    placeholder="Product Single Type"
                    isMulti
                    isSearchable
                    className="reactSelect"
                    classNamePrefix="innerSelect"
                  />
                </div>
                <div className="col-xl-4 col-lg-6 col-md-8 col-sm-8 col-7">
                  <Select
                    value={this.props.searchFilter.productContentTypes}
                    onChange={so =>
                      this.props.handleSelectChange(so, 'productContentTypes')
                    }
                    options={this.props.allProductContentTypes}
                    placeholder="Product Content Type"
                    isMulti
                    isSearchable
                    className="reactSelect"
                    classNamePrefix="innerSelect"
                  />
                </div>
              </div>

              <div className="row reactSelectContainer">
                <div className="col-xl-4 col-lg-6 col-md-8 col-sm-8 col-7">
                  <Select
                    value={this.props.searchFilter.ageGroups}
                    onChange={so =>
                      this.props.handleSelectChange(so, 'ageGroups')
                    }
                    options={this.props.allAgeGroups}
                    placeholder="Product Age Group"
                    isMulti
                    isSearchable
                    className="reactSelect"
                    classNamePrefix="innerSelect"
                  />
                </div>
                {this.props.hasChoiceForStatus ? (
                  <div className="col-xl-4 col-lg-6 col-md-8 col-sm-8 col-7">
                    <Select
                      value={this.props.searchFilter.productStatus}
                      onChange={so =>
                        this.props.handleSelectChange(so, 'productStatus')
                      }
                      options={PRODUCT_STATUS_ARRAY}
                      placeholder="Product Status"
                      isMulti
                      isSearchable
                      className="reactSelect"
                      classNamePrefix="innerSelect"
                    />
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="row mt-4 pl-4">
                {' '}
                <div className="col-xl-1">Weight : </div>
                <div className="col-xl-3">
                  <InputRange
                    maxValue={2000}
                    minValue={10}
                    formatLabel={value => `${value}g`}
                    value={this.props.searchFilter.weightRange}
                    onChange={weight =>
                      this.props.handleInputChange(
                        OPCODES.range,
                        'weightRange',
                        weight,
                      )
                    }
                  />
                </div>
                <div className="offset-xl-1 col-xl-1">Price : </div>
                <div className="col-xl-3">
                  <InputRange
                    maxValue={2000}
                    minValue={1}
                    formatLabel={value => `${value}g`}
                    value={this.props.searchFilter.priceRange}
                    onChange={price =>
                      this.props.handleInputChange(
                        OPCODES.range,
                        'priceRange',
                        price,
                      )
                    }
                  />
                </div>
              </div>
              <div className="row mt-5 pl-4" />
              <br />

              <div className="row">
                <div className="offset-xl-9 col-xl-1 col-lg-1 col-md-4 col-sm-4">
                  <a
                    onClick={this.props.fetchProducts}
                    className="btn btn-outline-success"
                  >
                    Search
                  </a>
                </div>
                <div className="col-xl-1 col-lg-1 col-md-4 col-sm-4">
                  <a
                    onClick={this.props.clearFilters}
                    className="btn btn-outline-success"
                  >
                    Clear
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(normalizeCss, s)(AdvancedSearch);
