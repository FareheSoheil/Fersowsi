/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import ProductCard from '../../../components/Admin/ProductCard';
// import ProductSideFilter from '../../../components/Admin/ProductSideFilter';

import s from './ProfileDetail.css';

class ProfileDetail extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: 'faree', //
        lastName: 'soheil', //
        contractName: '',
        phoneNumber: '', //
        mobileNumber: '', //
        faxNumber: '', //
        homepage: '', //
        VatId: '', //
        dateOfBirth: '',
        psn: '', //
        discount: '',
        userCategory: {
          value: 'id of the   userCategory',
          label: 'name of the userCategory (string)',
        },
        userSubCategory: {
          value: 'id of the  userSubCategory',
          label: 'name of the userSubCategory (string)',
        },
        userActivitionStatus: {
          value: 'id of the   userActivitionStatus',
          label: 'name of the userActivitionStatus (string)',
        },
        currency: 'pppppp',
        language: {
          value: 'id of the  language',
          label: 'name of the language (string)',
        },
        job: {
          value: 'id of the  job',
          label: 'name of the job (string)',
        },
        email: '', //
        username: '',
        password: '',
        emailConfirmed: '',
        profilePic: '/assets/images/bitbucket.png', //
        bio: '',
        createdAt: 'datetime',
        updatedAt: 'datetime',
      },
    };
  }
  componentDidMount() {}
  render() {
    return (
      <div class="influence-profile">
        <div class="container-fluid dashboard-content ">
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="page-header">
                <h3 class="mb-2">User Details </h3>
                <div class="page-breadcrumb">
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item">
                        <a href="/admin/accounts" class="breadcrumb-link">
                          Accounts
                        </a>
                      </li>
                      <li class="breadcrumb-item active" aria-current="page">
                        User Profile Details
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div class="col-xl-4 col-lg-3 col-md-5 col-sm-12 col-12">
              {/* user profile  */}
              <div class="card">
                <div class="card-body">
                  <div class="user-avatar text-center d-block">
                    <img
                      src={this.state.user.profilePic}
                      alt="User Avatar"
                      class="rounded-circle user-avatar-xxl"
                    />
                  </div>

                  <div class="text-center">
                    <h2 class="font-24 mb-2" />
                    <h4 class="font-24 mb-2">
                      <form>
                        <div class="form-group">
                          <input
                            id="inputSmall"
                            type="text"
                            class="form-control form-control-sm"
                            value={this.state.user.firstName}
                          />
                        </div>
                        <div class="form-group">
                          <input
                            id="inputSmall"
                            type="text"
                            class="form-control form-control-sm"
                            value={this.state.user.lastName}
                          />
                        </div>
                      </form>
                    </h4>
                    <p>{this.state.user.userCategory.label}</p>
                  </div>
                </div>
                <div class="card-body border-top">
                  <h3 class="font-16">User Information</h3>
                  <div class="">
                    <ul class="list-unstyled mb-0">
                      <li class="mb-3">
                        <form>
                          <div class="form-group">
                            <i class="fas fa-fw fa-envelope mr-2" />
                            <input
                              id="inputSmall"
                              type="text"
                              class="form-control form-control-sm inlineInput"
                              value={this.state.user.email}
                            />
                          </div>
                          <div class="form-group">
                            <i
                              class="fas fa-fw fa-phone mr-2"
                              data-toggle="tooltip"
                              title="phone number"
                            />
                            <input
                              id="inputSmall"
                              type="text"
                              class="form-control form-control-sm inlineInput"
                              value={this.state.user.phoneNumber}
                            />
                          </div>
                          <div class="form-group">
                            <i
                              class="fas fa-fax mr-2"
                              data-toggle="tooltip"
                              title="fax number"
                            />&nbsp;
                            <input
                              id="inputSmall"
                              type="text"
                              class="form-control form-control-sm inlineInput"
                              value={this.state.user.faxNumber}
                            />
                          </div>
                          <div class="form-group">
                            <i
                              class="fas fa-mobile-alt mr-3"
                              data-toggle="tooltip"
                              title="mobile number"
                            />
                            <input
                              id="inputSmall"
                              type="text"
                              class="form-control form-control-sm inlineInput"
                              value={this.state.user.mobileNumber}
                            />
                          </div>
                        </form>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="card-body border-top">
                  <h5>PSN : {this.state.user.psn}</h5>
                  <h5>Vat Id : {this.state.user.VatId}</h5>
                </div>
                <div class="card-body border-top">
                  <h3 class="font-16">Home page</h3>
                  <div class="">
                    <ul class="mb-0 list-unstyled">
                      <li class="mb-1">
                        <a href="#">
                          <i class="fab fa-fw fa-facebook-square mr-1 facebook-color" />fb.me/michaelchristy
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="card-body border-top">
                  <h3 class="font-16">Category</h3>
                  <div>
                    <a href="#" class="badge badge-light mr-1">
                      Fitness
                    </a>
                    <a href="#" class="badge badge-light mr-1">
                      Life Style
                    </a>
                    <a href="#" class="badge badge-light mr-1">
                      Gym
                    </a>
                  </div>
                </div>
              </div>
              {/* end user profile */}
            </div>
            {/* Campaing data */}
            <div class="col-xl-8 col-lg-9 col-md-7 col-sm-12 col-12">
              <div class="influence-profile-content pills-regular">
                <ul
                  class="nav nav-pills mb-3 nav-justified"
                  id="pills-tab"
                  role="tablist"
                >
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      id="pills-info-tab"
                      data-toggle="pill"
                      href="#pills-info"
                      role="tab"
                      aria-controls="pills-info"
                      aria-selected="false"
                    >
                      Additional Information
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="pills-claims-tab"
                      data-toggle="pill"
                      href="#pills-claims"
                      role="tab"
                      aria-controls="pills-claims"
                      aria-selected="false"
                    >
                      Claims
                    </a>
                  </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                  <div
                    class="tab-pane show fade active"
                    id="pills-info"
                    role="tabpanel"
                    aria-labelledby="pills-info-tab"
                  >
                    <div class="card">
                      <h5 class="card-header">Campaign Reviews</h5>
                      <div class="card-body">
                        <div class="review-block">
                          <p class="review-text font-italic m-0">
                            “Quisque lobortis vestibulum elit, vel fermentum
                            elit pretium et. Nullam id ultrices odio. Cras id
                            nulla mollis, molestie diam eu, facilisis tortor.
                            Mauris ultrices lectus laoreet commodo hendrerit.
                            Nullam varius arcu sed aliquam imperdiet. Etiam ut
                            luctus augue.”
                          </p>
                          <div class="rating-star mb-4">
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                          </div>
                          <span class="text-dark font-weight-bold">
                            Tabitha C. Campbell
                          </span>
                          <small class="text-mute"> (Company name)</small>
                        </div>
                      </div>
                      <div class="card-body border-top">
                        <div class="review-block">
                          <p class="review-text font-italic m-0">
                            “Maecenas rutrum viverra augue. Nulla in eros vitae
                            ante ullamcorper congue. Praesent tristique massa ac
                            arcu dapibus tincidunt. Mauris arcu mi, lacinia et
                            ipsum vel, sollicitudin laoreet risus.”
                          </p>
                          <div class="rating-star mb-4">
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                          </div>
                          <span class="text-dark font-weight-bold">
                            Luise M. Michet
                          </span>
                          <small class="text-mute"> (Company name)</small>
                        </div>
                      </div>
                      <div class="card-body border-top">
                        <div class="review-block">
                          <p class="review-text font-italic m-0">
                            “ Cras non rutrum neque. Sed lacinia ex elit, vel
                            viverra nisl faucibus eu. Aenean faucibus neque
                            vestibulum condimentum maximus. In id porttitor
                            nisi. Quisque sit amet commodo arcu, cursus pharetra
                            elit. Nam tincidunt lobortis augueat euismod ante
                            sodales non. ”
                          </p>
                          <div class="rating-star mb-4">
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                          </div>
                          <span class="text-dark font-weight-bold">
                            Gloria S. Castillo
                          </span>
                          <small class="text-mute"> (Company name)</small>
                        </div>
                      </div>
                      <div class="card-body border-top">
                        <div class="review-block">
                          <p class="review-text font-italic m-0">
                            “Vestibulum cursus felis vel arcu convallis, viverra
                            commodo felis bibendum. Orci varius natoque
                            penatibus et magnis dis parturient montes, nascetur
                            ridiculus mus. Proin non auctor est, sed lacinia
                            velit. Orci varius natoque penatibus et magnis dis
                            parturient montes nascetur ridiculus mus.”
                          </p>
                          <div class="rating-star mb-4">
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                          </div>
                          <span class="text-dark font-weight-bold">
                            Virgina G. Lightfoot
                          </span>
                          <small class="text-mute"> (Company name)</small>
                        </div>
                      </div>
                      <div class="card-body border-top">
                        <div class="review-block">
                          <p class="review-text font-italic m-0">
                            “Integer pretium laoreet mi ultrices tincidunt.
                            Suspendisse eget risus nec sapien malesuada
                            ullamcorper eu ac sapien. Maecenas nulla orci,
                            varius ac tincidunt non, ornare a sem. Aliquam sed
                            massa volutpat, aliquet nibh sit amet, tincidunt ex.
                            Donec interdum pharetra dignissim.”
                          </p>
                          <div class="rating-star mb-4">
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                            <i class="fa fa-fw fa-star" />
                          </div>
                          <span class="text-dark font-weight-bold">
                            Ruby B. Matheny
                          </span>
                          <small class="text-mute"> (Company name)</small>
                        </div>
                      </div>
                    </div>
                    <nav aria-label="Page navigation example">
                      <ul class="pagination">
                        <li class="page-item">
                          <a class="page-link" href="#">
                            Previous
                          </a>
                        </li>
                        <li class="page-item">
                          <a class="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li class="page-item active">
                          <a class="page-link " href="#">
                            2
                          </a>
                        </li>
                        <li class="page-item">
                          <a class="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li class="page-item">
                          <a class="page-link" href="#">
                            Next
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-claims"
                    role="tabpanel"
                    aria-labelledby="pills-claims-tab"
                  >
                    <div class="card">
                      <h5 class="card-header">Send Messages</h5>
                      <div class="card-body">
                        <form>
                          <div class="row">
                            <div class="offset-xl-3 col-xl-6 offset-lg-3 col-lg-3 col-md-12 col-sm-12 col-12 p-4">
                              <div class="form-group">
                                <label for="name">Your Name</label>
                                <input
                                  type="text"
                                  class="form-control form-control-lg"
                                  id="name"
                                  placeholder=""
                                />
                              </div>
                              <div class="form-group">
                                <label for="email">Your Email</label>
                                <input
                                  type="email"
                                  class="form-control form-control-lg"
                                  id="email"
                                  placeholder=""
                                />
                              </div>
                              <div class="form-group">
                                <label for="subject">Subject</label>
                                <input
                                  type="text"
                                  class="form-control form-control-lg"
                                  id="subject"
                                  placeholder=""
                                />
                              </div>
                              <div class="form-group">
                                <label for="messages">Messgaes</label>
                                <textarea
                                  class="form-control"
                                  id="messages"
                                  rows="3"
                                />
                              </div>
                              <button
                                type="submit"
                                class="btn btn-primary float-right"
                              >
                                Send Message
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProfileDetail);
