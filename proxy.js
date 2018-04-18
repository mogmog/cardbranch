let express = require('express');
let proxy = require('http-proxy-middleware');
let gmailsend = require('gmail-send')
let app = express();

let bodyParser = require('body-parser');

let jsonParser = bodyParser.json()

let send = gmailsend({
  user: 'telefonicacarddemo@gmail.com',
  pass: 'Telefonica',
  subject: 'Graham has shared a Luca Store Insight',
});

app.post('/api/real/send', jsonParser,  function (req, res, next) {

  var email = req.body;  // second parameter is default

  send({
    to:   req.body.email,
    files: [ req.body.image ],
    html: 'Graham has shared a Luca Store Insight. <a href="http://localhost:3000/#/user/email/' + req.body.id + '">Click here</a> to view the insight '            // HTML
  }, function (err, res) {

  });

  res.send("done");
 // next();

});


app.use('/api/real', proxy({target: 'http://localhost:5001', changeOrigin: true}));
app.use('/api', proxy({target: 'http://localhost:8000', changeOrigin: true}));
app.use('/', proxy({target: 'http://localhost:8000', changeOrigin: true}));
//app.use(bodyParser);



app.listen(3000);
