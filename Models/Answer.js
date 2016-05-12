'use strict'
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var getDate= function(){
    let today = Date.now();
    return today
};
var AnswersSchema = new Schema({
    answerData: {
        bestAnswer: "Boolean",
        votes: 'Number'
    },
    answerInfo : {
        answerAuthor: "String",
        date: "Date"
    },
    answerBody: 'String'

})

var Answer = mongoose.model('Answer',AnswersSchema);



exports.Answer = Answer;