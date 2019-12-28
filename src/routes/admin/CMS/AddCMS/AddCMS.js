import React from 'react';
import CMSItem from '../../../../components/Admin/CMS/CMSItem';
import PageHeader from '../../../../components/Admin/PageHeader';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import { SERVER } from '../../../../constants/constantData';
class AddCMS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      langs: '',
    };
    this.fetchCountries = this.fetchCountries.bind(this);
  }
  componentDidMount() {
    this.fetchCountries();
  }
  fetchCountries() {
    const auxUrl = `${SERVER}/getAuxInfoForAll`;
    const auxOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const that = this;
    fetchWithTimeOut(
      auxUrl,
      auxOptions,
      auxResponse => {
        // window.alert('all fetched');
        that.setState(
          {
            langs: auxResponse.SiteLanguage,
          },
          () => {
            console.log('auxResponse : ', auxResponse);
          },
        );
      },
      error => {
        console.log(error);
      },
    );
  }
  render() {
    return (
      <div className="container-fluid dashboard-content">
        <PageHeader
          title="Publisher Order Details"
          breadCrumbs={[
            {
              link: '/admin/cms',
              label: 'CMS List',
            },
            { link: '', label: 'Add CMS' },
          ]}
        />
        <CMSItem isForAdd={true} alllanguages={this.state.langs} />
      </div>
    );
  }
}
export default AddCMS;
