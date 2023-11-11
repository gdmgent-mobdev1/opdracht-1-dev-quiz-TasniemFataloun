type QuizSettings = {
    difficulty: string;
    category: string;
    numQuestions: string;
};

//default quizSettings
let quizSettings: QuizSettings = {
    difficulty: "Easy", 
    category: "Code", 
    numQuestions: "5", 
};

/* type UserName = {
    name: string;
}
 */

export {quizSettings,QuizSettings }