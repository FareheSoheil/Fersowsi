import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Select from 'react-select';
import s from './ProductPriceRecord.css';
import adminPriceTrimmer from '../../../../../adminPriceTrimmer';
import { PRICE_SIGNS } from '../../../../../constants/constantData';

class ProductPriceRecord extends React.Component {
  static propTypes = {
    product: {
      // costId: PropTypes.number.isRequired,
      privateRatio: PropTypes.number.isRequired,
      instRatio: PropTypes.number.isRequired,
      hasAdd: PropTypes.bool.isRequired,
      isRelative: PropTypes.bool.isRequired,
      index: PropTypes.number.isRequired,
      cost: PropTypes.object.isRequired,
      zoneOptions: PropTypes.array.isRequired,
      deliveryOptions: PropTypes.array.isRequired,
      periodOptions: PropTypes.array.isRequired,
      onSelectChange: PropTypes.func.isRequired,
      onInputChange: PropTypes.func.isRequired,
      onDeletePrice: PropTypes.func.isRequired,
      onAddPrice: PropTypes.func.isRequired,
    },
  };
  static defaultProps = {
    hasAdd: false,
  };
  constructor(props) {
    super(props);
    this.isNumberKey = this.isNumberKey.bind(this);
  }
  isNumberKey(evt) {
    var charCode = evt.which ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;

    return true;
  }
  render() {
    return (
      <tr className={this.props.hasAdd ? '' : s.greenBg}>
        <td>
          <Select
            options={this.props.zoneOptions}
            value={{
              value: this.props.cost.zoneId,
              label: this.props.cost.zoneName,
            }}
            className={this.props.isRelative ? s.dropDown : ''}
            onChange={so =>
              this.props.onSelectChange(so, 'zone', this.props.index)
            }
          />
        </td>
        <td>
          {' '}
          <Select
            options={this.props.deliveryOptions}
            value={{
              value: this.props.cost.deliveryTypeId,
              label: this.props.cost.deliveryTypeName,
            }}
            className={this.props.isRelative ? s.dropDown : ''}
            onChange={so =>
              this.props.onSelectChange(so, 'deliveryType', this.props.index)
            }
          />
        </td>
        <td>
          {' '}
          <Select
            options={this.props.subscriptionOptions}
            value={{
              value: this.props.cost.productSubscriptionTypeId,
              label: this.props.cost.ProductSubscriptionTypeName,
            }}
            className={this.props.isRelative ? s.dropDown : ''}
            onChange={so =>
              this.props.onSelectChange(so, 'subscription', this.props.index)
            }
          />
          {/*  */}
        </td>
        <td>
          <input
            name="publisherPrice"
            type="text"
            className={s.price}
            value={
              this.props.hasAdd
                ? this.props.cost.publisherPrice[this.props.currencyId]
                : adminPriceTrimmer(
                    this.props.cost.publisherPrice[this.props.currencyId],
                    'price',
                  )
            }
            onChange={e => this.props.onInputChange(e, this.props.index)}
          />
          <span>{PRICE_SIGNS[this.props.currencyId]}</span>
        </td>
        <td>
          {' '}
          <input
            name="institutionalCustomerPrice"
            type="text"
            className={s.price}
            // disabled
            value={
              this.props.hasAdd
                ? this.props.cost.institutionalCustomerPrice[
                    this.props.currencyId
                  ]
                : adminPriceTrimmer(
                    this.props.cost.institutionalCustomerPrice[
                      this.props.currencyId
                    ],
                    'price',
                  )
            }
            onChange={e => this.props.onInputChange(e, this.props.index)}
          />
          <span>{PRICE_SIGNS[this.props.currencyId]}</span>
        </td>
        <td>
          {' '}
          <input
            name="privateCustomerPrice"
            type="text"
            className={s.price}
            value={
              this.props.hasAdd
                ? this.props.cost.privateCustomerPrice[this.props.currencyId]
                : adminPriceTrimmer(
                    this.props.cost.privateCustomerPrice[this.props.currencyId],
                    'price',
                  )
            }
            // disabled
            onChange={e => this.props.onInputChange(e, this.props.index)}
          />
          <span>{PRICE_SIGNS[this.props.currencyId]}</span>
        </td>
        <td>
          {' '}
          <input
            name="postalCost"
            type="text"
            className={s.price}
            value={
              this.props.hasAdd
                ? this.props.cost.postalCost[this.props.currencyId]
                : adminPriceTrimmer(
                    this.props.cost.postalCost[this.props.currencyId],
                    'price',
                  )
            }
            onChange={e => this.props.onInputChange(e, this.props.index)}
          />
          <span>{PRICE_SIGNS[this.props.currencyId]}</span>
        </td>
        <td>
          {this.props.hasAdd ? (
            <button
              className={`${s.btn} btn btn-success`}
              onClick={this.props.onAddPrice}
            >
              <i class="fa fa-plus" aria-hidden="true" />
            </button>
          ) : (
            <button
              className={`${s.btn} btn btn-danger`}
              onClick={this.props.onDeletePrice}
            >
              <i class="fa fa-times" aria-hidden="true" />
            </button>
          )}
        </td>
      </tr>
    );
  }
}
export default withStyles(s)(ProductPriceRecord);
