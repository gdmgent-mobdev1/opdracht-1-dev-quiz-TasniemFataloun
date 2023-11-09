import "../css/reset.css";
import "../css/style.css";

import { quizSettings, UserNameScore } from "../util/types";
import {
  setSettings,
  loadSettings,
  saveScore,
  loadScores,
} from "../util/localStorag";
import { getData } from "../util/api";

// geeft de structuur van de quiz weer
type QuizUi = {
  question: string;
  category: string;
  answers: string[];
  correct_answers: string[];
  selectedAnswer: string | null;
};
//variable contains the quiz settings
let quizUi: QuizUi = {
  question: "",
  category: "",
  answers: [],
  correct_answers: [],
  selectedAnswer: "",
};

//local storage + name + Score
let userNameScore: UserNameScore = {
  name: "",
  score: [],
};

let arrayQuizSetting: any = [];
let remainingTime = 10;

//number of questions (Quizsettings)
const numberQues = document.getElementById("numberQues") as HTMLSelectElement;

for (let i = 1; i <= 20; i++) {
  let option = document.createElement("option");
  option.value = `${i}`;
  option.textContent = `${i}`;
  numberQues.appendChild(option);
}

const difficultySelect = document.getElementById(
  "difficulty"
) as HTMLSelectElement;
const categorySelect = document.getElementById("category") as HTMLSelectElement;
const numberSelect = document.getElementById("numberQues") as HTMLInputElement;

// de opgeslagen instellingen op te halen
// quizSettings wordt bewerkt en opgeslagen in localstorage
difficultySelect.value = loadSettings().difficulty;
categorySelect.value = loadSettings().category;
numberSelect.value = loadSettings().numQuestions;

let category = document.querySelector("#category p");
let questionText = document.getElementById("questionText");

// komt nog ......
const getLoadingHTML = () => {
  return `<span class="loading"></span>`;
};

//start
const startQuizButton = document.getElementById("startQuiz");

console.log(loadScores().name);

startQuizButton?.addEventListener("click", async () => {
  const username = document.querySelector(".nameUser") as HTMLInputElement;
  userNameScore.name = username.value;
  localStorage.setItem("User_Setting", JSON.stringify(userNameScore));

  let body = document.getElementById("body");
  //diff, categ, answ
  const settings = document.getElementById("settings");
  const quiz = document.getElementById("quiz");
  quizSettings.difficulty = difficultySelect.value;
  quizSettings.category = categorySelect.value;
  quizSettings.numQuestions = numberSelect.value;

  setSettings(quizSettings);

  //data uithalen van de api
  const data = await getData(
    categorySelect.value,
    difficultySelect.value,
    numberSelect.value
  );

  data.forEach((element: any) => {
    quizUi = {
      question: element.question,
      category: element.category,
      answers: element.answers,
      correct_answers: element.correct_answers,
      selectedAnswer: null,
    };
    arrayQuizSetting.push(quizUi);
  });
  //test
  console.log(arrayQuizSetting);

  if (category) category.textContent = categorySelect.value;
  if (settings) settings.style.display = "none";
  if (quiz) quiz.style.display = "block";
  //loading indicator?

  SetQuiz();
});

const prev = document.getElementById("prev") as HTMLButtonElement;
const end = document.getElementById("end");
const next = document.getElementById("next") as HTMLButtonElement;
const answers = document.querySelector("#answers ul");

let currentQuestionIndex = 0;

const SetQuiz = () => {
  startQuestionTimer();
  prev.textContent = `Previous Question ${currentQuestionIndex}`;

  if (prev) {
    prev.disabled = currentQuestionIndex === 0;
  }
  if (next) {
    next.disabled = currentQuestionIndex === arrayQuizSetting.length - 1; // lenght 11, index = 10  --> om de laatste element te halen
  }

  //begin: eerste vraag
  const currentQuestion = arrayQuizSetting[currentQuestionIndex];

  if (questionText) questionText.textContent = currentQuestion.question; //null
  console.log(currentQuestion.question);
  console.log(arrayQuizSetting);

  // see the number of the question
  const questionNumber = document.getElementById("questionNumber");
  if (questionNumber)
    questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${
      arrayQuizSetting.length
    }`;

  // om bij de starten van de quiz de antwoorden van de vorige te verwijderen
  if (answers) answers.textContent = "";

  const answer = currentQuestion.answers;
  //key: answer_a, value: de value van de antwoord
  for (const key in answer) {
    const value = answer[key];
    console.log(key, value);

    let liAnswers = document.createElement("li");
    liAnswers.classList.add("liAnswers");

    let p = document.createElement("p");

    p.classList.add("value-answers");

    p.textContent = value;

    liAnswers.appendChild(p);

    liAnswers.addEventListener("click", () => {
      const answerItems = document.querySelectorAll("#answers li");

      answerItems.forEach((item) => item.classList.remove("selected"));
      liAnswers.classList.add("selected");
      currentQuestion.selectedAnswer = key;
    });

    if (key === currentQuestion.selectedAnswer) {
      liAnswers.classList.add("selected");
    }

    if (value != null) {
      answers?.appendChild(liAnswers);
    }
  }
};

let questionTimer: any;

function updateTimerLayout(time: number) {
  const timerText = document.getElementById("timerText");
  if (timerText) timerText.textContent = `Time:${time}`; //null
}

function startQuestionTimer() {
  clearInterval(questionTimer);
  remainingTime = 10;
  updateTimerLayout(remainingTime);
  questionTimer = setInterval(() => {
    remainingTime--;
    updateTimerLayout(remainingTime);
    if (remainingTime < 1) {
      clearInterval(questionTimer);
      if (currentQuestionIndex === arrayQuizSetting.length - 1) {
        if (end) {
          end.click();
        }
      } else {
        moveToNextQuestion();
      }
      //moveToNextQuestion();
    }
  }, 1000);
}

// move to next question if we are not at the end of the quiz
// naar de volgende vraag gaan --> boven gebruikt wanneer de timer op 0 staat
function moveToNextQuestion() {
  if (currentQuestionIndex < arrayQuizSetting.length - 1) {
    //// Dit komt omdat array-indexen in JavaScript op 0 zijn gebaseerd, wat betekent dat de laatste index van een array is altijd één minder dan de lengte ervan.
    currentQuestionIndex++;
    console.log("heheheheeh");
    
    console.log(currentQuestionIndex);
    
    SetQuiz();
  }
}

prev?.addEventListener("click", () => {
  if (currentQuestionIndex >= 0) {
    currentQuestionIndex--;
    SetQuiz();
  }
  startQuestionTimer();
});

next?.addEventListener("click", () => {
  if (currentQuestionIndex < arrayQuizSetting.length - 1) {
    currentQuestionIndex++;
    SetQuiz();
  }
  startQuestionTimer();
});

end?.addEventListener("click", () => {
  const quiz = document.getElementById("quiz");
  //const unansweredQuestions = arrayQuizSetting.filter((q:any) => q.selectedAnswer === null);

  const totalQuestions = arrayQuizSetting.length;

  // filter array that only has correct answers
  // vraag per vraag kijken of het antwoord juist is

  let h2Result = document.getElementById("h2");
  if (h2Result) h2Result.textContent = `Your Score ${userNameScore.name}`;

  const correctAnswers = arrayQuizSetting.filter((question: any) => {
    return (
      question.correct_answers[`${question.selectedAnswer}_correct`] === "true"
    );
  }).length;

  let score = (correctAnswers / totalQuestions) * 100;

  const result = document.getElementById("result");
  const scoreValue = document.getElementById("scoreValue");
  if (scoreValue && result) {
    if (quiz) quiz.style.display = "none";
    result.style.display = "block";
    scoreValue.textContent = `${score}%`;

    saveScore(score);
  }
  clearTimeout(questionTimer);

  //show all answers and correct answers
  const yourAnswersList = document.getElementById("answers_list");
  arrayQuizSetting.forEach((q: any) => {
    let bodyEnd = document.getElementById("body");
     const listQuesAndAnswersEnd = document.createElement("div");
    listQuesAndAnswersEnd.classList.add("listQuesAndAnswersEnd"); 
    // remove body id and instead another id

    bodyEnd?.removeAttribute("id");
    bodyEnd?.setAttribute("id", "bodyEnd");


    //




    const answersListEnd = document.createElement("ul");

    //answer that are not null
    for (const i in q.answers) {
      if (q.answers[i] !== null) {
        const answerItem = document.createElement("li");
        answerItem.textContent = q.answers[i];

        if (i == q.selectedAnswer) {
          answerItem.classList.add("selectedAnswerEnd");

          if (q.correct_answers[`${q.selectedAnswer}_correct`] === "true") {
            //creat span
            answerItem.style.border = "2px green solid";
            answerItem.style.color = "green";
          } else {
            //answerItem.style.border = "red";
            // Indien er een fout antwoord werd gegeven dan wordt ook hier het correct antwoord getoond.

            const correctAnswer = document.createElement("span");
            correctAnswer.classList.add("correctAnswer");
            correctAnswer.textContent =
              q.correct_answers[`${q.selectedAnswer}_correct`];
            answerItem.appendChild(correctAnswer);
          }
        }
        if (q.correct_answers[`${i}_correct`] === "true") {
          answerItem.style.border = "2px green solid";
          answerItem.style.color = "green";
          answerItem.style.borderRadius = "5px"; 
          //wrong answer color red
        } else {
          answerItem.style.color = "red";
          answerItem.style.border = "2px red solid";
          answerItem.style.borderRadius = "5px"; 
        }

        answersListEnd.appendChild(answerItem);
        // selected answer must have color puprle even if it is wrong
        if (i == q.selectedAnswer) {
          answerItem.style.color = "purple";
        }
      }
    }

/*     let h2 = document.createElement("h2");
    h2.textContent = q.question;
    listQuesAndAnswersEnd.appendChild(h2); */

    let h2Result = document.getElementById("h2Result");
    let containerResultEnd= document.getElementById("containerResultEnd");


    // if score is < 50% then show message and if score > 50% then show message in p under h2 
    let hehresult = document.querySelector(".hehresult");
    let p = document.createElement("p");
    if (score < 50) {
      p.textContent = "You can do better!";
    } if (score >= 50) {
      p.textContent = "Good job!";
    }
    hehresult?.appendChild(p);

    if (h2Result) h2Result.textContent = `Your Score, ${userNameScore.name}`;
    if (containerResultEnd) containerResultEnd.textContent = `Your Score ${userNameScore.name}`;

    //show question 
    let h2 = document.createElement("h2");
    h2.textContent = q.question;
    listQuesAndAnswersEnd.appendChild(h2);
    listQuesAndAnswersEnd.appendChild(answersListEnd);
    yourAnswersList?.appendChild(listQuesAndAnswersEnd);
  });
});

const restart = document.getElementById("restart");

restart?.addEventListener("click", () => {
  //remove bodyend id and instead another id
  let bodyEnd = document.getElementById("bodyEnd");
  bodyEnd?.removeAttribute("id");
  bodyEnd?.setAttribute("id", "body");
  
  const settings = document.getElementById("settings");
  const result = document.getElementById("result");
  let body = document.getElementById("body");
    body?.setAttribute("id", "body");

  if (settings) settings.style.display = "flex";
  if (result) result.style.display = "none";
  arrayQuizSetting = [];
  currentQuestionIndex = 0;
});
