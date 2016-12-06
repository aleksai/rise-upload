import React from 'react';
import $ from 'jquery';
class AutoComplete extends React.Component {

  constructor(props) {
    super(props);
    this.state = { textValue: '' };
    this.onTextChange = this.onTextChange.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
  }

  componentDidMount() {
    $(this.refs.searchInput).focus();
  }

  onTextChange(evt) {
    this.setState({ textValue: evt.target.value });
  }

  onItemSelect(item) {
    this.props.onSelect(item);
  }

  renderListItems() {
    const { items = [] } = this.props;
    return items.map((item, index)=>{
      const showItem = item.name.toLowerCase().indexOf(this.state.textValue.toLowerCase()) >= 0;
      return showItem ? (
        <div key={index} className="listItem" onClick={this.onItemSelect.bind(this, item)}>
          {item.name}
        </div>
      ) : undefined;
    });

  }

  render() {
    return (
      <div className="autoComplete">
        <div className="searchContainer">
          <input
            ref="searchInput"
            className="input"
            placeholder="Search tags"
            value={this.state.textValue}
            type="text" onChange={this.onTextChange}/>
          <span className="icon-search"></span>
        </div>

        <div className="list">
          {this.renderListItems()}
        </div>
      </div>
    );
  }
}

export default AutoComplete;
