import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Select from 'react-select';
import s from './ProductTranslationRecord.css';

class ProductTranslationRecord extends React.Component {
  static propTypes = {
    product: {
      hasAdd: PropTypes.bool.isRequired,
      isRelative: PropTypes.bool.isRequired,
      index: PropTypes.number.isRequired,
      translation: PropTypes.object.isRequired,
      languageOptions: PropTypes.array.isRequired,
      onSelectChange: PropTypes.func.isRequired,
      onInputChange: PropTypes.func.isRequired,
      onDeleteTranslation: PropTypes.func.isRequired,
      onAddTranslation: PropTypes.func.isRequired,
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
            options={this.props.languageOptions}
            value={this.props.translation}
            className={this.props.isRelative ? s.dropDown : ''}
            onChange={so => this.props.onSelectChange(so, this.props.index)}
          />
        </td>
        <td>
          <form>
            {' '}
            <div className="form-group">
              <input
                name="title"
                type="text"
                className="form-control form-control-sm "
                value={this.props.translation.title}
                onChange={e => this.props.onInputChange(e, this.props.index)}
              />
            </div>
          </form>
        </td>
        <td>
          <form>
            {' '}
            <div className="form-group">
              <textarea
                rows="6"
                cols="20"
                name="description"
                type="text"
                className="form-control form-control-sm "
                value={this.props.translation.description}
                onChange={e => this.props.onInputChange(e, this.props.index)}
              />
            </div>
          </form>
        </td>
        <td>
          {this.props.hasAdd ? (
            <button
              className={`${s.btn} btn btn-success`}
              onClick={this.props.onAddTranslation}
            >
              <i class="fa fa-plus" aria-hidden="true" />
            </button>
          ) : (
            <button
              className={`${s.btn} btn btn-danger`}
              onClick={this.props.onDeleteTranslation}
            >
              <i class="fa fa-times" aria-hidden="true" />
            </button>
          )}
        </td>
      </tr>
    );
  }
}
export default withStyles(s)(ProductTranslationRecord);
