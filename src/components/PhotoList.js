import React from 'react';

class PhotoList extends React.Component {

  constructor(props) {
    super(props);
  }

  onItemClick(item) {
    if (this.props.onPhotoClick) {
      this.props.onPhotoClick(item);
    }
  }

  onDeleteClick(item, index, evt) {
    evt.stopPropagation();
    if (this.props.onRemoveFile) {
      this.props.onRemoveFile(item.name, index);
    }
  }

  render() {
    const { photos=[] } = this.props;
    return (
      <div className="photoList">
        {
          photos.map((item, index) => {
            const { tags=[] } = item;
            return (
              <div
                key={index}
                onClick={this.onItemClick.bind(this, item)}
                className={`photoItem ${item.isSelected ? 'selected' : ''}`}>
                <div className="imageContainer">
                  <img src={item.preview}/>
                </div>
                {tags.length ? <div className="checkIcon icon-cms-check-mark" /> : undefined }
                <div
                  className="deleteIcon icon-cms-delete"
                  onClick={this.onDeleteClick.bind(this, item, index)}  />
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default PhotoList;
