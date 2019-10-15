import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Select from 'react-select';
import { PRODUCT_SORT_OPTIONS } from '../../../../constants/constantData';
import s from './AdvancedListHeader.css';
class AdvancedListHeader extends React.Component {
  static propTypes = {
    sortBy: '',
    handleSelectChange: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div
        class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        // style={{ color: 'black', fontSize: '13px' }}
      >
        <div class={`${s.container} row  `}>
          <div className={`${s.label} offset-xl-9`}> Sort by</div>
          <div className="col-xl-2">
            {' '}
            <Select
              options={PRODUCT_SORT_OPTIONS}
              value={this.props.sortBy}
              onChange={this.props.handleSelectChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AdvancedListHeader);
