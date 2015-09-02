var express = require('express')
var app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;
 
app.listen(port,ipaddress)