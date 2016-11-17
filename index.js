var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/send', function(request, response) {
	//console.log(request.body.message);

	var list = request.body.message.split("\n");

	for(var i=0; i < list.length; i++) {
		console.log("list "+(i+1) +" = " + list[i]);
	}


	var start = list[3].indexOf('#');

	var btnNumber = list[3].substring(start+1, start+2);
	var userInfo = list[4].split(" ");

	console.log("btnNumber = "+ btnNumber);
	console.log(userInfo[0]);
	console.log(userInfo[1]);
	console.log(userInfo[2]);
	console.log(userInfo[3]);

  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


//community-card:
//pot


// player
// name: jj
// hands: AA
// stack: $2
// bet: check/bet
// position: 
// status: playing / folded