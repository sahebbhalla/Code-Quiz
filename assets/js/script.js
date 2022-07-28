//Variable declaration 
var mainSection = document.getElementById("mainSection"); //main section Variable
var questionArea = document.querySelector("#questionArea"); //questionVaraible
var answerArea = document.querySelector("#answerArea"); //answerArea Variable
var submitButton = document.createElement("button"); //button
var highScoreButton = document.getElementById("highScore");//highScoreButton
submitButton.id = "submitButton";
var countDown = document.getElementById("countDown");
var currentQuestion;
var answerTimer;
var questionTimer;
var totalScore = 0;
var restartChallenge = document.createElement("button");
submitButton.className = "btn";
submitButton.textContent = "Start Quiz";
var questionText = document.createElement("h2");
questionText.className = "questionText";
var questionIndex = 0;
var answerText = document.createElement("p");
answerText.className = "answerText";
var inputlabel;
var inputBox;
var questions = [
  {
    question:
      "What do you call a computer on a network that requests files from another computer?",
    choices: ["(A) A client", "(B) A host", "(C) A router", "(D) A web server"],
    answer: 0,
    questionTime: 75000,
  },
  {
    question:
      "Hardware devices that are not part of the main computer system and are often added later to the system.",
    choices: ["(A) Peripheral", "(B) Clip art", "(C) Highlight", "(D) Execute"],
    answer: 0,
    questionTime: 65000,
  },
  {
    question:
      "3. The main computer that stores the files that can be sent to computers that are networked together is:",
    choices: [
      "(A) Clip art",
      "(B) Mother board",
      "(C) Peripheral",
      "(D) File server",
    ],
    answer: 3,
    questionTime: 55000,
  },
  {
    question: "How can you catch a computer virus?",
    choices: [
      "(A) Sending e-mail messages",
      "(B) Using a laptop during the winter",
      "(C) Opening e-mail attachments",
      "(D) Shopping on-line",
    ],
    answer: 2,
    questionTime: 45000,
  },
  {
    question: "Google (www.google.com) is a?",
    choices: [
      "(A) Search Engine",
      "(B) Number in Math",
      " (C) Directory of images",
      "(D) Chat service on the web",
    ],
    answer: 0,
    questionTime: 35000,
  },
  {
    question: "Which is not an Internet protocol?",
    choices: ["(A) HTTP", "(B) FTP", "(C) STP", "(D) IP"],
    answer: 2,
    questionTime: 25000,
  },
];
var leaderBoard = [];
//variable declaration ends 
//application setup medthod that can be called a couple of times to setup the home page 
var applicationSetup = function () {
  removeContent();//Called to update DOM render 
  questionText.textContent = "Welcome to the Quiz";
  answerText.textContent =
    "Try to answer the following code-related questions within the time limit keep in mind that incorrect answers will penalize your score by -1, Each question has a different timer based on difficulity ";
  questionArea.appendChild(questionText);
  answerArea.appendChild(answerText);
  answerArea.appendChild(submitButton);
  submitButton.addEventListener("click", startQuiz);
};
//A general method to remove content 
var removeContent = function () {
  questionArea.innerHTML = "";
  answerArea.innerHTML = "";
  submitButton.remove();
  countDown.innerHTML = "";
  restartChallenge.innerHTML = "";
};

//Reset timer every question 
var resetTimer = function () {
  var timer = getTimer();
  console.log(timer);
  startTimer(timer / 1000);
  questionTimer = setTimeout(renderQuestion, timer);
  return timer;
};
//Action listners for when user click on answer button 
var answerMethod = function (event) {
  clearTimeout(questionTimer);
  clearTimeout(answerTimer);
  if (event.target.dataset.answerId == currentQuestion.answer) {
    event.target.style.backgroundColor = "green";
    setTimeout(renderQuestion, 2000);
    totalScore = totalScore + 2;
  } else {
    event.target.style.backgroundColor = "red";
    setTimeout(renderQuestion, 2000);
    totalScore = totalScore - 1;
  }
};
//Update score as useranswers questions 
var addScore = function () {
  var scoreObject = { name: inputBox.value, score: totalScore };
  leaderBoard.push(scoreObject);
  console.log(leaderBoard);
  applicationSetup();
};
//results page 
var results = function () {
  removeContent();
  questionText.textContent = "Your Total score :" + totalScore;
  questionArea.appendChild(questionText);
  restartChallenge.className = "btn";
  restartChallenge.textContent = "Restart Challenge";
  restartChallenge.id = "restartChallenge";
  restartChallenge.style.margin = "10px";
  restartChallenge.addEventListener("click", addScore);
  inputlabel = document.createElement("label");
  inputlabel.innerHTML = "Please enter your name";
  inputBox = document.createElement("input");
  answerArea.appendChild(inputlabel);
  answerArea.appendChild(document.createElement("br"));
  answerArea.appendChild(inputBox);
  answerArea.appendChild(document.createElement("br"));
  answerArea.appendChild(restartChallenge);
};
//General method for new questions render 
var renderQuestion = function () {
  if (!(questionIndex < questions.length)) {
    results();

    return;
  } else {
    removeContent();

    var question = questions[questionIndex];
    console.log(question);
    questionText.innerHTML = question.question;
    questionText.setAttribute("data-answer-state", "notAnswered");
    questionArea.appendChild(questionText);
    for (var i = 0; i < question.choices.length; i++) {
      var answerButton = document.createElement("button");
      answerButton.innerHTML = question.choices[i];
      answerButton.className = "btn btn-answer";
      answerButton.setAttribute("data-answer-id", i);
      currentQuestion = question;
      answerArea.appendChild(answerButton);
      answerButton.addEventListener("click", answerMethod);
    }
    resetTimer();

    questionIndex++;
  }
};
//SratTimer method 
var startTimer = function (timer) {
  if (timer > 0) {
    countDown.innerHTML = timer;
    timer--;
    answerTimer = setTimeout(startTimer, 1000, timer);
  } else {
  }
};
//startQuiz methods 
var startQuiz = function () {
  questionIndex = 0;
  totalScore = 0;
  renderQuestion();
};
//getTimer for each object in the questions array. This app is desinged to have a dynamic timer for each question based on difficulty 
var getTimer = function () {
  if (questionIndex < questions.length) {
    return parseInt(questions[questionIndex].questionTime);
  }
};
//Render high Score 
var showHighScore = function () {
  removeContent();
  var table = document.createElement("table");
  table.className = "table";
  var trElement = document.createElement("tr");
  var tdName = document.createElement("td");
  tdName.textContent = "Name";
  var tdScore = document.createElement("td");
  tdScore.textContent = "Score";
  trElement.appendChild(tdName);
  trElement.appendChild(tdScore);
  table.appendChild(trElement);
  for (var i = 0; i < leaderBoard.length; i++) {
    var trElement = document.createElement("tr");
    tdName = document.createElement("td");
    tdName.textContent = leaderBoard[i].name;
    tdScore = document.createElement("td");
    tdScore.textContent = leaderBoard[i].score;
    trElement.appendChild(tdName);
    trElement.appendChild(tdScore);
    table.appendChild(trElement);
  }
  answerArea.appendChild(table);
  var homePage = document.createElement("button");
  homePage.textContent = "Home Page";
  homePage.className = "btn";
  homePage.addEventListener("click", applicationSetup);
  answerArea.appendChild(homePage);
};
//initial Setup 
applicationSetup();
//highScore Always listning 
highScoreButton.addEventListener("click", showHighScore);
