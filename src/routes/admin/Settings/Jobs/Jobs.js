import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import SettingItem from '../../../../components/SettingItem';
import {
  SETTING_COLUMNS_LABELS_ARRAY,
  SETTING_ITEM_RECORD_ITEM_NAMES,
} from '../../../../constants/constantData';
class Jobs extends React.Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
  };

  render() {
    return (
      <SettingItem
        fetchUrl="PropTypes.string.isRequired"
        editUrl="PropTypes.string.isRequired"
        addUrl="PropTypes.string.isRequired"
        cardTitle="Jobs"
        title="Job"
        columnLabels={SETTING_COLUMNS_LABELS_ARRAY}
        recordItemNames={SETTING_ITEM_RECORD_ITEM_NAMES}
      />
    );
  }
}
export default Jobs;
