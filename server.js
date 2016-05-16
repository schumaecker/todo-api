var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos =[{
	id: 1,
	description: 'Meet Mom for lunch',
	completed: false
},{
	id: 2,
	description: 'Buy shoes for Laura',
	completed: false
},{
	id: 3,
	description: 'Go to NYC',
	completed: true
}];

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


app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT);
});