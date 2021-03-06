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

	var analyzerMode = "BASIC";

	for(var i=0; i < list.length; i++) {
				
		if(list[i].indexOf("*** HOLE CARDS ***") != -1) {
			analyzerMode = "PRE-FLOP";
		} else if(list[i].indexOf("*** FLOP ***") != -1) {
			analyzerMode = "FLOP";
		} else if(list[i].indexOf("*** TURN ***") != -1) {
			analyzerMode = "TURN";
		} else if(list[i].indexOf("*** RIVER ***") != -1) {
			analyzerMode = "RIVER";
		} else if(list[i].indexOf("*** SHOW DOWN ***") != -1) {
			analyzerMode = "SHOW DOWN";
		}

		console.log("list "+(i+1) +" = " + list[i]);
		console.log("mode = "+ analyzerMode);
	}

	var start = list[3].indexOf('#');

	var btnNumber = list[3].substring(start+1, start+2);
	var userList = new Array();
	userList[0] = list[4].split(" ");
	userList[1] = list[3].split(" ");

	console.log("btnNumber = "+ btnNumber);
	
	console.log(userList[0]);
	console.log(userList[1]);

  response.send(userList);
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

/*
PS : { 
		BASIC :
		[
			{
				name: jjack ott,
				seat: 1,
				chips: $0.96,
				position:
			},

		],
		PRE-FLOP :
		[

			{
				name: 4erepah63,
				action: raises $0.04 to $0.06
			},
			{
				name: sinchaLTB
				action: folds
			}
		],
		FLOP :
		[
		],
		TURN :
		[
		],
		RIVER :
		[
		]
	}
*/