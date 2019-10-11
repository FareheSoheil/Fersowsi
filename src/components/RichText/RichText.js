import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Editor as TinyEditor } from '@tinymce/tinymce-react';
import s from './RichText.css';
class RichText extends React.Component {
  static propTypes = {
    initialValue: PropTypes.string.isRequired,
    min_height: PropTypes.number.isRequired,
    width: PropTypes.string.isRequired,
    handleEditorChange: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TinyEditor
        initialValue={this.props.initialValue}
        init={{
          min_height: this.props.min_height,
          width: this.props.width,
          plugins: 'link image paste imagetools code table',
          toolbar1:
            'insertfile | undo redo | bold italic underline | link image | bullist numlist indent outdent | forecolor backcolor| alignleft aligncenter alignright | code',
          image_advtab: true,
          images_upload_url: './index.js',

          images_upload_handler: (blobInfo, success, failure) => {
            setTimeout(function() {
              success(
                'data:' + blobInfo.blob().type + ';base64,' + blobInfo.base64(),
              );
            }, 2000);
          },
          paste_data_images: true,
          image_title: true,
          automatic_uploads: true,
          file_picker_types: 'file image media',
        }}
        apiKey="8kmlq29dw1jb5lc6t68evikgrd4k4mc2p5tefznrepmuf9kl"
        onChange={this.props.handleEditorChange}
      />
      //   <div>salam injam</div>
    );
  }
}
export default withStyles(s)(RichText);
