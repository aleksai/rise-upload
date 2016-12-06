import React from 'react';
import Loader from './Loader';

class UploadModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { isUploading, uploadComplete, photoList } = this.props;
    return (
      <div className={`uploadLoader ${isUploading ? 'visible' : ''}`} >
        <div className="icon">
          { !uploadComplete ? <Loader theme="light" size="large" /> : undefined }
          { uploadComplete ? <img src="../../resources/images/checkmark.svg" width="90" /> : undefined }
        </div>
        <h2>{uploadComplete ? `${photoList.length} Images successfully uploaded!` : 'Uploading your images...'}</h2>
        { uploadComplete ? <button>Close</button> : undefined }
      </div>
    );
  }
}

export default UploadModal;
