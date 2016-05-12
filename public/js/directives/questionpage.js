app.directive('QuestionPage',function(){
    return {
        templateUrl:'public/directives/questionpage.html',
        restrict:'E',
        scope: {
            question:'='
        }
    }
});