// conf/db.js
// MySQL数据库联接配置
module.exports = {
	mysql: {
		host: '127.0.0.1', //172.16.0.20
		user: 'root',
		password: 'pany#1234',
		database:'test', // 前面建的user表位于这个数据库中
		port: 3306
	}
};