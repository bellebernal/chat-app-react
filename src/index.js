import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


//NOTES: 
//7/10/2018
// Creating an optimized production build...
// Compiled successfully.

// File sizes after gzip:

//   55.9 KB  build/static/js/main.e1b705a1.js
//   109 B    build/static/css/main.65027555.css

// The project was built assuming it is hosted at the server root.
// You can control this with the homepage field in your package.json.
// For example, add this to build it for GitHub Pages:

//   "homepage" : "http://myname.github.io/myapp",

// The build folder is ready to be deployed.
// You may serve it with a static server:

//   npm install -g serve
//   serve -s build

// Find out more about deployment here:

//   http://bit.ly/2vY88Kr