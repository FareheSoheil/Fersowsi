import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import SettingItem from '../../../../components/SettingItem';
import s from './AgeGroups.css';

class AgeGroups extends React.Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
  };
  render() {
    return (
      <SettingItem
        fetchUrl="PropTypes.string.isRequired"
        editUrl="PropTypes.string.isRequired"
        addUrl="PropTypes.string.isRequired"
        cardTitle="Age Groups"
        modalTitle="Age Group"
      />
    );
  }
}
export default withStyles(s)(AgeGroups);
