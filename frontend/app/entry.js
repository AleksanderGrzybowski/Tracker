import ReactDOM from 'react-dom';
import React from 'react';
import Tracker from './Tracker.jsx';

// cordova
document.addEventListener('deviceready', () => {
    if ('plugins' in window) {
        window.plugins.insomnia.keepAwake();
    }
}, false);
//

ReactDOM.render(<Tracker/>, document.getElementById('content'));
