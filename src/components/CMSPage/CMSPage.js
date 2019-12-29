import React from 'react';
import { fetchWithTimeOut } from '../../fetchWithTimeout';
import { SERVER } from '../../constants/constantData';
import Spinner from '../../components/User/Spinner';
import { tr } from 'date-fns/locale';
class CMSPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cms: '',
      isLoading: true,
    };
    this.getContent = this.getContent.bind(this);
  }
  componentDidMount() {
    this.getContent();
  }
  getContent() {
    const url = `${SERVER}/getCMS`;
    this.setState({
      isLoading: true,
    });
    const cred = {
      link: this.props.link,
      languageId: this.props.langId,
    };
    const ops = {
      method: 'POST',
      body: JSON.stringify(cred),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const that = this;
    fetchWithTimeOut(
      url,
      ops,
      data => {
        if (data.error == undefined) {
          that.setState({
            cms: data,
            isLoading: false,
          });
          document.getElementById('content').innerHTML = data.htmlContent;
        } else {
          toastr.error('', data.message);
        }
      },
      error => {
        toastr.error('', "Couldn'nt Load CMS");
      },
    );
  }
  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div>
            <h3>{this.state.cms.title}</h3>
            <div id="content" />
          </div>
        )}
      </div>
    );
  }
}

export default CMSPage;
