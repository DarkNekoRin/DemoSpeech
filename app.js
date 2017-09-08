var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var ibmdb = require('ibm_db');
var watson = require('watson-developer-cloud');

//var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');

var connStr = "DATABASE=BLUDB;HOSTNAME=dashdb-entry-yp-dal09-08.services.dal.bluemix.net;PORT=50000;UID=dash13713;PWD=_gVL7rBjsD6_";
    
    //https://github.com/ibmdb/node-ibm_db


var language_translator = watson.language_translator({
  username: 'e3b68624-5334-4255-b68f-5a37849f5298',
  password: 'R5nZ4kejuK5y',
  version: 'v2'
});

language_translator.translate({
    text: 'hello, how are you?',
    source: 'en',
    target: 'es'
  }, function(err, translation) {
    if (err)
      console.log(err)
    else
      console.log(translation);
});



ibmdb.open(connStr, function (err, connection) {
    if (err) 
    {
      console.log( 'Error: ' + err);
      return;
    }
    
    connection.query("select 1 from sysibm.sysdummy1", function (err1, rows) {
      if (err1) console.log(err1);
      else console.log(rows);
      connection.close(function(err2) { 
        if(err2) console.log(err2);
      });
    });
    
});


var hasConnect = false;
const port = '3000';


var app = express();


// VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
        
// BODY PARSER MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
    
// Set Static Pah
app.use(express.static(path.join(__dirname, 'public')));

var users = [
    {
        id: 1,
        first_name: 'Claudia',
        last_name: 'Castro',
        email: 'clau@asd.com'
    },
    {
        id: 2,
        first_name: 'Belen',
        last_name: 'Salgado',
        email: 'mabel@asd.com'
    }
 
]

        

app.get('/', function(req,res){
    var title = 'Customers'
    res.render('index', {
        title: 'Cutomers',
        users: users
    } );
    
                      });


app.post('/users/add', function(req,res){
    var newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    }
    
    console.log(newUser);
});

app.listen(port, function(){    
     console.log('Servidor iniciado en puerto ' +port);    
}); 
const http = require('http');

