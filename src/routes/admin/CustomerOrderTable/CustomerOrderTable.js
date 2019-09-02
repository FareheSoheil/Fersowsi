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
import { Editor as TinyEditor } from '@tinymce/tinymce-react';
import history from '../../../history';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ProductCard from '../../../components/Admin/ProductCard';
import CustomerOrderSideFilter from '../../../components/Admin/CustomerOrderSideFilter';

import s from './CustomerOrderTable.css';
class CustomerOrderTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: '',
    };
  }

  onProductClick(id) {
    history.push(`/admin/products/${id}`);
  }

  handleEditorChange = e => {
    console.log('Content was updated:', e.target.getContent());
  };
  render() {
    return (
      <div className="container-fluid dashboard-content">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="page-header">
              <h2 className="pageheader-title">Products List</h2>
              <hr />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12 col-12">
            <div className="row">
              <ProductCard
                id="id for teste"
                title="abbas"
                price="666"
                discount="55"
                description="sladjas;ldkjas;ldkans;lkdjas;dlkajsdlkasjalskdjasldkjasdlkajs44"
                imgSrc="/assets/images/eco-product-img-1.png"
                onProductClick={this.onProductClick}
              />
              <TinyEditor
                initialValue="<p>This is the initial content of the editor</p>"
                init={{
                  min_height: 800,
                  width: '100%',
                  plugins: 'link image paste imagetools code table',
                  toolbar1:
                    'insertfile | undo redo | bold italic underline | link image | bullist numlist indent outdent | forecolor backcolor| alignleft aligncenter alignright | code',
                  image_advtab: true,
                  images_upload_url: './index.js',
                  // file_picker_callback: function(callback, value, meta) {
                  //   console.log(('meta : ', meta));
                  // },
                  // images_upload_base_path: '/images',
                  images_upload_handler: function(blobInfo, success, failure) {
                    // failure('failed');
                    setTimeout(function() {
                      /* no matter what you u pload, we will turn it into TinyMCE logo :)*/

                      success(
                        'data:' +
                          blobInfo.blob().type +
                          ';base64,' +
                          blobInfo.base64(),
                      );
                    }, 2000);
                    console.log(
                      'all : ',
                      // blobInfo.blob(),
                      // blobInfo.fileName,
                      blobInfo.blobUri(),
                    );
                  },
                  paste_data_images: true,
                  image_title: true,
                  automatic_uploads: true,
                  file_picker_types: 'file image media',
                }}
                apiKey="8kmlq29dw1jb5lc6t68evikgrd4k4mc2p5tefznrepmuf9kl"
                onChange={this.handleEditorChange}
              />

              {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <ReactPaginate
              previousLabel="<"
              nextLabel=">"
              pageCount={this.state.tot}.jpg
              pageRangeDisplayed={3}
              onPageChange={this.props.handlePageChange}
              marginPagesDisplayed={1}
              containerClassName="paginate"
              subContainerClassName="pages paginate"
              activeClassName="active-page"
              breakClassName="break-me"
              initialPage={this.props.currentPageNumber}
              disableInitialCallback
            />
              </div> */}
            </div>
          </div>

          <CustomerOrderSideFilter />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CustomerOrderTable);
