'use strict'
var mongoose = require('mongoose');
var User = require(__dirname + '/Models/User.js').User;
mongoose.connect('mongodb://gemis:evadata2@ds023560.mlab.com:23560/soclone/Users');
var db = mongoose.connection;

function userUpdate(user) {
    user.save((err,user)=> {
        if (err) {
            console.log(err)
        }
    })
}
var createUser = function(username,password){
    return new User({
        username: username,
        password: password,
        dateCreated: getDate()
    })
}

var makeUser= function(username,password){
    let user = createUser(username,password);
    db.on('open',(err)=>{
        if(err){console.log(err)};
        user.save((err,user)=>{
            if(err){console.log(err)};
            console.log(user.username + " was saved")
        })
    })

};
var authUser= function(user){
    db.on('open',(err)=>{
        if(err){console.log(err)};
        User.findOne({'username': user.name})
            .then((User)=>{
                if (User.password !== user.password){
                    console.log("You're password is in correct");
                }
                else {
                    console.log('Welcome')
                }
            })
    })
}
var deleteUser= function(userId){
    db.on('open',(err)=>{
        if(err){console.log(err)};
        User.findOne({'_id':userId})
            .then((User)=>{
               User.remove((err,User)=>{
                   if(err){console.log(err)};
                   console.log(User.username + " was removed");
               })
            })
    })
}
var addQuestionID = function(userId,questionId){
    db.on('open',(err)=>{
        if(err){console.log(err)};
        User.findOne({'_id': userId})
        .then((User)=>{
            User.questionsAsked.push(questionId);
        })
        .then(()=>{
            console.log("QuestionId added to user " +  User.username);
        })
    })
}
var addAnswerId = function(userId,answerId){
    db.on('open',(err)=>{
        if(err){console.log(err)};
        User.findOne({'_id':userId})
        .then((User)=>{
            User.questionsAnswered.push(answerId)
        })
    })
}
var makeNotActive = function(userId){
    db.on('open',(err)=>{
        if(err){console.log(err)};
        User.findOne({'_id':userId})
        .then((User)=>{
            User.isActive = false;
        })
        .then(()=>{
            console.log(User.username + ' is no longer active');
        })
    })
}