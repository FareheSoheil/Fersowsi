import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { SERVER, AVATAR } from '../../../constants';
import { USER_SUBCATEGORY } from '../../../constants/constantData';
import cookie from 'react-cookies';
import Spinner from '../../../components/User/Spinner';
import CustomTable from '../../../components/CustomTabel';
import { ADDRESS_TABLE_LABELS, ADDRESS_RECORD_ITEMS } from '../constants';
import history from '../../../history';
import s from './Profile.css';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      id: this.props.context.params.id,
      user: {
        id: 2,

        firstName: '',
        lastName: '',
        username: '',
        contractName: '',
        phoneNumber: '',
        mobileNumber: '',
        faxNumber: '',
        homepage: '',
        VatId: '',
        email: '',
        dateOfBirth: new Date(),
        psn: '',
        discount: '',
        emailConfirmed: true,
        profilePic: AVATAR,
        bio: '',
        claims: '',
        createdAt: '',
        updatedAt: '',

        // pro info
        role: {},
        country: {},
        currency: {},
        userSubCategory: {},
        userActivitionStatus: {},
        siteLanguage: {},
        job: {},
      },
      addresses: [],
    };
    this.fetchUser = this.fetchUser.bind(this);
    this.fetUserOtherInfo = this.fetUserOtherInfo.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.handleUploadedImage = this.handleUploadedImage.bind(this);
  }
  componentDidMount() {
    // this.setState({ isLoading: false });
    this.fetUserOtherInfo();
    this.fetchUser();
  }

  fetchUser() {
    const url = `${SERVER}/getProfileOfSepecificUser`;
    this.setState({ isLoading: true });
    const credentials = {
      userId: cookie.load(''),
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
            user: response.user,
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
  fetUserOtherInfo() {
    const url = `${SERVER}/getAuxInfoForOneUser`;
    this.setState({ isLoading: true });

    const options = {
      method: 'POST',
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
            addresses: response.addresses,
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
  onChangeInput(event) {
    const state = event.target.name;
    const value = event.target.value;

    let user = { ...this.state.user };
    user[state] = value;
    this.setState({ user: user });
  }
  onAddressClick(id) {
    history.push(`/user/address/${id}`);
  }
  uploadImage() {
    document.getElementById('fileInput').click();
  }
  handleUploadedImage() {
    let inp = document.getElementById('fileInput');
    let imgContainer = document.getElementById('detailsAvatar');
    let reader = new FileReader();
    let that = this;
    if (inp.files && inp.files[0]) {
      reader.onload = function(e) {
        imgContainer.src = e.target.result;
        that.setState({
          profilePic: e.target.result,
        });
      };
      let imgt = reader.readAsDataURL(inp.files[0]);
    }
  }
  render() {
    return (
      <div>
        {' '}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div>
            <div className="row">
              <div className="offset-xl-9 col-xl-3">
                <div className={s.imgContainer}>
                  <img
                    src={
                      this.state.user.profilePic === null
                        ? AVATAR
                        : this.state.user.profilePic
                    }
                    alt="User Avatar"
                    id="detailsAvatar"
                    className={`rounded-circle user-avatar-xxl ${s.avatar}`}
                  />

                  <div>
                    <input
                      onChange={this.handleUploadedImage}
                      style={{ display: 'none' }}
                      type="file"
                      id="fileInput"
                      name="fileInput"
                    />
                  </div>
                  <button onClick={this.uploadImage}>Upload Image</button>
                </div>
              </div>
            </div>
            {/* General */}
            <div className={s.card}>
              <div className={s.banner}>
                <h3>General Info</h3>
              </div>
              <div className={s.mainContainer}>
                {cookie.load('userSubCategory') !== USER_SUBCATEGORY.Single ? (
                  <div className="row mb-3">
                    <div className="col-xl-12">
                      <div className="row">
                        <div className="col-2">
                          <label>Institution Name</label>
                        </div>
                        <div className="col-5">
                          <input
                            name="contractName"
                            value={this.state.user.contractName}
                            onChange={e => this.onChangeInput(e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="row mb-3">
                    <div className="col-xl-12">
                      <div className="row">
                        <div className="col-2">
                          <label>Contact</label>
                        </div>
                        <div className="col-5">
                          <input
                            name="firstName"
                            value={`${this.state.user.firstName}  ${
                              this.state.lastName
                            }`}
                            onChange={e => this.onChangeInput(e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="row mb-3">
                  <div className="col-xl-12">
                    <div className="row">
                      <div className="col-2">
                        <label>VAT Number</label>
                      </div>
                      <div className="col-5">
                        <input
                          name="VatId"
                          value={this.state.user.VatId}
                          onChange={e => this.onChangeInput(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-xl-12">
                    <div className="row">
                      <div className="col-2">
                        <label>GLM Code</label>
                      </div>
                      <div className="col-5">
                        <input
                          name="glmCode"
                          value={this.state.user.glmCode}
                          onChange={e => this.onChangeInput(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-xl-12">
                    <div className="row">
                      <div className="col-2">
                        <label>Refrence Number</label>
                      </div>
                      <div className="col-5">
                        <input
                          name="referenceNo"
                          value={this.state.user.referenceNo}
                          onChange={e => this.onChangeInput(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-xl-12">
                    <div className="row">
                      <div className="col-2">
                        <label>EAORI Number</label>
                      </div>
                      <div className="col-5">
                        <input
                          name="eaoriNo"
                          value={this.state.user.eaoriNo}
                          onChange={e => this.onChangeInput(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info  */}
            <div className={s.card}>
              <div className={s.banner}>
                <h3>Contact Info</h3>
              </div>
              <div className={s.mainContainer}>
                <div className="row">
                  <div className="col-xl-12">
                    <div className="row mb-3">
                      <div className="col-2">
                        <label>Phone</label>
                      </div>
                      <div className="col-5">
                        <input
                          name="phoneNumber"
                          value={this.state.user.phoneNumber}
                          onChange={e => this.onChangeInput(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-xl-12">
                    <div className="row">
                      <div className="col-2">
                        <label>Fax</label>
                      </div>
                      <div className="col-5">
                        <input
                          name="faxNumber"
                          value={this.state.user.faxNumber}
                          onChange={e => this.onChangeInput(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-xl-12">
                    <div className="row">
                      <div className="col-2">
                        <label>Mobile</label>
                      </div>
                      <div className="col-5">
                        <input
                          name="mobileNumber"
                          value={this.state.user.mobileNumber}
                          onChange={e => this.onChangeInput(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-xl-12">
                    <div className="row">
                      <div className="col-2">
                        <label>Email</label>
                      </div>
                      <div className="col-5">
                        <input
                          name="email"
                          value={this.state.user.email}
                          onChange={e => this.onChangeInput(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-xl-12">
                    <div className="row">
                      <div className="col-2">
                        <label>Home Page</label>
                      </div>
                      <div className="col-5">
                        <input
                          name="homePage"
                          value={this.state.user.homePage}
                          onChange={e => this.onChangeInput(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={s.card}>
              <div className={s.banner}>
                <h3>Registration Info</h3>
              </div>
              <div className={s.mainContainer}>
                <div className="row">
                  <div className="col-xl-12">
                    <div className="row mb-3">
                      <div className="col-2">
                        <label>Username</label>
                      </div>
                      <div className="col-5">
                        <input
                          name="username"
                          value={this.state.user.username}
                          onChange={e => this.onChangeInput(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="row mb-3">
                  <div className="col-xl-12">
                    <div className="row">
                      <div className="col-2">
                        <label>Password</label>
                      </div>
                      <div className="col-5">
                        <input
                          value={this.state}
                          onChange={e => this.onChangeInput(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-xl-12">
                    <div className="row">
                      <div className="col-2">
                        <label>Mobile</label>
                      </div>
                      <div className="col-5">
                        <input
                          value={this.state}
                          onChange={e => this.onChangeInput(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-xl-12">
                    <div className="row">
                      <div className="col-2">
                        <label>Email</label>
                      </div>
                      <div className="col-5">
                        <input
                          value={this.state}
                          onChange={e => this.onChangeInput(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-xl-12">
                    <div className="row">
                      <div className="col-2">
                        <label>Home Page</label>
                      </div>
                      <div className="col-5">
                        <input
                          value={this.state}
                          onChange={e => this.onChangeInput(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              */}
              </div>
            </div>
            <div className={s.banner}>
              <h3>Address Info</h3>
            </div>
            <div className={` container-fluid`}>
              <div className="row">
                <div className="col-xl-12 col-lg-12 addInputContainer">
                  <CustomTable
                    hasPagination={false}
                    records={this.state.addresses}
                    columnLabels={ADDRESS_TABLE_LABELS}
                    recordItemNames={ADDRESS_RECORD_ITEMS}
                    onRecordClick={this.onAddressClick}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="offset-xl-9 col-xl-3">
                <button className={s.editBtn}>Edit</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withStyles(s)(Profile);
