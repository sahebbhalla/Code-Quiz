var mainSection = document.getElementById("mainSection"); //main section Variable
var questionArea = document.querySelector("#questionArea"); //questionVaraible
var answerArea = document.querySelector("#answerArea"); //answerArea Variable
var submitButton = document.createElement("button"); //button
var countDown = document.getElementById("countDown");
var currentQuestion;
var answerTimer;
var questionTimer;
var totalScore;

submitButton.className = "btn";
submitButton.textContent = "Start Quiz";
var questionText = document.createElement("h2");
questionText.className = "questionText";
var questionIndex = 0;
var answerText = document.createElement("p");
answerText.className = "answerText";


var questions = [
  {
    question: "test Question",
    choices: ["answer1", "amswer2", "answer3"],
    answer: 1,
    questionTime: 10000,
  },
  {
    question: "test Question 2",
    choices: ["answers1", "amswers2", "answesr3"],
    answer: 2,
    questionTime: 10000,
  },
  {
    question: "test Question 3",
    choices: ["answerqw1", "amsweqwr2", "answerqw3"],
    answer: 0,
    questionTime: 10000,
  }
];

var applicationSetup = function () {
  questionText.textContent = "Welcome to the Quiz";
  answerText.textContent ="Try to answer the following code-related questions within the time limit keep in mind that incorrect answers will penalize your score/time by ten seconds";
  questionArea.appendChild(questionText);
  answerArea.appendChild(answerText);
  answerArea.appendChild(submitButton);
};
var removeContent = function () {
  questionArea.innerHTML = "";
  answerArea.innerHTML = "";
  submitButton.remove();
  countDown.innerHTML="";
};
var resetTimer = function(){
    
    var timer = getTimer();
    console.log(timer);
    startTimer(timer / 1000);
    questionTimer= setTimeout(renderQuestion, timer);
    return timer;
}
var answerMethod = function(event){
    clearTimeout(questionTimer);
    clearTimeout(answerTimer);
    if(event.target.dataset.answerId==currentQuestion.answer)
    {
        alert("You are right")
        
        
    }else{
        alert("incorrect Answer");
    }
    renderQuestion()
}
var renderQuestion = function () {
  if (!(questionIndex < questions.length)) {
    removeContent()
    return;
  }
  else{ 
    removeContent();
  
    var question = questions[questionIndex];
    console.log(question);
    questionText.innerHTML = question.question;
    questionText.setAttribute("data-answer-state","notAnswered")
    questionArea.appendChild(questionText);
    for (var i = 0; i < question.choices.length; i++) {
      var answerButton = document.createElement("button");
      answerButton.innerHTML = question.choices[i];
      answerButton.className = "btn btn-answer";
      answerButton.setAttribute("data-answer-id",i) 
      currentQuestion=question;
      answerArea.appendChild(answerButton);
      answerButton.addEventListener("click",answerMethod); 
    }   
   resetTimer();
    
    questionIndex++;
    
}
    
    
};

var startTimer = function (timer) {
  if (timer > 0) {
    countDown.innerHTML = timer;
    timer--;
    answerTimer=setTimeout(startTimer, 1000, timer);
  } else {
  }
};
var startQuiz = function () {
  renderQuestion();
};
var getTimer = function () {
  if (questionIndex < questions.length) {
    return parseInt(questions[questionIndex].questionTime);
  }
};
// renderQuestion();
applicationSetup();
submitButton.addEventListener("click", startQuiz);

