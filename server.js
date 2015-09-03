var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');
var mongoose= require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var app = express();

app.use(express.static(__dirname + '/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(multer());


var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/playoff'

mongoose.connect(connectionString);

var PlayerSchema=new mongoose.Schema({
    name: {type: String, required: true},
    email: {type:String, unique:true, required: true}
});
PlayerSchema.plugin(uniqueValidator,{ message: 'You know balls?! Entered email has already been registered. Please let us know if you think this is a mistake!'});

var PlayerModel=mongoose.model('player', PlayerSchema);


app.post('/player',function(req,res){
   
    var player=new PlayerModel({ 
        name : req.body.name, 
        email : req.body.email
    })
    player.save(function(err,doc){
        if(err){
        res.statusCode=400;
        res.json(err);
        }
        else 
        {
            res.status(200).send('OK');
        }
    });
});




ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;
 
app.listen(port,ipaddress,function(){
    console.log("Running!")
})