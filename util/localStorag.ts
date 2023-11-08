 import { QuizSettings ,quizSettings} from "./types";
 
 function setSettings(settings: QuizSettings) {
    localStorage.setItem("quizSettings", JSON.stringify(settings));
}

 function loadSettings(): QuizSettings {
    const savedSettings = localStorage.getItem("quizSettings");
    return savedSettings ? JSON.parse(savedSettings):quizSettings;
}

//JSON --> diff, cat, num   saved as on abject in application
export {setSettings,loadSettings}