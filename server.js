var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');
var mongoose= require('mongoose');
var app = express();

app.use(express.static(__dirname + '/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(multer());


var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/playoff'
mongoose.connect(connectionString);

var PlayerSchema=new mongoose.Schema({
    name: String,
    email: String
});

var PlayerModel=mongoose.model('player', PlayerSchema);

var player1=new PlayerModel({ name : 'Mike1', email : 'qwer1@gmail.com'});

player1.save();

app.post('/player',function(req,res){
    console.log('from server: '+req.body.name+req.body.email);
    res.status(200).send('OK');
});




var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;
 
app.listen(port,ipaddress,function(){
    console.log("Running!")
})