var mongoose = require('mongoose');
var db =require(__dirname + 'mongoKey.js').db;
var Answer = require(__dirname + '/Models/Answer.js').Answer;
var createAnswer =require(__dirname + '/Models/Answer.js').createAnswer;
var Question = require(__dirname + '/Models/Question.js').Question;

function getDate(){
    var today = Date.now();
    return today
}


// Quick functions for document updates

function answerUpdate(answer) {
    answer.save((err,answer)=> {
        if (err) {
            console.log(err)
        }
    })
}
function questionUpdate(question) {
    question.save((err,question)=> {
        if (err) {
            console.log(err)
        }
    })
}

function createQuestion(questionTitle,questionAuthor,questionBody){
    return new Question({
        questionData: {
            votes: 0,
            views: 0,
            answers: 0


        },
        questionInfo : {
            questionTitle: questionTitle,
            questionAuthor: questionAuthor,
            askedDate : getDate()
        },
        questionBody: questionBody
    })
}

function postQuestion(questionTitle,questionAuthor,questionBody){
    let postQuestion = createQuestion(questionTitle,questionAuthor,questionBody)
    db.on('open', (err) =>{
        if(err){console.log(err)}
        postQuestion.save((err,postQuestion) =>{
            if (err){console.log(err)}
            console.log(postQuestion.questionInfo.questionTitle + " was saved",postQuestion.id);
        })
    })
}
function questionView(questionId){
    let tempQuestion
    db.on('open', (err) => {
        if(err){console.log(err)}
        Question.findOne({'_id' : questionId})
            .then((Question)=> {
                tempQuestion = Question
                tempQuestion.questionData.views++;
            })
            .then(()=>{questionUpdate(tempQuestion)})
    })
}
function upVoteQuestion(questionId){
    let tempQuestion;
    db.on('open',(err)=>{
        if(err){console.log(err)}
        Question.findOne({'_id': questionId})
            .then((Question)=>{
                tempQuestion = Question;
                tempQuestion.questionData.votes++
            })
            .then(()=>{questionUpdate(tempQuestion)})
    })
}

function downVoteQuestion(questionId){
    let tempQuestion;
    db.on('open',(err)=>{
        if(err){console.log(err)}
        Question.findOne({'_id': questionId})
            .then((Question)=>{
                tempQuestion = Question;
                tempQuestion.questionData.votes--
            })
            .then(()=>{questionUpdate(tempQuestion)})
    })
}

function upAnswerCount(questionId){
    let tempQuestion;
    db.on('open',(err)=>{
        if(err){console.log(err)}
        Question.findOne({'_id': questionId})
            .then((Question)=>{
                tempQuestion = Question;
                tempQuestion.questionData.answers++
            })
            .then(()=>{questionUpdate(tempQuestion)})
    })
}
function downAnswerCount(questionId){
    let tempQuestion;
    db.on('open',(err)=>{
        if(err){console.log(err)}
        Question.findOne({'_id': questionId})
            .then((Question)=>{
                tempQuestion = Question;
                tempQuestion.questionData.answers--
            })
            .then(()=>{questionUpdate(tempQuestion)})
    })
}
function editQuestionBody(questionId,editedBody){
    let tempQuestion
    db.on('open',(err)=>{
        if(err){console.log(err)}
        Question.findOne({'_id': questionId})
            .then((Question)=>{
                tempQuestion = Question
                tempQuestion.questionBody = editedBody;
            })
            .then(()=>{questionUpdate(tempQuestion)})
    })
}



//Answer Services need to be reworked. Added them to an array inside of Question so they need dot notation


function upVoteAnswer(answerId){
    let tempAnswer;
    db.on('open',(err)=>{
        if(err){console.log(err)}
        Answer.findOne({'_id': answerId})
            .then((Answer)=>{
                tempAnswer = Answer;
                tempAnswer.answerData.votes++
            })
            .then(()=>{answerUpdate(tempAnswer)})
    })
}

function downVoteAnswer(questionId){
    let tempAnswer;
    db.on('open',(err)=>{
        if(err){console.log(err)}
        Answer.findOne({'_id': questionId})
            .then((Answer)=>{
                tempAnswer = Answer;
                tempAnswer.answerData.votes--
            })
            .then(()=>{answerUpdate(tempAnswer)})
    })
}
function upAnswerCount(questionId){
    let tempAnswer;
    db.on('open',(err)=>{
        if(err){console.log(err)}
        Answer.findOne({'_id': questionId})
            .then((Answer)=>{
                tempAnswer = Answer;
                tempAnswer.answerData.answers++
            })
            .then(()=>{answerUpdate(tempAnswer)})
    })
}
function downAnswerCount(questionId){
    let tempAnswer;
    db.on('open',(err)=>{
        if(err){console.log(err)}
        Answer.findOne({'_id': questionId})
            .then((Answer)=>{
                tempAnswer = Answer;
                tempAnswer.answerData.answers--
            })
            .then(()=>{answerUpdate(tempAnswer)})
    })
}
function editAnswerBody(questionId,editedBody){
    let tempAnswer
    db.on('open',(err)=>{
        if(err){console.log(err)}
        Answer.findOne({'_id': questionId})
            .then((Answer)=>{
                tempAnswer = Answer
                tempAnswer.answerBody = editedBody;
            })
            .then(()=>{answerUpdate(tempAnswer)})
    })
}
function addAnswer(questionId,answerAuthor,answerBody){
    let tempAnswer = createAnswer(answerAuthor,answerBody)
    let tempQuestion;
    db.on('open',(err)=>{
        if(err){console.log(err)};
        Question.findOne({'_id': questionId})
        .then((Question)=>{
            tempQuestion = Question;
        })
        .then(()=>{
            tempQuestion.answersArray.push(tempAnswer);
        })
        .then(()=>{
            questionUpdate(tempQuestion);
        })
    })
}
function deleteAnswer(questionId,answerId){
    let tempQuestion;
    db.on('open',(err)=>{
        if(err){console.log(err)};
        Question.findOne({'_id':questionId})
        .then((Question)=>{
            tempQuestion = Question;
        })
        .then(()=>{
            tempQuestion.answersArray.pop({'_id' : answerId})
        })
        .then(()=>{
            questionUpdate(tempQuestion);
        })
        .then(()=>{
            console.log("answer was removed");
        })
    })

};
//addAnswer('57292d39e8b0e46b336d316b',"gemis",'this worked');
//deleteAnswer('57292d39e8b0e46b336d316b',"572a5bbe80d60293349026a8");