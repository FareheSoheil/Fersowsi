import React from 'react';
import PropTypes from 'prop-types';
import SettingItem from '../../../../components/SettingItem';
import {
  SETTING_COLUMNS_LABELS_ARRAY,
  SETTING_ITEM_RECORD_ITEM_NAMES,
  SERVER,
} from '../../../../constants/constantData';
class Zones extends React.Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
  };

  render() {
    return (
      <SettingItem
        fetchUrl={`${SERVER}/getAuxInfoForAll`}
        type="Zone"
        editUrl="PropTypes.string.isRequired"
        addUrl="PropTypes.string.isRequired"
        cardTitle="Zones"
        title="Zone"
        columnLabels={SETTING_COLUMNS_LABELS_ARRAY}
        recordItemNames={SETTING_ITEM_RECORD_ITEM_NAMES}
      />
    );
  }
}
export default Zones;
