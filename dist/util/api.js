var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const getData = (category, difficulty, number) => __awaiter(void 0, void 0, void 0, function* () {
    const API_Key = "B5TYQgebpqiAArpj41jDMIDTZzHCa3z3BBgkjmO6";
    const res = yield fetch(`https://quizapi.io/api/v1/questions?apiKey=${API_Key}&category=${category}&difficulty=${difficulty}&limit=${number}`);
    const data = yield res.json();
    return data;
});
