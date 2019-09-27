import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ContentHeader from '../../../components/User/ContentHeader';
import Table from '../../../components/User/Table';
import s from './AddressBook.css';
class AddressBook extends React.Component {
  render() {
    return (
      <div>
        <ContentHeader title="Address List" hasSort={true} />
        <Table
          columnLabels={['Address1', 'Address2', 'Zip Code', 'City', 'Country']}
          records={[
            { id: 1, address1: 2 },
            { id: 1, address1: 2 },
            { id: 1, address1: 2 },
            { id: 1, address1: 2 },
            { id: 1, address1: 2 },
            { id: 1, address1: 2 },
          ]}
          recordItemNames={['id', 'address1', 'address2', 'country', 'city']}
        />
        <div className="row">
          <div className="col-12">
            <div class="card-body">
              <div>
                <div
                  class="modal fade"
                  id="addressModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="addressModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
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
                      <div class="modal-body">
                        <div className="row mb-3">
                          <div className="col-xl-3 float-right">
                            Address1* :{' '}
                          </div>
                          <div className="col-xl-7">
                            <input />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-xl-3">Address2 : </div>
                          <div className="col-xl-4">
                            <input />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-xl-3">Zip Code : </div>
                          <div className="col-xl-4">
                            <input />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-xl-3">State : </div>
                          <div className="col-xl-4">
                            <input />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-xl-3">Country : </div>
                          <div className="col-xl-4">
                            <input />
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
