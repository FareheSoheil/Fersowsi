import React from 'react';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import CMSPage from '../../../components/CMSPage';
class ContactUs extends React.Component {
  // constructor(props){
  //     super(props);
  //     this.state = {
  //         cms:'',
  //         isLoading:true,

  //     }
  // }

  render() {
    return <CMSPage link="contactUs" langId={1} />;
  }
}

export default ContactUs;
