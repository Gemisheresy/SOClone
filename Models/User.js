'use strict'
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var db = mongoose.connection;
var getDate= function(){
    let today = Date.now();
    return today;
};

var UserSchema = new Schema({
    username: String,
    password: String,
    dateCreated: Date,
    isActive: Boolean,
    questionsAsked: [String],
    questionsAnswered: [String]
});
var User = mongoose.model('User',UserSchema);

exports.User= User;