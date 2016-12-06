import React from 'react';
class AddTagPopUp extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { position, visible } = this.props;
    const divStyle = { top: position.top, left: position.left };
    return (
      <div className={`newTag ${ visible ? 'visible' : ''}`} style={divStyle} >
        <div className="newTagInner">
          <div className="newTagList"></div>
        </div>
      </div>
    );
  }
}

export default AddTagPopUp;
