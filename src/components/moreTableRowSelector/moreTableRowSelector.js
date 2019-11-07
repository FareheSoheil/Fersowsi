import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class RowAdder extends React.Component {
  constructor(props) {
    super(props);
    this.showMore = this.showMore.bind(this);
  }
  showMore() {
    const x = parseInt(document.getElementById('numberSelect').value);
    this.props.showMore(x);
  }
  render() {
    return (
      <div className="form-group ">
        {/* <Select options={options} /> */}
        <select id="numberSelect" onChange={this.showMore}>
          <option value={10} selected={this.props.pageSize == 10}>
            10
          </option>
          <option selected={this.props.pageSize == 20} value={20}>
            20
          </option>
          <option value={50} selected={this.props.pageSize == 50}>
            50
          </option>
          <option value={100} selected={this.props.pageSize == 100}>
            100
          </option>
        </select>
      </div>
    );
  }
}
export default RowAdder;
