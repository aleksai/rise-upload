import React from 'react';
import AppStyles from './resources/less/App.less';

class AppContainer extends React.Component {
  render() {
    return (
      <div className="appMain">
        {this.props.children}
      </div>
    );
  }
}

export default AppContainer;
