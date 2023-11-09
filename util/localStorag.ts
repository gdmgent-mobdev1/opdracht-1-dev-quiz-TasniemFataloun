import { QuizSettings, quizSettings } from "./types";

//localStorage.setItem om het instellingenobject (cat, answers, ..) op te slaan als een JSON-tekenreeks in de lokale opslag van de browser.
function setSettings(settings: QuizSettings) {
  localStorage.setItem("quizSettings", JSON.stringify(settings));
}

//loadsetting gebruikt om QuizSettings achtergehaald vanuit localstorage
// De regel localStorage.getItem("quizSettings") haalt de quizinstellingen op die zijn opgeslagen onder de sleutel "quizSettings".
// Als er geen instellingen zijn opgeslagen, wordt de default gebruikt.
// Json --> om een object te krijgen
function loadSettings(): QuizSettings {
  const savedSettings = localStorage.getItem("Quiz_Setting");
  return savedSettings ? JSON.parse(savedSettings) : quizSettings;
}

function loadScores() {
  const savedScores = localStorage.getItem("User_Setting");
  return savedScores ? JSON.parse(savedScores) : null;
}

// save username in array that has object for every user name in local storage

function saveUserName(userName: any) {
  localStorage.setItem("userName", JSON.stringify(userName));
  //save after refresh  
}





//save scores in array
function saveScores(scores: any) {
  localStorage.setItem("scores", JSON.stringify(scores));
  //save after refresh

}

export { setSettings, loadSettings, loadScores, saveScores,saveUserName };
