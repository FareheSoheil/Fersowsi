import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ContentHeader from '../../../components/User/ContentHeader';
import Select from 'react-select';
import history from '../../../history';
import Table from '../../../components/User/Table';
import s from './AddressBook.css';
class AddressBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
      ],
    };
    this.goTo = this.goTo.bind(this);
  }
  goTo(id) {
    history.push(`/user/address/${id}`);
  }
  render() {
    return (
      <div>
        <ContentHeader title="Address List" hasSort={true} />
        <Table
          columnLabels={['Address1', 'Address2', 'Zip Code', 'City', 'Country']}
          records={this.state.records}
          recordItemNames={['id', 'address1', 'address2', 'country', 'city']}
          onRecordClick={this.goTo}
        />
        <div className="row">
          <div className="col-12">
            <div class="card-body">
              <div>
                <div
                  class="modal fade "
                  id="addressModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="addressModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content user-modal">
                      <div class="modal-header add-modal-header">
                        <h5 class="modal-title" id="addressModalLabel">
                          Add Address{' '}
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
                      <div class="modal-body add-modal">
                        <div className="row mb-3">
                          <div className="col-xl-3 float-right">
                            Address1* &nbsp;:
                          </div>
                          <div className="col-xl-7">
                            <div className="from-group">
                              {' '}
                              <input
                                class="form-control form-control-sm"
                                type=""
                                name=""
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-xl-3">Address2 &nbsp; : </div>
                          <div className="col-xl-7">
                            <div className="from-group">
                              {' '}
                              <input
                                class="form-control form-control-sm"
                                type=""
                                name=""
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-xl-3">
                            Zip Code &nbsp;&nbsp;&nbsp;:{' '}
                          </div>
                          <div className="col-xl-7">
                            <div className="from-group">
                              {' '}
                              <input
                                class="form-control form-control-sm"
                                type=""
                                name=""
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-xl-3">
                            City &nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{' '}
                          </div>
                          <div className="col-xl-7">
                            <div className="from-group">
                              {' '}
                              <input
                                style={{ outline: 'none' }}
                                class="form-control form-control-sm"
                                type=""
                                name=""
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-xl-3">
                            State
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{' '}
                          </div>
                          <div className="col-xl-7">
                            <div className="from-group">
                              {' '}
                              <input
                                class="form-control form-control-sm"
                                type=""
                                name=""
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-xl-3">
                            Country &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{' '}
                          </div>
                          <div className="col-xl-7">
                            <div className="from-group">
                              {' '}
                              <Select
                                // class="form-control form-control-sm"
                                // type=""
                                name=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <a
                          data-dismiss="modal"
                          href="#"
                          class="btn btn-info"

                          // onClick={() => this.modifyComment('accept')}
                        >
                          Add
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            {' '}
            <button
              data-toggle="modal"
              data-target="#addressModal"
              className={`float-right btn ${s.addBtn}`}
            >
              Add Address
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(AddressBook);
