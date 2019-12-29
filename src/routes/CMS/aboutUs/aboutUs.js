import React from 'react';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import CMSPage from '../../../components/CMSPage';
class AboutUs extends React.Component {
  // constructor(props){
  //     super(props);
  //     this.state = {
  //         cms:'',
  //         isLoading:true,

  //     }
  // }

  render() {
    return <CMSPage link="aboutUs" langId={1} />;
  }
}

export default AboutUs;
