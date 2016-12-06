import React from 'react';
import $ from 'jquery';
import PhotoTag from './PhotoTag';
import AutoComplete from './AutoComplete';
import TAGS from '../constants/Tags.json';

class PhotoTagger extends React.Component {
  
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = { addTagMode: false, newTagPosition: { top: 100, left: 100 } };
    this.onPhotoClick = this.onPhotoClick.bind(this);
    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.removeTag = this.removeTag.bind(this);
  }

  onPhotoClick(evt) {
    const { addTagMode } = this.state;
    if (!addTagMode) {
      const $container = $(this.refs.imageContainer);
      const containerPosition = $container.offset();
      const xPosition = evt.clientX - containerPosition.left;
      const yPosition = evt.clientY - containerPosition.top;
      const xPercent = Math.round(xPosition/$container.width() * 100) - 1;
      const yPercent = Math.round(yPosition/$container.height() * 100) - 1 ;
      this.setState({
        addTagMode: true,
        newTagPosition: { top: yPosition-15, left: xPosition-15 },
        percentPosition: { top: yPercent, left: xPercent }
      });
    }
  }

  addNewTag(position, tag) {
    if (this.props.onAddTag) {
      this.props.onAddTag(this.props.photo, { name: tag.name, position: position });
    }
    this.setState({ addTagMode: false });
  }
  
  removeTag(tag, tagIndex) {
    if (this.props.onRemoveTag) {
      this.props.onRemoveTag(this.props.photo, tagIndex);
    }
  }

  onOverlayClick() {
    this.setState({ addTagMode: false });
  }

  renderPhotoTags() {
    const { tags = [] } = this.props.photo;
    return tags.map((item, index) => {
      return <PhotoTag key={index} tag={item} tagIndex={index} onDelete={this.removeTag} />;
    });
  }

  renderOverlay() {
    const { addTagMode } = this.state;
    return <div className={`imageOverlay ${ addTagMode ? 'visible' : ''}`} onClick={this.onOverlayClick} ></div>;
  }

  renderNewTagView() {
    const { addTagMode, newTagPosition, percentPosition } = this.state;
    const divStyle = { top: newTagPosition.top, left: newTagPosition.left };
    const autoComplete = addTagMode ? (
      <AutoComplete items = {TAGS.content} onSelect={this.addNewTag.bind(this, percentPosition)} />
    ) : undefined;
    return (
      <div className={`newTag ${ addTagMode ? 'visible' : ''}`} style={divStyle} >
        <div className="newTagInner">
          <div className="newTagList">
            {autoComplete}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { photo = {} } = this.props;
    return (
      <div className={`photoTagger ${this.state.addTagMode ? '' : ''}`}>
        <div ref="imageContainer" className="imageContainer" onClick={this.onPhotoClick}>
          <img src={photo.preview}/>
          {this.renderPhotoTags()}
        </div>
        { this.renderOverlay() }
        { this.renderNewTagView() }
      </div>
    );
  }
}

export default PhotoTagger;
