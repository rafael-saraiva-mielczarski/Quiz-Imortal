import { useQuiz } from "../contexts/QuizContext";

export default function NextButton() {
  const { dispatch, answer, numQuestions } = useQuiz();
  let { index } = useQuiz();

  if (answer === null) return null;

  if (index < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Próxima
      </button>
    );
  }
  if ((index = numQuestions - 1)) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "endGame" })}
      >
        Finalizar
      </button>
    );
  }
}
