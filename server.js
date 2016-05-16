var express = require('express');
var bodyParser  = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req,res){
	res.send('Todo API Root');
});

app.get('/todos', function(req,res){
	res.json(todos);
});

app.get('/todos/:id', function(req,res){

	var toDoId = parseInt(req.params.id, 10);
	var matchedToDo;

	todos.forEach(function(element){

		if(element.id === toDoId){
		    matchedToDo = element;
		}
	});
	
	if(matchedToDo){
		res.json(matchedToDo);
	}else{
		res.status(404).send();
	}
});
//POST
app.post('/todos', function(req, res){
	var body = req.body;

	console.log('description ' + body.description);
	res.json(body);

	//add body to todo array
	body.id = todoNextId;
	todoNextId++;
	todos.push(body);
	
});

app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT);
});