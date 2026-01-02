import { proxy } from "valtio";

const resultStore = proxy({
  product: null,
  error: null,
});

//const resetQuestionnaireState = () => {
//  questionnaireState.currentQuestion = "";
//  questionnaireState.currentQuestionIndex = 0;
//  questionnaireState.answerWeight = [0, 0, 0, 0, 0];
//};

export default resultStore;
//export { resetQuestionnaireState };
