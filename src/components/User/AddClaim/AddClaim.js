import React from 'react';
import toastr from 'react-redux-toastr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Select from 'react-select';
import RichText from '../../../components/RichText';
import PropTypes from 'prop-types';
import s from './AddClaim.css';
import { SERVER } from '../../../constants/constantData';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';

class AddAddress extends React.Component {
  static propTypes = {
    orderId: PropTypes.number.isRequired,
    reloadOnAdd: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      newClaim: {
        orderId: this.props.orderId,
        messageHtml: {
          value: '',
          label: '',
          missingNo: '',
          wrongNo: '',
          brokenNo: '',
          content: '',
        },
      },
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.addClaim = this.addClaim.bind(this);
    this.claimTypeChange = this.claimTypeChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }
  claimTypeChange(se) {
    let oldState = this.state.newClaim;
    oldState.messageHtml.value = se.value;
    oldState.messageHtml.label = se.label;
    this.setState({
      newClaim: oldState,
    });
  }
  onInputChange(e) {
    let oldState = this.state.newClaim;
    oldState.messageHtml[e.target.name] = e.target.value;
    this.setState({
      newClaim: oldState,
    });
  }
  addClaim() {
    const url = `${SERVER}/addClaimByCustomerOrPublisher`;
    const credentials = {
      publisherOrderId: this.props.orderId,
      senderUserId: parseInt(localStorage.getItem('id')),
      messageHtml: JSON.stringify(this.state.newClaim.messageHtml),
    };
    // window.alert(JSON.stringify(this.state.newClaim.messageHtml));
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
          // toastr.success('', 'Order Added Successfully');
          // window.alert('okay');
          // document.getElementById('claimModal').classList.remove('show');
          // document.getElementById('claimModal').style.display = 'none';

          that.props.reloadOnAdd();
        } else {
          window.alert(response.error.description);
          toastr.error(response.error.title, response.error.description);
        }
      },
      error => {
        window.alert(error);
        // toastr.error('sala', ERRORS.REPEATED_USER);
        // console.log('login e rror : ', error);
      },
    );
  }

  handleEditorChange(e) {
    let oldState = this.state.newClaim;
    oldState.messageHtml.content = e.target.getContent();
    this.setState({ newClaim: oldState });
  }

  render() {
    // window.alert('hi', JSON.stringify(this.state.newClaim.messageHtml));
    let options = [
      { value: 1, label: 'I have not recieved any number' },
      { value: 2, label: 'I have not recieved some of the numbers' },
      { value: 3, label: 'I have recieved wrong numbers' },
      { value: 4, label: 'I have recieved damaged issues' },
      { value: 5, label: 'Criticism and explanation' },
      { value: 6, label: 'Other' },
    ];
    const missingNo = (
      <div className="row mb-3">
        <div className="col-xl-3 col-lg-4 col-md-6">
          Please Enter missing numbers :{' '}
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6">
          <input
            className={s.input}
            name="missingNo"
            value={this.state.newClaim.messageHtml.missingNo}
            onChange={e => this.onInputChange(e)}
          />
        </div>
      </div>
    );
    const wrongNo = (
      <div className="row mb-3">
        <div className="col-xl-5 col-lg-5 col-md-6">
          Please Enter wrong numbers you have recieved :{' '}
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6">
          <input
            className={s.input}
            name="wrongNo"
            value={this.state.newClaim.messageHtml.wrongNo}
            onChange={e => this.onInputChange(e)}
          />
        </div>
      </div>
    );
    const brokenIssue = (
      <div className="row mb-3">
        <div className="col-xl-5 col-lg-5 col-md-6">
          Please Enter numbers of the damaged issues :{' '}
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6">
          <input
            className={s.input}
            name="brokenNo"
            value={this.state.newClaim.messageHtml.brokenNo}
            onChange={e => this.onInputChange(e)}
          />
        </div>
      </div>
    );
    let toDisplay = '';
    if (this.state.newClaim.messageHtml.value == 2) toDisplay = missingNo;
    else if (this.state.newClaim.messageHtml.value == 3) toDisplay = wrongNo;
    else if (this.state.newClaim.messageHtml.value == 4)
      toDisplay = brokenIssue;

    return (
      <div class="card-body">
        <div>
          <div
            class="modal fade"
            id="claimModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="claimModalLabel"
            aria-hidden="true"
          >
            <div class={`${s.modal} modal-dialog`} role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="claimModalLabel">
                    Add Claim{' '}
                  </h5>
                  <a
                    href="#"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </a>
                </div>
                <div class="modal-body ml-1 ">
                  <div className="row mb-2">
                    <div className="col-xl-3 ">please choose a problem :</div>
                    <div className="col-xl-5">
                      <Select
                        options={options}
                        onChange={this.claimTypeChange}
                      />
                    </div>
                  </div>
                  {toDisplay}
                  <div className="row mb-3">
                    <div className="col-12">
                      You can leave your message here :{' '}
                    </div>
                  </div>
                  <div className="row mb-3 ">
                    <div className="col-12">
                      {' '}
                      <RichText
                        min_height={300}
                        width="100%"
                        initialValue="Claim message ..."
                        handleEditorChange={this.handleEditorChange}
                      />
                    </div>
                  </div>
                </div>
                <div class="modal-footer addInputContainer">
                  <button
                    data-dismiss="modal"
                    href="#"
                    class={`btn ${s.addBtn}`}
                    onClick={this.addClaim}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AddAddress);
