var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { quizSettings } from "../util/types";
import { setSettings, loadSettings } from "../util/localStorag";
import { getData } from "../util/api";
let quizUi = {
    id: 0,
    question: "",
    category: "",
    answers: [],
    correct_answers: [],
};
let array = [];
const number = document.getElementById("number");
for (let i = 1; i <= 20; i++) {
    let option = document.createElement('option');
    option.value = `${i}`;
    option.textContent = `${i}`;
    number.appendChild(option);
}
const difficultySelect = document.getElementById("difficulty");
const categorySelect = document.getElementById("category");
const numberSelect = document.getElementById("number");
difficultySelect.value = loadSettings().difficulty;
categorySelect.value = loadSettings().category;
numberSelect.value = loadSettings().numQuestions;
let category = document.querySelector('#category p');
let questionText = document.getElementById('questionText');
const startQuizButton = document.getElementById("startQuiz");
startQuizButton === null || startQuizButton === void 0 ? void 0 : startQuizButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const settings = document.getElementById("settings");
    const quiz = document.getElementById("quiz");
    quizSettings.difficulty = difficultySelect.value;
    quizSettings.category = categorySelect.value;
    quizSettings.numQuestions = numberSelect.value;
    setSettings(quizSettings);
    const data = yield getData(categorySelect.value, difficultySelect.value, numberSelect.value);
    let id = 0;
    data.forEach((element) => {
        quizUi = {
            id: id++,
            question: element.question,
            category: element.category,
            answers: element.answers,
            correct_answers: element.correct_answers,
        };
        array.push(quizUi);
    });
    if ((settings === null || settings === void 0 ? void 0 : settings.style.display) === 'flex')
        settings.style.display = 'none';
    if ((quiz === null || quiz === void 0 ? void 0 : quiz.style.display) === 'none')
        quiz.style.display = 'block';
    SetQuiz();
}));
const perv = document.getElementById('perv');
const end = document.getElementById('end');
const next = document.getElementById('next');
const answers = document.querySelector('#answers ul');
let currentQuestionIndex = 0;
const SetQuiz = () => {
    //if (array.length === 0) return; 
    if (perv) {
        perv.disabled = currentQuestionIndex === 0;
    }
    if (next) {
        next.disabled = currentQuestionIndex === array.length - 1;
    }
    const currentQuestion = array[currentQuestionIndex];
    if (questionText) {
        questionText.textContent = currentQuestion.question;
    }
    // Clear previous answer options
    const ans = currentQuestion.answers;
    for (const key in ans) {
        const value = ans[key];
        let li = document.createElement('li');
        li.textContent = value;
        li.setAttribute('data-value', `Item ${key}`);
        if (value != null) {
            answers === null || answers === void 0 ? void 0 : answers.appendChild(li);
        }
    }
};
perv === null || perv === void 0 ? void 0 : perv.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        SetQuiz();
    }
});
next === null || next === void 0 ? void 0 : next.addEventListener('click', () => {
    if (currentQuestionIndex < array.length - 1) {
        currentQuestionIndex++;
        SetQuiz();
    }
});
