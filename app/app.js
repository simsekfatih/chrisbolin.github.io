import React from 'react';
import ReactDOM from 'react-dom';

import Card from 'card';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./favicon.ico';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions
/* eslint-enable import/no-webpack-loader-syntax */

// Import CSS reset and Global Styles
import './global-styles';


// Render the damn thing
ReactDOM.render(
  <Card />,
  document.getElementById('app')
);

// Install ServiceWorker and AppCache, but if they fail that's OK
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
