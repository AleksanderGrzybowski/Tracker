import ReactDOM from 'react-dom';
import React from 'react';
import Tracker from './Tracker.jsx';

require('../node_modules/bootstrap/dist/css/bootstrap.css');

// cordova
document.addEventListener('deviceready', () => {
    if ('plugins' in window) {
        window.plugins.insomnia.keepAwake();
    }
}, false);
//

ReactDOM.render(<Tracker/>, document.getElementById('content'));
