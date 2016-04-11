const express = require('express');
const app = express();

app.use(require('./src/server/api'));
app.use('/app', express.static('./dist'));

app.listen(9383, () => console.log('listening'));