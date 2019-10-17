import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProductPriceTable.css';
import ProductPriceRecord from './ProductPriceRecord';

class ProductPriceTable extends React.Component {
  static propTypes = {
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
        privateCustomerPrice: '',
        institutionalCustomerPrice: '',
        publisherPrice: '',
        postalCost: '',
      },
    };
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.add = this.add.bind(this);
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
      } else {
        newCost.productPeriodName = so.label;
        newCost.productPeriodId = so.value;
        this.setState({ newCost });
      }
    } else this.props.onPriceSelectChange(so, name, index);
  }
  onInputChange(e, index) {
    let newCost = { ...this.state.newCost };
    if (index < 0) {
      const value = event.target.value;
      const state = event.target.name;
      newCost[state] = value;
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
        privateCustomerPrice: '',
        institutionalCustomerPrice: '',
        publisherPrice: '',
        postalCost: '',
      },
    });
  }
  render() {
    let records;
    const length = this.props.prices.length;
    if (this.props.prices !== undefined && this.props.prices.length !== 0) {
      console.log('prices in if : ', this.props.prices);
      records = this.props.prices.map((record, i) => (
        <ProductPriceRecord
          index={i}
          hasAdd={false}
          isRelative={i === length - 1 ? true : false}
          cost={record}
          zoneOptions={this.props.zoneOptions}
          deliveryOptions={this.props.deliveryOptions}
          periodOptions={this.props.periodOptions}
          onSelectChange={this.onSelectChange}
          onInputChange={this.onInputChange}
          onDeletePrice={() => this.props.onDeletePrice(i)}
        />
      ));
      console.log(records);
    }
    return (
      <div className={`table-responsive ${s.table}`}>
        <table className={`table table-hover table-bordered ${s.hoverableTr}`}>
          <thead className="bg-light">
            <th width="160" className="border-0">
              Zone
            </th>
            <th width="130" className="border-0">
              Delivery Type
            </th>
            <th width="170" className="border-0">
              Period
            </th>
            <th className="border-0">Publisher Price</th>
            <th className="border-0">Inst. Price</th>
            <th className="border-0">Private Price</th>
            <th className="border-0">Postal Price</th>
            <th>
              <i className="fas fa-trash-alt" />
            </th>
          </thead>
          <tbody>
            {' '}
            <ProductPriceRecord
              index={-1}
              hasAdd={true}
              cost={this.state.newCost}
              zoneOptions={this.props.zoneOptions}
              deliveryOptions={this.props.deliveryOptions}
              periodOptions={this.props.periodOptions}
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
