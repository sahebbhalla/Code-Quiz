var mainSection = document.getElementById("mainSection")//main section Variable
var questionArea = document.querySelector('#questionArea');//questionVaraible
var answerArea = document.querySelector('#answerArea');//answerArea Variable
var timerClock =document
var submitButton= document.createElement('button');//button
submitButton.className="btn"
submitButton.textContent="Start Quiz";
var questionText= document.createElement("h2");
questionText.className="questionText";
var questionIndex = 0;
var answerText = document.createElement("p");
answerText.className="answerText"
var questionInterval="";

var questions=[
    {question:"test Question",
    choices:["answer1","amswer2","answer3"],
    answer:"answer1",
    questionTime:5000,
    },{question:"test Question",
    choices:["answer1","amswer2","answer3"],
    answer:"answer1",
    questionTime:500012
    }];



var applicationSetup =function(){

    questionText.textContent="Welcome to the Quiz"
    answerText.textContent="Try to answer the following code-related questions within the time limit keep in mind that incorrect answers will penalize your score/time by ten seconds";
    questionArea.appendChild(questionText);
    answerArea.appendChild(answerText);
    answerArea.appendChild(submitButton);
}
var removeContent = function(){
    questionText.textContent="";
    answerText.textContent="";
    submitButton.remove();

}
var renderQuestion=function(question){
      console.log(questionInterval);
    if(questionIndex>=questions.length){
        console.log("intervalCleared")
        clearInterval(questionInterval);
    }
    removeContent();
    questionText.innerHTML=questions.question;
    console.log(questionIndex);
    questionIndex++;
    
   
    
}

var startQuiz = function(){

    while(questionIndex<questions.length){
        // console.log(questions[questionIndex].questionTime);
        questionInterval = setInterval(renderQuestion(questions[questionIndex]),questions[questionIndex].questionTime);
    }
   
}

var timer =function(){

}
// renderQuestion();
applicationSetup();
submitButton.addEventListener("click",startQuiz);
