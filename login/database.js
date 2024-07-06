const mysql = require('mysql');

const connection = mysql.createConnection({
	host : 'localhost',
	database : 'agencia',
	user : 'root',
	password : 'nestor01',
	port :3307
});

connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});

module.exports = connection;