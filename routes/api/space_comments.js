"use strict";
const db = require('../../models/db');
var express = require('express');
var router = express.Router({mergeParams: true});
const uuidv4 = require('uuid/v4');

router.get('/:spaceid/:msg', function(req, res, next) {
	var u = {
		_id: uuidv4(),
	    space_id: req.params.spaceid,
	    user_id: req.user.dataValues._id,
	    editor_name: req.user.dataValues.nickname,
	    message: req.params.msg,
	    like_count:0,
	    liked_by:''
	};
	db.Comment.create(u)
		.then(()=>{
			res.status(200).json({"comment_status":"success"});
		})
		.error(err => {
        	res.sendStatus(400);
        })
});
router.get('/:spaceid', function(req, res, next) {
	db.Comment.findAll({where:{"space_id":req.params.spaceid}}).then(function(messages){
		res.status(200).json(messages);
    });
});
router.delete('/delete/:cmtid', function(req, res, next) {
	db.Comment.destroy({where:{"_id":req.params.cmtid}}).then(function(messages){
	res.status(200).json({"delete":"success"});
	});
});
router.get('/like/:cmtid/:user_id', function(req, res, next) {
	db.Comment.find({where:{"_id":req.params.cmtid}}).then(function(messages){
		var count=messages.dataValues.like_count;
		var users=messages.dataValues.liked_by;
		users=users+req.params.user_id+',';
		db.Comment.update({ like_count: count+1,liked_by: users}, {where: {"_id":req.params.cmtid}});
		res.status(200).json({"like":"success"});
	});
});
router.get('/dislike/:cmtid/:user_id', function(req, res, next) {
	db.Comment.find({where:{"_id":req.params.cmtid}}).then(function(messages){
		var count=messages.dataValues.like_count-1;
		var users=messages.dataValues.liked_by;
		users=users.replace(req.params.user_id+',','');
		db.Comment.update({ like_count: count,liked_by: users}, {where: {"_id":req.params.cmtid}});
		res.status(200).json({"dislike":"success"});
	});
});
module.exports = router;