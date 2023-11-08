import { quizSettings } from "../util/types";
import { setSettings ,loadSettings} from "../util/localStorag";
type QuizUi = {
    //id: number, 
    question: string, 
    category: string, 
    answers: string[],
    correct_answers: string[],
};

//default value QuizSettings
let quizUi:QuizUi = {
 // id:0,
 question:"",
 category:"",
 answers:[],
 correct_answers:[],
}
// array(niet data) om de values op te slaan (mss na refresh)
// om blijven behouden welke vraaan ben ik aangekomen 
let array:any = []

const number = document.getElementById("number") as  HTMLSelectElement;
for (let i = 1; i <= 20; i++) {
    let option = document.createElement('option');
    option.value  = `${i}`;
    option.textContent = `${i}`;
    number.appendChild(option)
}

const difficultySelect = document.getElementById("difficulty") as HTMLSelectElement;
const categorySelect = document.getElementById("category") as HTMLSelectElement;
const numberSelect = document.getElementById("number") as HTMLInputElement;

//loadsetting = localstorage
difficultySelect.value = loadSettings().difficulty;
categorySelect.value = loadSettings().category;
numberSelect.value = loadSettings().numQuestions;



// setsetting = localstorage save value after refresh 
const startQuizButton = document.getElementById("startQuiz")
startQuizButton?.addEventListener("click",async () => {
    quizSettings.difficulty = difficultySelect.value ;
    quizSettings.category = categorySelect.value;
    quizSettings.numQuestions =  numberSelect.value; 


    setSettings(quizSettings);
    const data = await getData();
    //let id = 0
    data.forEach((element:any) => {
        quizUi = {
            //id: id++, 
            question: element.question, 
            category: element.category, 
            answers: element.answers,
            correct_answers: element.correct_answers,
        };
        array.push(quizUi); 
    });
    console.log(data);
    console.log(array);
});


const getData = async () => {
    const API_Key = "B5TYQgebpqiAArpj41jDMIDTZzHCa3z3BBgkjmO6";
    const res = await fetch(`https://quizapi.io/api/v1/questions?apiKey=${API_Key}&category=${categorySelect.value}&difficulty=${difficultySelect.value}&limit=${numberSelect.value}`);
    const data = await res.json();
    console.log(data[0].answers)
    return data;
}
