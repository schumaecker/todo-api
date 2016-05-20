module.exports = function (sequelize, DataTypes){

	return sequelize.define('todo', {
		description: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			len: [1, 250] //has to be between 1 and 250 char
		}
	},
	completed: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
  });
}