import React from 'react';
import toastr from 'react-redux-toastr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Claim from '../../../../components/User/Claim';
import ContentHeader from '../../../../components/User/ContentHeader';
import AddClaim from '../../../../components/User/AddClaim';
import cookie from 'react-cookies';
import Spinner from '../../../../components/User/Spinner';
import s from './ClaimDetails.css';
import { SERVER } from '../../constants';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import history from '../../../../history';
class ClaimDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: this.props.context.params.id,
      isLoading: true,
      claims: [],
    };
    this.fetchClaims = this.fetchClaims.bind(this);
  }
  componentDidMount() {
    this.setState({
      userId: cookie.load('id'),
    });
    this.fetchClaims();
  }

  onOrderClick(id) {
    history.push(`/user/publisherOrder/${id}`);
  }
  fetchClaims() {
    const url = `${SERVER}/getClaimCollection`;
    this.setState({ isLoading: true });
    const credentials = {
      publisherOrderId: this.state.orderId,
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
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
          that.setState({
            claims: response.claims,
            customerId: response.customerId,
            isLoading: false,
          });
        } else {
          toastr.error(response.error.title, response.error.description);
        }
      },
      error => {
        // toastr.error('sala', ERRORS.REPEATED_USER);
        console.log('claim error : ', error);
      },
    );
  }
  render() {
    let claims = <div>This Order Has No Claims Yet</div>;

    // window.alert(localStorage.getItem('TokenId'));
    if (
      !this.state.isLoading &&
      this.state.claims != undefined &&
      this.state.claims.length != 0
    )
      claims = this.state.claims.map((claim, i) => (
        // orderId={this.state.customerOrderId}
        <Claim claim={claim} userId={this.state.customerId} />
      ));
    return (
      <div>
        {' '}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div>
            <ContentHeader
              title={`Claim Messages for Claim `}
              hasSort={false}
            />
            <div className={` container-fluid ${s.mainContainer} `}>
              {claims}
            </div>
            <AddClaim
              orderId={this.state.orderId}
              reloadOnAdd={this.fetchClaims}
            />
            <div className={`row`}>
              <div className="offset-xl-10 col-xl-2">
                {' '}
                <button
                  data-toggle="modal"
                  data-target="#claimModal"
                  className={`btn ${s.addBtn}`}
                >
                  Add Claim
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withStyles(s)(ClaimDetails);
