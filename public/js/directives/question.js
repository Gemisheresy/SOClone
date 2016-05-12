app.directive('QuestionList',function(){
    return {
        templateUrl: "public/directives/question.html",
        restrict: 'E',
        scope: {
            question: '='
        }


    }
})