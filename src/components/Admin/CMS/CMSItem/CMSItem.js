/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Select from 'react-select';
import { toastr } from 'react-redux-toastr';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import RichText from '../../../RichText';
import { fetchWithTimeOut } from '../../../../fetchWithTimeout';
import { SERVER } from '../../../../constants/constantData';
import s from './CMSItem.css';

class CMS extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: this.props.isForAdd ? '' : this.props.cms.content,
      title: this.props.isForAdd ? '' : this.props.cms.title,
      isActive: this.props.isForAdd ? '' : this.props.cms.isActive,
      language: this.props.isForAdd ? {} : this.props.cms.language,
      link: this.props.isForAdd ? '' : this.props.cms.link,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onLangChange = this.onLangChange.bind(this);
    this.add = this.add.bind(this);
  }
  onInputChange(e) {
    if (this.props.isForAdd) {
      this.setState({
        [e.target.name]: e.target.value,
      });
    } else this.props.onInputChange(e);
  }
  onLangChange(so) {
    if (this.props.isForAdd) {
      this.setState({
        language: so,
      });
    } else this.props.onLangChange(so);
  }
  onContentChange(e) {
    if (this.props.isForAdd) {
      this.setState({
        content: e.target.getContent(),
      });
    } else this.props.onContentChange(e);
  }
  add() {
    const url = `${SERVER}/addCMS`;
    const cred = {
      title: this.state.title,
      htmlContent: this.state.content,
      link: this.state.link,
      isActive: true,
      siteLanguageId: this.state.language.value,
    };
    console.log('cred : ', cred);
    const options = {
      method: 'POST',
      body: JSON.stringify(cred),
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
          toastr.success('Add CMS', 'CMS added successfully');
        } else {
          window.alert(response.error.description);
          toastr.error(response.error.title, response.error.description);
        }
      },
      error => {
        toastr.error('Add CMS', 'Could not Add CMS');
      },
    );
  }
  render() {
    return (
      <div
        className="container-fluid pt-5"
        style={{ border: '1px solid lightgray', backgroundColor: 'white' }}
      >
        <div className="row mb-2 mt-2">
          <div className="offset-xl-2 col-4">
            <label>Title : &nbsp;&nbsp;</label>
            <input
              value={
                this.props.isForAdd ? this.state.title : this.props.cms.title
              }
              name="title"
              onChange={this.onInputChange}
            />
          </div>

          <div className="col-3">
            {this.props.isForAdd ? (
              <button onClick={this.add}>Add CMS</button>
            ) : (
              <button onClick={this.props.save}>Apply Changes</button>
            )}
          </div>
        </div>
        <div className="row mb-2 mt-1">
          <div className="offset-xl-2 col-6">
            <label>Link : &nbsp;&nbsp;</label>
            <input
              value={
                this.props.isForAdd ? this.state.link : this.props.cms.link
              }
              name="link"
              onChange={this.onInputChange}
            />
          </div>
        </div>
        <div className="row mb-2 mt-1">
          <div className="offset-xl-2 col-3">
            <Select
              placeholder="Language"
              value={this.state.language}
              options={this.props.alllanguages}
              onChange={this.onLangChange}
            />
          </div>
        </div>
        <div className="row mb-5 mt-2">
          <div className="offset-xl-2 col-8">
            <RichText
              min_height={500}
              initialValue={this.state.content}
              handleEditorChange={this.onContentChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CMS);
