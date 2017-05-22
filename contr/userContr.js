var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};

module.exports = {
	add: function(req,res,next){
		pool.getConnection(function(err, connection){
			//获取前台页面传过来的参数
			var param = req.body;
			//建立连接，向表中插入值
            connection.query($sql.insert, [param.account, param.name, param.email, param.password, param.confirmPassword, param.imageUrl, param.description], function(err, result) {//
                if(result) {
                    result = {
                        code: 200,
                        msg:'增加成功'
                    };    
                }

                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);

                // 释放连接 
                connection.release();
            });
		})
	},
	update: function (req, res, next) {
		// update by id
		// 为了简单，要求同时传name和age两个参数 
		var param = req.body;
		if(param.s_id == null || param.t_id == null) {
			jsonWrite(res, undefined);
			return;
		}

		pool.getConnection(function(err, connection) {
			connection.query($sql.update, [param.start_time,param.end_time,param.date_time, param.s_id,param.t_id,'26260148152304741369',param.course_id], function(err, result) {//26260148152304741369
				if(result.affectedRows != 0) {//判断查询是否成功
					result = {
						code: 200,
						msg:'更新成功'
					};    
				}else{
					console.log('查询失败，你输入的条件不存在！')
				}
				jsonWrite(res, result);


				connection.release();
			});
		});

	},
	queryAll: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryAll, function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	queryByUser: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryByUser,req.query.user_name, function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	queryByTeacher: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryByTeacher,req.query.user_name, function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	login: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.login,req.query.account, function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	getCharsData: function(req, res, next){
		var data = {'name':'pany'};
		jsonWrite(res,data)
	}
};