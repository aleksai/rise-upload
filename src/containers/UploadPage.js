require('es6-promise').polyfill();
require('whatwg-fetch');

// TODO upload data to http://riseapi.herokuapp.com/FEED

import React from 'react';
import PhotoTagger from '../components/PhotoTagger';
import FileUpload from '../components/FileUpload';
import PhotoDetails from '../components/PhotoDetails';
import PhotoList from '../components/PhotoList';
import UploadStatus from '../components/UploadStatus';
import UploadModal from '../components/UploadModal';

const UPLOAD_PRESET = 'px5gd45k';
const UPLOAD_CLOUD_NAME = 'ailabs';
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${UPLOAD_CLOUD_NAME}/image/upload`;

class UploadPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { photoList: [], selectedPhoto: {} };
    this.addPhoto = this.addPhoto.bind(this);
    this.removePhoto = this.removePhoto.bind(this);
    this.onPhotoSelected = this.onPhotoSelected.bind(this);
    this.onAddTag = this.onAddTag.bind(this);
    this.onRemoveTag = this.onRemoveTag.bind(this);
    this.onPhotoInfoChange = this.onPhotoInfoChange.bind(this);
    this.beginUpload = this.beginUpload.bind(this);
  }

  onPhotoSelected(data) {
    this.unSelectAll();
    data.isSelected = true;
    this.setState({ selectedPhoto: data });
  }

  fileExists(fileName) {
    const { photoList = [] } = this.state;
    const matches = photoList.filter(item => item.name === fileName);
    return Boolean (matches && matches.length)
  }

  addPhoto(photoData) {
    if (this.fileExists(photoData.name)) return;

    const { photoList = [] } = this.state;
    photoData.tags = [];
    photoList.push(photoData);
    this.setState({ photoList });

    let selectedPhoto = {};
    if (photoList.length && !this.state.selectedPhoto.name) {
      selectedPhoto = photoList[0];
      photoList[0].isSelected = true;
      this.setState({ selectedPhoto });
    }
  }

  removePhoto(name, index) {
    const { photoList } = this.state;
    const arr = photoList.splice(index, 1);
    this.setState({ photoList, arr });
  }

  unSelectAll() {
    this.state.photoList.map(item => {
      item.isSelected = false;
    });
  }

  onAddTag(photoData, tagData) {
    const { photoList } = this.state;
    photoList.map(item => {
      if (item.name === photoData.name ) {
        item.tags.push(tagData);
      }
    });
    this.setState({ photoList });
  }

  onRemoveTag(photoData, tagIndex) {
    const { photoList } = this.state;
    photoList.map(item => {
      if (item.name === photoData.name ) {
        item.tgs = item.tags.splice(tagIndex, 1);
      }
    });
    this.setState({ photoList });
  }

  onPhotoInfoChange(photoData) {
    const { photoList } = this.state;
    photoList.map(item => {
      if (item.name === photoData.name ) {
        item.title = photoData.title;
        item.description = photoData.description;
        item.projectID = '--'; // TODO implement with real project
      }
    });
    this.setState({ photoList });
  }

  beginUpload() {
    const { photoList = [] } = this.state;
    const uploadList = [];
    this.setState({ isUploading: true });

    photoList.map(item => {
      this.uploadToCloudinary(item.fileData).then(res => res.json()).then(data => {

        uploadList.push({
          title: item.title || '',
          description: item.description || '',
          photoGroup: item.projectId || '',
          photoTags: item.tags,
          fileName: item.name,
          imageUrl: data.url,
          width: data.width,
          height: data.height,
          bytes: data.bytes
        });

        if (uploadList.length === photoList.length) {
          this.completeUpload(uploadList);
        }
      });
    });
  }

  completeUpload(uploadList) {
    this.setState({ uploadComplete: true });
    console.log('finalize upload: ', JSON.stringify(uploadList));
  }

  uploadToCloudinary(file) {
    var data = new FormData();
    data.append('file', file);
    data.append('upload_preset', UPLOAD_PRESET);
    return fetch(UPLOAD_URL, { method: 'POST', body: data });
  }

  render() {
    const { isUploading, uploadComplete, photoList } = this.state;
    const hasUploads = this.state.photoList.length ? true : false;
    return (
      <div className="uploadPage">
        <div className={ `section sectionLeft ${hasUploads ? '' : 'expanded'}` }>
          <div className="content">
            <h3>Select  Photos</h3>
            <FileUpload onFileUpload={this.addPhoto} />

            <PhotoList
              photos={this.state.photoList}
              onRemoveFile={this.removePhoto}
              onPhotoClick={this.onPhotoSelected} />

            { hasUploads ? (
              <div>
                <UploadStatus photos={this.state.photoList} onUploadClick={this.beginUpload} />
              </div>
            ) : undefined }

          </div>
        </div>

        <div className={ `section sectionMiddle ${hasUploads ? '' : 'hidden'}` }>
          <div className="content">
            <h3>Tag Your Photos</h3>
            <PhotoTagger
              photo={this.state.selectedPhoto}
              onAddTag={this.onAddTag}
              onRemoveTag={this.onRemoveTag} />
          </div>
        </div>

        <div className={ `section sectionRight ${hasUploads ? '' : 'hidden'}` }>
          <div className="content">
            <h3>Add Photo Info</h3>
            <PhotoDetails photo={this.state.selectedPhoto} onChange={this.onPhotoInfoChange} />
          </div>
        </div>

        <UploadModal
          isUploading={isUploading}
          uploadComplete={uploadComplete}
          photoList={photoList} />
      </div>
    );
  }
}

export default UploadPage;
