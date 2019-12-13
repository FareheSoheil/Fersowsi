import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Select from 'react-select';
import InputRange from 'react-input-range';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import s from './PublisherOrderSideFilter.css';
import {
  PUBLISHER_ORDER_STATUS_ARRAY,
  OPCODES,
} from '../../../../constants/constantData';
class PublisherOrderSideFilter extends React.Component {
  static propTypes = {
    hasChoiceForStatus: PropTypes.bool.isRequired,
    allProducts: PropTypes.array.isRequired,
    allSubscriptions: PropTypes.array.isRequired,
    allDeliverTypes: PropTypes.array.isRequired,
    allPeriods: PropTypes.array.isRequired,
    filters: {},
    handleInputChange: PropTypes.func.isRequired,
    handleSelectChange: PropTypes.func.isRequired,
    onDateInput: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div class="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-12">
        <div class="product-sidebar">
          <div
            class="product-sidebar-widget"
            // style={{ backgroundColor: 'aqua', textAlign: 'center' }}
          >
            <h4 class="mb-0">Filters</h4>
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
              Product{' '}
              <span
                class="float-right slider collapsed"
                data-toggle="collapse"
                data-target="#ProductCollapse"
                aria-expanded="false"
                aria-controls="searcNamesCollapse"
              >
                <i class="fa" aria-hidden="true" />
              </span>
            </div>
            <Select
              id="ProductCollapse"
              className="collapse"
              isMulti
              isSearchable
              options={this.props.allProducts}
              value={this.props.filters.product}
              onChange={so => this.props.handleSelectChange(so, 'product')}
            />
          </div>

          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">
              Product Subscription{' '}
              <span
                class="float-right slider collapsed"
                data-toggle="collapse"
                data-target="#SubsCollapse"
                aria-expanded="false"
                aria-controls="searcNamesCollapse"
              >
                <i class="fa" aria-hidden="true" />
              </span>
            </div>
            <Select
              id="SubsCollapse"
              className="collapse"
              isMulti
              isSearchable
              options={this.props.allSubscriptions}
              value={this.props.filters.productionSubscription}
              onChange={so =>
                this.props.handleSelectChange(so, 'productionSubscription')
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
                options={PUBLISHER_ORDER_STATUS_ARRAY}
                value={this.props.filters.status}
                onChange={so => this.props.handleSelectChange(so, 'status')}
              />
            </div>
          ) : (
            ''
          )}
          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">
              Payment Status{' '}
              <span
                class="float-right slider collapsed"
                data-toggle="collapse"
                data-target="#paymentstatCollapse"
                aria-expanded="false"
                aria-controls="searcNamesCollapse"
              >
                <i class="fa" aria-hidden="true" />
              </span>
            </div>
            <Select
              id="paymentstatCollapse"
              className="collapse"
              isMulti
              isSearchable
              options={PUBLISHER_ORDER_STATUS_ARRAY}
              value={this.props.filters.paymentStatus}
              onChange={so =>
                this.props.handleSelectChange(so, 'paymentStatus')
              }
            />
          </div>

          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">
              Delivery Type{' '}
              <span
                class="float-right slider collapsed"
                data-toggle="collapse"
                data-target="#delCollapse"
                aria-expanded="false"
                aria-controls="searcNamesCollapse"
              >
                <i class="fa" aria-hidden="true" />
              </span>
            </div>
            <Select
              id="delCollapse"
              className="collapse"
              isMulti
              isSearchable
              options={this.props.allDeliverTypes}
              onChange={so => this.props.handleSelectChange(so, 'deliveryType')}
              value={this.props.filters.deliveryType}
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
              options={this.props.allPeriods}
              onChange={so =>
                this.props.handleSelectChange(so, 'productPeriod')
              }
              value={this.props.filters.productPeriod}
            />
          </div>

          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">
              Creation Date{' '}
              <span
                class="float-right slider collapsed"
                data-toggle="collapse"
                data-target="#dateCollapse"
                aria-expanded="false"
                aria-controls="searcNamesCollapse"
              >
                <i class="fa" aria-hidden="true" />
              </span>
            </div>
            <div id="dateCollapse" className="collapse">
              {/* <div className="form-group"> */}
              <label className="mb-0">Start Date </label>
              <br />
              <DatePicker
                name="creationDate"
                selected={this.props.filters.startDate}
                onChange={date => this.props.onDateInput(date, 'startDate')}
              />
              <br />
              <label className="mb-0 mt-3">End Date </label>
              <br />

              <DatePicker
                name="creationDate"
                selected={this.props.filters.endDate}
                onChange={date => this.props.onDateInput(date, 'endDate')}
              />
              {/* </div> */}
            </div>
          </div>
          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">Publisher Price</div>
            <InputRange
              maxValue={100}
              minValue={1}
              formatLabel={value => `${value}$`}
              value={this.props.filters.publisherPrice}
              onChange={price =>
                this.props.handleInputChange(
                  OPCODES.range,
                  'publisherPrice',
                  price,
                )
              }
            />
          </div>
          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">Customer Price</div>
            <InputRange
              maxValue={100}
              minValue={1}
              formatLabel={value => `${value}$`}
              value={this.props.filters.customerPrice}
              onChange={price =>
                this.props.handleInputChange(
                  OPCODES.range,
                  'customerPrice',
                  price,
                )
              }
            />
          </div>
          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">Total Cost</div>
            <InputRange
              maxValue={100}
              minValue={1}
              formatLabel={value => `${value}$`}
              value={this.props.filters.totalCost}
              onChange={cost =>
                this.props.handleInputChange(OPCODES.range, 'totalCost', cost)
              }
            />
          </div>
          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">Delivery Cost</div>
            <InputRange
              maxValue={100}
              minValue={1}
              formatLabel={value => `${value}$`}
              value={this.props.filters.deliveryCost}
              onChange={cost =>
                this.props.handleInputChange(
                  OPCODES.range,
                  'deliveryCost',
                  cost,
                )
              }
            />
          </div>
          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">Count</div>
            <InputRange
              maxValue={2000}
              minValue={1}
              value={this.props.filters.count}
              onChange={count =>
                this.props.handleInputChange(OPCODES.range, 'count', count)
              }
            />
          </div>
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
    );
  }
}
export default withStyles(s)(PublisherOrderSideFilter);
