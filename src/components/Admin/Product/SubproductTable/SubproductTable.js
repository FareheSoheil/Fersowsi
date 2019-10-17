import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Select from 'react-select';
import s from './SubproductTable.css';
import SubproductRecord from './SubproductRecord';

class SubproductTable extends React.Component {
  static propTypes = {
    productId: PropTypes.string.isRequired,
    subproducts: PropTypes.array.isRequired,
    onAddSubproduct: PropTypes.func.isRequired,
    onDeleteSubproduct: PropTypes.func.isRequired,
    productOptions: PropTypes.array.isRequired,
    // onTranslationInputChange: PropTypes.func.isRequired,
    // onTranslationSelectChange: PropTypes.func.isRequired,
    // onAddSubproduct: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      newSubproduct: {},
    };
    this.onSelectChange = this.onSelectChange.bind(this);
    // this.onInputChange = this.onInputChange.bind(this);
    this.add = this.add.bind(this);
  }
  onSelectChange(so) {
    let newSubproduct = { ...this.state.newSubproduct };

    newSubproduct.label = so.label;
    newSubproduct.value = so.value;
    this.setState({ newSubproduct });
  }

  add() {
    let nt = { ...this.state.newSubproduct };
    if (Object.keys(nt).length) {
      window.alert(JSON.stringify(nt));
      this.props.onAddSubproduct(nt);
      this.setState({
        newSubproduct: {},
      });
    } else {
      window.alert('dont leave it empty you sheep');
    }
  }
  render() {
    let records;

    if (
      this.props.subproducts !== undefined &&
      this.props.subproducts.length !== 0
    ) {
      records = this.props.subproducts.map((record, i) => (
        <SubproductRecord
          index={i}
          subProduct={record}
          onDeleteSubproduct={() => this.props.onDeleteSubproduct(i)}
        />
      ));
    }
    return (
      <div>
        <div className={`${s.addComponent} row`}>
          <div className="offset-xl-2 col-2">
            <h4>Add A Product : </h4>
          </div>
          <div className="col-4">
            <Select
              options={this.props.productOptions}
              onChange={this.onSelectChange}
              value={this.state.newSubproduct}
            />
          </div>
          <div className="col-1">
            {' '}
            <button className={`${s.btn} btn btn-success`} onClick={this.add}>
              <i class="fa fa-plus" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className={`table-responsive ${s.table}`}>
          <table
            className={`table table-hover table-bordered ${s.hoverableTr}`}
          >
            <thead className="bg-light">
              <th width="200" className="border-0">
                Title
              </th>
              <th width="120" className="border-0">
                Issn
              </th>
              <th width="300" className="border-0">
                publisher
              </th>
              <th width="160" className="border-0">
                Age Group
              </th>
              <th>
                <i className="fas fa-trash-alt" />
              </th>
            </thead>
            <tbody>{records}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(SubproductTable);
