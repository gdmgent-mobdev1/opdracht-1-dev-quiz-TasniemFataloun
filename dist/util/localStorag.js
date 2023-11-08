import { quizSettings } from "./types";
function setSettings(settings) {
    localStorage.setItem("quizSettings", JSON.stringify(settings));
}
function loadSettings() {
    const savedSettings = localStorage.getItem("quizSettings");
    return savedSettings ? JSON.parse(savedSettings) : quizSettings;
}
export { setSettings, loadSettings };
