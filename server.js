var express = require('express');
var bodyParser  = require('body-parser');
var _ = require('underscore');



var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req,res){
	res.send('Todo API Root');
});

//GET TODOS 
app.get('/todos', function(req,res){
	
	var queryParams = req.query;
	var filteredTodos = todos;

	if(queryParams.hasOwnProperty('completed')
		&& queryParams.completed === 'true'){
		filteredTodos = _.where(filteredTodos, {completed: true});
	} else if(queryParams.hasOwnProperty('completed')
		&& queryParams.completed === 'false') {
		filteredTodos = _.where(filteredTodos, {completed: false});
	}

	if(queryParams.hasOwnProperty('q')
		&& typeof queryParams.q === 'string'
		&& queryParams.q.length > 0){

		filteredTodos = _.filter(filteredTodos, function(todo){
			return todo.indexOf(queryParams.q) >-1;

		})
	}






	res.json(filteredTodos)
});




//GET 
app.get('/todos/:id', function(req,res){

	var toDoId = parseInt(req.params.id, 10);
	var matchedToDo = _.findWhere(todos, {id: toDoId});

	if(matchedToDo){
		res.json(matchedToDo);
	}else{
		res.status(404).send();
	}
});




//POST
app.post('/todos', function(req, res){
	
	var body = _.pick(req.body, "description", "completed");
	body.description = body.description.trim();

	if(!_.isBoolean(body.completed) 
		|| !_.isString(body.description)
		|| body.description.trim().length === 0) {
		console.log('failed');
		return res.status(400).send();
	}



	console.log('description ' + body.description);
	res.json(body);

	//add body to todo array
	body.id = todoNextId;
	todoNextId++;
	todos.push(body);

});

//DELETE /todos/:id
app.delete('/todos/:id', function(req, res){

	var toDeleteId = parseInt(req.params.id, 10);
	var matchedToDelete = _.findWhere(todos, {id: toDeleteId});
	

	if (!matchedToDelete) {
		return res.status(400).send();
	} else {
		todos = _.without(todos, matchedToDelete);
		res.json(matchedToDelete);
	}
});

// PUT /todos/:id
app.put('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});
	var body = _.pick(req.body, 'description', 'completed');
	var validAttributes = {};

	if (!matchedTodo) {
		return res.status(404).send();
	}

	if (body.hasOwnProperty('completed') 
		&& _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
	} else if (body.hasOwnProperty('completed')) {
		return res.status(400).send();
	}

	if (body.hasOwnProperty('description') 
		&& _.isString(body.description) && body.description.trim().length > 0) {
		validAttributes.description = body.description;
	} else if (body.hasOwnProperty('description')) {
		return res.status(400).send();
	}

	_.extend(matchedTodo, validAttributes);
	res.json(matchedTodo);
});


app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT);
});