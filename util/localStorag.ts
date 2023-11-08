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
  const savedSettings = localStorage.getItem("quizSetting");
  return savedSettings ? JSON.parse(savedSettings) : quizSettings;
}

function loadScores() {
  const savedScores = localStorage.getItem("User_Setting");
  return savedScores ? JSON.parse(savedScores) : null;
}

//Hou de scores bij in LocalStorage zodat je een klassement kan opstellen.
function saveScore(score: number) {
  if (loadScores().name) {
    if (loadScores().scores) {
      const scoresArray = JSON.parse(loadScores().scores);
      scoresArray.push(score);
      localStorage.setItem("User_Setting", JSON.stringify(scoresArray));
    } else {
      localStorage.setItem("User_Setting", JSON.stringify([]));
    }
  }
  console.log(loadScores().name);
}

// save name user in localstorage
/* function saveName(name: string) {
    localStorage.setItem("name", name);
} */

export { setSettings, loadSettings, saveScore, loadScores };
