import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import RichText from '../../../components/RichText';
import PropTypes from 'prop-types';
import s from './AddClaim.css';
import { SERVER, MESSAGE_STATUS } from '../../../constants/constantData';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';

class AddAddress extends React.Component {
  static propTypes = {
    orderId: PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      newClaim: {
        orderId: this.props.orderId,
        status: MESSAGE_STATUS.pending,
        messageHtml: '',
      },
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.addClaim = this.addClaim.bind(this);
  }
  addClaim() {
    const url = `${SERVER}/addClaim`;
    const credentials = {
      orderId: this.props.orderId,
      messageHtml: this.state.messageHtml,
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
            orderId: this.props.orderId,
            status: MESSAGE_STATUS.pending,
            messageHtml: '',
          });
          toastr.success('Order Added Successfully');
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

  handleEditorChange(e) {
    console.log('Content was updated:', e.target.getContent());
    this.setState({ messageHtml: e.target.getContent() });
  }

  render() {
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
                <div class="modal-body ml-1 addInputContainer">
                  <div className="row mb-3 ">
                    <div className="col-12">
                      {' '}
                      <RichText
                        min_height={300}
                        width="100%"
                        initialValue="new claim ..."
                        handleEditorChange={this.handleEditorChange}
                      />
                    </div>
                    {/* <div className="col-xl-3 ">
                      <span>Claim Message :</span>{' '}
                    </div>
                    <div className="col-xl-7">
                      <textarea
                        className={s.textArea}
                        rows="7"
                        cols="35"
                        name="messageHtml"
                        value={this.state.newClaim.messageHtml}
                        onChange={this.handleInputChange}
                      />
                    </div> */}
                  </div>
                </div>
                <div class="modal-footer addInputContainer">
                  <button
                    data-dismiss="modal"
                    href="#"
                    class="btn btn-info"
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
