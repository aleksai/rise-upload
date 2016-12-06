import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './App';
import UploadPage from './src/containers/UploadPage';

export default  (
  <Route path="/" component={App} >
    <IndexRoute component={UploadPage} />
  </Route>
)
