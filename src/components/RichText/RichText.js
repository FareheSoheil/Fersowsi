import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Editor as TinyEditor } from '@tinymce/tinymce-react';
import s from './RichText.css';
class RichText extends React.Component {
  static propTypes = {
    initialValue: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }
  handleEditorChange = e => {
    console.log('Content was updated:', e.target.getContent());
  };
  imagesUploadHandler(image, successFunction, failureFunction) {
    // failure('failed');
    setTimeout(function() {
      /* no matter what you u pload, we will turn it into TinyMCE logo :)*/

      successFunction(
        'data:' + image.blob().type + ';base64,' + image.base64(),
      );
    }, 2000);
  }
  render() {
    return (
      <TinyEditor
        initialValue={this.props.initialValue}
        init={{
          min_height: 500,
          border: '2px solid red',
          width: '100%',
          plugins: 'link image paste imagetools code table',
          toolbar1:
            'insertfile | undo redo | bold italic underline | link image | bullist numlist indent outdent | forecolor backcolor| alignleft aligncenter alignright | code',
          image_advtab: true,
          images_upload_url: './index.js',

          images_upload_handler: (blobInfo, success, failure) =>
            imagesUploadHandler(blobInfo, success, failure),
          paste_data_images: true,
          image_title: true,
          automatic_uploads: true,
          file_picker_types: 'file image media',
        }}
        apiKey="8kmlq29dw1jb5lc6t68evikgrd4k4mc2p5tefznrepmuf9kl"
        onChange={this.handleEditorChange}
      />
      //   <div>salam injam</div>
    );
  }
}
export default withStyles(s)(RichText);
