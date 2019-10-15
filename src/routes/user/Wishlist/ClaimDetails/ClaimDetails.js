import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Claim from '../../../../components/User/Claim';
import ContentHeader from '../../../../components/User/ContentHeader';
import AddClaim from '../../../../components/User/AddClaim';
import Spinner from '../../../../components/User/Spinner';
import s from './ClaimDetails.css';
import { SERVER } from '../../constants';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import history from '../../../../history';
class ClaimDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.context.params.id,
      isLoading: false,
      claims: [
        {
          id: 1,
          orderId: 23,
          messageHtml: '<div><b>salam honey</b><h1>test</h1></div>',
          createdAt: '23/5/65',
          status: { value: 1, label: 'accepted' },
          customerName: 'abbas salkhorde',
          publisherName: 'kamal karegar',
        },
        {
          id: 2,
          orderId: 203,
          messageHtml:
            'asdjnaskcnejkdnasd;alidjnaslkdansmdljendasdkj.asdnas.dal',
          createdAt: '13/5/65',
          status: { value: 1, label: 'accepted' },
          customerName: 'abbas salkhorde',
          publisherName: 'kamal karegar',
        },
        {
          id: 1,
          orderId: 23,
          messageHtml:
            'asdjnaskcnejkdnasd;alidjnaslkdansmdljendasdkj.asdnas.dal',
          createdAt: '23/5/65',
          status: { value: 1, label: 'accepted' },
          customerName: 'abbas salkhorde',
          publisherName: 'kamal karegar',
        },
        {
          id: 2,
          orderId: 203,
          messageHtml:
            'asdjnaskcnejkdnasd;alidjnaslkdansmdljendasdkj.asdnas.dal',
          createdAt: '13/5/65',
          status: { value: 1, label: 'accepted' },
          customerName: 'abbas salkhorde',
          publisherName: 'kamal karegar',
        },
      ],
    };
    this.fetchClaims = this.fetchClaims.bind(this);
  }
  componentDidMount() {
    // this.fetchClaims();
  }

  onOrderClick(id) {
    history.push(`/user/publisherOrder/${id}`);
  }
  fetchClaims() {
    const url = `${SERVER}/getClaims`;
    this.setState({ isLoading: true });
    const credentials = {
      orderId: this.state.id,
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
        if (response.error === undefined) {
          that.setState({
            claims: response.publisherOrders,
            isLoading: false,
          });
        } else {
          toastr.error(response.error.title, response.error.description);
        }
      },
      () => {
        // toastr.error('sala', ERRORS.REPEATED_USER);
        // console.log('login e rror : ', error);
      },
    );
  }
  render() {
    let claims = <div>Nothing</div>;
    if (
      !this.state.isLoading &&
      this.state.claims !== undefined &&
      this.state.claims.length !== 0
    )
      claims = this.state.claims.map((claim, i) => (
        // orderId={this.state.customerOrderId}
        <Claim claim={claim} />
      ));
    return (
      <div>
        {' '}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div>
            <ContentHeader title="Claim List" hasSort={false} />
            <div className="row">
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
            <div className="row">
              <div className="col-12">
                <AddClaim orderId={this.state.claims[0].orderId} />
              </div>
            </div>
            <div className={` container-fluid`}>{claims}</div>
          </div>
        )}
      </div>
    );
  }
}
export default withStyles(s)(ClaimDetails);
