import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Select from 'react-select';
import s from './ProductPriceRecord.css';

class ProductPriceRecord extends React.Component {
  static propTypes = {
    product: {
      // costId: PropTypes.number.isRequired,
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
  }
  render() {
    return (
      <tr>
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
            options={this.props.periodOptions}
            value={{
              value: this.props.cost.productPeriodId,
              label: this.props.cost.productPeriodName,
            }}
            className={this.props.isRelative ? s.dropDown : ''}
            onChange={so =>
              this.props.onSelectChange(so, 'productPeriod', this.props.index)
            }
          />
          {/*  */}
        </td>
        <td>
          <form>
            {' '}
            <div className="form-group">
              <input
                name="publisherPrice"
                type="text"
                className="form-control form-control-sm "
                value={this.props.cost.publisherPrice}
                onChange={e => this.props.onInputChange(e, this.props.index)}
              />
            </div>
          </form>
        </td>
        <td>
          <form>
            {' '}
            <div className="form-group">
              <input
                name="institutionalCustomerPrice"
                type="text"
                className="form-control form-control-sm "
                value={this.props.cost.institutionalCustomerPrice}
                onChange={e => this.props.onInputChange(e, this.props.index)}
              />
            </div>
          </form>
        </td>
        <td>
          <form>
            {' '}
            <div className="form-group">
              <input
                name="privateCustomerPrice"
                type="text"
                className="form-control form-control-sm "
                value={this.props.cost.privateCustomerPrice}
                onChange={e => this.props.onInputChange(e, this.props.index)}
              />
            </div>
          </form>
        </td>
        <td>
          <form>
            {' '}
            <div className="form-group">
              <input
                name="postalCost"
                type="text"
                className="form-control form-control-sm "
                value={this.props.cost.postalCost}
                onChange={e => this.props.onInputChange(e, this.props.index)}
              />
            </div>
          </form>
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
