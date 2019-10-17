import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProductTranlationTable.css';
import ProductTranslationRecord from './ProductTranslationRecord';

class ProductTranlationTable extends React.Component {
  static propTypes = {
    productId: PropTypes.string.isRequired,
    translations: PropTypes.array.isRequired,
    onAddTranslation: PropTypes.func.isRequired,
    onDeleteTranslation: PropTypes.func.isRequired,
    languageOptions: PropTypes.array.isRequired,
    onTranslationInputChange: PropTypes.func.isRequired,
    onTranslationSelectChange: PropTypes.func.isRequired,
    onAddTranslation: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      newTranslation: {
        vlaue: '',
        label: '',
        title: '',
        description: '',
      },
    };
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.add = this.add.bind(this);
  }
  onSelectChange(so, index) {
    let newTranslation = { ...this.state.newTranslation };

    if (index < 0) {
      newTranslation.label = so.label;
      newTranslation.value = so.value;
      this.setState({ newTranslation });
    } else this.props.onTranslationSelectChange(so, index);
  }
  onInputChange(e, index) {
    let newTranslation = { ...this.state.newTranslation };
    if (index < 0) {
      const value = event.target.value;
      const state = event.target.name;
      newTranslation[state] = value;
      this.setState({ newTranslation });
    } else this.props.onTranslationInputChange(e, index);
  }
  add() {
    let nt = { ...this.state.newTranslation };
    this.props.onAddTranslation(nt);
    this.setState({
      newTranslation: {
        vlaue: '',
        label: '',
        title: '',
        description: '',
      },
    });
  }
  render() {
    let records;
    const length = this.props.translations.length;
    if (
      this.props.translations !== undefined &&
      this.props.translations.length !== 0
    ) {
      records = this.props.translations.map((record, i) => (
        <ProductTranslationRecord
          isRelative={i === length - 1 ? true : false}
          index={i}
          hasAdd={false}
          translation={record}
          languageOptions={this.props.languageOptions}
          onSelectChange={this.onSelectChange}
          onInputChange={this.onInputChange}
          onDeleteTranslation={() => this.props.onDeleteTranslation(i)}
        />
      ));
      console.log(records);
    }
    return (
      <div className={`table-responsive ${s.table}`}>
        <table className={`table table-hover table-bordered ${s.hoverableTr}`}>
          <thead className="bg-light">
            <th width="160" className="border-0">
              Language
            </th>
            <th width="200" className="border-0">
              title
            </th>
            <th width="400" className="border-0">
              Description
            </th>
            <th>
              <i className="fas fa-trash-alt" />
            </th>
          </thead>
          <tbody>
            {' '}
            <ProductTranslationRecord
              index={-1}
              isRelative={false}
              hasAdd={true}
              translation={this.state.newTranslation}
              languageOptions={this.props.languageOptions}
              onSelectChange={this.onSelectChange}
              onInputChange={this.onInputChange}
              onAddTranslation={this.add}
            />
            {records}
          </tbody>
        </table>
      </div>
    );
  }
}
export default withStyles(s)(ProductTranlationTable);
