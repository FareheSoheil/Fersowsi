import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import history from '../../../../../history';
import s from './SubproductRecord.css';

class SubproductRecord extends React.Component {
  static propTypes = {
    product: {
      // hasAdd: PropTypes.bool.isRequired,
      // isRelative: PropTypes.bool.isRequired,
      index: PropTypes.number.isRequired,
      subProduct: PropTypes.object.isRequired,
      productOptions: PropTypes.array.isRequired,
      // onSelectChange: PropTypes.func.isRequired,
      // onInputChange: PropTypes.func.isRequired,
      onDeleteSubproduct: PropTypes.func.isRequired,
      // onAddSubproduct: PropTypes.func.isRequired,
    },
  };

  constructor(props) {
    super(props);
    this.goTo = this.goTo.bind(this);
  }
  goTo() {
    window.location.replace(`/admin/products/${this.props.subProduct.id}`);
    // history.push(`);
  }
  render() {
    return (
      <tr onClick={this.goTo} class={this.props.hasAdd ? '' : s.greenBg}>
        <td>
          <form>
            {' '}
            <div className="form-group">
              <input
                disabled
                name="title"
                type="text"
                className="form-control form-control-sm "
                value={this.props.subProduct.label}
              />
            </div>
          </form>
        </td>
        <td>
          <form>
            {' '}
            <div className="form-group">
              <input
                name="issn"
                type="text"
                disabled
                className="form-control form-control-sm "
                value={this.props.subProduct.issn}
              />
            </div>
          </form>
        </td>
        <td>
          <form>
            {' '}
            <div className="form-group">
              <input
                name="publisher"
                type="text"
                disabled
                className="form-control form-control-sm "
                value={this.props.subProduct.PublisherName}
              />
            </div>
          </form>
        </td>
        <td>
          <form>
            {' '}
            <div className="form-group">
              <input
                name="ageGroup"
                type="text"
                disabled
                className="form-control form-control-sm "
                value={this.props.subProduct.AgeGroupName}
              />
            </div>
          </form>
        </td>
        <td>
          <button
            className={`${s.btn} btn btn-danger`}
            onClick={this.props.onDeleteSubproduct}
          >
            <i class="fa fa-times" aria-hidden="true" />
          </button>
        </td>
      </tr>
    );
  }
}
export default withStyles(s)(SubproductRecord);
