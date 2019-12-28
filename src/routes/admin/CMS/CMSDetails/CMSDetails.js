import React from 'react';
import { toastr } from 'react-redux-toastr';
import CMSItem from '../../../../components/Admin/CMS/CMSItem';
import PageHeader from '../../../../components/Admin/PageHeader';
import Spinner from '../../../../components/Admin/Spinner';
import { SERVER } from '../../../../constants/constantData';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
class CMSDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: this.props.context.params.lt.split('&')[0],
      languageId: this.props.context.params.lt.split('&')[1],
      id: this.props.context.params.lt.split('&')[2],
      isLoading: true,
      cms: '',
      langs: '',
    };
    this.fetchCMS = this.fetchCMS.bind(this);
    this.fetchCountries = this.fetchCountries.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onLangChange = this.onLangChange.bind(this);
    this.editCMS = this.editCMS.bind(this);

    // this.add = this.add.bind(this);
  }
  componentDidMount() {
    this.fetchCMS();
    this.fetchCountries();
  }
  fetchCMS() {
    const url = `${SERVER}/getCMS`;
    this.setState({
      isLoading: true,
    });
    const cred = {
      htmlContent: this.state.htmlContent,
      link: this.state.link,
      isActive: true,
      languageId: parseInt(this.state.languageId),
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(cred),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const that = this;

    fetchWithTimeOut(
      url,
      options,
      response => {
        if (response.error == undefined) {
          that.setState(
            {
              cms: response,
              isLoading: false,
            },
            () => {
              console.log('response : ', response);
            },
          );
        } else {
          window.alert(response.error.description);
          toastr.error(response.error.title, response.error.description);
        }
      },
      error => {
        console.log(error);
        toastr.error('Add CMS', 'Could not Add CMS');
      },
    );
  }
  editCMS() {
    const url = `${SERVER}/editCMS`;
    const cred = {
      id: this.state.id,
      title: this.state.cms.title,
      htmlContent: this.state.htmlContent,
      link: this.state.link,
      isActive: true,
      siteLanguageId: parseInt(this.state.languageId),
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(cred),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const that = this;

    fetchWithTimeOut(
      url,
      options,
      response => {
        if (response.error == undefined)
          toastr.success('Edit CMS', response.message);
        else toastr.error(response.error.title, response.error.description);
      },

      error => {
        console.log(error);
        toastr.error('Add CMS', 'Could not Add CMS');
      },
    );
  }
  onInputChange(e) {
    let pres = this.state.cms;
    pres[e.target.name] = e.target.value;
    this.setState(
      {
        cms: pres,
      },
      () => {
        console.log(this.state.cms);
      },
    );
  }
  onLangChange(so) {
    let pres = this.state.cms;
    pres.SiteLanguage = so;
    this.setState({
      cms: pres,
    });
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
  onContentChange(e) {
    let pres = this.state.cms;
    pres.htmlContent = e.target.getContent();
    this.setState({
      cms: pres,
    });
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
            { link: '', label: 'Edit CMS' },
          ]}
        />
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <CMSItem
            alllanguages={this.state.langs}
            isForAdd={false}
            cms={this.state.cms}
            onLangChange={this.onLangChange}
            onContentChange={this.onContentChange}
            onInputChange={this.onInputChange}
            save={this.editCMS}
          />
        )}
      </div>
    );
  }
}
export default CMSDetails;
