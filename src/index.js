import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.js';

const container = document.getElementById('container');


fetch('http://localhost:3000/albums')
    .then(res => res.json())
    .then(albums => {
        ReactDOM.render(
            <App albums={albums} />,
            container
        );
    });