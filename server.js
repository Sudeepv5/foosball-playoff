var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');
var mongoose= require('mongoose');
var app = express();

app.use(express.static(__dirname + '/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(multer());

mongoose.connect('mongodb://localhost/playoff');

var PlayerSchema=new mongoose.Schema({
    name: String,
    email: String
});

var PlayerModel=mongoose.model('player', PlayerSchema);

var player1=new PlayerModel({ name : 'Mike', email : 'qwer@gmail.com'});

player1.save();

app.post('/player',function(req,res){
    console.log('from server: '+req.body.name+req.body.email);
    res.status(200).send('OK');
});

app.get('/process',function(req,res){
    res.json(process.env);
});



ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;
 
app.listen(port,ipaddress,function(){
    console.log("Running!")
})