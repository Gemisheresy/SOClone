'use strict'
var mongoose = require('mongoose');
var Answer = require(__dirname + '/Answer.js')


var getDate= function(){
   let today = Date.now();
    return today
}
function questionUpdate(question) {
    question.save((err,question)=> {
        if (err) {
            console.log(err)
        }
    })
}

var Schema = mongoose.Schema;
var QuestionSchema = new Schema({
    questionData: {
        votes: Number,
        views: Number,
        answers: Number
    },
    questionInfo : {
        questionTitle: String,
        questionAuthor: String,
        askedDate: Date
    },
    questionBody: String,
    answersArray: []

})

var Question = mongoose.model('Question',QuestionSchema);


exports.Question = Question;