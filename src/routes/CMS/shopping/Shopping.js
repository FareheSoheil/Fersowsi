import React from 'react';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import CMSPage from '../../../components/CMSPage';
class Shopping extends React.Component {
  render() {
    return <CMSPage link="shoppingInstruction" langId={1} />;
  }
}

export default Shopping;
