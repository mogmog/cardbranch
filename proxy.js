let express = require('express');
let proxy = require('http-proxy-middleware');

let app = express();

app.use('/api/real', proxy({target: 'http://localhost:5001', changeOrigin: true}));
app.use('/api', proxy({target: 'http://localhost:8000', changeOrigin: true}));
app.use('/', proxy({target: 'http://localhost:8000', changeOrigin: true}));
app.listen(3000);
