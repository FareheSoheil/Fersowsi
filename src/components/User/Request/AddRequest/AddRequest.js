import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import Select from 'react-select';
import s from './AddRequest.css';
import { SERVER } from '../../../../constants';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
// import {fe}

class AddRequest extends React.Component {
  static propTypes = {
    countries: PropTypes.array.isRequired,
    addFunc: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      newRequest: {
        name: '',
        category: {},
        ageGroup: {},
        language: {},
        period: {},
        details: '',
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.AddRequest = this.AddRequest.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  AddRequest() {
    const url = `${SERVER}/AddRequestOfSpecificUser`;

    const credentials = {
      name: this.state.newRequest.name,
      category: this.state.newRequest.category,
      ageGroup: this.state.newRequest.ageGroup,
      language: this.state.newRequest.language,
      period: this.state.newRequest.period,
      details: this.state.newRequest.details,
    };
    // window.alert(JSON.stringify(this.state.newRequest.country.value));
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
        window.alert(response.message);
        if (response.error === undefined) {
          that.setState(
            {
              newAddress: {
                detailAddress: '',
                zipCode: '',
                city: '',
                province: '',
                country: '',
              },
            },
            () => {
              this.props.callBack();
            },
          );
          toastr.success('Address Added Successfully');
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
  handleInputChange(event) {
    const state = event.target.name;
    const value = event.target.value;
    let newAddress = { ...this.state.newRequest };
    newAddress[state] = value;
    this.setState({ newAddress });
  }
  handleSelectChange = (selectedOption, op) => {
    let newAddress = { ...this.state.newRequest };
    newAddress[op] = selectedOption;
    this.setState({ newAddress });
  };
  render() {
    return (
      <div class="card-body">
        <div>
          <div
            class="modal fade"
            id="requestModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="requestModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="requestModalLabel">
                    Add Request{' '}
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
                <div class="modal-body ml-5 addInputContainer">
                  <div className="row mb-3 ">
                    <div className="col-xl-3 ">
                      <span>Name :</span>{' '}
                    </div>
                    <div className="col-xl-7">
                      <input
                        name="name"
                        value={this.state.newRequest.name}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xl-3">
                      <span>Category* :</span>{' '}
                    </div>
                    <div className="col-xl-7">
                      <Select
                        options={this.props.categories}
                        onChange={so => this.handleSelectChange(so, 'category')}
                        value={this.state.newRequest.category}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xl-3">
                      <span>Language* :</span>{' '}
                    </div>
                    <div className="col-xl-7">
                      <Select
                        options={this.props.languages}
                        onChange={so => this.handleSelectChange(so, 'language')}
                        value={this.state.newRequest.language}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xl-3">
                      <span>Age Group* :</span>{' '}
                    </div>
                    <div className="col-xl-7">
                      <Select
                        options={this.props.languages}
                        onChange={so => this.handleSelectChange(so, 'language')}
                        value={this.state.newRequest.language}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xl-3">
                      <span>Periodical* :</span>{' '}
                    </div>
                    <div className="col-xl-7">
                      <Select
                        options={this.props.periods}
                        onChange={so => this.handleSelectChange(so, 'period')}
                        value={this.state.newRequest.period}
                      />
                    </div>
                  </div>
                  <div className="row mb-3 ">
                    <div className="col-xl-3 ">
                      <span>More Details :</span>{' '}
                    </div>
                    <div className="col-xl-7">
                      <textarea
                        rows="5"
                        className={s.textArea}
                        name="details"
                        value={this.state.newRequest.details}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div class="modal-footer addInputContainer">
                  <button
                    data-dismiss="modal"
                    href="#"
                    class="btn btn-info"
                    onClick={this.AddRequest}
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

export default withStyles(s)(AddRequest);
