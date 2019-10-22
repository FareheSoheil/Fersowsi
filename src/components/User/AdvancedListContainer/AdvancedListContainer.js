import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Select from 'react-select';
import InputRange from 'react-input-range';
import {
  PRODUCT_PERIOD_ARRAY,
  SINGLE_PRODUCT_TYPE_ARRAY,
  PRODUCT_STATUS_ARRAY,
  PRODUCT_TYPE_ARRAY,
  OPCODES,
} from '../../../constants/constantData';
import s from './AdvancedListContainer.css';
import AdvancedListHeader from './AdvancedListHeader/AdvancedListHeader';
class AdvancedListContainer extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    sortBy: PropTypes.object.isRequired,
    handleSelectChange: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div class="col-xl-9 col-lg-8 col-md-8 col-sm-12 col-12">
        <div class={`${s.container} container-fluid `}>
          <div className="row">
            <AdvancedListHeader
              handleSelectChange={this.props.handleSelectChange}
              sortBy={this.props.sortBy}
            />
          </div>
          <div className="row">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AdvancedListContainer);
