import React from 'react';
import ReactDOM from 'react-dom';

import App from './web/App.js';
import Login from './web/Login.js';

const container = document.getElementById('container');

fetch('/albums', {
    headers: {
        'x-token': 'A TOKEN LOL so secret'
    }
})
    .then(res => res.json())
    .then(albums => {
        ReactDOM.render(
            <App albums={albums} />,
            container
        );
    });