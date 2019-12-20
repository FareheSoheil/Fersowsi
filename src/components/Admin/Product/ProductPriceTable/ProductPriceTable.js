import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import zeroTrimmer from '../../../../zeroTrimmer';
import s from './ProductPriceTable.css';
import ProductPriceRecord from './ProductPriceRecord';

class ProductPriceTable extends React.Component {
  static propTypes = {
    privateRatio: PropTypes.number.isRequired,
    instRatio: PropTypes.number.isRequired,
    inPostalRatio: PropTypes.number.isRequired,
    productId: PropTypes.string.isRequired,
    prices: PropTypes.array.isRequired,
    onEditPrices: PropTypes.func.isRequired,
    onDeletePrice: PropTypes.func.isRequired,
    onAddPrice: PropTypes.func.isRequired,
    onDeletePrice: PropTypes.func.isRequired,
    zoneOptions: PropTypes.array.isRequired,
    deliveryOptions: PropTypes.array.isRequired,
    periodOptions: PropTypes.array.isRequired,
    onPriceInputChange: PropTypes.func.isRequired,
    onPriceSelectChange: PropTypes.func.isRequired,
    onPriceAdd: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      newCost: {
        productPeriodId: '',
        productPeriodName: '',
        zoneId: '',
        zoneName: '',
        deliveryTypeId: '',
        deliveryTypeName: '',
        privateCustomerPrice: [0, 0, 0, 0, 0],
        institutionalCustomerPrice: [0, 0, 0, 0, 0],
        privatePublisherPrice: [0, 0, 0, 0, 0],
        institutionalPublisherPrice: [0, 0, 0, 0, 0],
        inPostalCost: [0, 0, 0, 0, 0],
        outPostalCost: [0, 0, 0, 0, 0],
      },
    };
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.add = this.add.bind(this);
  }
  isNumber(string) {
    if (/^[0-9]+$/.test(string)) return true;
    else return false;
  }
  onSelectChange(so, name, index) {
    let newCost = { ...this.state.newCost };

    if (index < 0) {
      if (name == 'zone') {
        newCost.zoneName = so.label;
        newCost.zoneId = so.value;
        this.setState({ newCost });
      } else if (name == 'deliveryType') {
        newCost.deliveryTypeName = so.label;
        newCost.deliveryTypeId = so.value;
        this.setState({ newCost });
      } else if (name == 'subscription') {
        newCost.productSubscriptionTypeName = so.label;
        newCost.productSubscriptionTypeId = so.value;
        this.setState({ newCost });
      } else {
        newCost.productPeriodName = so.label;
        newCost.productPeriodId = so.value;
        this.setState({ newCost });
      }
    } else this.props.onPriceSelectChange(so, name, index);
  }
  onInputChange(e, index) {
    let newCost = { ...this.state.newCost };
    const value = e.target.value;
    const state = e.target.name;

    if (index < 0) {
      if (state == 'privatePublisherPrice') {
        if (this.props.privateRatio != '')
          newCost.privateCustomerPrice[this.props.currencyId - 1] =
            (100 + parseFloat(this.props.privateRatio)) *
            parseFloat(value) /
            100;

        newCost.privatePublisherPrice[this.props.currencyId - 1] = value;
      }
      if (state == 'institutionalPublisherPrice') {
        if (this.props.instRatio != '')
          newCost.institutionalCustomerPrice[this.props.currencyId - 1] =
            (100 + parseFloat(this.props.instRatio)) * parseFloat(value) / 100;
        newCost.institutionalPublisherPrice[this.props.currencyId - 1] = value;
      }
      if (state == 'inPostalCost') {
        if (this.props.inPostalRatio != '')
          newCost.outPostalCost[this.props.currencyId - 1] =
            (100 + parseFloat(this.props.inPostalRatio)) *
            parseFloat(value) /
            100;
        newCost.inPostalCost[this.props.currencyId - 1] = value;
      } else newCost[state][this.props.currencyId - 1] = value;
      this.setState({ newCost });
    } else this.props.onPriceInputChange(e, index);
  }
  add() {
    let nc = { ...this.state.newCost };
    this.props.onAddPrice(nc);
    this.setState({
      newCost: {
        productPeriodId: '',
        productPeriodName: '',
        zoneId: '',
        zoneName: '',
        deliveryTypeId: '',
        deliveryTypeName: '',
        privateCustomerPrice: [0, 0, 0, 0, 0],
        institutionalCustomerPrice: [0, 0, 0, 0, 0],
        privatePublisherPrice: [0, 0, 0, 0, 0],
        institutionalPublisherPrice: [0, 0, 0, 0, 0],
        inPostalCost: [0, 0, 0, 0, 0],
        outPostalCost: [0, 0, 0, 0, 0],
      },
    });
  }
  render() {
    let records;
    const length = this.props.prices.length;
    if (this.props.prices !== undefined && this.props.prices.length !== 0) {
      records = this.props.prices.map((record, i) => (
        <ProductPriceRecord
          currencyId={this.props.currencyId}
          index={i}
          hasAdd={false}
          isRelative={true}
          cost={record}
          zoneOptions={this.props.zoneOptions}
          deliveryOptions={this.props.deliveryOptions}
          periodOptions={this.props.periodOptions}
          subscriptionOptions={this.props.subscriptionOptions}
          onSelectChange={this.onSelectChange}
          onInputChange={this.onInputChange}
          onDeletePrice={() => this.props.onDeletePrice(i)}
        />
      ));
    }
    return (
      <div className={`table-responsive ${s.table}`}>
        <table className={`table table-hover table-bordered ${s.hoverableTr}`}>
          <thead className="bg-light">
            <th width="160" className="border-0">
              Zone
            </th>
            <th width="150" className="border-0">
              Delivery Type
            </th>

            <th width="160" className="border-0">
              Subscription
            </th>
            <th className="border-0">Private Publisher Price</th>
            <th className="border-0">Inst. Publisher Price</th>
            <th className="border-0">In Postal Price</th>
            <th className="border-0">Private Cutomer Price</th>
            <th className="border-0">Inst. Cutomer Price</th>
            <th className="border-0">Out Postal Price</th>
            <th width="30">
              <i className="fas fa-trash-alt" />
            </th>
          </thead>
          <tbody>
            {' '}
            <ProductPriceRecord
              currencyId={this.props.currencyId}
              index={-1}
              isRelative={true}
              hasAdd={true}
              cost={this.state.newCost}
              zoneOptions={this.props.zoneOptions}
              deliveryOptions={this.props.deliveryOptions}
              periodOptions={this.props.periodOptions}
              subscriptionOptions={this.props.subscriptionOptions}
              onSelectChange={this.onSelectChange}
              onInputChange={this.onInputChange}
              onAddPrice={this.add}
            />
            {records}
          </tbody>
        </table>
      </div>
    );
  }
}
export default withStyles(s)(ProductPriceTable);
