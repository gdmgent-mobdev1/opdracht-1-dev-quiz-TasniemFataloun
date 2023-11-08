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
const startQuizButton = document.getElementById("startQuiz");
startQuizButton === null || startQuizButton === void 0 ? void 0 : startQuizButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    quizSettings.difficulty = difficultySelect.value;
    quizSettings.category = categorySelect.value;
    quizSettings.numQuestions = numberSelect.value;
    setSettings(quizSettings);
    const data = yield getData();
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
}));
const getData = () => __awaiter(void 0, void 0, void 0, function* () {
    const API_Key = "B5TYQgebpqiAArpj41jDMIDTZzHCa3z3BBgkjmO6";
    const res = yield fetch(`https://quizapi.io/api/v1/questions?apiKey=${API_Key}&category=${categorySelect.value}&difficulty=${difficultySelect.value}&limit=${numberSelect.value}`);
    const data = yield res.json();
    console.log(data[0].answers);
    return data;
});
