import React from 'react';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import CMSPage from '../../../components/CMSPage';
class Search extends React.Component {
  render() {
    return <CMSPage link="searchInstruction" langId={1} />;
  }
}

export default Search;
