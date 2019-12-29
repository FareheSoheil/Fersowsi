import React from 'react';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import CMSPage from '../../../components/CMSPage';
class Offices extends React.Component {
  render() {
    return <CMSPage link="offices" langId={1} />;
  }
}

export default Offices;
