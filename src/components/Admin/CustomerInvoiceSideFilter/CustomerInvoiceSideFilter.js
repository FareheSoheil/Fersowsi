import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Select from 'react-select';
import InputRange from 'react-input-range';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import s from './CustomerInvoiceSideFilter.css';
import {
  CUSTOMER_ORDER_STATUS_ARRAY,
  PRODUCT_PERIOD_ARRAY,
  SINGLE_PRODUCT_TYPE_ARRAY,
  PRODUCT_TYPE_ARRAY,
  PAYMENT_STATUS_ARRAY,
  OPCODES,
} from '../../../constants/constantData';
class CustomerInvoiceSideFilter extends React.Component {
  static propTypes = {
    allCurrencies: PropTypes.array.isRequired,
    allDeliveryAddresses: PropTypes.array.isRequired,
    hasChoiceForStatus: PropTypes.bool.isRequired,
    filters: {
      vatNo: 6300.0, //
      totalPrice: 476.0, //
      totalTaxCost: 32.0,
      totalCost: 554.25,
      totalDeliveryCost: 539.0,
      cancelPrice: 0.0,
      discount: 30.0,

      status: { value: 1, label: 'Wait For Admin Response ' },
      userOrderNo: 10001, //
      currency: { value: 5, label: 'dollsr' },
      deliveryAddress: {
        value: 2662,
        label: 'alkjsdhaskjdnasdjkasndasjdlasnd',
      },
    },
    handleInputChange: PropTypes.func.isRequired,
    handleSelectChange: PropTypes.func.isRequired,
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
                <label>User Order No</label>
                <br />
                <input
                  name="userOrderNo"
                  type="text"
                  className="form-control form-control-sm"
                  value={this.props.filters.userOrderNo}
                  onChange={e =>
                    this.props.handleInputChange(
                      OPCODES.simple,
                      'userOrderNo',
                      e,
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label>Vat No</label>
                <br />
                <input
                  name="vatNo"
                  type="text"
                  className="form-control form-control-sm"
                  value={this.props.filters.vatNo}
                  onChange={e =>
                    this.props.handleInputChange(OPCODES.simple, 'vatNo', e)
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
                      'sortTotlaPrice',
                      e,
                    )
                  }
                  class="custom-control-input"
                  name="sortTotalPrice"
                  checked={this.props.filters.sortTotlaPrice}
                  id="price"
                />
                <label class="custom-control-label" for="price">
                  Total Price
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

          {this.props.hasChoiceForStatus ? (
            <div class="product-sidebar-widget">
              <div class="product-sidebar-widget-title">
                Order Status{' '}
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
                options={CUSTOMER_ORDER_STATUS_ARRAY}
                value={this.props.filters.status}
                onChange={so => this.props.handleSelectChange(so, 'status')}
              />
            </div>
          ) : (
            ''
          )}
          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">
              Currency{' '}
              <span
                class="float-right slider collapsed"
                data-toggle="collapse"
                data-target="#payCollapse"
                aria-expanded="false"
                aria-controls="searcNamesCollapse"
              >
                <i class="fa" aria-hidden="true" />
              </span>
            </div>
            <Select
              id="payCollapse"
              className="collapse"
              isMulti
              isSearchable
              options={this.props.allCurrencies}
              value={this.props.filters.currency}
              onChange={so => this.props.handleSelectChange(so, 'currency')}
            />
          </div>
          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">
              Delivery Address{' '}
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
              options={this.props.allDeliveryAddresses}
              onChange={so =>
                this.props.handleSelectChange(so, 'deliveryAddress')
              }
              value={this.props.filters.deliveryAddress}
            />
          </div>

          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">Total Price</div>
            <InputRange
              maxValue={100}
              minValue={1}
              formatLabel={value => `${value}$`}
              value={this.props.filters.totalPrice}
              onChange={price =>
                this.props.handleInputChange(OPCODES.range, 'totalPrice', price)
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
              onChange={price =>
                this.props.handleInputChange(OPCODES.range, 'totalCost', price)
              }
            />
          </div>
          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">Total Delivery Cost</div>
            <InputRange
              maxValue={100}
              minValue={1}
              formatLabel={value => `${value}$`}
              value={this.props.filters.totalDeliveryCost}
              onChange={price =>
                this.props.handleInputChange(
                  OPCODES.range,
                  'totalDeliveryCost',
                  price,
                )
              }
            />
          </div>
          <div class="product-sidebar-widget">
            <div class="product-sidebar-widget-title">Total Tax Cost</div>
            <InputRange
              maxValue={100}
              minValue={1}
              formatLabel={value => `${value}$`}
              value={this.props.filters.totalTaxCost}
              onChange={price =>
                this.props.handleInputChange(
                  OPCODES.range,
                  'totalTaxCost',
                  price,
                )
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
export default withStyles(s)(CustomerInvoiceSideFilter);
