spoofBrowser();

const fs = require('fs');
const createElement = require('inferno-create-element');
const InfernoServer = require('inferno-server');
require('../bundle.js');

const App = global.App;
const state = {
  x: 0,
  mounted: false,
};
const renderedApp = InfernoServer.renderToString(
  createElement(App, { state: state })
);

const template = fs.readFileSync('index.html', 'utf8');
fs.writeFileSync('index.html', template.replace('{{APP}}', renderedApp));

function spoofBrowser() {
  window = {};
  navigator = {
    userAgent: {
      match() { return false },
    }
  };
  document = {
    getElementById() { return false; },
  };
};
