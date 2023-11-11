import { QuizSettings, quizSettings } from "./types";

//localStorage.setItem om het instellingenobject (cat, answers, ..) op te slaan als een JSON-tekenreeks in de lokale opslag van de browser.
function setSettings(settings: QuizSettings) {
  localStorage.setItem("Quiz_Setting", JSON.stringify(settings));
}

//loadsetting gebruikt om QuizSettings achtergehaald vanuit localstorage
// De regel localStorage.getItem("quizSettings") haalt de quizinstellingen op die zijn opgeslagen onder de sleutel "quizSettings".
// Als er geen instellingen zijn opgeslagen, wordt de default gebruikt.
// Json --> om een object te krijgen
function loadSettings(): QuizSettings {
  const savedSettings = localStorage.getItem("Quiz_Setting");
  return savedSettings ? JSON.parse(savedSettings) : quizSettings;
}

// save username in array that has object for every user name in local storage
function saveUserSettings(name:any){
  const userSettingsJSON = localStorage.getItem('UserSettings');
  const userSettings = userSettingsJSON ? JSON.parse(userSettingsJSON) : [];
  const existingUserIndex = userSettings.findIndex((user: any) => user.name === name);
  if (existingUserIndex === -1) {
      userSettings.push({ name: name, score: [] });
      localStorage.setItem('UserSettings', JSON.stringify(userSettings));

    }
}
function saveScore(score:any,name:any){
  const userSettingsJSON = localStorage.getItem('UserSettings');
  const userSettings = userSettingsJSON ? JSON.parse(userSettingsJSON) : [];
  const existingUserIndex = userSettings.findIndex((user: any) => user.name === name);
  if (existingUserIndex !== -1) {
      userSettings[existingUserIndex].score.push(score);
      localStorage.setItem('UserSettings', JSON.stringify(userSettings));  
    }
}

export { setSettings, loadSettings, saveUserSettings,saveScore };
