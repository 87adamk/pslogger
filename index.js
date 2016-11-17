var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/send', function(request, response) {
	console.log(request.body.message);
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


