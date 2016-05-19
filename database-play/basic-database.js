var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250] //has to be between 1 and 250 char
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

sequelize.sync({
	// force: true
}).then(function() {
	console.log('Everything is synced')
});

	
	// Todo.create({
	// 	description:"Clean office",
	// 	copmleted: true
	// })
	// Todo.create({
	// 	description:"Call Laura",
	// 	copmleted: false
	// })
	// Todo.create({
	// 	description:"Call Mom",
	// 	copmleted: true
	// })


	Todo.findAll({
		where: {
			description: {
				$like: '%Laura%'
			}
		}
	 }).then(function(result){
	 	if(result){
	 		result.forEach(function(elem){
	 		console.log(elem.toJSON());//toJSON is a function and needs toJSON()
	 	});
	 	} else {
	 		console.log('Result not found');
	 	}
	 })

	//  	Todo.findById(3).then(function (todo) {
	// 	if (todo) {
	// 		console.log(todo.toJSON());
	// 	} else {
	// 		console.log('Todo not found');
	// 	}
	// });

	
