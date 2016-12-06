import React from 'react';
import DropZone from 'react-dropzone';

class FileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isDragging: false };

    this.onDrop = this.onDrop.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
  }

  onDrop(files) {
    this.setState({ isDragging: false, uploadedFiles: [] });
    this.uploadFiles(files);
  }

  onDragEnter() {
    this.setState({ isDragging: true });
  }

  onDragLeave() {
    this.setState({ isDragging: false });
  }

  uploadFiles(files) {
    const self = this;
    files.map(file => {
      var reader = new FileReader();
      reader.onload = function (evt) {
        if (self.props.onFileUpload) {
          self.props.onFileUpload({ name: file.name, preview: evt.target.result, fileData: file });
        }
      };
      reader.readAsDataURL(file);
    });
  }

  render() {
    return (
      <div>
        <DropZone
          className={`fileUploadContainer ${ this.state.isDragging ? 'dragging' : ''}`}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          onDrop={this.onDrop}
          multiple={true}>
          <span className="uploadText">Drag & Drop or <span className="uploadBtn">Select Photos</span></span>
        </DropZone>
      </div>

    );
  }
}

export default FileUpload;
