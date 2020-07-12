"use strict";
const db = require('../../models/db');
var express = require('express');
var router = express.Router({mergeParams: true});

router.get('/:id', function(req, res, next) {
    db.Space.find({where:{"_id":req.params.id}}).then(function(messages){
        res.status(200).json({"voting_status":messages.dataValues.voting_status});
    })
});
router.get('/:spaceid/check/:userid', function(req, res, next) {
 	db.User.find({where:{"_id":req.params.userid}}).then(function(det){
		if(det.dataValues.voted_spaces.includes(req.params.spaceid))
			res.status(200).json({"check":true});
		else
			res.status(200).json({"check":false});
	})
});
router.get('/:spaceid/reset/:userid', function(req, res, next) {
 	db.Space.findAll({where:{"parent_space_id":req.params.spaceid}}).then(function(messages){
			let md=JSON.stringify(messages);
			let my=JSON.parse(md);
			let rid;
			for(let i=0;i<my.length;i++){
				if(my[i].voted_user.includes(req.params.userid))
	 				rid=my[i]._id
			}
	        db.Space.find({where:{"_id":rid}}).then(function(messages){
		        let voteCount=messages.dataValues.vote_count;
		        let votedUser=messages.dataValues.voted_user;
			    votedUser=votedUser.replace(req.params.userid+',',"");
			    db.Space.update({ voted_user: votedUser,vote_count: voteCount-1}, {where: {"_id":rid}});		 	
			 })
	        db.User.find({where:{"_id":req.params.userid}}).then(function(det){
				var c=det.dataValues.voted_spaces
				c=c.replace(rid+",","");
				db.User.update({voted_spaces:c},{where:{"_id":req.params.userid}});
			})
		})
    db.Space.find({where:{"_id":req.params.spaceid}}).then(function(messages){
    	var s=messages.dataValues.voted_user
    	s=s.replace(req.params.userid+',',"");
    	var v=messages.dataValues.vote_count;
    	db.Space.update({ voted_user: s,vote_count: v-1}, {where: {"_id": req.params.spaceid}});
    	res.status(200).json({"Reset":"successfully"});
    })

});
router.get('/:id/startVoting', function(req, res, next) {
 	db.Space.find({where:{"_id":req.params.id}}).then(function(messages){
	    var v=!messages.dataValues.voting_status;
	    db.Space.update({ voting_status:v}, {where: {"parent_space_id": req.params.id}});
	    db.Space.update({ voting_status:v}, {where: {"_id": req.params.id}});
	    res.status(200).json({"value_status":v});
	})
});
router.get('/:spaceid/:userid', function(req, res, next) {
	db.Space.find({where:{"_id":req.params.spaceid}}).then(function(messages){
        let parent=messages.parent_space_id;
        let voteCount=messages.dataValues.vote_count;
        let votedUser=messages.dataValues.voted_user;
        let result="Vote cast successfully";
        db.Space.find({where:{"_id":parent}}).then(function(messages){
	        if(!messages.dataValues.voted_user.includes(req.params.userid))
	        {
	        	var s=messages.dataValues.voted_user+req.params.userid+',';
	        	votedUser=votedUser+req.params.userid+',';
	        	var v=messages.dataValues.vote_count;
	        	db.Space.update({ voted_user: s,vote_count: v+1}, {where: {"_id": parent}});
	        	db.Space.update({ voted_user: votedUser,vote_count: voteCount+1}, {where: {"_id": req.params.spaceid}});
	        	db.User.find({where:{"_id":req.params.userid}}).then(function(det){
	        		var c=det.dataValues.voted_spaces+req.params.spaceid+',';
	        		db.User.update({voted_spaces:c},{where:{"_id":req.params.userid}});
	        	})
	        	res.status(200).json({"id":1,"called":result});
	        }
	        else{
	        	result="Already voted designs in this contest";
	        	res.status(200).json({"id":2,"called":result});
	        }
        })
    })
});  	
router.get('/:spaceid/vote/result', function(req, res, next) {
	db.Space.findAll({where:{"parent_space_id":req.params.spaceid}}).then(function(messages){
		let lis=[];
		let md=JSON.stringify(messages);
		let my=JSON.parse(md);
		let max=0;
		for(let i=0;i<my.length;i++){
			lis.push(my[i].vote_count);
			if(max<my[i].vote_count)
				{max=my[i].vote_count}
		}
		db.Space.findAll({where:{"parent_space_id":req.params.spaceid,"vote_count":max}}).then(function(messages){
			res.status(200).json(messages);
		})
    })
});  	

module.exports = router;