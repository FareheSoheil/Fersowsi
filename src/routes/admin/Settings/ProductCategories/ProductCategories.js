import React from 'react';
import PropTypes from 'prop-types';
import SettingItem from '../../../../components/SettingItem';
import {
  SETTING_COLUMNS_LABELS_ARRAY,
  SETTING_ITEM_RECORD_ITEM_NAMES,
  SERVER,
} from '../../../../constants/constantData';
class ProductCategories extends React.Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
  };

  render() {
    return (
      <SettingItem
        fetchUrl={`${SERVER}/getAuxInfoForAll`}
        type="ProductCategory"
        editUrl="PropTypes.string.isRequired"
        addUrl="PropTypes.string.isRequired"
        cardTitle="Product Categories"
        title="Product Category "
        columnLabels={SETTING_COLUMNS_LABELS_ARRAY}
        recordItemNames={SETTING_ITEM_RECORD_ITEM_NAMES}
      />
    );
  }
}
export default ProductCategories;
