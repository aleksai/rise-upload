import React from 'react';

class UploadStatus extends React.Component {

  constructor(props) {
    super(props);
  }

  getSelectedCount() {
    const { photos=[] } = this.props;
    let taggedCount = 0;

    photos.map(item => {
      const { tags = [] } = item;
      if (tags.length) {
        taggedCount++;
      }
    });
    return taggedCount;
  }

  render() {
    const { photos=[] } = this.props;
    const progressPercent = photos.length ? (this.getSelectedCount() / photos.length) * 100 : 0;
    const barStyle = { width: `${progressPercent}%`};
    const btnClass = `btnUpload ${progressPercent < 100 ? 'disabled' : ''}`;
    return (
      <div className="uploadStatus">
        <h3>Upload Your Photos</h3>
        <div className="uploadCount">
          <span className="highLight">{ `${this.getSelectedCount()} of ${photos.length}`}</span> photos ready for upload.
        </div>
        <div className="progressBar">
          <div className="progressValue" style={barStyle} />
        </div>
        <button className={btnClass} disabled={progressPercent < 100} onClick={this.props.onUploadClick}>
          Upload Photos
        </button>
      </div>
    );
  }
}

export default UploadStatus;
