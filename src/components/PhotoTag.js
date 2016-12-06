import React from 'react';
const TAG_TEXT = 'rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime';
class PhotoTag extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showDetails: false };
    this.showTagDetails = this.showTagDetails.bind(this);
    this.hideTagDetails = this.hideTagDetails.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  showTagDetails() {
    this.setState({ showDetails: true });
  }

  hideTagDetails() {
    this.setState({ showDetails: false });
  }

  onDeleteClick(tag, tagIndex, evt) {
    evt.stopPropagation();
    if (this.props.onDelete) {
      this.props.onDelete(tag,tagIndex);
    }
  }

  render() {
    const { tag, tagIndex } = this.props;
    const itemStyle = { top: tag.position.top + '%', left: tag.position.left + '%' };
    const detailsClass = `tagDetails ${this.state.showDetails ? 'isVisible' : ''}`;
    return (
      <div
        className="photoTag"
        onMouseEnter={this.showTagDetails}
        onMouseLeave={this.hideTagDetails}
        style={itemStyle}>
        <span className="tagIcon">?</span>
        <div className={detailsClass}>
          <div className="name">{tag.name}</div>
          <div className="description">{TAG_TEXT}</div>
          <span className="btnInfo">Learn More</span>
          <span className="btnDelete icon-cms-delete" onClick={this.onDeleteClick.bind(this, tag, tagIndex)}  />
        </div>
      </div>
    );
  }
}

export default PhotoTag;
