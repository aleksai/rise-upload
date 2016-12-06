import React from 'react';
import Dropdown from 'react-dropdown';

class PhotoDetails extends React.Component {

  constructor(props) {
    super(props);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
  }

  onTitleChange(evt) {
    const photo = this.props.photo;
    photo.title = evt.target.value;

    if(this.props.onChange) {
      this.props.onChange(photo);
    }
  }

  onDescriptionChange(evt) {
    const photo = this.props.photo;
    photo.description = evt.target.value;

    if(this.props.onChange) {
      this.props.onChange(photo);
    }
  }

  render() {
    const options = ['Project 1', 'Project 2', 'Project 3'];  // TODO add real projects
    const { photo = {} } = this.props;
    return (
      <div className="photoDetails">
        <label>Title</label>
        <input type="text" value={photo.title || ''} onChange={this.onTitleChange} />
        <label>Description</label>
        <textarea value={photo.description || ''} onChange={this.onDescriptionChange} />
        <label>Project</label>
        <Dropdown options={options} />
      </div>
    );
  }
}

export default PhotoDetails;
