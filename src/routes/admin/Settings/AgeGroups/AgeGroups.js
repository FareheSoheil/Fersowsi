import React from 'react';
import PropTypes from 'prop-types';
import SettingItem from '../../../../components/SettingItem';
import {
  SETTING_COLUMNS_LABELS_ARRAY,
  SETTING_ITEM_RECORD_ITEM_NAMES,
} from '../../../../constants/constantData';
import { SERVER } from '../../../../constants';
class AgeGroups extends React.Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
  };
  render() {
    return (
      <SettingItem
        fetchUrl={`${SERVER}/getAuxInfoForAll`}
        type="AgeGroup"
        editUrl="PropTypes.string.isRequired"
        addUrl="PropTypes.string.isRequired"
        cardTitle="Age Groups"
        title="Age Group"
        columnLabels={SETTING_COLUMNS_LABELS_ARRAY}
        recordItemNames={SETTING_ITEM_RECORD_ITEM_NAMES}
      />
    );
  }
}
export default AgeGroups;
